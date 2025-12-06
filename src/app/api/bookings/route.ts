/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';
import Tour from '@/models/Tour';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const role = searchParams.get('role');

    let query = {};
    if (role === 'tourist') {
      query = { tourist: userId };
    } else if (role === 'guide') {
      query = { guide: userId };
    }

    const bookings = await Booking.find(query)
      .populate('tourist', 'name profilePic')
      .populate('guide', 'name profilePic')
      .populate('tour', 'title images tourFee')
      .sort({ createdAt: -1 });

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Get bookings error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    // Get session using getServerSession
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    
    // Validate required fields
    const requiredFields = ['tourist', 'guide', 'tour', 'date', 'numberOfPeople', 'totalAmount'];
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Check if tour exists and is active
    const tour = await Tour.findById(data.tour);
    if (!tour || !tour.isActive) {
      return NextResponse.json(
        { error: 'Tour is not available' },
        { status: 400 }
      );
    }

    // Check what status values are available in the Booking model
    console.log('Checking Booking model schema...');
    
    // Get the available status enum values from the schema
    const statusPath = Booking.schema.path('status');
    if (statusPath && statusPath.enumValues) {
      console.log('Available status values:', statusPath.enumValues);
    }

    // Try to create booking with the correct status
    const bookingData: any = {
      ...data,
      specialRequests: data.specialRequests || '',
      paymentStatus: 'pending',
    };

    // Check if 'pending_payment' is a valid status, otherwise use 'pending'
    const validStatus = statusPath?.enumValues?.includes('pending_payment') 
      ? 'pending_payment' 
      : 'pending';
    
    bookingData.status = validStatus;
    console.log(`Using status: ${validStatus}`);

    // Add additional fields if they exist in schema
    const schemaPaths = Object.keys(Booking.schema.paths);
    if (schemaPaths.includes('stripePaymentIntentId')) {
      bookingData.stripePaymentIntentId = '';
    }
    if (schemaPaths.includes('stripeCustomerId')) {
      bookingData.stripeCustomerId = '';
    }

    console.log('Creating booking with data:', {
      ...bookingData,
      date: bookingData.date,
      tourist: bookingData.tourist?.substring(0, 10) + '...',
      guide: bookingData.guide?.substring(0, 10) + '...',
      tour: bookingData.tour?.substring(0, 10) + '...',
    });

    const booking = await Booking.create(bookingData) as any;
    
    // Populate the booking
    const populatedBooking = await Booking.findById(booking._id)
      .populate('tourist', 'name email profilePic')
      .populate('guide', 'name email profilePic')
      .populate('tour', 'title images tourFee');

    console.log('Booking created successfully:', booking._id);

    return NextResponse.json({ 
      success: true,
      booking: populatedBooking,
      message: 'Booking created successfully. Please complete payment to confirm.'
    });
  } catch (error: any) {
    console.error('Error creating booking:', error);
    
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const errors: any = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: errors,
          message: 'Please check your booking details and try again.'
        },
        { status: 400 }
      );
    }
    
    // Handle duplicate key errors
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Duplicate booking detected' },
        { status: 400 }
      );
    }

    // Handle cast errors (invalid ObjectId)
    if (error.name === 'CastError') {
      return NextResponse.json(
        { error: `Invalid ${error.path}: ${error.value}` },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Failed to create booking',
        message: 'An unexpected error occurred. Please try again.'
      },
      { status: 500 }
    );
  }
}