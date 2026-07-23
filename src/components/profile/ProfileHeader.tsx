'use client';

import Image from "next/image";

interface User {
  _id: string;
  name: string;
  role: 'user' | 'tourist' | 'admin';
  profilePic?: string;
  bio: string;
  languages: string[];
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
      user: { color: 'bg-blue-100 text-blue-800', text: 'User' },
      tourist: { color: 'bg-blue-100 text-blue-800', text: 'User' },
      admin: { color: 'bg-red-100 text-red-800', text: 'Admin' },
    };
    return badges[role as keyof typeof badges] || badges.user;
  };

  const roleBadge = getRoleBadge(user.role);

  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-6">
            {/* Profile Picture */}
            <div className="relative w-32 h-32">
              <div className="relative w-full h-full">
                <Image
                  src={user.profilePic || '/profile.jpg'}
                  alt={user.name}
                  fill
                  className="rounded-full object-cover border-4 border-white shadow-lg"
                  sizes="(max-width: 128px) 100vw, 128px"
                  priority
                />
              </div>
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
                {user.languages.length > 0 && (
                  <div className="bg-gray-50 rounded-lg px-4 py-2">
                    <div className="text-sm text-gray-600">Languages</div>
                    <div className="text-lg font-semibold text-gray-900">{user.languages.length}</div>
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