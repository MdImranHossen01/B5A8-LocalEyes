'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Guide {
  _id: string;
  name: string;
  profilePic?: string;
  bio: string;
  rating: number;
  reviewsCount: number;
  languages: string[];
  expertise: string[];
  isVerified: boolean;
}

interface GuideProfileProps {
  guide: Guide;
}

export function GuideProfile({ guide }: GuideProfileProps) {
  const router = useRouter();

  // Function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleMessageGuide = () => {
    // In a real app, this would open a chat/message interface
    alert('Message feature coming soon!');
  };

  const handleViewProfile = () => {
    router.push(`/profile/${guide._id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      <div className="text-center">
        {/* Guide Avatar */}
        <div className="relative inline-block mb-4">
          {guide.profilePic ? (
            <div className="relative w-20 h-20 rounded-full mx-auto border-4 border-white shadow-lg overflow-hidden">
              <Image
                src={guide.profilePic}
                alt={guide.name}
                fill
                sizes="80px"
                className="object-cover"
                priority={false}
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center mx-auto border-4 border-white shadow-lg">
              <span className="text-white text-xl font-bold">
                {getInitials(guide.name)}
              </span>
            </div>
          )}
          
          {guide.isVerified && (
            <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        {/* Guide Name and Rating */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{guide.name}</h3>
        
        <div className="flex items-center justify-center mb-4">
          <div className="flex mr-2">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={index < Math.floor(guide.rating) ? 'text-yellow-400' : 'text-gray-300'}
              >
                ★
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {guide.rating.toFixed(1)} ({guide.reviewsCount} reviews)
          </span>
        </div>

        {/* Guide Bio */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {guide.bio}
        </p>

        {/* Languages */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Languages</h4>
          <div className="flex flex-wrap justify-center gap-1">
            {guide.languages.map((language) => (
              <span
                key={language}
                className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
              >
                {language}
              </span>
            ))}
          </div>
        </div>

        {/* Expertise */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">Expertise</h4>
          <div className="flex flex-wrap justify-center gap-1">
            {guide.expertise.slice(0, 3).map((skill) => (
              <span
                key={skill}
                className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
              >
                {skill}
              </span>
            ))}
            {guide.expertise.length > 3 && (
              <span className="text-xs text-gray-500">
                +{guide.expertise.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleViewProfile}
            className="w-full bg-white border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors font-semibold"
          >
            View Full Profile
          </button>
          
          <button
            onClick={handleMessageGuide}
            className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
          >
            Message Guide
          </button>
        </div>
      </div>
    </div>
  );
}