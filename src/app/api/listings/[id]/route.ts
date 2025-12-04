import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Tour from '@/models/Tour';
import User from '@/models/User'; // Import User model

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    await dbConnect();
    
    // Await params first
    const { id } = await params;
    
    console.log('Fetching tour with ID:', id);

    if (!id) {
      return NextResponse.json(
        { error: 'Tour ID is required' },
        { status: 400 }
      );
    }

    const tour = await Tour.findById(id)
      .populate({
        path: 'guide',
        select: 'name email profilePic rating reviewsCount bio languages expertise',
        model: User // Explicitly specify the model
      })
      .lean();

    if (!tour) {
      return NextResponse.json(
        { error: 'Tour not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { tour },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching tour:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}