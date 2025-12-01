'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function HeroSection() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore?city=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const popularCities = ['Paris', 'Tokyo', 'New York', 'Barcelona', 'Bali', 'London'];

  return (
    <section className="hero-gradient text-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Explore Like a 
            <span className="block text-yellow-300">Local</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover hidden gems and authentic experiences with passionate local guides
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Where are you going?"
                className="w-full px-6 py-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-blue-600 text-white px-8 py-2 rounded-full hover:bg-blue-700 transition-colors font-semibold"
              >
                Search
              </button>
            </div>
          </form>

          {/* Popular Cities */}
          <div className="flex flex-wrap justify-center gap-3">
            <span className="text-lg">Popular:</span>
            {popularCities.map((city) => (
              <button
                key={city}
                onClick={() => setSearchQuery(city)}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full transition-all hover:scale-105"
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}