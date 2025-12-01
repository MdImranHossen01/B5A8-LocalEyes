'use client';

interface User {
  _id: string;
  name: string;
  bio: string;
  travelPreferences: string[];
  languages: string[];
}

interface Review {
  _id: string;
  guide: {
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

interface TouristProfileContentProps {
  user: User;
  activeTab: 'about' | 'reviews';
  reviews: Review[];
}

export function TouristProfileContent({ user, activeTab, reviews }: TouristProfileContentProps) {
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
            {/* Bio */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About Me</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {user.bio || `${user.name} hasn't written a bio yet.`}
              </p>
            </div>

            {/* Travel Preferences */}
            {user.travelPreferences.length > 0 && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Travel Preferences</h3>
                <div className="flex flex-wrap gap-2">
                  {user.travelPreferences.map((preference) => (
                    <span
                      key={preference}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {preference}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Languages */}
            {user.languages.length > 0 && (
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
            )}

            {/* Travel Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Travel Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Reviews Written</span>
                  <span className="font-semibold">{reviews.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tours Booked</span>
                  <span className="font-semibold">
                    {/* This would come from bookings data */}
                    Coming soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Reviews Written ({reviews.length})
          </h2>

          {reviews.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="text-gray-400 text-6xl mb-4">✍️</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No reviews yet</h3>
              <p className="text-gray-600">Start exploring and share your experiences!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <img
                        src={review.guide.profilePic || '/api/placeholder/40/40?text=G'}
                        alt={review.guide.name}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">Review for {review.guide.name}</h4>
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