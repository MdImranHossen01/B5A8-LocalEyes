import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Tour from '@/models/Tour';
import Booking from '@/models/Booking';
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
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

    // Connect to database
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
      newUsersToday,
      newUsersThisWeek,
      newUsersThisMonth,
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
        .select('name email role createdAt profilePic isActive isVerified'),
      // New users today
      User.countDocuments({
        createdAt: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          $lt: new Date(new Date().setHours(23, 59, 59, 999))
        }
      }),
      // New users this week
      User.countDocuments({
        createdAt: {
          $gte: new Date(new Date().setDate(new Date().getDate() - 7))
        }
      }),
      // New users this month
      User.countDocuments({
        createdAt: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        }
      }),
    ]);

    // Calculate total revenue
    const totalRevenue = completedBookings.reduce((sum, booking) => sum + booking.totalAmount, 0);

    // Get pending verifications (guides not verified)
    const pendingVerifications = await User.countDocuments({ 
      role: 'guide', 
      isVerified: false 
    });

    // Get recent bookings
    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('tourist', 'name email')
      .populate('guide', 'name email')
      .populate('tour', 'title')
      .select('tourist guide tour totalAmount status createdAt');

    // Get user growth data for chart
    const userGrowth = await User.aggregate([
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 12 },
    ]);

    // Get booking revenue by month
    const revenueByMonth = await Booking.aggregate([
      {
        $match: {
          status: 'completed',
          paymentStatus: 'paid',
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          revenue: { $sum: '$totalAmount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': -1, '_id.month': -1 } },
      { $limit: 6 },
    ]);

    // Format recent signups with more details
    const formattedRecentSignups = recentSignups.map(user => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      profilePic: user.profilePic,
      status: user.isActive ? 'active' : 'inactive',
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      timeAgo: getTimeAgo(user.createdAt),
    }));

    // Format recent bookings
    const formattedRecentBookings = recentBookings.map(booking => ({
      id: booking._id.toString(),
      touristName: booking.tourist?.name || 'Unknown',
      guideName: booking.guide?.name || 'Unknown',
      tourTitle: booking.tour?.title || 'Unknown Tour',
      amount: booking.totalAmount,
      status: booking.status,
      date: booking.createdAt,
      timeAgo: getTimeAgo(booking.createdAt),
    }));

    const stats = {
      // User stats
      totalUsers,
      totalGuides,
      totalTourists,
      newUsersToday,
      newUsersThisWeek,
      newUsersThisMonth,
      pendingVerifications,
      
      // Tour stats
      totalTours,
      activeTours,
      inactiveTours: totalTours - activeTours,
      
      // Booking stats
      totalBookings,
      completedBookings: completedBookings.length,
      totalRevenue,
      averageBookingValue: completedBookings.length > 0 
        ? Math.round(totalRevenue / completedBookings.length) 
        : 0,
      
      // Recent activity
      recentSignups: formattedRecentSignups,
      recentBookings: formattedRecentBookings,
      
      // Charts data
      userGrowth: userGrowth.reverse().map(item => ({
        month: `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`,
        count: item.count,
      })),
      
      revenueByMonth: revenueByMonth.reverse().map(item => ({
        month: `${item._id.year}-${item._id.month.toString().padStart(2, '0')}`,
        revenue: item.revenue,
        count: item.count,
      })),
      
      // Platform health
      platformHealth: {
        userGrowthRate: calculateGrowthRate(newUsersThisWeek, newUsersThisMonth),
        bookingCompletionRate: totalBookings > 0 
          ? Math.round((completedBookings.length / totalBookings) * 100) 
          : 0,
        tourActivationRate: totalTours > 0 
          ? Math.round((activeTours / totalTours) * 100) 
          : 0,
      },
    };

    // Log admin access
    console.log(`Admin stats accessed by ${decoded.email} (${decoded.userId})`);

    return NextResponse.json({ 
      stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to calculate time ago
function getTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - new Date(date).getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return `${Math.floor(diffInSeconds / 604800)}w ago`;
}

// Helper function to calculate growth rate
function calculateGrowthRate(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

// POST endpoint for custom date range stats (optional)
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

    const { startDate, endDate } = await request.json();
    
    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'startDate and endDate are required' },
        { status: 400 }
      );
    }

    await dbConnect();

    const start = new Date(startDate);
    const end = new Date(endDate);

    // Fetch stats for custom date range
    const [
      usersInRange,
      toursInRange,
      bookingsInRange,
      revenueInRange,
    ] = await Promise.all([
      User.countDocuments({
        createdAt: { $gte: start, $lte: end }
      }),
      Tour.countDocuments({
        createdAt: { $gte: start, $lte: end }
      }),
      Booking.countDocuments({
        createdAt: { $gte: start, $lte: end }
      }),
      Booking.aggregate([
        {
          $match: {
            createdAt: { $gte: start, $lte: end },
            status: 'completed',
            paymentStatus: 'paid',
          }
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$totalAmount' },
            count: { $sum: 1 },
          }
        }
      ]),
    ]);

    const customStats = {
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      users: usersInRange,
      tours: toursInRange,
      bookings: bookingsInRange,
      revenue: revenueInRange.length > 0 ? revenueInRange[0].total : 0,
      bookingsCount: revenueInRange.length > 0 ? revenueInRange[0].count : 0,
    };

    return NextResponse.json({ 
      stats: customStats,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Custom admin stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}