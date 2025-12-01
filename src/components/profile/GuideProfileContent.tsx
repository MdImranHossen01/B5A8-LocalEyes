'use client';

import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  name: string;
  bio: string;
  languages: string[];
  expertise: string[];
  dailyRate?: number;
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
}

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
  isActive: boolean;
}

interface Review {
  _id: string;
  tourist: {
    name: string;
    profilePic?: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
  tour: {
    title: string;
  };
}

interface GuideProfileContentProps {
  user: User;
  activeTab: 'about' | 'reviews' | 'tours';
  tours: Tour[];
  reviews: Review[];
}

export function GuideProfileContent({ user, activeTab, tours, reviews }: GuideProfileContentProps) {
  const router = useRouter();

  const activeTours = tours.filter(tour => tour.isActive);
  const inactiveTours = tours.filter(tour => !tour.isActive);

  const handleTourClick = (tourId: string) => {
    router.push(`/tours/${tourId}`);
  };

  const formatDuration = (hours: number) => {
    if (hours < 1) return `${Math.round(hours * 60)}min`;
    if (hours === 1) return '1 hour';
    return `${hours} hours`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div>
      {/* About Tab */}
      {activeTab === 'about' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Detailed Bio */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About Me</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {user.bio || `${user.name} hasn't written a bio yet.`}
              </p>
            </div>

            {/* Languages & Expertise */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Languages */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Languages</h3>
                <div className="flex flex-wrap gap-2">
                  {user.languages.map((language) => (
                    <span
                      key={language}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expertise */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {user.expertise.map((skill) => (
                    <span
                      key={skill}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Guide Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Tours</span>
                  <span className="font-semibold">{activeTours.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Reviews</span>
                  <span className="font-semibold">{user.reviewsCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Rating</span>
                  <span className="font-semibold">
                    {user.rating > 0 ? user.rating : 'No ratings yet'}
                  </span>
                </div>
                {user.dailyRate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Daily Rate</span>
                    <span className="font-semibold text-green-600">${user.dailyRate}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Verification Status */}
            {user.isVerified && (
              <div className="bg-blue-50 rounded-2xl border border-blue-200 p-6">
                <div className="flex items-center mb-2">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-blue-900">Verified Guide</h3>
                </div>
                <p className="text-blue-800 text-sm">
                  This guide has been verified by our team and meets our quality standards.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tours Tab */}
      {activeTab === 'tours' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              My Tours ({activeTours.length} active)
            </h2>
          </div>

          {activeTours.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="text-gray-400 text-6xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tours yet</h3>
              <p className="text-gray-600 mb-6">Create your first tour to start sharing your local expertise.</p>
              <button
                onClick={() => router.push('/dashboard/listings/new')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
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
                  onClick={() => handleTourClick(tour._id)}
                >
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
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
                      {tour.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {tour.description}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <span className="mr-2">📍</span>
                        {tour.city}
                      </div>
                      <div className="flex items-center">
                        <span className="mr-2">⏱️</span>
                        {formatDuration(tour.duration)}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span>{tour.rating || 'New'}</span>
                        <span className="mx-1">•</span>
                        <span>{tour.reviewsCount} reviews</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Traveler Reviews ({reviews.length})
          </h2>

          {reviews.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="text-gray-400 text-6xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews yet</h3>
              <p className="text-gray-600">Be the first to review this guide.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <img
                        src={review.tourist.profilePic || '/api/placeholder/40/40?text=T'}
                        alt={review.tourist.name}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.tourist.name}</h4>
                        <div className="flex items-center text-sm text-gray-600">
                          <span className="text-yellow-400 mr-1">★</span>
                          <span>{review.rating}</span>
                          <span className="mx-2">•</span>
                          <span>{formatDate(review.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {review.tour && (
                    <div className="mb-3">
                      <span className="text-sm text-gray-600">Tour: </span>
                      <span className="text-sm font-medium text-gray-900">{review.tour.title}</span>
                    </div>
                  )}

                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}