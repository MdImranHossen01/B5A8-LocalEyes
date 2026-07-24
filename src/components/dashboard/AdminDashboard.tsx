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

  const getFirstDayOfCurrentMonth = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const offset = firstDay.getTimezoneOffset();
    const localFirstDay = new Date(firstDay.getTime() - (offset * 60 * 1000));
    return localFirstDay.toISOString().split('T')[0];
  };

  const getLastDayOfCurrentMonth = () => {
    const now = new Date();
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const offset = lastDay.getTimezoneOffset();
    const localLastDay = new Date(lastDay.getTime() - (offset * 60 * 1000));
    return localLastDay.toISOString().split('T')[0];
  };

  const [startDate, setStartDate] = useState(getFirstDayOfCurrentMonth());
  const [endDate, setEndDate] = useState(getLastDayOfCurrentMonth());

  // Mock data for admin (would come from API)
  const users = [
    { _id: '1', name: 'John Traveler', email: 'john@example.com', role: 'user', status: 'active', joined: '2024-01-15' },
    { _id: '2', name: 'Maria Host', email: 'maria@example.com', role: 'user', status: 'active', joined: '2024-01-10' },
    { _id: '3', name: 'Alex User', email: 'alex@example.com', role: 'user', status: 'inactive', joined: '2024-01-05' },
  ];

  const allBookings = data.bookings || [];
  const allTours = data.tours || [];

  const filteredBookings = allBookings.filter(booking => {
    if (!booking.date) return false;
    const bookingDateStr = booking.date.split('T')[0];
    return bookingDateStr >= startDate && bookingDateStr <= endDate;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage platform users, listings, and bookings</p>
        </div>

        {/* Date Range Filter UI */}
        <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs">
          <div className="flex items-center gap-2">
            <label htmlFor="admin-start-date" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">From:</label>
            <input
              id="admin-start-date"
              type="date"
              value={startDate}
              onChange={(e) => {
                const val = e.target.value;
                if (!endDate || val <= endDate) {
                  setStartDate(val);
                }
              }}
              className="text-sm border border-gray-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-800"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="admin-end-date" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">To:</label>
            <input
              id="admin-end-date"
              type="date"
              value={endDate}
              onChange={(e) => {
                const val = e.target.value;
                if (!startDate || val >= startDate) {
                  setEndDate(val);
                }
              }}
              className="text-sm border border-gray-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-800"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <span className="text-2xl">👥</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{data.stats?.totalUsers || 124}</p>
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
              <p className="text-2xl font-bold text-gray-900">{data.stats?.totalTours || 56}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg mr-4">
              <span className="text-2xl">📋</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Bookings in Range</p>
              <p className="text-2xl font-bold text-gray-900">{filteredBookings.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
              activeTab === 'users'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
              activeTab === 'listings'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Listings
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
              activeTab === 'bookings'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Bookings
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mb-8">
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
                {users.map((user) => (
                  <div key={user._id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-semibold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 text-sm">{user.name}</h3>
                        <p className="text-gray-500 text-xs">{user.email}</p>
                      </div>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
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

              {filteredBookings.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-3">📋</div>
                  <p className="text-gray-600">No bookings in selected range</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredBookings.slice(0, 5).map((booking) => (
                    <div key={booking._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900 text-sm">
                          {booking.tour?.title || 'Tour'}
                        </h3>
                        <p className="text-gray-600 text-xs">
                          {booking.tourist?.name || booking.name || 'Traveler'} → {booking.guide?.name || 'Host'}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {booking.date ? formatDate(booking.date) : 'Date not set'}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-medium text-gray-900">
                          {formatCurrency(booking.totalAmount || 0)}
                        </span>
                        <span className={`mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {booking.status || 'pending'}
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
                          user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                          user.role === 'guide' ? 'bg-indigo-100 text-indigo-800' :
                          user.role === 'tourist' || user.role === 'user' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
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
                        <div className="flex items-center space-x-3">
                          <div className="relative w-10 h-10">
                            <Image
                              src={tour.images?.[0] || '/profile.jpg'}
                              alt={tour.title || 'Tour'}
                              fill
                              className="rounded-lg object-cover"
                              sizes="40px"
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {tour.title || 'Untitled Tour'}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {tour.guide?.name || 'Unknown Guide'}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {tour.city || 'Unknown'}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900">
                        ${tour.tourFee || 0}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          tour.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {tour.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {tour.createdAt ? formatDate(tour.createdAt) : 'Unknown'}
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
            
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📋</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings yet</h3>
                <p className="text-gray-600">Platform bookings in this range will appear here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Traveler</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Host</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Tour</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Amount</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking) => (
                      <tr key={booking._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {booking._id ? booking._id.substring(0, 8) + '...' : 'N/A'}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {booking.tourist?.name || booking.name || 'Traveler'}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {booking.guide?.name || 'Host'}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {booking.tour?.title || 'Tour'}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {booking.date ? formatDate(booking.date) : 'Date not set'}
                        </td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">
                          {formatCurrency(booking.totalAmount || 0)}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {booking.status || 'pending'}
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
    </div>
  );
}