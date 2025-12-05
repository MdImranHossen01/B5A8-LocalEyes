/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface DashboardData {
  bookings: any[];
  tours: any[];
  stats: any;
}

interface AdminDashboardProps {
  data: DashboardData;
}

export function AdminDashboard({ data }: AdminDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'listings' | 'bookings'>('overview');

  // Mock data for admin (would come from API)
  const users = [
    { _id: '1', name: 'John Traveler', email: 'john@example.com', role: 'tourist', status: 'active', joined: '2024-01-15' },
    { _id: '2', name: 'Maria Guide', email: 'maria@example.com', role: 'guide', status: 'active', joined: '2024-01-10' },
    { _id: '3', name: 'Alex Tourist', email: 'alex@example.com', role: 'tourist', status: 'inactive', joined: '2024-01-05' },
  ];

  const allBookings = data.bookings || [];
  const allTours = data.tours || [];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage platform users, listings, and bookings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <span className="text-2xl">👥</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">124</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <span className="text-2xl">🗺️</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Listings</p>
              <p className="text-2xl font-bold text-gray-900">56</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg mr-4">
              <span className="text-2xl">📋</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Today&apos;s Bookings</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
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
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(12500)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'users', label: 'Users' },
            { id: 'listings', label: 'Listings' },
            { id: 'bookings', label: 'Bookings' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Users */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Recent Users</h2>
                <button
                  onClick={() => setActiveTab('users')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {users.slice(0, 5).map((user) => (
                  <div key={user._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <span className="text-gray-600 font-medium">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 text-sm">
                          {user.name}
                        </h3>
                        <p className="text-gray-600 text-xs">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'guide' ? 'bg-purple-100 text-purple-800' :
                        user.role === 'tourist' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {user.role}
                      </span>
                      <span className="text-gray-500 text-xs mt-1">
                        Joined {formatDate(user.joined)}
                      </span>
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
                  onClick={() => setActiveTab('bookings')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All
                </button>
              </div>

              {allBookings.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-3">📋</div>
                  <p className="text-gray-600">No recent bookings</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {allBookings.slice(0, 5).map((booking) => (
                    <div key={booking._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900 text-sm">
                          {booking.tour?.title}
                        </h3>
                        <p className="text-gray-600 text-xs">
                          {booking.tourist?.name} → {booking.guide?.name}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {formatDate(booking.date)}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-medium text-gray-900">
                          {formatCurrency(booking.totalAmount)}
                        </span>
                        <span className={`mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">User Management</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">User</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Role</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Joined</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-gray-600 font-medium">
                              {user.name.charAt(0)}
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {user.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === 'guide' ? 'bg-purple-100 text-purple-800' :
                          user.role === 'tourist' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {formatDate(user.joined)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-700 text-sm">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-700 text-sm">
                            {user.status === 'active' ? 'Disable' : 'Enable'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'listings' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Listing Management</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Tour</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Guide</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">City</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Price</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Created</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allTours.map((tour) => (
                    <tr key={tour._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="flex relative items-center space-x-3">
                          <Image
                            src={tour.images?.[0] || '/profile.jpg'}
                            alt={tour.title}
                            fill
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <span className="text-sm font-medium text-gray-900">
                            {tour.title}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {tour.guide?.name}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {tour.city}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">
                        ${tour.tourFee}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          tour.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {tour.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {formatDate(tour.createdAt)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => router.push(`/tours/${tour._id}`)}
                            className="text-blue-600 hover:text-blue-700 text-sm"
                          >
                            View
                          </button>
                          <button className="text-red-600 hover:text-red-700 text-sm">
                            {tour.isActive ? 'Deactivate' : 'Activate'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Booking Management</h2>
            
            {allBookings.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📋</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings yet</h3>
                <p className="text-gray-600">Platform bookings will appear here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Traveler</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Guide</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Tour</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Amount</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allBookings.map((booking) => (
                      <tr key={booking._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {booking._id.substring(0, 8)}...
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {booking.tourist?.name}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {booking.guide?.name}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {booking.tour?.title}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {formatDate(booking.date)}
                        </td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">
                          {formatCurrency(booking.totalAmount)}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button 
                            onClick={() => router.push(`/bookings/${booking._id}`)}
                            className="text-blue-600 hover:text-blue-700 text-sm"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Admin Quick Actions */}
      <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Admin Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => router.push('/admin/users')}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl mr-3">👥</span>
            <div className="text-left">
              <p className="font-medium text-gray-900">Manage Users</p>
              <p className="text-sm text-gray-600">View all users</p>
            </div>
          </button>

          <button
            onClick={() => router.push('/admin/listings')}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl mr-3">🗺️</span>
            <div className="text-left">
              <p className="font-medium text-gray-900">Manage Listings</p>
              <p className="text-sm text-gray-600">Review tours</p>
            </div>
          </button>

          <button
            onClick={() => router.push('/admin/reports')}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl mr-3">📊</span>
            <div className="text-left">
              <p className="font-medium text-gray-900">Reports</p>
              <p className="text-sm text-gray-600">Platform analytics</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}