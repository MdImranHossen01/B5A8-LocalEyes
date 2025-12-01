import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const { status } = await request.json();
    
    const booking = await Booking.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    )
      .populate('tourist', 'name profilePic')
      .populate('guide', 'name profilePic')
      .populate('tour', 'title images tourFee');

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ booking });
  } catch (error) {
    console.error('Update booking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}