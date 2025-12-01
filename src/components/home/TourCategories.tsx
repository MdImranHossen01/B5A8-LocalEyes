'use client';

import { useRouter } from 'next/navigation';

interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  tourCount: number;
}

export function TourCategories() {
  const router = useRouter();

  const categories: Category[] = [
    {
      id: 'food',
      name: 'Food & Dining',
      description: 'Culinary adventures and local food experiences',
      icon: '🍜',
      color: 'bg-orange-100 text-orange-800',
      tourCount: 324,
    },
    {
      id: 'history',
      name: 'History & Culture',
      description: 'Explore historical sites and cultural heritage',
      icon: '🏛️',
      color: 'bg-amber-100 text-amber-800',
      tourCount: 287,
    },
    {
      id: 'adventure',
      name: 'Adventure',
      description: 'Thrilling outdoor activities and adventures',
      icon: '⛰️',
      color: 'bg-green-100 text-green-800',
      tourCount: 156,
    },
    {
      id: 'art',
      name: 'Art & Architecture',
      description: 'Discover local art scenes and architectural wonders',
      icon: '🎨',
      color: 'bg-purple-100 text-purple-800',
      tourCount: 198,
    },
    {
      id: 'nature',
      name: 'Nature & Wildlife',
      description: 'Connect with nature and local wildlife',
      icon: '🌿',
      color: 'bg-emerald-100 text-emerald-800',
      tourCount: 142,
    },
    {
      id: 'shopping',
      name: 'Shopping & Markets',
      description: 'Local markets and unique shopping experiences',
      icon: '🛍️',
      color: 'bg-pink-100 text-pink-800',
      tourCount: 89,
    },
  ];

  const handleCategoryClick = (category: string) => {
    router.push(`/explore?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Tour Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find experiences that match your interests and passions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-2xl p-6 shadow-lg card-hover cursor-pointer"
              onClick={() => handleCategoryClick(category.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${category.color}`}>
                  {category.icon}
                </div>
                <span className="text-sm text-gray-500">
                  {category.tourCount} tours
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {category.name}
              </h3>
              
              <p className="text-gray-600 mb-4">
                {category.description}
              </p>
              
              <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center">
                Explore {category.name}
                <span className="ml-1">→</span>
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => router.push('/explore')}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
          >
            Browse All Categories
          </button>
        </div>
      </div>
    </section>
  );
}