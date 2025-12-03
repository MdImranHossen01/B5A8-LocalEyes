'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';


interface Tour {
  _id: string;
  title: string;
  description: string;
  tourFee: number;
  duration: number;
  city: string;
  category: string;
  images: string[];
  isActive: boolean;
  rating: number;
  reviewsCount: number;
  createdAt: string;
}

export function ListingManagementClient() {
  const router = useRouter();
  const { user } = useAuth();
  const { isLoading } = useProtectedRoute('guide');
  const [tours, setTours] = useState<Tour[]>([]);
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user?.role === 'guide') {
      fetchMyTours();
    }
  }, [user]);

  useEffect(() => {
    let results = tours;
    
    // Apply filter
    if (filter === 'active') {
      results = results.filter(tour => tour.isActive);
    } else if (filter === 'inactive') {
      results = results.filter(tour => !tour.isActive);
    }
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(tour => 
        tour.title.toLowerCase().includes(query) ||
        tour.description.toLowerCase().includes(query) ||
        tour.city.toLowerCase().includes(query)
      );
    }
    
    setFilteredTours(results);
  }, [tours, filter, searchQuery]);

  const fetchMyTours = async () => {
    setIsLoadingData(true);
    try {
      const response = await fetch(`/api/listings?guideId=${user?.id}`);
      const data = await response.json();
      
      if (response.ok) {
        setTours(data.tours || []);
      }
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleCreateNew = () => {
    router.push('/dashboard/listings/new');
  };

  const handleEditTour = (tourId: string) => {
    router.push(`/dashboard/listings/${tourId}/edit`);
  };

  const handleToggleStatus = async (tourId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/listings/${tourId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.ok) {
        // Update local state
        setTours(tours.map(tour => 
          tour._id === tourId 
            ? { ...tour, isActive: !currentStatus }
            : tour
        ));
      }
    } catch (error) {
      console.error('Error updating tour status:', error);
    }
  };

  const handleDeleteTour = async (tourId: string) => {
    if (!confirm('Are you sure you want to delete this tour? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/listings/${tourId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove from local state
        setTours(tours.filter(tour => tour._id !== tourId));
      }
    } catch (error) {
      console.error('Error deleting tour:', error);
    }
  };

  if (isLoading || isLoadingData) {
    return (
      <div className="min-h-screen bg-gray-50">
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-gray-300 h-64 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
        
      </div>
    );
  }

  const activeTours = tours.filter(t => t.isActive).length;
  const totalTours = tours.length;

  return (
    <div className="min-h-screen bg-gray-50">
      
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Tour Listings</h1>
              <p className="text-gray-600 mt-2">
                Manage your tours and create new experiences
              </p>
            </div>
            <button
              onClick={handleCreateNew}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center"
            >
              <span className="mr-2">+</span> Create New Tour
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <p className="text-sm text-gray-600">Total Listings</p>
              <p className="text-2xl font-bold text-gray-900">{totalTours}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">{activeTours}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <p className="text-sm text-gray-600">Inactive</p>
              <p className="text-2xl font-bold text-gray-600">{totalTours - activeTours}</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <p className="text-sm text-gray-600">Avg. Rating</p>
              <p className="text-2xl font-bold text-yellow-600">
                {tours.length > 0 
                  ? (tours.reduce((sum, t) => sum + (t.rating || 0), 0) / tours.length).toFixed(1)
                  : 'N/A'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filter === 'all'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({totalTours})
              </button>
              <button
                onClick={() => setFilter('active')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filter === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Active ({activeTours})
              </button>
              <button
                onClick={() => setFilter('inactive')}
                className={`px-4 py-2 rounded-lg font-medium ${
                  filter === 'inactive'
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Inactive ({totalTours - activeTours})
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search tours..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
          </div>
        </div>

        {/* Tours Grid */}
        {filteredTours.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="text-gray-400 text-6xl mb-4">🗺️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchQuery || filter !== 'all' ? 'No matching tours found' : 'No tours yet'}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || filter !== 'all' 
                ? 'Try a different search term or filter'
                : 'Create your first tour to start sharing your local expertise.'
              }
            </p>
            <button
              onClick={handleCreateNew}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Create Your First Tour
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map((tour) => (
              <div
                key={tour._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 card-hover"
              >
                {/* Tour Image */}
                <div className="relative h-48">
                  <img
                    src={tour.images?.[0] || '/api/placeholder/400/300?text=Tour+Image'}
                    alt={tour.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-sm font-semibold text-gray-900">
                      ${tour.tourFee}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      tour.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {tour.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                {/* Tour Content */}
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                    {tour.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {tour.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                    <div className="flex items-center">
                      <span className="mr-2">📍</span>
                      {tour.city}
                    </div>
                    <div className="flex items-center">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span>{tour.rating || 'New'}</span>
                      <span className="mx-1">•</span>
                      <span>{tour.reviewsCount} reviews</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditTour(tour._id)}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium px-3 py-1 rounded hover:bg-blue-50"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleToggleStatus(tour._id, tour.isActive)}
                        className={`text-sm font-medium px-3 py-1 rounded ${
                          tour.isActive
                            ? 'text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50'
                            : 'text-green-600 hover:text-green-700 hover:bg-green-50'
                        }`}
                      >
                        {tour.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => router.push(`/tours/${tour._id}`)}
                        className="text-gray-600 hover:text-gray-700 text-sm font-medium px-3 py-1 rounded hover:bg-gray-100"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDeleteTour(tour._id)}
                        className="text-red-600 hover:text-red-700 text-sm font-medium px-3 py-1 rounded hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Performance Tips */}
        <div className="mt-8 bg-blue-50 rounded-2xl border border-blue-200 p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">💡 Tips for Better Performance</h3>
          <ul className="text-blue-800 space-y-1 text-sm">
            <li>• Use high-quality images to attract more travelers</li>
            <li>• Write detailed descriptions highlighting unique aspects</li>
            <li>• Keep your availability calendar updated</li>
            <li>• Respond quickly to booking inquiries</li>
            <li>• Ask happy travelers to leave reviews</li>
          </ul>
        </div>
      </main>

     
    </div>
  );
}