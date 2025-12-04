/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import mongoose from 'mongoose';

// GET single user by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    
    // Await params first
    const { id } = await params;
    
    console.log('API called with user ID:', id);
    console.log('Request URL:', request.url);
    
    // Check if id is provided
    if (!id || id === 'undefined' || id === 'null') {
      console.log('User ID is missing or undefined');
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log('Invalid user ID format:', id);
      return NextResponse.json(
        { error: 'Invalid user ID format' },
        { status: 400 }
      );
    }
    
    const user = await User.findById(id).select('-password');

    if (!user) {
      console.log('User not found for ID:', id);
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    console.log('User found:', user._id);
    return NextResponse.json({ user });
  } catch (error: any) {
    console.error('Get user error:', error);
    
    // Handle CastError specifically
    if (error.name === 'CastError') {
      return NextResponse.json(
        { 
          error: 'Invalid user ID format',
          details: 'The provided ID is not valid'
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error.message 
      },
      { status: 500 }
    );
  }
}