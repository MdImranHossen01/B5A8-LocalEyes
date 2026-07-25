// components/explore/ExploreContent.tsx - FIXED CENTERING
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { TourGrid } from '@/components/explore/TourGrid';
import debounce from 'lodash/debounce';

interface SearchParams {
  search?: string;
  city?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  language?: string;
  date?: string;
  page?: string;
  limit?: string;
  sort?: string;
}

interface ExploreContentProps {
  initialTours?: any[];
}

export function ExploreContent({ initialTours = [] }: ExploreContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filters, setFilters] = useState<SearchParams>({});
  const [isLoading, setIsLoading] = useState(false);
  const [tours, setTours] = useState<any[]>(initialTours);
  const [totalTours, setTotalTours] = useState(initialTours.length);
  const [searchQuery, setSearchQuery] = useState('');
  const isInitialMount = useRef(true);

  // Initialize filters from URL search params
  useEffect(() => {
    const params: SearchParams = {};
    
    const search = searchParams.get('search');
    const city = searchParams.get('city');
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const language = searchParams.get('language');
    const date = searchParams.get('date');
    const page = searchParams.get('page');
    const limit = searchParams.get('limit');
    const sort = searchParams.get('sort');

    if (search) {
      params.search = search;
      setSearchQuery(search);
    } else {
      setSearchQuery('');
    }
    if (city) params.city = city;
    if (category) params.category = category;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (language) params.language = language;
    if (date) params.date = date;
    if (page) params.page = page;
    if (limit) params.limit = limit;
    if (sort) params.sort = sort;

    setFilters(params);
  }, [searchParams]);

  // Debounced search function
  const searchTours = useCallback(
    debounce(async (searchFilters: SearchParams) => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        
        // Add all filter params
        Object.entries(searchFilters).forEach(([key, value]) => {
          if (value && value !== '') {
            queryParams.append(key, value.toString());
          }
        });

        // Add default sorting if not specified
        if (!searchFilters.sort) {
          queryParams.append('sort', '-createdAt');
        }

        const response = await fetch(`/api/listings?${queryParams.toString()}`);
        const data = await response.json();

        if (response.ok) {
          setTours(data.tours || []);
          setTotalTours(data.total || data.tours?.length || 0);
        } else {
          console.error('Failed to fetch tours:', data.error);
          setTours([]);
          setTotalTours(0);
        }
      } catch (error) {
        console.error('Error fetching tours:', error);
        setTours([]);
        setTotalTours(0);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  // Fetch tours when filters change
  useEffect(() => {
    // Don't fetch on initial render if we have initialTours
    if (isInitialMount.current) {
      isInitialMount.current = false;
      if (Object.keys(filters).length === 0 && initialTours.length > 0) {
        return;
      }
    }
    
    searchTours(filters);
  }, [filters, searchTours, initialTours]);

  const updateFilters = useCallback((newFilters: SearchParams) => {
    setFilters(newFilters);
    
    // Update URL without page reload
    const queryParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== '') {
        queryParams.set(key, value.toString());
      }
    });
    
    const queryString = queryParams.toString();
    router.replace(queryString ? `/explore?${queryString}` : '/explore', { scroll: false });
  }, [router]);

  const debouncedUpdateSearch = useMemo(
    () =>
      debounce((query: string, currentFilters: SearchParams) => {
        const trimmed = query.trim();
        if (trimmed) {
          updateFilters({ ...currentFilters, search: trimmed, page: '1' });
        } else {
          const { search, ...restFilters } = currentFilters;
          updateFilters({ ...restFilters, page: '1' });
        }
      }, 300),
    [updateFilters]
  );

  const clearSearch = () => {
    setSearchQuery('');
    debouncedUpdateSearch.cancel();
    const { search, ...restFilters } = filters;
    updateFilters({ ...restFilters, page: '1' });
  };

  const clearFilters = useCallback(() => {
    setFilters({});
    setSearchQuery('');
    router.replace('/explore', { scroll: false });
  }, [router]);

  const activeFilterCount = useMemo(() => {
    return Object.values(filters).filter(value => 
      value !== undefined && value !== '' && value !== '0'
    ).length;
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Main Search Bar - FIXED CENTERING */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Explore Local Experiences
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Discover authentic tours and connect with local guides
          </p>

          {/* Main Search Bar - CENTERED */}
          <div className="flex justify-center">
            <div className="w-full max-w-3xl">
              <form onSubmit={(e) => e.preventDefault()} className="relative">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSearchQuery(val);
                      debouncedUpdateSearch(val, filters);
                    }}
                    placeholder="Search tours by title, description, city, or guide..."
                    className="w-full text-gray-800 pl-12 pr-12 py-4 border border-gray-300 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    </button>
                  )}
                </div>
                {filters.search && (
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <span className="text-sm text-gray-600">
                      Showing results for:
                    </span>
                    <span className="text-sm font-medium text-blue-600">
                      &quot;{filters.search}&quot;
                    </span>
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="text-sm text-gray-500 hover:text-gray-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        <div>
          {/* Main Content */}
          <div className="w-full">
            {/* View Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600 font-medium">
                  {isLoading ? (
                    <span className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                      Loading...
                    </span>
                  ) : (
                    `${totalTours} ${totalTours === 1 ? 'tour' : 'tours'} found`
                  )}
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
            </div>

            {/* Content */}
            <TourGrid tours={tours} isLoading={isLoading} />

            {/* Pagination */}
            {tours.length > 0 && !isLoading && (
              <div className="mt-8 flex justify-center">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => {
                      const page = parseInt(filters.page || '1');
                      if (page > 1) {
                        updateFilters({ ...filters, page: (page - 1).toString() });
                      }
                    }}
                    disabled={parseInt(filters.page || '1') <= 1}
                    className="px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    ← Previous
                  </button>
                  <div className="flex items-center space-x-1">
                    <span className="text-sm text-gray-600">Page</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm font-medium">
                      {filters.page || 1}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      const page = parseInt(filters.page || '1');
                      const limit = parseInt(filters.limit || '12');
                      if (tours.length === limit) {
                        updateFilters({ ...filters, page: (page + 1).toString() });
                      }
                    }}
                    disabled={tours.length < parseInt(filters.limit || '12')}
                    className="px-5 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}

            {/* No Results Message */}
            {tours.length === 0 && !isLoading && (
              <div className="text-center py-16">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No tours found
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  {Object.keys(filters).length > 0
                    ? "Try adjusting your search filters or search terms"
                    : "No tours available at the moment. Check back soon!"}
                </p>
                {Object.keys(filters).length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}