import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    
    // Await params first
    const { id } = await params;
    const { isActive } = await request.json();
    
    // Validate input
    if (typeof isActive !== 'boolean') {
      return NextResponse.json(
        { error: 'isActive must be a boolean' },
        { status: 400 }
      );
    }

    // Find and update user
    const user = await User.findByIdAndUpdate(
      id,  // Use the destructured id, not params.id
      { isActive },
      { new: true }
    ).select('-password');

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Log the action
    console.log(`Admin: User ${user._id} status changed to ${isActive ? 'active' : 'inactive'}`);

    return NextResponse.json({
      message: `User ${isActive ? 'activated' : 'deactivated'} successfully`,
      user,
    });
  } catch (error) {
    console.error('User status update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to check user status
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }  // Updated to Promise
) {
  try {
    await dbConnect();
    
    // Await params first
    const { id } = await params;
    
    const user = await User.findById(id)  // Use the destructured id
      .select('_id name email isActive role');

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Get user status error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}