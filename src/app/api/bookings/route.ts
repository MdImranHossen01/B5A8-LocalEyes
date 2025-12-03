/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';

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
    
    const bookingData = await request.json();
    const booking = await Booking.create(bookingData);

    // Solution: Cast to any to avoid TypeScript errors
    const populatedBooking = await (booking as any).populate([
      { path: 'tourist', select: 'name profilePic' },
      { path: 'guide', select: 'name profilePic' },
      { path: 'tour', select: 'title images tourFee' }
    ]);

    return NextResponse.json({ booking: populatedBooking }, { status: 201 });
  } catch (error) {
    console.error('Create booking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}