import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication FIRST
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    let decoded;
    
    try {
      decoded = verifyToken(token);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Check if user is admin
    if (decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    await dbConnect();
    
    // Await params first
    const { id } = await params;
    const { isVerified } = await request.json();
    
    // Validate input
    if (typeof isVerified !== 'boolean') {
      return NextResponse.json(
        { error: 'isVerified must be a boolean' },
        { status: 400 }
      );
    }

    // Find user
    const user = await User.findById(id);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Only guides need verification
    if (user.role !== 'guide') {
      return NextResponse.json(
        { error: 'Only guides can be verified' },
        { status: 400 }
      );
    }

    // Update verification status
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isVerified },
      { new: true }
    ).select('-password');

    console.log(`Admin: Guide ${user._id} verification status changed to ${isVerified ? 'verified' : 'unverified'}`);

    // Optional: Send notification email to guide
    if (isVerified) {
      console.log(`Guide ${user.email} has been verified`);
      // In a real app: sendEmail(user.email, 'Guide Verification', 'Your guide account has been verified!');
    }

    return NextResponse.json({
      message: `Guide ${isVerified ? 'verified' : 'unverified'} successfully`,
      user: updatedUser,
    });
  } catch (error) {
    console.error('User verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to check verification status
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    let decoded;
    
    try {
      decoded = verifyToken(token);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Check if user is admin
    if (decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    await dbConnect();
    
    // Await params first
    const { id } = await params;
    
    const user = await User.findById(id)
      .select('_id name email role isVerified');

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Get user verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST endpoint for bulk verification
export async function POST(request: NextRequest) {
  try {
    // Check authentication FIRST
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    let decoded;
    
    try {
      decoded = verifyToken(token);
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Check if user is admin
    if (decoded.role !== 'admin') {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }

    await dbConnect();
    
    const { userIds, isVerified } = await request.json();
    
    // Validate input
    if (!Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json(
        { error: 'userIds must be a non-empty array' },
        { status: 400 }
      );
    }
    
    if (typeof isVerified !== 'boolean') {
      return NextResponse.json(
        { error: 'isVerified must be a boolean' },
        { status: 400 }
      );
    }

    // Bulk update verification status for guides only
    const result = await User.updateMany(
      {
        _id: { $in: userIds },
        role: 'guide', // Only update guides
      },
      { isVerified }
    );

    console.log(`Admin: Bulk verification - ${result.modifiedCount} guides ${isVerified ? 'verified' : 'unverified'}`);

    return NextResponse.json({
      message: `${result.modifiedCount} guides ${isVerified ? 'verified' : 'unverified'} successfully`,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error('Bulk verification error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}