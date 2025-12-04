'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ProfileHeader } from './ProfileHeader';
import { GuideProfileContent } from './GuideProfileContent';
import { TouristProfileContent } from './TouristProfileContent';
import { EditProfileModal } from './EditProfileModal';

// Import the User interface from EditProfileModal to ensure consistency
type User = {
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
};

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

interface ProfileClientProps {
  user: User | null;
  tours?: Tour[];
  reviews?: Review[];
}

type GuideTabType = 'about' | 'tours' | 'reviews';
type TouristTabType = 'about' | 'reviews';
type TabType = GuideTabType | TouristTabType;

export function ProfileClient({ user, tours = [], reviews = [] }: ProfileClientProps) {
  const { user: currentUser } = useAuth();
  
  // Initialize activeTab based on user role
  const getInitialTab = (): TabType => {
    if (!user) return 'about';
    return 'about'; // Always start with 'about' tab
  };
  
  const [activeTab, setActiveTab] = useState<TabType>(getInitialTab());
  const [showEditModal, setShowEditModal] = useState(false);

  // Add safety checks
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">😔</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">User Not Found</h1>
          <p className="text-gray-600">The profile you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === user._id;

  const handleEditProfile = () => {
    setShowEditModal(true);
  };

  const handleProfileUpdate = (updatedUser: User) => {
    console.log('Profile updated:', updatedUser);
    window.location.reload();
  };

  // Define tabs based on user role
  const guideTabs: { id: GuideTabType; label: string }[] = [
    { id: 'about', label: 'About' },
    { id: 'tours', label: 'Tours' },
    { id: 'reviews', label: 'Reviews' },
  ];

  const touristTabs: { id: TouristTabType; label: string }[] = [
    { id: 'about', label: 'About' },
    { id: 'reviews', label: 'Reviews' },
  ];

  const tabs = user.role === 'guide' ? guideTabs : touristTabs;

  const handleTabClick = (tabId: TabType) => {
    setActiveTab(tabId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader 
        user={user} 
        isOwnProfile={isOwnProfile}
        onEditProfile={handleEditProfile}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`py-3 px-1 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {user.role === 'guide' ? (
          <GuideProfileContent
            user={user}
            activeTab={activeTab as GuideTabType}
            tours={tours}
            reviews={reviews}
          />
        ) : (
          <TouristProfileContent
            user={user}
            activeTab={activeTab as TouristTabType}
            reviews={reviews}
          />
        )}
      </div>

      {showEditModal && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleProfileUpdate}
        />
      )}
    </div>
  );
}