'use client';

import { useRouter } from 'next/navigation';

interface Guide {
  id: string;
  name: string;
  avatar: string;
  location: string;
  rating: number;
  reviews: number;
  expertise: string[];
  languages: string[];
  dailyRate: number;
}

export function TopRatedGuides() {
  const router = useRouter();

  const guides: Guide[] = [
    {
      id: '1',
      name: 'Maria Rodriguez',
      avatar: '/api/placeholder/100/100?text=MR',
      location: 'Barcelona, Spain',
      rating: 4.9,
      reviews: 127,
      expertise: ['Food', 'History', 'Architecture'],
      languages: ['Spanish', 'English', 'French'],
      dailyRate: 80,
    },
    {
      id: '2',
      name: 'Kenji Tanaka',
      avatar: '/api/placeholder/100/100?text=KT',
      location: 'Tokyo, Japan',
      rating: 4.8,
      reviews: 94,
      expertise: ['Culture', 'Food', 'Photography'],
      languages: ['Japanese', 'English'],
      dailyRate: 75,
    },
    {
      id: '3',
      name: 'Sophie Laurent',
      avatar: '/api/placeholder/100/100?text=SL',
      location: 'Paris, France',
      rating: 4.9,
      reviews: 156,
      expertise: ['Art', 'History', 'Shopping'],
      languages: ['French', 'English', 'Italian'],
      dailyRate: 90,
    },
    {
      id: '4',
      name: 'Marco Bellini',
      avatar: '/api/placeholder/100/100?text=MB',
      location: 'Rome, Italy',
      rating: 4.7,
      reviews: 88,
      expertise: ['History', 'Food', 'Adventure'],
      languages: ['Italian', 'English', 'Spanish'],
      dailyRate: 70,
    },
  ];

  const handleGuideClick = (guideId: string) => {
    router.push(`/profile/${guideId}`);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Top-Rated Guides
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our most beloved local experts with outstanding reviews
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className="bg-gray-50 rounded-2xl p-6 card-hover cursor-pointer"
              onClick={() => handleGuideClick(guide.id)}
            >
              {/* Guide Header */}
              <div className="flex items-center mb-4">
                <img
                  src={guide.avatar}
                  alt={guide.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{guide.name}</h3>
                  <p className="text-sm text-gray-600">{guide.location}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400 mr-2">
                  {'★'.repeat(5)}
                </div>
                <span className="text-sm text-gray-600">
                  {guide.rating} ({guide.reviews} reviews)
                </span>
              </div>

              {/* Expertise */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Expertise</h4>
                <div className="flex flex-wrap gap-1">
                  {guide.expertise.slice(0, 2).map((skill) => (
                    <span
                      key={skill}
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
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Languages</h4>
                <div className="flex flex-wrap gap-1">
                  {guide.languages.map((lang) => (
                    <span
                      key={lang}
                      className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-900">
                    ${guide.dailyRate}
                  <span className="text-sm font-normal text-gray-600">/day</span>
                </span>
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