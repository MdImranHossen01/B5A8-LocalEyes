'use client';

import { useState } from 'react';

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
}

interface EditProfileModalProps {
  user: User;
  onClose: () => void;
  onUpdate: (updatedUser: User) => void;
}

export function EditProfileModal({ user, onClose, onUpdate }: EditProfileModalProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    bio: user.bio,
    languages: user.languages.join(', '),
    expertise: user.expertise.join(', '),
    dailyRate: user.dailyRate?.toString() || '',
    travelPreferences: user.travelPreferences.join(', '),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updates = {
        name: formData.name,
        bio: formData.bio,
        languages: formData.languages.split(',').map(lang => lang.trim()).filter(Boolean),
        expertise: formData.expertise.split(',').map(exp => exp.trim()).filter(Boolean),
        dailyRate: user.role === 'guide' && formData.dailyRate ? parseInt(formData.dailyRate) : undefined,
        travelPreferences: formData.travelPreferences.split(',').map(pref => pref.trim()).filter(Boolean),
      };

      const response = await fetch(`/api/users/${user._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (response.ok) {
        onUpdate(data.user);
        onClose();
      } else {
        alert(data.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating your profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900">Edit Profile</h2>
          <p className="text-gray-600 mt-1">Update your profile information</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell others about yourself..."
            />
          </div>

          {/* Languages */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Languages (comma separated)
            </label>
            <input
              type="text"
              value={formData.languages}
              onChange={(e) => handleInputChange('languages', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="English, Spanish, French..."
            />
          </div>

          {/* Guide-specific Fields */}
          {user.role === 'guide' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Areas of Expertise (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.expertise}
                  onChange={(e) => handleInputChange('expertise', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="History, Food, Photography..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Daily Rate ($)
                </label>
                <input
                  type="number"
                  value={formData.dailyRate}
                  onChange={(e) => handleInputChange('dailyRate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="50"
                />
              </div>
            </>
          )}

          {/* Tourist-specific Fields */}
          {user.role === 'tourist' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Travel Preferences (comma separated)
              </label>
              <input
                type="text"
                value={formData.travelPreferences}
                onChange={(e) => handleInputChange('travelPreferences', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Adventure, Culture, Food..."
              />
            </div>
          )}

          {/* Note: Profile picture upload would be added here */}

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors font-medium"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}