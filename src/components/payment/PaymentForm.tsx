'use client';

import { useState, useEffect } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

// Initialize Stripe
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

interface PaymentFormProps {
  bookingId: string;
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

function CheckoutForm({ bookingId, amount, onSuccess, onCancel }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (paymentIntent) {
        switch (paymentIntent.status) {
          case 'succeeded':
            setPaymentCompleted(true);
            onSuccess();
            break;
          case 'processing':
            setError('Your payment is processing.');
            break;
          case 'requires_payment_method':
            setError('Your payment was not successful, please try again.');
            break;
          default:
            setError('Something went wrong.');
            break;
        }
      }
    });
  }, [stripe, onSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId,
          userId: user?.id,
          userEmail: user?.email,
          userName: user?.name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create payment');
      }

      const { error: stripeError } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/bookings/${bookingId}?payment=success`,
          receipt_email: user?.email,
        },
        redirect: 'if_required',
      });

      if (stripeError) {
        setError(stripeError.message || 'Payment failed');
        setIsLoading(false);
        return;
      }

      // Payment succeeded
      setPaymentCompleted(true);
      onSuccess();
    } catch (error: any) {
      setError(error.message || 'An error occurred during payment');
      console.error('Payment error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (paymentCompleted) {
    return (
      <div className="text-center py-8">
        <div className="text-green-500 text-6xl mb-4">✅</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Payment Successful!
        </h3>
        <p className="text-gray-600 mb-6">
          Your booking has been confirmed. You'll receive a confirmation email shortly.
        </p>
        <button
          onClick={() => window.location.href = `/bookings/${bookingId}`}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Booking Details
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="mb-4">
          <h3 className="font-semibold text-gray-900">Payment Details</h3>
          <p className="text-sm text-gray-600">
            Complete your payment to secure this booking
          </p>
        </div>
        
        <div className="mb-4 p-3 bg-gray-50 rounded">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Total Amount:</span>
            <span className="text-xl font-bold text-gray-900">${amount.toFixed(2)}</span>
          </div>
        </div>

        <PaymentElement
          options={{
            layout: 'tabs',
          }}
        />
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium disabled:text-gray-400"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!stripe || isLoading}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
        >
          {isLoading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
        </button>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>🔒 Secure payment powered by Stripe</p>
        <p className="mt-1">Your payment information is encrypted and secure</p>
      </div>
    </form>
  );
}

export function PaymentForm(props: PaymentFormProps) {
  const options: StripeElementsOptions = {
    clientSecret: '', // Will be set dynamically
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#2563eb',
        colorBackground: '#ffffff',
        colorText: '#1f2937',
        colorDanger: '#dc2626',
        fontFamily: 'Inter, system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm {...props} />
    </Elements>
  );
}