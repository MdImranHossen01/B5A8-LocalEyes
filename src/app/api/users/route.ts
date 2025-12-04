/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

// GET all users with filtering
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role');
    const limit = searchParams.get('limit');
    const minRating = searchParams.get('minRating');
    
    const query: any = { isActive: true };

    // Filter by role
    if (role) {
      query.role = role;
    }

    // Filter by minimum rating
    if (minRating) {
      query.rating = { $gte: Number(minRating) };
    }

    // Build query
    let userQuery = User.find(query).select('-password');

    // Sort by rating (highest first)
    userQuery = userQuery.sort({ rating: -1, reviewsCount: -1 });

    // Apply limit if specified
    if (limit) {
      userQuery = userQuery.limit(Number(limit));
    }

    const users = await userQuery;

    return NextResponse.json({ users });
  } catch (error: any) {
    console.error('Get users error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error.message 
      },
      { status: 500 }
    );
  }
}