import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Tour from '@/models/Tour';
import User from '@/models/User';

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
        model: User
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

// Add DELETE method for admin to delete listings
export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    await dbConnect();
    
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Tour ID is required' },
        { status: 400 }
      );
    }

    // You might want to add admin check here using session
    // For now, we'll just delete the tour
    
    const deletedTour = await Tour.findByIdAndDelete(id);

    if (!deletedTour) {
      return NextResponse.json(
        { error: 'Tour not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Tour deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting tour:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Add PATCH method for updating listing status
export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    await dbConnect();
    
    const { id } = await params;
    const body = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Tour ID is required' },
        { status: 400 }
      );
    }

    // You might want to add admin check here using session
    // For now, we'll just update the tour
    
    const updatedTour = await Tour.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedTour) {
      return NextResponse.json(
        { error: 'Tour not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { tour: updatedTour, message: 'Tour updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating tour:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}