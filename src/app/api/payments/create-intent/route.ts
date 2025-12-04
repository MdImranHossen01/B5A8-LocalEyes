/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { formatAmountForStripe } from '@/lib/stripe';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { bookingId, userId, userEmail, userName } = await request.json();

    // Validate booking exists and belongs to user
    const booking = await Booking.findOne({
      _id: bookingId,
      tourist: userId,
      status: 'confirmed',
      paymentStatus: 'pending',
    }).populate('tour', 'title');

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found or already paid' },
        { status: 404 }
      );
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: formatAmountForStripe(booking.totalAmount),
      currency: 'usd',
      metadata: {
        bookingId: booking._id.toString(),
        userId: userId,
        tourId: booking.tour._id.toString(),
        guideId: booking.guide.toString(),
      },
      description: `Booking for ${booking.tour.title}`,
      receipt_email: userEmail,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Update booking with payment intent ID
    await Booking.findByIdAndUpdate(bookingId, {
      paymentIntentId: paymentIntent.id,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: booking.totalAmount,
    });
  } catch (error: any) {
    console.error('Payment intent creation error:', error);
    
    if (error.type === 'StripeInvalidRequestError') {
      return NextResponse.json(
        { error: 'Invalid payment request' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}