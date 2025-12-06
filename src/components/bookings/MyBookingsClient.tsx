/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface Booking {
  _id: string;
  tourist: {
    _id: string;
    name: string;
  };
  guide: {
    _id: string;
    name: string;
    profilePic?: string;
  };
  tour: {
    _id: string;
    title: string;
    images: string[];
    tourFee: number;
  };
  date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  numberOfPeople: number;
  totalAmount: number;
  createdAt: string;
}

export function MyBookingsClient() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past' | 'pending'>('all');
  const [isLoadingData, setIsLoadingData] = useState(true);

  const userId = (session?.user as any)?.id;
  const userRole = (session?.user as any)?.role || 'tourist';

  useEffect(() => {
    if (userId && userRole === 'tourist') {
      fetchMyBookings();
    } else if (status === 'unauthenticated') {
      setIsLoadingData(false);
    }
  }, [userId, userRole, status]);

  useEffect(() => {
    let results = bookings;
    
    switch (filter) {
      case 'upcoming':
        results = bookings.filter(b => b.status === 'confirmed');
        break;
      case 'past':
        results = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled');
        break;
      case 'pending':
        results = bookings.filter(b => b.status === 'pending');
        break;
      default:
        results = bookings;
    }
    
    setFilteredBookings(results);
  }, [bookings, filter]);

  const fetchMyBookings = async () => {
    if (!userId) return;
    
    setIsLoadingData(true);
    try {
      const response = await fetch(`/api/bookings?userId=${userId}&role=tourist`);
      const data = await response.json();
      
      if (response.ok) {
        setBookings(data.bookings || []);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (status === 'loading' || isLoadingData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    // Redirect will be handled by the dashboard layout
    return null;
  }

  // Check if user is tourist
  if (userRole !== 'tourist') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-yellow-800 mb-4">Access Denied</h2>
          <p className="text-yellow-700 mb-6">
            This page is only accessible to tourists. Guides should use the Bookings section in their dashboard.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const upcomingCount = bookings.filter(b => b.status === 'confirmed').length;
  const pendingCount = bookings.filter(b => b.status === 'pending').length;
  const pastCount = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled').length;

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
        <p className="text-gray-600 mt-2">Manage your tour bookings and requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <span className="text-2xl">📅</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Upcoming Trips</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingCount}</p>
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
              <p className="text-2xl font-bold text-gray-900">{pendingCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <span className="text-2xl">✅</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Past Experiences</p>
              <p className="text-2xl font-bold text-gray-900">{pastCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
              filter === 'all'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({bookings.length})
          </button>
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
              filter === 'upcoming'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Upcoming ({upcomingCount})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
              filter === 'pending'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap ${
              filter === 'past'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Past ({pastCount})
          </button>
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-600 mb-6">
            {filter !== 'all' 
              ? 'No bookings match your current filter'
              : 'Start exploring amazing local experiences!'
            }
          </p>
          <button
            onClick={() => router.push('/explore')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Browse Tours
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => router.push(`/bookings/${booking._id}`)}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-start space-x-4 mb-4 md:mb-0">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={booking.tour.images?.[0] || '/profile.jpg'}
                      alt={booking.tour.title}
                      fill
                      className="rounded-lg object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {booking.tour.title}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 mt-1 space-y-1 sm:space-y-0 sm:space-x-2">
                      <span>with {booking.guide.name}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{formatDate(booking.date)}</span>
                      <span className="hidden sm:inline">•</span>
                      <span>{booking.numberOfPeople} {booking.numberOfPeople === 1 ? 'person' : 'people'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4">
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      ${booking.totalAmount}
                    </p>
                    <p className="text-sm text-gray-600">
                      Total
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/tours/${booking.tour._id}`);
                  }}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium px-3 py-1 rounded hover:bg-blue-50"
                >
                  View Tour
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/profile/${booking.guide._id}`);
                  }}
                  className="text-gray-600 hover:text-gray-700 text-sm font-medium px-3 py-1 rounded hover:bg-gray-100"
                >
                  View Guide
                </button>
                {booking.status === 'completed' && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // In a real app, this would open review modal
                      alert('Review feature coming soon!');
                    }}
                    className="text-green-600 hover:text-green-700 text-sm font-medium px-3 py-1 rounded hover:bg-green-50"
                  >
                    Write Review
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}