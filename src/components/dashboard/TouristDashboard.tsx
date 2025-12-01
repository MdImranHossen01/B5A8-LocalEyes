'use client';

import { useRouter } from 'next/navigation';

interface DashboardData {
  bookings: any[];
  tours: any[];
  stats: any;
}

interface TouristDashboardProps {
  data: DashboardData;
}

export function TouristDashboard({ data }: TouristDashboardProps) {
  const router = useRouter();
  const { bookings, stats } = data;

  const upcomingBookings = bookings.filter(b => b.status === 'confirmed');
  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const pastBookings = bookings.filter(b => b.status === 'completed');

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

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your trips and bookings</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <span className="text-2xl">📅</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Upcoming Trips</p>
              <p className="text-2xl font-bold text-gray-900">{stats.upcomingTrips || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <span className="text-2xl">✅</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Past Trips</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pastTrips || 0}</p>
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Trips */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Trips</h2>
            <button
              onClick={() => router.push('/my-bookings')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
            </button>
          </div>

          {upcomingBookings.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-3">🗺️</div>
              <p className="text-gray-600 mb-4">No upcoming trips</p>
              <button
                onClick={() => router.push('/explore')}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Explore Tours
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {upcomingBookings.slice(0, 3).map((booking) => (
                <div
                  key={booking._id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => router.push(`/bookings/${booking._id}`)}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={booking.tour?.images?.[0] || '/api/placeholder/60/60?text=Tour'}
                      alt={booking.tour?.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">
                        {booking.tour?.title}
                      </h3>
                      <p className="text-gray-600 text-xs">
                        with {booking.guide?.name}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {formatDate(booking.date)}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

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
              <p className="text-gray-600">No pending requests</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingBookings.slice(0, 3).map((booking) => (
                <div
                  key={booking._id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => router.push(`/bookings/${booking._id}`)}
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={booking.tour?.images?.[0] || '/api/placeholder/60/60?text=Tour'}
                      alt={booking.tour?.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">
                        {booking.tour?.title}
                      </h3>
                      <p className="text-gray-600 text-xs">
                        Awaiting confirmation from {booking.guide?.name}
                      </p>
                    </div>
                  </div>
                  <span className="text-yellow-600 text-sm">⏳</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => router.push('/explore')}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl mr-3">🔍</span>
            <div className="text-left">
              <p className="font-medium text-gray-900">Find Tours</p>
              <p className="text-sm text-gray-600">Discover new experiences</p>
            </div>
          </button>

          <button
            onClick={() => router.push('/my-bookings')}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl mr-3">📋</span>
            <div className="text-left">
              <p className="font-medium text-gray-900">My Bookings</p>
              <p className="text-sm text-gray-600">View all your trips</p>
            </div>
          </button>

          <button
            onClick={() => router.push('/profile')}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className="text-2xl mr-3">👤</span>
            <div className="text-left">
              <p className="font-medium text-gray-900">Profile</p>
              <p className="text-sm text-gray-600">Edit your information</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}