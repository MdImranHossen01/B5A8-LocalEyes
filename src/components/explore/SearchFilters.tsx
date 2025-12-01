'use client';

import { useState } from 'react';

interface SearchParams {
  city?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  language?: string;
  date?: string;
}

interface SearchFiltersProps {
  filters: SearchParams;
  onFilterChange: (filters: SearchParams) => void;
  onClearFilters: () => void;
  activeFilterCount: number;
}

export function SearchFilters({
  filters,
  onFilterChange,
  onClearFilters,
  activeFilterCount,
}: SearchFiltersProps) {
  const [localFilters, setLocalFilters] = useState<SearchParams>(filters);

  const categories = [
    { value: 'food', label: 'Food & Dining' },
    { value: 'history', label: 'History & Culture' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'art', label: 'Art & Architecture' },
    { value: 'nature', label: 'Nature & Wildlife' },
    { value: 'shopping', label: 'Shopping & Markets' },
    { value: 'nightlife', label: 'Nightlife' },
    { value: 'photography', label: 'Photography' },
  ];

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'italian', label: 'Italian' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'chinese', label: 'Chinese' },
    { value: 'arabic', label: 'Arabic' },
  ];

  const priceRanges = [
    { min: 0, max: 50, label: 'Under $50' },
    { min: 50, max: 100, label: '$50 - $100' },
    { min: 100, max: 200, label: '$100 - $200' },
    { min: 200, max: 500, label: '$200 - $500' },
    { min: 500, max: 1000, label: '$500+' },
  ];

  const handleInputChange = (key: keyof SearchParams, value: string) => {
    const newFilters = { ...localFilters };
    
    if (value) {
      newFilters[key] = value;
    } else {
      delete newFilters[key];
    }
    
    setLocalFilters(newFilters);
  };

  const applyFilters = () => {
    onFilterChange(localFilters);
  };

  const handlePriceRangeSelect = (min: number, max: number) => {
    const newFilters = {
      ...localFilters,
      minPrice: min.toString(),
      maxPrice: max.toString(),
    };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearPriceRange = () => {
    const newFilters = { ...localFilters };
    delete newFilters.minPrice;
    delete newFilters.maxPrice;
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
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
        {/* Destination Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Destination
          </label>
          <input
            type="text"
            placeholder="City or country..."
            value={localFilters.city || ''}
            onChange={(e) => handleInputChange('city', e.target.value)}
            onBlur={applyFilters}
            onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Date Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tour Date
          </label>
          <input
            type="date"
            value={localFilters.date || ''}
            onChange={(e) => {
              handleInputChange('date', e.target.value);
              applyFilters();
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={localFilters.category || ''}
            onChange={(e) => {
              handleInputChange('category', e.target.value);
              applyFilters();
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700">
              Price Range
            </label>
            {(localFilters.minPrice || localFilters.maxPrice) && (
              <button
                onClick={clearPriceRange}
                className="text-xs text-blue-600 hover:text-blue-700"
              >
                Clear
              </button>
            )}
          </div>
          
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <button
                key={range.label}
                onClick={() => handlePriceRangeSelect(range.min, range.max)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  localFilters.minPrice === range.min.toString() &&
                  localFilters.maxPrice === range.max.toString()
                    ? 'bg-blue-100 text-blue-700 border border-blue-300'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>

          {/* Custom Price Range */}
          <div className="flex space-x-2 mt-3">
            <input
              type="number"
              placeholder="Min $"
              value={localFilters.minPrice || ''}
              onChange={(e) => handleInputChange('minPrice', e.target.value)}
              onBlur={applyFilters}
              className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <span className="self-center text-gray-500">-</span>
            <input
              type="number"
              placeholder="Max $"
              value={localFilters.maxPrice || ''}
              onChange={(e) => handleInputChange('maxPrice', e.target.value)}
              onBlur={applyFilters}
              className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Language Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Guide Language
          </label>
          <select
            value={localFilters.language || ''}
            onChange={(e) => {
              handleInputChange('language', e.target.value);
              applyFilters();
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Any Language</option>
            {languages.map((language) => (
              <option key={language.value} value={language.value}>
                {language.label}
              </option>
            ))}
          </select>
        </div>

        {/* Additional Filters */}
        <div className="border-t pt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Additional Options
          </h3>
          
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">Instant Booking</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">Verified Guides Only</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600">Free Cancellation</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}