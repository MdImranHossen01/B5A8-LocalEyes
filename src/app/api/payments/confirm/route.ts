// src/app/api/payments/confirm/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { paymentIntentId } = await request.json();

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'Payment intent ID is required' },
        { status: 400 }
      );
    }

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Find booking by payment intent ID
    const booking = await Booking.findOne({
      stripePaymentIntentId: paymentIntentId,
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Update booking based on payment status
    if (paymentIntent.status === 'succeeded') {
      booking.status = 'confirmed';
      booking.paymentStatus = 'paid';
      booking.paymentDate = new Date();
      await booking.save();

      return NextResponse.json({
        success: true,
        booking: {
          _id: booking._id,
          status: booking.status,
          paymentStatus: booking.paymentStatus,
        },
      });
    } else {
      // Payment failed or requires action
      booking.paymentStatus = 'failed';
      await booking.save();

      return NextResponse.json(
        { error: `Payment ${paymentIntent.status}` },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error confirming payment:', error);
    return NextResponse.json(
      { error: 'Failed to confirm payment' },
      { status: 500 }
    );
  }
}