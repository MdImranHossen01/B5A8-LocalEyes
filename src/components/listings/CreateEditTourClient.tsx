/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import Image from 'next/image';


interface Tour {
  _id?: string;
  title: string;
  description: string;
  itinerary: string;
  tourFee: number;
  duration: number;
  meetingPoint: string;
  maxGroupSize: number;
  images: string[];
  category: string;
  city: string;
  isActive?: boolean;
}

interface CreateEditTourClientProps {
  tour?: Tour;
}

const CATEGORIES = [
  'food', 'history', 'adventure', 'art', 'nature', 'shopping', 'nightlife', 'photography', 'culture', 'architecture'
];

const DURATION_OPTIONS = [
  { value: 1, label: '1 hour' },
  { value: 2, label: '2 hours' },
  { value: 3, label: '3 hours' },
  { value: 4, label: '4 hours' },
  { value: 5, label: '5 hours' },
  { value: 6, label: '6 hours' },
  { value: 8, label: 'Full day (8 hours)' },
  { value: 24, label: 'Multi-day (24+ hours)' },
];

const GROUP_SIZE_OPTIONS = Array.from({ length: 20 }, (_, i) => i + 1);

export function CreateEditTourClient({ tour }: CreateEditTourClientProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { isLoading } = useProtectedRoute('guide');
  const [formData, setFormData] = useState<Tour>({
    title: '',
    description: '',
    itinerary: '',
    tourFee: 50,
    duration: 2,
    meetingPoint: '',
    maxGroupSize: 10,
    images: [],
    category: 'culture',
    city: '',
    isActive: true,
  });
  const [imageUrls, setImageUrls] = useState<string[]>(['', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const isEditMode = !!tour?._id;

  useEffect(() => {
    if (tour) {
      setFormData(tour);
      // Initialize image URLs
      const urls = [...tour.images];
      while (urls.length < 5) urls.push('');
      setImageUrls(urls);
    }
  }, [tour]);

  const handleInputChange = (field: keyof Tour, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleImageUrlChange = (index: number, url: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = url;
    setImageUrls(newUrls);
    
    // Update form data with non-empty URLs
    const validUrls = newUrls.filter(url => url.trim());
    setFormData(prev => ({ ...prev, images: validUrls }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.itinerary.trim()) newErrors.itinerary = 'Itinerary is required';
    if (!formData.tourFee || formData.tourFee <= 0) newErrors.tourFee = 'Valid tour fee is required';
    if (!formData.duration || formData.duration <= 0) newErrors.duration = 'Valid duration is required';
    if (!formData.meetingPoint.trim()) newErrors.meetingPoint = 'Meeting point is required';
    if (!formData.maxGroupSize || formData.maxGroupSize <= 0) newErrors.maxGroupSize = 'Valid group size is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    
    if (formData.images.length === 0) {
      newErrors.images = 'At least one image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        ...formData,
        guide: user?.id,
      };

      const url = isEditMode ? `/api/listings/${tour._id}` : '/api/listings';
      const method = isEditMode ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/dashboard/listings');
      } else {
        setErrors({ submit: data.error || 'Failed to save tour' });
      }
    } catch (error) {
      setErrors({ submit: 'An error occurred while saving the tour' });
      console.error('Error saving tour:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
      
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
    
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? 'Edit Tour' : 'Create New Tour'}
          </h1>
          <p className="text-gray-600 mt-2">
            {isEditMode 
              ? 'Update your tour information'
              : 'Share your local expertise with travelers'
            }
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {errors.submit}
            </div>
          )}

          {/* Basic Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
            
            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tour Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Hidden Food Gems of Barcelona"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Describe what makes your tour special..."
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              {/* Itinerary */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Detailed Itinerary *
                </label>
                <textarea
                  value={formData.itinerary}
                  onChange={(e) => handleInputChange('itinerary', e.target.value)}
                  rows={6}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.itinerary ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Break down what travelers will do during the tour. Be detailed and specific."
                />
                {errors.itinerary && (
                  <p className="mt-1 text-sm text-red-600">{errors.itinerary}</p>
                )}
              </div>
            </div>
          </div>

          {/* Location & Logistics */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Location & Logistics</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Barcelona, Spain"
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                )}
              </div>

              {/* Meeting Point */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meeting Point *
                </label>
                <input
                  type="text"
                  value={formData.meetingPoint}
                  onChange={(e) => handleInputChange('meetingPoint', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.meetingPoint ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., Plaça de Catalunya, Barcelona"
                />
                {errors.meetingPoint && (
                  <p className="mt-1 text-sm text-red-600">{errors.meetingPoint}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration *
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.duration ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  {DURATION_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.duration && (
                  <p className="mt-1 text-sm text-red-600">{errors.duration}</p>
                )}
              </div>
            </div>
          </div>

          {/* Pricing & Group */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Pricing & Group Size</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tour Fee */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per Person ($) *
                </label>
                <input
                  type="number"
                  min="1"
                  step="1"
                  value={formData.tourFee}
                  onChange={(e) => handleInputChange('tourFee', parseInt(e.target.value))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.tourFee ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.tourFee && (
                  <p className="mt-1 text-sm text-red-600">{errors.tourFee}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  This is the price per person for the tour
                </p>
              </div>

              {/* Max Group Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Group Size *
                </label>
                <select
                  value={formData.maxGroupSize}
                  onChange={(e) => handleInputChange('maxGroupSize', parseInt(e.target.value))}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.maxGroupSize ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  {GROUP_SIZE_OPTIONS.map(size => (
                    <option key={size} value={size}>
                      {size} {size === 1 ? 'person' : 'people'}
                    </option>
                  ))}
                </select>
                {errors.maxGroupSize && (
                  <p className="mt-1 text-sm text-red-600">{errors.maxGroupSize}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Maximum number of travelers per tour
                </p>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Tour Images</h2>
            <p className="text-gray-600 mb-4">
              Add up to 5 images. The first image will be used as the cover photo.
            </p>
            
            {errors.images && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
                <p className="text-red-600 text-sm">{errors.images}</p>
              </div>
            )}
            
            <div className="space-y-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="shrink-0">
                    <div className="w-16 h-16 bg-gray-100 border border-gray-300 rounded flex items-center justify-center">
                      {url ? (
                        <Image
                          src={url}
                          alt={`Tour image ${index + 1}`}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-400 text-sm">{index + 1}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => handleImageUrlChange(index, e.target.value)}
                      placeholder="https://example.com/your-image.jpg"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Enter a direct image URL
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-900 mb-2">Image Tips</h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Use high-quality, landscape-oriented images</li>
                <li>• Show your city, landmarks, or activities</li>
                <li>• Include photos of you guiding (helps build trust)</li>
                <li>• Use image hosting services like ImgBB or Cloudinary</li>
              </ul>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => router.push('/dashboard/listings')}
              className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold"
            >
              {isSubmitting ? 'Saving...' : isEditMode ? 'Update Tour' : 'Create Tour'}
            </button>
          </div>
        </form>
      </main>

   
    </div>
  );
}