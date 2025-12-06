/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';
import Tour from '@/models/Tour';
import User from '@/models/User';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(request: NextRequest) {
  try {
    // Get session for authentication
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    await dbConnect();
    
    const userId = (session.user as any).id;
    const role = (session.user as any).role || 'tourist';
    
    let bookings = [];
    let tours = [];
    let stats = {};

    // Fetch user-specific data based on role
    if (role === 'tourist') {
      bookings = await Booking.find({ touristId: userId })
        .sort({ createdAt: -1 })
        .limit(10)
        .populate('tourId', 'title image')
        .populate('guideId', 'name profilePic');
      
      stats = {
        upcomingTrips: bookings.filter(b => b.status === 'confirmed').length,
        pastTrips: bookings.filter(b => b.status === 'completed').length,
        pendingRequests: bookings.filter(b => b.status === 'pending').length,
      };
    } else if (role === 'guide') {
      [bookings, tours] = await Promise.all([
        Booking.find({ guideId: userId })
          .sort({ createdAt: -1 })
          .limit(10)
          .populate('touristId', 'name profilePic')
          .populate('tourId', 'title'),
        Tour.find({ guideId: userId, isActive: true })
          .sort({ createdAt: -1 })
          .limit(10),
      ]);

      const completedBookings = await Booking.find({ 
        guideId: userId, 
        status: 'completed',
        paymentStatus: 'paid'
      });

      stats = {
        upcomingTours: bookings.filter(b => b.status === 'confirmed').length,
        pendingRequests: bookings.filter(b => b.status === 'pending').length,
        activeListings: tours.filter(t => t.isActive).length,
        totalEarnings: completedBookings.reduce((sum, b) => sum + b.totalAmount, 0),
      };
    } else if (role === 'admin') {
      const [totalUsers, totalTours, totalBookings, completedBookings] = await Promise.all([
        User.countDocuments(),
        Tour.countDocuments(),
        Booking.countDocuments(),
        Booking.find({ status: 'completed', paymentStatus: 'paid' }),
      ]);

      stats = {
        totalUsers,
        totalTours,
        totalBookings,
        totalRevenue: completedBookings.reduce((sum, b) => sum + b.totalAmount, 0),
      };
    }

    return NextResponse.json({
      bookings: JSON.parse(JSON.stringify(bookings)),
      tours: JSON.parse(JSON.stringify(tours)),
      stats,
    });
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}