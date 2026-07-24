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
  { value: 12, label: '12 hours' },
  { value: 24, label: '1 Day (24 hours)' },
  { value: 48, label: '2 Days (48 hours)' },
  { value: 72, label: '3 Days (72 hours)' },
  { value: 96, label: '4 Days (96 hours)' },
  { value: 120, label: '5 Days (120 hours)' },
  { value: 144, label: '6 Days (144 hours)' },
  { value: 168, label: '7 Days / 1 Week' },
  { value: 240, label: '10 Days' },
  { value: 336, label: '14 Days / 2 Weeks' },
];

const GROUP_SIZE_OPTIONS = Array.from({ length: 20 }, (_, i) => i + 1);

export function CreateEditTourClient({ tour }: CreateEditTourClientProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { isLoading } = useProtectedRoute('user');
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

  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileUploadToImgBB = async (file: File, index: number) => {
    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

    if (!apiKey) {
      setUploadError('ImgBB API key is missing. Please configure NEXT_PUBLIC_IMGBB_API_KEY.');
      return;
    }

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, WebP, etc.)');
      return;
    }

    setUploadingIndex(index);
    setUploadError(null);

    try {
      const formDataObj = new FormData();
      formDataObj.append('image', file);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formDataObj,
      });

      const data = await res.json();

      if (data.success && data.data?.display_url) {
        const uploadedUrl = data.data.display_url || data.data.url;
        handleImageUrlChange(index, uploadedUrl);
      } else {
        throw new Error(data.error?.message || 'Failed to Upload Image');
      }
    } catch (err: any) {
      console.error('ImgBB upload error:', err);
      setUploadError(`Failed to upload image ${index + 1}: ${err.message || 'Unknown error'}`);
    } finally {
      setUploadingIndex(null);
    }
  };

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
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? 'border-red-500' : 'border-gray-300'
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
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? 'border-red-500' : 'border-gray-300'
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
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.itinerary ? 'border-red-500' : 'border-gray-300'
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
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.city ? 'border-red-500' : 'border-gray-300'
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
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.meetingPoint ? 'border-red-500' : 'border-gray-300'
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
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.duration ? 'border-red-500' : 'border-gray-300'
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
                  Price per Person (৳ Taka) *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-base">
                    ৳
                  </span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={formData.tourFee}
                    onChange={(e) => handleInputChange('tourFee', parseInt(e.target.value) || 0)}
                    className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.tourFee ? 'border-red-500' : 'border-gray-300'
                      }`}
                    placeholder="e.g. 1500"
                  />
                </div>
                {errors.tourFee && (
                  <p className="mt-1 text-sm text-red-600">{errors.tourFee}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  This is the price per person for the tour in BDT (৳)
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
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.maxGroupSize ? 'border-red-500' : 'border-gray-300'
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
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Tour Images</h2>
              <p className="text-gray-600 text-sm mt-1">
                Upload images directly to ImgBB or paste image links. The 1st image will be used as the cover photo.
              </p>
            </div>

            {errors.images && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm">{errors.images}</p>
              </div>
            )}

            {uploadError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center justify-between">
                <p className="text-red-600 text-sm font-medium">{uploadError}</p>
                <button
                  type="button"
                  onClick={() => setUploadError(null)}
                  className="text-red-500 hover:text-red-700 text-xs font-bold px-2 py-1"
                >
                  ✕
                </button>
              </div>
            )}

            <div className="space-y-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-2xl bg-gray-50/50 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="shrink-0 flex items-center gap-3">
                    <span className="text-xs font-bold text-gray-400 w-5 text-center">{index + 1}</span>
                    <div className="w-20 h-20 relative bg-gray-100 border border-gray-300 rounded-xl overflow-hidden flex items-center justify-center shrink-0 shadow-2xs">
                      {uploadingIndex === index ? (
                        <div className="flex flex-col items-center justify-center p-2 text-center">
                          <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-1"></div>
                          <span className="text-[10px] text-blue-600 font-semibold">Uploading...</span>
                        </div>
                      ) : url ? (
                        <Image
                          src={url}
                          alt={`Tour image ${index + 1}`}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400 text-xs font-semibold">No Image</span>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        id={`file-upload-${index}`}
                        className="hidden"
                        disabled={uploadingIndex !== null}
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            handleFileUploadToImgBB(e.target.files[0], index);
                          }
                        }}
                      />
                      <label
                        htmlFor={`file-upload-${index}`}
                        className={`inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl cursor-pointer transition-all shadow-xs ${uploadingIndex === index ? 'opacity-50 pointer-events-none' : ''
                          }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        <span>{url ? 'Change Image' : 'Upload Image'}</span>
                      </label>

                      {url && (
                        <button
                          type="button"
                          onClick={() => handleImageUrlChange(index, '')}
                          className="px-3 py-2 text-xs font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 border border-red-200 rounded-xl transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => handleImageUrlChange(index, e.target.value)}
                        placeholder="Or paste direct image URL (https://...)"
                        className="w-full text-xs px-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
                      />
                    </div>
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