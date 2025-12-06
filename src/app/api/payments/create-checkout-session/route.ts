// src/app/api/payments/create-checkout-session/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

export async function POST(request: NextRequest) {
  try {
    const { paymentIntentId, bookingId, amount, userEmail, returnUrl } = await request.json();

    if (!paymentIntentId || !bookingId || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_intent_data: {
        capture_method: 'automatic',
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Booking #${bookingId.substring(0, 8)}`,
              description: 'Tour Booking Payment',
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${returnUrl || `${process.env.NEXT_PUBLIC_APP_URL}/bookings/${bookingId}?payment=success`}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/tours?payment=cancelled`,
      customer_email: userEmail,
      metadata: {
        bookingId,
        paymentIntentId,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}