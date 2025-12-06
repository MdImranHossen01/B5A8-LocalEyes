/* eslint-disable @typescript-eslint/no-explicit-any */
// components/explore/SearchFilters.tsx - UPDATED WITH SEARCH BAR
'use client';

import { useState, useRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchFiltersProps {
  filters: {
    search?: string;
    city?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    language?: string;
    date?: string;
    sort?: string;
  };
  onFilterChange: (filters: any) => void;
  onClearFilters: () => void;
  activeFilterCount: number;
}

// Sample data - you can fetch this from API
const CITIES = ['New York', 'Paris', 'Tokyo', 'London', 'Rome', 'Barcelona', 'Bangkok', 'Dubai'];
const CATEGORIES = ['Food', 'History', 'Adventure', 'Nature', 'Art', 'Shopping', 'Nightlife', 'Photography'];
const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Italian', 'Japanese', 'Chinese'];
const SORT_OPTIONS = [
  { value: '-createdAt', label: 'Newest First' },
  { value: 'createdAt', label: 'Oldest First' },
  { value: 'tourFee', label: 'Price: Low to High' },
  { value: '-tourFee', label: 'Price: High to Low' },
  { value: '-rating', label: 'Highest Rated' },
];

export function SearchFilters({
  filters,
  onFilterChange,
  onClearFilters,
  activeFilterCount,
}: SearchFiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters);
  const [searchInput, setSearchInput] = useState(filters.search || '');
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (key: string, value: string) => {
    const newFilters = { ...localFilters, [key]: value || undefined };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value);
    if (isNaN(numValue) || numValue < 0) return;
    
    const newFilters = { 
      ...localFilters, 
      [type === 'min' ? 'minPrice' : 'maxPrice']: value || undefined 
    };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // Set new timeout for debouncing
    searchTimeoutRef.current = setTimeout(() => {
      const newFilters = { ...localFilters, search: value || undefined };
      setLocalFilters(newFilters);
      onFilterChange(newFilters);
    }, 500); // 500ms debounce
  };

  const clearSearch = () => {
    setSearchInput('');
    const newFilters = { ...localFilters, search: undefined };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {activeFilterCount > 0 && (
          <button
            onClick={onClearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Search Bar */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Tours
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by title, description, or city..."
              className="w-full text-gray-800 pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {searchInput && (
              <button
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          {searchInput && (
            <p className="mt-1 text-xs text-gray-500">
              Searching for: &quot;{searchInput}&quot;
            </p>
          )}
        </div>

        {/* Sort by */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort by
          </label>
          <select
            value={localFilters.sort || '-createdAt'}
            onChange={(e) => handleChange('sort', e.target.value)}
            className="w-fullv text-gray-800 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City
          </label>
          <select
            value={localFilters.city || ''}
            onChange={(e) => handleChange('city', e.target.value)}
            className="w-full text-gray-800 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Cities</option>
            {CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={localFilters.category || ''}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full text-gray-800 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range ($)
          </label>
          <div className="flex flex-col gap-2">
            <input
              type="number"
              placeholder="Min"
              value={localFilters.minPrice || ''}
              onChange={(e) => handlePriceChange('min', e.target.value)}
              className="flex-1 text-gray-800 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
            <span className="self-center text-gray-500">to</span>
            <input
              type="number"
              placeholder="Max"
              value={localFilters.maxPrice || ''}
              onChange={(e) => handlePriceChange('max', e.target.value)}
              className="flex-1 text-gray-800 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select
            value={localFilters.language || ''}
            onChange={(e) => handleChange('language', e.target.value)}
            className="w-full text-gray-800 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Languages</option>
            {LANGUAGES.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            value={localFilters.date || ''}
            onChange={(e) => handleChange('date', e.target.value)}
            className="w-full text-gray-800 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Active filters count */}
        {activeFilterCount > 0 && (
          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
            </p>
          </div>
        )}
      </div>
    </div>
  );
}