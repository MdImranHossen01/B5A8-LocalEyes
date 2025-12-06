// src/app/api/payments/create-intent/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover', // Use latest stable version
});

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const { bookingId, userId, userEmail, userName } = await request.json();

    if (!bookingId || !userId || !userEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get booking details
    const booking = await Booking.findById(bookingId)
      .populate('tour', 'title')
      .populate('tourist', 'email name');

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Create or retrieve Stripe customer
    let customerId = booking.stripeCustomerId;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: userEmail,
        name: userName,
        metadata: {
          userId: userId,
          bookingId: bookingId,
        },
      });
      customerId = customer.id;
      
      // Save customer ID to booking
      booking.stripeCustomerId = customerId;
      await booking.save();
    }

    // Create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(booking.totalAmount * 100), // Convert to cents
      currency: 'usd',
      customer: customerId,
      metadata: {
        bookingId: bookingId,
        userId: userId,
        tourId: booking.tour?._id?.toString(),
        guideId: booking.guide?.toString(),
      },
      description: `Booking for ${booking.tour?.title || 'Tour'}`,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Save payment intent ID to booking
    booking.stripePaymentIntentId = paymentIntent.id;
    await booking.save();

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}