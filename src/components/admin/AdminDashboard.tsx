/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';

interface PlatformStats {
  totalUsers: number;
  totalGuides: number;
  totalTourists: number;
  totalTours: number;
  activeTours: number;
  totalBookings: number;
  totalRevenue: number;
  pendingVerifications: number;
  recentSignups: any[];
}

export function AdminDashboard() {
  const { isLoading } = useProtectedRoute('admin');
  const [stats, setStats] = useState<PlatformStats>({
    totalUsers: 0,
    totalGuides: 0,
    totalTourists: 0,
    totalTours: 0,
    activeTours: 0,
    totalBookings: 0,
    totalRevenue: 0,
    pendingVerifications: 0,
    recentSignups: [],
  });
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'tours' | 'bookings' | 'reports'>('overview');

  useEffect(() => {
    fetchAdminStats();
  }, []);

  const fetchAdminStats = async () => {
    setIsLoadingData(true);
    try {
      const response = await fetch('/api/admin/stats');
      const data = await response.json();
      
      if (response.ok) {
        setStats(data.stats);
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
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
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
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Platform administration and management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg mr-4">
                <span className="text-2xl">👥</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
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
                <p className="text-2xl font-bold text-gray-900">{stats.activeTours}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                <span className="text-2xl">📋</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
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
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Guides</span>
                <span className="font-semibold">{stats.totalGuides}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tourists</span>
                <span className="font-semibold">{stats.totalTourists}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pending Verifications</span>
                <span className="font-semibold text-yellow-600">{stats.pendingVerifications}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tour Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Tours</span>
                <span className="font-semibold">{stats.totalTours}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Active Tours</span>
                <span className="font-semibold text-green-600">{stats.activeTours}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Inactive Tours</span>
                <span className="font-semibold">{stats.totalTours - stats.activeTours}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Revenue</span>
                <span className="font-semibold">{formatCurrency(stats.totalRevenue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg. Booking Value</span>
                <span className="font-semibold">
                  {formatCurrency(stats.totalBookings > 0 ? stats.totalRevenue / stats.totalBookings : 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Conversion Rate</span>
                <span className="font-semibold">
                  {stats.totalTours > 0 ? ((stats.totalBookings / stats.totalTours) * 100).toFixed(1) : '0'}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">User</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Details</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentSignups.slice(0, 5).map((activity, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        activity.type === 'user_signup' ? 'bg-blue-100 text-blue-800' :
                        activity.type === 'tour_created' ? 'bg-green-100 text-green-800' :
                        activity.type === 'booking_created' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {activity.type.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900">
                      {activity.userName}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {activity.details}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {formatDate(activity.createdAt)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        activity.status === 'active' ? 'bg-green-100 text-green-800' :
                        activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Admin Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => window.location.href = '/admin/users'}
            className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow text-left"
          >
            <div className="text-3xl mb-3">👥</div>
            <h3 className="font-semibold text-gray-900 mb-2">User Management</h3>
            <p className="text-sm text-gray-600">Manage platform users and permissions</p>
          </button>

          <button
            onClick={() => window.location.href = '/admin/tours'}
            className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow text-left"
          >
            <div className="text-3xl mb-3">🗺️</div>
            <h3 className="font-semibold text-gray-900 mb-2">Tour Moderation</h3>
            <p className="text-sm text-gray-600">Review and moderate tour listings</p>
          </button>

          <button
            onClick={() => window.location.href = '/admin/verifications'}
            className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow text-left"
          >
            <div className="text-3xl mb-3">✅</div>
            <h3 className="font-semibold text-gray-900 mb-2">Verifications</h3>
            <p className="text-sm text-gray-600">Verify guides and tour listings</p>
          </button>

          <button
            onClick={() => window.location.href = '/admin/reports'}
            className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow text-left"
          >
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-semibold text-gray-900 mb-2">Reports</h3>
            <p className="text-sm text-gray-600">View platform analytics and reports</p>
          </button>
        </div>
      </main>

    
    </div>
  );
}