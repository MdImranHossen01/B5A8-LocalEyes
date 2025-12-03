'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { GuideProfileContent } from '@/components/profile/GuideProfileContent';
import { TouristProfileContent } from '@/components/profile/TouristProfileContent';
import { EditProfileModal } from '@/components/profile/EditProfileModal';

interface User {
  _id: string;
  name: string;
  email: string;
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

interface ProfileClientProps {
  user: User;
}

export function ProfileClient({ user }: ProfileClientProps) {
  const { user: currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'about' | 'reviews' | 'tours'>('about');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userTours, setUserTours] = useState<any[]>([]);
  const [userReviews, setUserReviews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const isOwnProfile = currentUser?._id === user._id;

  useEffect(() => {
    if (user.role === 'guide') {
      fetchGuideTours();
      fetchGuideReviews();
    } else if (user.role === 'tourist') {
      fetchTouristReviews();
    }
  }, [user._id, user.role]);

  const fetchGuideTours = async () => {
    try {
      const response = await fetch(`/api/listings?guideId=${user._id}`);
      const data = await response.json();
      if (response.ok) {
        setUserTours(data.tours || []);
      }
    } catch (error) {
      console.error('Error fetching guide tours:', error);
    }
  };

  const fetchGuideReviews = async () => {
    try {
      const response = await fetch(`/api/reviews?guideId=${user._id}`);
      const data = await response.json();
      if (response.ok) {
        setUserReviews(data.reviews || []);
      }
    } catch (error) {
      console.error('Error fetching guide reviews:', error);
    }
  };

  const fetchTouristReviews = async () => {
    try {
      const response = await fetch(`/api/reviews?touristId=${user._id}`);
      const data = await response.json();
      if (response.ok) {
        setUserReviews(data.reviews || []);
      }
    } catch (error) {
      console.error('Error fetching tourist reviews:', error);
    }
  };

  const handleProfileUpdate = (updatedUser: User) => {
    // This would typically refetch the user data
    window.location.reload(); // Simple refresh for demo
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      
      <main>
        {/* Profile Header */}
        <ProfileHeader 
          user={user}
          isOwnProfile={isOwnProfile}
          onEditProfile={() => setIsEditModalOpen(true)}
        />

        {/* Profile Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              {user.role === 'guide' ? (
                <>
                  <button
                    onClick={() => setActiveTab('about')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'about'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    About
                  </button>
                  <button
                    onClick={() => setActiveTab('tours')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'tours'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Tours ({userTours.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'reviews'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Reviews ({userReviews.length})
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setActiveTab('about')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'about'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    About
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'reviews'
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Reviews ({userReviews.length})
                  </button>
                </>
              )}
            </nav>
          </div>

          {/* Tab Content */}
          <div>
            {user.role === 'guide' ? (
              <GuideProfileContent
                user={user}
                activeTab={activeTab}
                tours={userTours}
                reviews={userReviews}
              />
            ) : (
              <TouristProfileContent
                user={user}
                activeTab={activeTab}
                reviews={userReviews}
              />
            )}
          </div>
        </div>
      </main>

      

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <EditProfileModal
          user={user}
          onClose={() => setIsEditModalOpen(false)}
          onUpdate={handleProfileUpdate}
        />
      )}
    </div>
  );
}