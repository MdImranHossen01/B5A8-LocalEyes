/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { stripe, webhookSecret } from '@/lib/stripe';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') || '';

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message);
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        const bookingId = paymentIntent.metadata.bookingId;

        // Update booking status
        await Booking.findByIdAndUpdate(bookingId, {
          paymentStatus: 'paid',
          status: 'confirmed',
        });

        console.log(`Payment succeeded for booking ${bookingId}`);
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object;
        const bookingId = paymentIntent.metadata.bookingId;

        // Update booking status
        await Booking.findByIdAndUpdate(bookingId, {
          paymentStatus: 'failed',
        });

        console.log(`Payment failed for booking ${bookingId}`);
        break;
      }

      case 'payment_intent.canceled': {
        const paymentIntent = event.data.object;
        const bookingId = paymentIntent.metadata.bookingId;

        // Update booking status
        await Booking.findByIdAndUpdate(bookingId, {
          paymentStatus: 'cancelled',
          status: 'cancelled',
        });

        console.log(`Payment canceled for booking ${bookingId}`);
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object;
        const paymentIntentId = charge.payment_intent;
        
        // Find booking by payment intent ID
        const booking = await Booking.findOne({ paymentIntentId });
        if (booking) {
          await Booking.findByIdAndUpdate(booking._id, {
            paymentStatus: 'refunded',
          });
          console.log(`Payment refunded for booking ${booking._id}`);
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}