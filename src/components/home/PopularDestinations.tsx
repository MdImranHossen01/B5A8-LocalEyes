'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  guideCount: number;
  description: string;
}

export function PopularDestinations() {
  const router = useRouter();

  const destinations: Destination[] = [
    {
      id: 'paris',
      name: 'Paris',
      country: 'France',
      image: '/assets/paris.webp',
      guideCount: 142,
      description: 'The city of lights and love awaits with its rich history and culinary delights.',
    },
    {
      id: 'tokyo',
      name: 'Tokyo',
      country: 'Japan',
      image: '/assets/tokyo.webp',
      guideCount: 98,
      description: 'Experience the perfect blend of traditional culture and cutting-edge technology.',
    },
    {
      id: 'new-york',
      name: 'New York',
      country: 'USA',
      image: '/assets/newyork.webp',
      guideCount: 156,
      description: 'The city that never sleeps offers endless possibilities for exploration.',
    },
    {
      id: 'barcelona',
      name: 'Barcelona',
      country: 'Spain',
      image: '/assets/barcelona.webp',
      guideCount: 87,
      description: 'Gaudi architecture, vibrant streets, and Mediterranean charm.',
    },
    {
      id: 'bali',
      name: 'Bali',
      country: 'Indonesia',
      image: '/assets/bali.webp',
      guideCount: 76,
      description: 'Tropical paradise with rich cultural heritage and stunning landscapes.',
    },
    {
      id: 'london',
      name: 'London',
      country: 'UK',
      image: '/assets/london.webp',
      guideCount: 134,
      description: 'Historic landmarks meet modern creativity in this global capital.',
    },
  ];

  const handleDestinationClick = (destination: string) => {
    router.push(`/explore?city=${encodeURIComponent(destination)}`);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Popular Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the world&apos;s most exciting cities with our local experts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover cursor-pointer"
              onClick={() => handleDestinationClick(destination.name)}
            >
              <div className="relative h-48">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-sm font-semibold text-gray-900">
                    {destination.guideCount} guides
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {destination.name}
                  </h3>
                  <span className="text-gray-500 text-sm">
                    {destination.country}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {destination.description}
                </p>
                
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Explore Guides
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
            View All Destinations
          </button>
        </div>
      </div>
    </section>
  );
}