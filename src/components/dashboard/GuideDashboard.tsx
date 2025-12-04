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

interface GuideDashboardProps {
  data: DashboardData;
}

export function GuideDashboard({ data }: GuideDashboardProps) {
  const router = useRouter();
  const { bookings, tours, stats } = data;
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'listings'>('overview');

  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const upcomingBookings = bookings.filter(b => b.status === 'confirmed');
  const activeTours = tours.filter(t => t.isActive);

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
        <h1 className="text-3xl font-bold text-gray-900">Guide Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your tours and bookings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <span className="text-2xl">📅</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Upcoming Tours</p>
              <p className="text-2xl font-bold text-gray-900">{stats.upcomingTours || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg mr-4">
              <span className="text-2xl">⏳</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending Requests</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pendingRequests || 0}</p>
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
              <p className="text-2xl font-bold text-gray-900">{stats.activeListings || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <span className="text-2xl">💰</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(stats.totalEarnings || 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'bookings', label: `Bookings (${bookings.length})` },
            { id: 'listings', label: `My Listings (${tours.length})` },
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
            {/* Pending Requests */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Pending Requests</h2>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                  {pendingBookings.length} pending
                </span>
              </div>

              {pendingBookings.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-3">📝</div>
                  <p className="text-gray-600">No pending booking requests</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingBookings.slice(0, 5).map((booking) => (
                    <div
                      key={booking._id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => router.push(`/bookings/${booking._id}`)}
                    >
                      <div className="flex items-center space-x-3">
                        <Image
                          src={booking.tourist?.profilePic || '/profile.jpg'}
                          alt={booking.tourist?.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900 text-sm">
                            {booking.tourist?.name}
                          </h3>
                          <p className="text-gray-600 text-xs">
                            {booking.tour?.title}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {formatDate(booking.date)}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle accept booking
                          }}
                          className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700"
                        >
                          Accept
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle decline booking
                          }}
                          className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Upcoming Tours */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Upcoming Tours</h2>
                <button
                  onClick={() => router.push('/dashboard/bookings')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All
                </button>
              </div>

              {upcomingBookings.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-3">🗓️</div>
                  <p className="text-gray-600 mb-4">No upcoming tours</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingBookings.slice(0, 5).map((booking) => (
                    <div
                      key={booking._id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                      onClick={() => router.push(`/bookings/${booking._id}`)}
                    >
                      <div className="flex items-center space-x-3">
                        <Image
                          src={booking.tourist?.profilePic || '/profile.jpg'}
                          alt={booking.tourist?.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900 text-sm">
                            {booking.tourist?.name}
                          </h3>
                          <p className="text-gray-600 text-xs">
                            {booking.tour?.title}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {formatDate(booking.date)}
                          </p>
                        </div>
                      </div>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        Confirmed
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">All Bookings</h2>
            
            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📋</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings yet</h3>
                <p className="text-gray-600 mb-6">When travelers book your tours, they&apos;ll appear here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Traveler</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Tour</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Amount</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking._id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <Image
                              src={booking.tourist?.profilePic || '/profile.jpg'}
                              alt={booking.tourist?.name}
                              width={40}
                              height={40}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <span className="text-sm font-medium text-gray-900">
                              {booking.tourist?.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-900">
                          {booking.tour?.title}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          {formatDate(booking.date)}
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
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">
                          {formatCurrency(booking.totalAmount)}
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => router.push(`/bookings/${booking._id}`)}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
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

        {activeTab === 'listings' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">My Tour Listings</h2>
              <button
                onClick={() => router.push('/dashboard/listings/new')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create New Tour
              </button>
            </div>

            {activeTours.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                <div className="text-gray-400 text-6xl mb-4">🗺️</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No tours yet</h3>
                <p className="text-gray-600 mb-6">Create your first tour to start sharing your local expertise.</p>
                <button
                  onClick={() => router.push('/dashboard/listings/new')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Create Your First Tour
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeTours.map((tour) => (
                  <div
                    key={tour._id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover cursor-pointer"
                    onClick={() => router.push(`/tours/${tour._id}`)}
                  >
                    <div className="relative h-40">
                      <Image
                        src={tour.images?.[0] || '/profile.jpg'}
                        alt={tour.title}
                        width={400}
                        height={160}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-sm font-semibold text-gray-900">
                          ${tour.tourFee}
                        </span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                        {tour.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {tour.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{tour.city}</span>
                        <div className="flex items-center">
                          <span className="text-yellow-400 mr-1">★</span>
                          <span>{tour.rating || 'New'}</span>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/dashboard/listings/${tour._id}/edit`);
                          }}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <span className={`text-xs px-2 py-1 rounded ${
                          tour.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {tour.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button
            onClick={() => router.push('/dashboard/listings/new')}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl mr-3">➕</span>
            <div className="text-left">
              <p className="font-medium text-gray-900">New Tour</p>
              <p className="text-sm text-gray-600">Create listing</p>
            </div>
          </button>

          <button
            onClick={() => router.push('/dashboard/bookings')}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl mr-3">📋</span>
            <div className="text-left">
              <p className="font-medium text-gray-900">Bookings</p>
              <p className="text-sm text-gray-600">Manage requests</p>
            </div>
          </button>

          <button
            onClick={() => router.push('/profile')}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl mr-3">👤</span>
            <div className="text-left">
              <p className="font-medium text-gray-900">Profile</p>
              <p className="text-sm text-gray-600">Edit profile</p>
            </div>
          </button>

          <button
            onClick={() => router.push('/dashboard/availability')}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl mr-3">📅</span>
            <div className="text-left">
              <p className="font-medium text-gray-900">Availability</p>
              <p className="text-sm text-gray-600">Set schedule</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}