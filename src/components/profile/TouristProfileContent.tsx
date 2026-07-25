'use client';

interface User {
  _id: string;
  name: string;
  bio: string;
  travelPreferences: string[];
  languages: string[];
}

interface TouristProfileContentProps {
  user: User;
  bookingsCount?: number;
}

export function TouristProfileContent({ user, bookingsCount = 0 }: TouristProfileContentProps) {
  return (
    <div>
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
                <span className="text-gray-600">Tours Booked</span>
                <span className="font-semibold">{bookingsCount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}