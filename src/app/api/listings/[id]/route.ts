import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Tour from '@/models/Tour';



export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const tour = await Tour.findById(params.id)
      .populate('guide', 'name profilePic bio rating reviewsCount languages expertise isVerified');

    if (!tour) {
      return NextResponse.json(
        { error: 'Tour not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ tour });
  } catch (error) {
    console.error('Get tour error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}



export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const updates = await request.json();
    const tour = await Tour.findByIdAndUpdate(params.id, updates, { new: true })
      .populate('guide', 'name profilePic rating reviewsCount languages');

    if (!tour) {
      return NextResponse.json(
        { error: 'Tour not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ tour });
  } catch (error) {
    console.error('Update tour error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const tour = await Tour.findByIdAndDelete(params.id);

    if (!tour) {
      return NextResponse.json(
        { error: 'Tour not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Tour deleted successfully' });
  } catch (error) {
    console.error('Delete tour error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}