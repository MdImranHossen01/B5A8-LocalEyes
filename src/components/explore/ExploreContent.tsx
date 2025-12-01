'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { SearchFilters } from '@/components/explore/SearchFilters';
import { TourGrid } from '@/components/explore/TourGrid';
import { MapView } from '@/components/explore/MapView';

type ViewMode = 'grid' | 'map';

interface SearchParams {
  city?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  language?: string;
  date?: string;
}

export function ExploreContent() {
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filters, setFilters] = useState<SearchParams>({});
  const [isLoading, setIsLoading] = useState(true);
  const [tours, setTours] = useState<any[]>([]);

  // Initialize filters from URL search params
  useEffect(() => {
    const initialFilters: SearchParams = {};
    
    if (searchParams.get('city')) initialFilters.city = searchParams.get('city')!;
    if (searchParams.get('category')) initialFilters.category = searchParams.get('category')!;
    if (searchParams.get('minPrice')) initialFilters.minPrice = searchParams.get('minPrice')!;
    if (searchParams.get('maxPrice')) initialFilters.maxPrice = searchParams.get('maxPrice')!;
    if (searchParams.get('language')) initialFilters.language = searchParams.get('language')!;
    if (searchParams.get('date')) initialFilters.date = searchParams.get('date')!;

    setFilters(initialFilters);
  }, [searchParams]);

  // Fetch tours based on filters
  useEffect(() => {
    const fetchTours = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        
        Object.entries(filters).forEach(([key, value]) => {
          if (value) queryParams.append(key, value);
        });

        const response = await fetch(`/api/listings?${queryParams}`);
        const data = await response.json();

        if (response.ok) {
          setTours(data.tours || []);
        } else {
          console.error('Failed to fetch tours:', data.error);
          setTours([]);
        }
      } catch (error) {
        console.error('Error fetching tours:', error);
        setTours([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTours();
  }, [filters]);

  const handleFilterChange = (newFilters: SearchParams) => {
    setFilters(newFilters);
    
    // Update URL without page reload
    const queryParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) queryParams.set(key, value);
    });
    
    window.history.replaceState(
      {},
      '',
      `${window.location.pathname}?${queryParams.toString()}`
    );
  };

  const clearFilters = () => {
    setFilters({});
    window.history.replaceState({}, '', window.location.pathname);
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Explore Local Experiences
          </h1>
          <p className="text-gray-600">
            Discover authentic tours and connect with local guides
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <SearchFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={clearFilters}
              activeFilterCount={activeFilterCount}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* View Controls */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">
                  {isLoading ? 'Loading...' : `${tours.length} tours found`}
                </span>
                
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Clear all filters
                  </button>
                )}
              </div>

              {/* View Toggle */}
              <div className="flex bg-white rounded-lg border border-gray-300 p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Grid View
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    viewMode === 'map'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Map View
                </button>
              </div>
            </div>

            {/* Content */}
            {viewMode === 'grid' ? (
              <TourGrid tours={tours} isLoading={isLoading} />
            ) : (
              <MapView tours={tours} isLoading={isLoading} />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}