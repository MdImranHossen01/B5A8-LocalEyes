/* eslint-disable @typescript-eslint/no-explicit-any */
// SIMPLIFIED PaymentForm.tsx
'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

interface PaymentFormProps {
  bookingId: string;
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export function PaymentForm({ bookingId, amount, onSuccess, onCancel }: PaymentFormProps) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handlePayment = async () => {
    if (!user) {
      setError('Please login to make payment');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Create payment intent
      const intentResponse = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookingId,
          userId: user.id,
          userEmail: user.email,
          userName: user.name,
        }),
      });

      const intentData = await intentResponse.json();

      if (!intentResponse.ok) {
        throw new Error(intentData.error || 'Failed to create payment');
      }

      // Step 2: Redirect to Stripe Checkout
      const stripeResponse = await fetch('/api/payments/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentIntentId: intentData.paymentIntentId,
          bookingId,
          amount,
          userEmail: user.email,
          returnUrl: `${window.location.origin}/bookings/${bookingId}?payment=success`,
        }),
      });

      const stripeData = await stripeResponse.json();

      if (!stripeResponse.ok) {
        throw new Error(stripeData.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      window.location.href = stripeData.url;
    } catch (error: any) {
      setError(error.message || 'An error occurred during payment');
      console.error('Payment error:', error);
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
          Your booking has been confirmed. You&apos;ll receive a confirmation email shortly.
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
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Payment Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Booking ID:</span>
              <span className="font-medium text-gray-600">{bookingId.substring(0, 8)}...</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="text-xl font-bold text-green-600">${amount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Payment Methods</h4>
          <div className="flex items-center space-x-4 mb-3">
            <span className="text-2xl">💳</span>
            <span className="text-gray-700">Credit/Debit Card</span>
          </div>
          <p className="text-sm text-gray-600">
            You will be redirected to Stripe secure payment page to complete your payment.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handlePayment}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold text-lg"
          >
            {isLoading ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
          </button>

          <button
            onClick={onCancel}
            disabled={isLoading}
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>

    
    </div>
  );
}