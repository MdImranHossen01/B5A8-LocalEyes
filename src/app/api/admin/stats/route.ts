import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Tour from '@/models/Tour';
import Booking from '@/models/Booking';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Fetch all stats in parallel
    const [
      totalUsers,
      totalGuides,
      totalTourists,
      totalTours,
      activeTours,
      totalBookings,
      completedBookings,
      recentSignups,
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'guide' }),
      User.countDocuments({ role: 'tourist' }),
      Tour.countDocuments(),
      Tour.countDocuments({ isActive: true }),
      Booking.countDocuments(),
      Booking.find({ status: 'completed', paymentStatus: 'paid' }),
      User.find()
        .sort({ createdAt: -1 })
        .limit(10)
        .select('name email role createdAt'),
    ]);

    // Calculate total revenue
    const totalRevenue = completedBookings.reduce((sum, booking) => sum + booking.totalAmount, 0);

    // Get pending verifications (guides not verified)
    const pendingVerifications = await User.countDocuments({ 
      role: 'guide', 
      isVerified: false 
    });

    const stats = {
      totalUsers,
      totalGuides,
      totalTourists,
      totalTours,
      activeTours,
      totalBookings,
      totalRevenue,
      pendingVerifications,
      recentSignups: recentSignups.map(user => ({
        userName: user.name,
        userEmail: user.email,
        type: 'user_signup',
        details: `${user.role} signed up`,
        createdAt: user.createdAt,
        status: 'active',
      })),
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}