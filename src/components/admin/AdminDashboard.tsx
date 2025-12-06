/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { useAuth } from '@/context/AuthContext'; // Import useAuth

interface PlatformStats {
  totalUsers: number;
  totalGuides: number;
  totalTourists: number;
  newUsersToday: number;
  newUsersThisWeek: number;
  newUsersThisMonth: number;
  totalTours: number;
  activeTours: number;
  inactiveTours: number;
  totalBookings: number;
  completedBookings: number;
  totalRevenue: number;
  averageBookingValue: number;
  pendingVerifications: number;
  recentSignups: any[];
  recentBookings: any[];
  userGrowth: { month: string; count: number }[];
  revenueByMonth: { month: string; revenue: number; count: number }[];
  platformHealth: {
    userGrowthRate: number;
    bookingCompletionRate: number;
    tourActivationRate: number;
  };
}

export function AdminDashboard() {
  const { isLoading } = useProtectedRoute('admin');
  const { token } = useAuth(); // Get token from auth context
  const [stats, setStats] = useState<PlatformStats>({
    totalUsers: 0,
    totalGuides: 0,
    totalTourists: 0,
    newUsersToday: 0,
    newUsersThisWeek: 0,
    newUsersThisMonth: 0,
    totalTours: 0,
    activeTours: 0,
    inactiveTours: 0,
    totalBookings: 0,
    completedBookings: 0,
    totalRevenue: 0,
    averageBookingValue: 0,
    pendingVerifications: 0,
    recentSignups: [],
    recentBookings: [],
    userGrowth: [],
    revenueByMonth: [],
    platformHealth: {
      userGrowthRate: 0,
      bookingCompletionRate: 0,
      tourActivationRate: 0,
    },
  });
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [timeRange, setTimeRange] = useState<'today' | 'week' | 'month' | 'year'>('week');

  useEffect(() => {
    if (token) {
      fetchAdminStats();
    }
  }, [token, timeRange]);

  const fetchAdminStats = async () => {
    if (!token) {
      console.error('No token available for admin stats');
      setIsLoadingData(false);
      return;
    }

    setIsLoadingData(true);
    try {
      const response = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`, // ADD AUTHORIZATION HEADER
          'Content-Type': 'application/json',
        },
      });
      
      if (response.status === 401) {
        console.error('Authentication failed for admin stats');
        return;
      }
      
      const data = await response.json();
      
      if (response.ok) {
        setStats(data.stats);
      } else {
        console.error('Error fetching admin stats:', data.error);
      }
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatCompactNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 70) return 'text-green-600';
    if (percentage >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading || isLoadingData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-300 h-32 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Platform administration and management</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              <button
                onClick={fetchAdminStats}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <span className="text-2xl">👥</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{formatCompactNumber(stats.totalUsers)}</p>
                <p className="text-xs text-green-600 mt-1">
                  +{stats.newUsersToday} today
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-lg mr-4">
                <span className="text-2xl">🗺️</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Tours</p>
                <p className="text-2xl font-bold text-gray-900">{formatCompactNumber(stats.activeTours)}</p>
                <p className={`text-xs ${getPercentageColor(stats.platformHealth.tourActivationRate)} mt-1`}>
                  {stats.platformHealth.tourActivationRate}% active
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                <span className="text-2xl">📋</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{formatCompactNumber(stats.totalBookings)}</p>
                <p className={`text-xs ${getPercentageColor(stats.platformHealth.bookingCompletionRate)} mt-1`}>
                  {stats.platformHealth.bookingCompletionRate}% completed
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-lg mr-4">
                <span className="text-2xl">💰</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(stats.totalRevenue)}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  Avg: {formatCurrency(stats.averageBookingValue)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* User Statistics */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Statistics</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Guides</p>
                  <p className="text-xl font-bold text-gray-900">{stats.totalGuides}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Tourists</p>
                  <p className="text-xl font-bold text-gray-900">{stats.totalTourists}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Pending Verifications</span>
                  <span className="font-semibold text-yellow-600">{stats.pendingVerifications}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">New This Week</span>
                  <span className="font-semibold text-green-600">+{stats.newUsersThisWeek}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Growth Rate</span>
                  <span className={`font-semibold ${stats.platformHealth.userGrowthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {stats.platformHealth.userGrowthRate}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tour Statistics */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tour Statistics</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total Tours</p>
                  <p className="text-xl font-bold text-gray-900">{stats.totalTours}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Active</p>
                  <p className="text-xl font-bold text-green-600">{stats.activeTours}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Inactive</span>
                  <span className="font-semibold">{stats.inactiveTours}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Activation Rate</span>
                  <span className={`font-semibold ${getPercentageColor(stats.platformHealth.tourActivationRate)}`}>
                    {stats.platformHealth.tourActivationRate}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Statistics */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Statistics</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Total</p>
                  <p className="text-xl font-bold text-gray-900">{stats.totalBookings}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-xl font-bold text-green-600">{stats.completedBookings}</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Revenue</span>
                  <span className="font-semibold">{formatCurrency(stats.totalRevenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg. Booking Value</span>
                  <span className="font-semibold">{formatCurrency(stats.averageBookingValue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Completion Rate</span>
                  <span className={`font-semibold ${getPercentageColor(stats.platformHealth.bookingCompletionRate)}`}>
                    {stats.platformHealth.bookingCompletionRate}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Recent Signups */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Signups</h2>
              <button
                onClick={() => window.location.href = '/admin/users'}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View all
              </button>
            </div>
            <div className="space-y-4">
              {stats.recentSignups.slice(0, 5).map((user, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      {user.profilePic ? (
                        <img
                          src={user.profilePic}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <span className="text-gray-600">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      user.role === 'guide' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'admin' ? 'bg-red-100 text-red-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{user.timeAgo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
              <button
                onClick={() => window.location.href = '/admin/bookings'}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View all
              </button>
            </div>
            <div className="space-y-4">
              {stats.recentBookings.slice(0, 5).map((booking, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{booking.tourTitle}</p>
                    <p className="text-sm text-gray-600">
                      {booking.touristName} → {booking.guideName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{formatCurrency(booking.amount)}</p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{booking.timeAgo}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Admin Quick Actions */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => window.location.href = '/admin/users'}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow text-left hover:border-blue-500"
            >
              <div className="text-3xl mb-3 text-blue-600">👥</div>
              <h3 className="font-semibold text-gray-900 mb-2">User Management</h3>
              <p className="text-sm text-gray-600">Manage all platform users</p>
              <div className="mt-3 text-xs text-gray-500">
                {stats.totalUsers} total users
              </div>
            </button>

            <button
              onClick={() => window.location.href = '/listings'}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow text-left hover:border-green-500"
            >
              <div className="text-3xl mb-3 text-green-600">🗺️</div>
              <h3 className="font-semibold text-gray-900 mb-2">Tour Management</h3>
              <p className="text-sm text-gray-600">Review tour listings</p>
              <div className="mt-3 text-xs text-gray-500">
                {stats.activeTours} active tours
              </div>
            </button>

            <button
              onClick={() => window.location.href = '/admin/users?role=guide&status=active'}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow text-left hover:border-yellow-500"
            >
              <div className="text-3xl mb-3 text-yellow-600">✅</div>
              <h3 className="font-semibold text-gray-900 mb-2">Guide Verifications</h3>
              <p className="text-sm text-gray-600">Verify guide accounts</p>
              <div className="mt-3 text-xs text-gray-500">
                {stats.pendingVerifications} pending
              </div>
            </button>

            <button
              onClick={() => window.location.href = '/admin/reports'}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow text-left hover:border-purple-500"
            >
              <div className="text-3xl mb-3 text-purple-600">📊</div>
              <h3 className="font-semibold text-gray-900 mb-2">Analytics & Reports</h3>
              <p className="text-sm text-gray-600">View detailed reports</p>
              <div className="mt-3 text-xs text-gray-500">
                {formatCurrency(stats.totalRevenue)} revenue
              </div>
            </button>
          </div>
        </div>

        {/* Health Status */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Platform Health</h3>
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Overall Status</p>
                <p className={`text-2xl font-bold ${getPercentageColor(stats.platformHealth.bookingCompletionRate)}`}>
                  {stats.platformHealth.bookingCompletionRate >= 70 ? 'Healthy' :
                   stats.platformHealth.bookingCompletionRate >= 40 ? 'Stable' : 'Needs Attention'}
                </p>
              </div>
              <div className="text-4xl">
                {stats.platformHealth.bookingCompletionRate >= 70 ? '✅' :
                 stats.platformHealth.bookingCompletionRate >= 40 ? '⚠️' : '❌'}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2">User Growth</h3>
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-600">This Week</p>
                <p className={`text-2xl font-bold ${stats.platformHealth.userGrowthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stats.platformHealth.userGrowthRate}%
                </p>
              </div>
              <div className="text-4xl">
                {stats.platformHealth.userGrowthRate >= 0 ? '📈' : '📉'}
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Revenue Trend</h3>
            <div className="flex items-center">
              <div className="flex-1">
                <p className="text-sm text-gray-600">Latest Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.revenueByMonth.length > 0 ? formatCurrency(stats.revenueByMonth[stats.revenueByMonth.length - 1]?.revenue || 0) : '$0'}
                </p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}