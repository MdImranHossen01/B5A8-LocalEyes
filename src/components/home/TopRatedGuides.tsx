'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Guide {
  _id: string;
  name: string;
  profilePic?: string;
  bio: string;
  languages: string[];
  expertise: string[];
  dailyRate: number;
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
  city?: string;
}

export function TopRatedGuides() {
  const router = useRouter();
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch top-rated guides from your users API
      const response = await fetch('/api/users?role=guide&minRating=4.5&limit=4');
      
      if (!response.ok) {
        throw new Error('Failed to fetch guides');
      }
      
      const data = await response.json();
      
      if (data.users && data.users.length > 0) {
        setGuides(data.users);
      } else {
        setGuides([]);
      }
    } catch (error) {
      console.error('Error fetching guides:', error);
      setError('Failed to load guides. Please try again.');
      setGuides([]);
    } finally {
      setLoading(false);
    }
  };

  const handleGuideClick = (guideId: string) => {
    router.push(`/profile/${guideId}`);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Loading state
  if (loading) {
    return (
      <section className="py-16 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Top-Rated Guides
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Loading our most beloved local experts...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 animate-pulse">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gray-300 mr-4"></div>
                  <div>
                    <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded w-16"></div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Top-Rated Guides
            </h2>
            <p className="text-xl text-muted-foreground mb-4">
              {error}
            </p>
            <button
              onClick={fetchGuides}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  // No guides state
  if (guides.length === 0) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Top-Rated Guides
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              No guides available yet. Be the first to register as a guide!
            </p>
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => router.push('/explore')}
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all font-semibold text-lg"
            >
              Explore All Tours
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Top-Rated Guides
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet our most beloved local experts with outstanding reviews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guides.map((guide) => (
            <div
              key={guide._id}
              className="bg-gray-50 rounded-2xl p-6 card-hover cursor-pointer"
              onClick={() => handleGuideClick(guide._id)}
            >
              {/* Guide Header */}
              <div className="flex items-center mb-4">
                {guide.profilePic ? (
                  <div className="relative w-16 h-16 rounded-full mr-4 overflow-hidden">
                    <Image
                      src={guide.profilePic}
                      alt={guide.name}
                     fill
                      className="rounded-full object-cover"
                     
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                    <span className="text-white text-lg font-bold">
                      {getInitials(guide.name)}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold text-primary">{guide.name}</h3>
                  {guide.isVerified && (
                    <div className="flex items-center mt-1">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        ✓ Verified Guide
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  {'★'.repeat(Math.floor(guide.rating))}
                  {'☆'.repeat(5 - Math.floor(guide.rating))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {guide.rating.toFixed(1)} ({guide.reviewsCount} reviews)
                </span>
              </div>

              {/* Expertise */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-primary mb-2">Expertise</h4>
                <div className="flex flex-wrap gap-1">
                  {guide.expertise.slice(0, 2).map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                  {guide.expertise.length > 2 && (
                    <span className="text-xs text-gray-500">
                      +{guide.expertise.length - 2} more
                    </span>
                  )}
                </div>
              </div>

              {/* Languages */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-primary mb-2">Languages</h4>
                <div className="flex flex-wrap gap-1">
                  {guide.languages.slice(0, 3).map((lang, index) => (
                    <span
                      key={index}
                      className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                    >
                      {lang}
                    </span>
                  ))}
                  {guide.languages.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{guide.languages.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-2xl font-bold text-primary">
                    ${guide.dailyRate}
                  </span>
                  <span className="text-sm font-normal text-muted-foreground ml-1">/day</span>
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => router.push('/explore')}
            className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all font-semibold text-lg"
          >
            Browse All Guides
          </button>
        </div>
      </div>
    </section>
  );
}