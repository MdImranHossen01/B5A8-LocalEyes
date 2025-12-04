'use client';

import Image from "next/image";

interface User {
  _id: string;
  name: string;
  role: 'tourist' | 'guide' | 'admin';
  profilePic?: string;
  bio: string;
  languages: string[];
  expertise: string[];
  dailyRate?: number;
  travelPreferences: string[];
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  createdAt: string;
}

interface ProfileHeaderProps {
  user: User;
  isOwnProfile: boolean;
  onEditProfile: () => void;
}

export function ProfileHeader({ user, isOwnProfile, onEditProfile }: ProfileHeaderProps) {
  const memberSince = new Date(user.createdAt).getFullYear();
  const currentYear = new Date().getFullYear();
  const yearsAsMember = currentYear - memberSince;

  const getRoleBadge = (role: string) => {
    const badges = {
      guide: { color: 'bg-purple-100 text-purple-800', text: 'Local Guide' },
      tourist: { color: 'bg-blue-100 text-blue-800', text: 'Traveler' },
      admin: { color: 'bg-red-100 text-red-800', text: 'Admin' },
    };
    return badges[role as keyof typeof badges] || badges.tourist;
  };

  const roleBadge = getRoleBadge(user.role);

  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-6">
            {/* Profile Picture */}
            <div className="relative">
              <Image
                src={user.profilePic || '/profile.jpg'}
                alt={user.name}
                fill
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              {user.isVerified && user.role === 'guide' && (
                <div className="absolute bottom-2 right-2 bg-blue-500 text-white p-1 rounded-full">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${roleBadge.color}`}>
                      {roleBadge.text}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-gray-600 mb-4">
                    {user.rating > 0 && (
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="font-semibold">{user.rating}</span>
                        <span className="mx-1">•</span>
                        <span>{user.reviewsCount} reviews</span>
                      </div>
                    )}
                    
                    <div className="flex items-center">
                      <span className="mr-1">📅</span>
                      <span>Member since {memberSince}</span>
                      {yearsAsMember > 0 && (
                        <span className="ml-1">({yearsAsMember} year{yearsAsMember > 1 ? 's' : ''})</span>
                      )}
                    </div>
                  </div>
                </div>

                {isOwnProfile && (
                  <button
                    onClick={onEditProfile}
                    className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Edit Profile
                  </button>
                )}
              </div>

              {/* Bio */}
              {user.bio && (
                <p className="text-gray-700 text-lg leading-relaxed max-w-3xl">
                  {user.bio}
                </p>
              )}

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4 mt-4">
                {user.role === 'guide' && user.dailyRate && (
                  <div className="bg-gray-50 rounded-lg px-4 py-2">
                    <div className="text-sm text-gray-600">Rate</div>
                    <div className="text-lg font-semibold text-gray-900">${user.dailyRate}/day</div>
                  </div>
                )}
                
                {user.languages.length > 0 && (
                  <div className="bg-gray-50 rounded-lg px-4 py-2">
                    <div className="text-sm text-gray-600">Languages</div>
                    <div className="text-lg font-semibold text-gray-900">{user.languages.length}</div>
                  </div>
                )}

                {user.role === 'guide' && user.expertise.length > 0 && (
                  <div className="bg-gray-50 rounded-lg px-4 py-2">
                    <div className="text-sm text-gray-600">Expertise</div>
                    <div className="text-lg font-semibold text-gray-900">{user.expertise.length}</div>
                  </div>
                )}

                {user.reviewsCount > 0 && (
                  <div className="bg-gray-50 rounded-lg px-4 py-2">
                    <div className="text-sm text-gray-600">Reviews</div>
                    <div className="text-lg font-semibold text-gray-900">{user.reviewsCount}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}