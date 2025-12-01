'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Tour {
  _id: string;
  title: string;
  description: string;
  tourFee: number;
  duration: number;
  city: string;
  category: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  meetingPoint: string;
  guide: {
    _id: string;
    name: string;
    profilePic?: string;
    rating: number;
    reviewsCount: number;
    languages: string[];
  };
}

interface MapViewProps {
  tours: Tour[];
  isLoading: boolean;
}

export function MapView({ tours, isLoading }: MapViewProps) {
  const router = useRouter();
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);

  // Mock coordinates for demonstration
  const getMockCoordinates = (tour: Tour) => {
    const cities: { [key: string]: { lat: number; lng: number } } = {
      'Paris': { lat: 48.8566, lng: 2.3522 },
      'Tokyo': { lat: 35.6762, lng: 139.6503 },
      'New York': { lat: 40.7128, lng: -74.0060 },
      'Barcelona': { lat: 41.3851, lng: 2.1734 },
      'Bali': { lat: -8.4095, lng: 115.1889 },
      'London': { lat: 51.5074, lng: -0.1278 },
      'Rome': { lat: 41.9028, lng: 12.4964 },
      'Berlin': { lat: 52.5200, lng: 13.4050 },
    };

    return cities[tour.city] || { lat: 40.7128, lng: -74.0060 }; // Default to NYC
  };

  const handleTourClick = (tour: Tour) => {
    setSelectedTour(tour);
  };

  const handleViewDetails = (tourId: string) => {
    router.push(`/tours/${tourId}`);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  if (tours.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-6xl mb-4">🗺️</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No tours to show on map
          </h3>
          <p className="text-gray-600">
            Try adjusting your search filters
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Map Container */}
      <div className="lg:flex-1 bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="h-96 bg-gray-200 relative flex items-center justify-center">
          {/* Mock Map - In a real app, you'd integrate with Google Maps or Mapbox */}
          <div className="text-center">
            <div className="text-6xl mb-4">🗺️</div>
            <p className="text-gray-600 mb-2">Interactive Map View</p>
            <p className="text-sm text-gray-500">
              {tours.length} tours in {Array.from(new Set(tours.map(t => t.city))).join(', ')}
            </p>
          </div>

          {/* Mock Map Markers */}
          <div className="absolute inset-0">
            {tours.map((tour, index) => {
              const coords = getMockCoordinates(tour);
              return (
                <button
                  key={tour._id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                    selectedTour?._id === tour._id ? 'z-10 scale-125' : 'z-0'
                  }`}
                  style={{
                    left: `${50 + (index % 3) * 10}%`,
                    top: `${40 + (index % 4) * 15}%`,
                  }}
                  onClick={() => handleTourClick(tour)}
                >
                  <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-sm font-bold ${
                    selectedTour?._id === tour._id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-blue-600'
                  }`}>
                    ${tour.tourFee}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-4 border-t">
          <p className="text-sm text-gray-600 text-center">
            Click on markers to view tour details. In production, this would show a real map with actual locations.
          </p>
        </div>
      </div>

      {/* Selected Tour Details */}
      {selectedTour && (
        <div className="lg:w-80 bg-white rounded-2xl shadow-lg p-6">
          <div className="mb-4">
            <img
              src={selectedTour.images?.[0] || '/api/placeholder/400/300?text=Tour+Image'}
              alt={selectedTour.title}
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
            
            <h3 className="font-bold text-lg text-gray-900 mb-2">
              {selectedTour.title}
            </h3>
            
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <span className="text-yellow-400 mr-1">★</span>
              <span>{selectedTour.guide.rating || 4.5}</span>
              <span className="mx-1">•</span>
              <span>{selectedTour.city}</span>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {selectedTour.description}
            </p>

            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-semibold">
                  {selectedTour.duration < 1 
                    ? `${Math.round(selectedTour.duration * 60)}min`
                    : `${selectedTour.duration} hours`
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span>Category:</span>
                <span className="font-semibold capitalize">{selectedTour.category}</span>
              </div>
              <div className="flex justify-between">
                <span>Price:</span>
                <span className="font-semibold text-green-600">${selectedTour.tourFee}</span>
              </div>
            </div>

            {/* Guide Info */}
            <div className="flex items-center mb-4 p-3 bg-gray-50 rounded-lg">
              <img
                src={selectedTour.guide.profilePic || '/api/placeholder/40/40?text=G'}
                alt={selectedTour.guide.name}
                className="w-8 h-8 rounded-full object-cover mr-3"
              />
              <div>
                <h4 className="font-semibold text-gray-900 text-sm">
                  {selectedTour.guide.name}
                </h4>
                <div className="text-xs text-gray-600">
                  {selectedTour.guide.reviewsCount || 0} reviews
                </div>
              </div>
            </div>

            <button
              onClick={() => handleViewDetails(selectedTour._id)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              View Tour Details
            </button>
          </div>
        </div>
      )}

      {!selectedTour && (
        <div className="lg:w-80 bg-white rounded-2xl shadow-lg p-6 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-4xl mb-2">📍</div>
            <p>Click on a map marker to see tour details</p>
          </div>
        </div>
      )}
    </div>
  );
}