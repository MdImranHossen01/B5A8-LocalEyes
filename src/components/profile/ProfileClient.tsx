'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ProfileHeader } from './ProfileHeader';
import { TouristProfileContent } from './TouristProfileContent';
import { EditProfileModal } from './EditProfileModal';

// Import the User interface from EditProfileModal to ensure consistency
type User = {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'tourist' | 'admin';
  profilePic?: string;
  bio: string;
  languages: string[];
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

interface ProfileClientProps {
  user: User | null;
  tours?: Tour[];
  bookingsCount?: number;
}

export function ProfileClient({ user, tours = [], bookingsCount = 0 }: ProfileClientProps) {
  const { user: currentUser } = useAuth();
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

  return (
    <div className="min-h-screen bg-gray-50">
      <ProfileHeader 
        user={user} 
        isOwnProfile={isOwnProfile}
        onEditProfile={handleEditProfile}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TouristProfileContent
          user={user}
          bookingsCount={bookingsCount}
        />
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