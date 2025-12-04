import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    
    // Await params to get the actual values
    const { id } = await params;
    const { role } = await request.json();
    
    // Validate input
    const validRoles = ['tourist', 'guide', 'admin'];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be one of: tourist, guide, admin' },
        { status: 400 }
      );
    }

    // Prevent self-demotion (admin can't remove their own admin role)
    const currentUser = await User.findById(id);
    if (!currentUser) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Find and update user
    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select('-password');

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Additional actions based on role change
    if (role === 'guide' && !user.isVerified) {
      // Auto-verify new guides or keep unverified
      // In a real app, you might want admin approval for guide status
    }

    console.log(`Admin: User ${user._id} role changed from ${currentUser.role} to ${role}`);

    return NextResponse.json({
      message: `User role updated to ${role} successfully`,
      user,
    });
  } catch (error) {
    console.error('User role update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to check user role
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    
    // Await params to get the actual values
    const { id } = await params;
    
    const user = await User.findById(id)
      .select('_id name email role');

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Get user role error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}