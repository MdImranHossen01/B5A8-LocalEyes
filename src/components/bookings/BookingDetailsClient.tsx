'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

interface Booking {
  _id: string;
  tourist: {
    _id: string;
    name: string;
    profilePic?: string;
    email: string;
  };
  guide: {
    _id: string;
    name: string;
    profilePic?: string;
    email: string;
  };
  tour: {
    _id: string;
    title: string;
    description: string;
    images: string[];
    meetingPoint: string;
    duration: number;
    tourFee: number;
  };
  date: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  numberOfPeople: number;
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'refunded';
  specialRequests?: string;
  createdAt: string;
}

interface BookingDetailsClientProps {
  booking: Booking;
}

export function BookingDetailsClient({ booking }: BookingDetailsClientProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [status, setStatus] = useState(booking.status);
  const [isUpdating, setIsUpdating] = useState(false);

  const isGuide = user?.role === 'guide';
  const isOwnBooking = user?.id === booking.tourist._id || user?.id === booking.guide._id;
  const canManage = isGuide && isOwnBooking && booking.status === 'pending';

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      confirmed: 'bg-green-100 text-green-800 border-green-200',
      completed: 'bg-blue-100 text-blue-800 border-blue-200',
      cancelled: 'bg-red-100 text-redNote:800 border-red-200',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const handleStatusUpdate = async (newStatus: string) => {
    if (!confirm(`Are you sure you want to ${newStatus} this booking?`)) {
      return;
    }

    setIsUpdating(true);
    try {
      const response = await fetch(`/api/bookings/${booking._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setStatus(newStatus as any);
      } else {
        alert('Failed to update booking status');
      }
    } catch (error) {
      console.error('Error updating booking:', error);
      alert('An error occurred while updating the booking');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSendMessage = () => {
    // In a real app, this would open a chat interface
    const recipient = isGuide ? booking.tourist.email : booking.guide.email;
    alert(`Messaging system coming soon! Contact: ${recipient}`);
  };

  if (!isOwnBooking && user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-8">You don't have permission to view this booking.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Dashboard
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Booking Details</h1>
              <p className="text-gray-600 mt-2">
                Booking ID: {booking._id.substring(0, 8)}...
              </p>
            </div>
            <div className={`px-4 py-2 rounded-lg border ${getStatusColor(status)}`}>
              <span className="font-semibold capitalize">{status}</span>
            </div>
          </div>

          {/* Booking Status */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {booking.tour.title}
                </h2>
                <p className="text-gray-600 mt-1">
                  {formatDate(booking.date)}
                </p>
              </div>
              
              {canManage && (
                <div className="flex space-x-3 mt-4 md:mt-0">
                  <button
                    onClick={() => handleStatusUpdate('confirmed')}
                    disabled={isUpdating}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors"
                  >
                    Accept Booking
                  </button>
                  <button
                    onClick={() => handleStatusUpdate('cancelled')}
                    disabled={isUpdating}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-gray-400 transition-colors"
                  >
                    Decline
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Booking Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Booking Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Tour Details</h3>
                  <div className="space-y-2">
                    <p className="text-gray-900">
                      <span className="font-medium">Tour:</span> {booking.tour.title}
                    </p>
                    <p className="text-gray-900">
                      <span className="font-medium">Meeting Point:</span> {booking.tour.meetingPoint}
                    </p>
                    <p className="text-gray-900">
                      <span className="font-medium">Duration:</span> {booking.tour.duration} hours
                    </p>
                    <p className="text-gray-900">
                      <span className="font-medium">Group Size:</span> {booking.numberOfPeople} people
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Payment Details</h3>
                  <div className="space-y-2">
                    <p className="text-gray-900">
                      <span className="font-medium">Price per person:</span> {formatCurrency(booking.tour.tourFee)}
                    </p>
                    <p className="text-gray-900">
                      <span className="font-medium">Total Amount:</span> {formatCurrency(booking.totalAmount)}
                    </p>
                    <p className="text-gray-900">
                      <span className="font-medium">Payment Status:</span>{' '}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                        booking.paymentStatus === 'refunded' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.paymentStatus}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {booking.specialRequests && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Special Requests</h3>
                  <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">
                    {booking.specialRequests}
                  </p>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Tourist Info */}
                <div className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex-shrink-0">
                    <img
                      src={booking.tourist.profilePic || '/api/placeholder/60/60?text=T'}
                      alt={booking.tourist.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{booking.tourist.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">Traveler</p>
                    <p className="text-sm text-gray-500">{booking.tourist.email}</p>
                  </div>
                </div>

                {/* Guide Info */}
                <div className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex-shrink-0">
                    <img
                      src={booking.guide.profilePic || '/api/placeholder/60/60?text=G'}
                      alt={booking.guide.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{booking.guide.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">Guide</p>
                    <p className="text-sm text-gray-500">{booking.guide.email}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleSendMessage}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <span className="mr-2">💬</span>
                  Send Message
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Panel */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
              
              <div className="space-y-3">
                <button
                  onClick={() => router.push(`/tours/${booking.tour._id}`)}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <span className="mr-3">👁️</span>
                    <span>View Tour Details</span>
                  </div>
                </button>

                <button
                  onClick={() => router.push(`/profile/${isGuide ? booking.tourist._id : booking.guide._id}`)}
                  className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center">
                    <span className="mr-3">👤</span>
                    <span>View {isGuide ? 'Traveler' : 'Guide'} Profile</span>
                  </div>
                </button>

                {status === 'pending' && isGuide && (
                  <button
                    onClick={() => handleStatusUpdate('cancelled')}
                    className="w-full text-left p-3 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <span className="mr-3">❌</span>
                      <span>Cancel Booking Request</span>
                    </div>
                  </button>
                )}

                {status === 'confirmed' && (
                  <button
                    onClick={() => handleStatusUpdate('completed')}
                    className="w-full text-left p-3 border border-green-200 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <span className="mr-3">✅</span>
                      <span>Mark as Completed</span>
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Booking Timeline */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Timeline</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 bg-green-500 rounded-full"></div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Booking Created</p>
                    <p className="text-xs text-gray-500">{formatDate(booking.createdAt)}</p>
                  </div>
                </div>

                {status === 'confirmed' && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 bg-blue-500 rounded-full"></div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Booking Confirmed</p>
                      <p className="text-xs text-gray-500">Awaiting your tour date</p>
                    </div>
                  </div>
                )}

                {status === 'completed' && (
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-2 h-2 mt-2 bg-purple-500 rounded-full"></div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">Tour Completed</p>
                      <p className="text-xs text-gray-500">Ready for review</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-2 h-2 mt-2 bg-gray-300 rounded-full"></div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">Upcoming Tour</p>
                    <p className="text-xs text-gray-500">{formatDate(booking.date)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}