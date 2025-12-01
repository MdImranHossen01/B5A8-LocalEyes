import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';
import Tour from '@/models/Tour';
import User from '@/models/User';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const role = searchParams.get('role');

    if (!userId || !role) {
      return NextResponse.json(
        { error: 'User ID and role are required' },
        { status: 400 }
      );
    }

    let bookings = [];
    let tours = [];
    let stats = {};

    if (role === 'tourist') {
      // Fetch tourist bookings
      bookings = await Booking.find({ tourist: userId })
        .populate('guide', 'name profilePic')
        .populate('tour', 'title images')
        .sort({ createdAt: -1 });

      stats = {
        upcomingTrips: bookings.filter(b => b.status === 'confirmed').length,
        pastTrips: bookings.filter(b => b.status === 'completed').length,
        pendingRequests: bookings.filter(b => b.status === 'pending').length,
      };
    } else if (role === 'guide') {
      // Fetch guide bookings and tours
      [bookings, tours] = await Promise.all([
        Booking.find({ guide: userId })
          .populate('tourist', 'name profilePic')
          .populate('tour', 'title images')
          .sort({ createdAt: -1 }),
        Tour.find({ guide: userId })
          .populate('guide', 'name profilePic')
          .sort({ createdAt: -1 }),
      ]);

      const completedBookings = bookings.filter(b => 
        b.status === 'completed' && b.paymentStatus === 'paid'
      );

      stats = {
        upcomingTours: bookings.filter(b => b.status === 'confirmed').length,
        pendingRequests: bookings.filter(b => b.status === 'pending').length,
        activeListings: tours.filter(t => t.isActive).length,
        totalEarnings: completedBookings.reduce((sum, b) => sum + b.totalAmount, 0),
      };
    } else if (role === 'admin') {
      // Admin stats
      const [totalUsers, totalTours, totalBookings, completedBookings] = await Promise.all([
        User.countDocuments(),
        Tour.countDocuments({ isActive: true }),
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

    return NextResponse.json({ bookings, tours, stats });
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}