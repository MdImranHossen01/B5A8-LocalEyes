/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ImageGallery } from '@/components/tours/ImageGallery';
import { BookingWidget } from '@/components/tours/BookingWidget';
import { Share2, Check } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Tour {
  _id: string;
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
  tourDate?: string;
  tourTime?: string;
  isActive: boolean;
  rating: number;
  reviewsCount: number;
  guide: {
    _id: string;
    name: string;
    profilePic?: string;
    bio: string;
    rating: number;
    reviewsCount: number;
    languages: string[];
    expertise: string[];
    isVerified: boolean;
  };
}

interface TourDetailsClientProps {
  tour: Tour;
}

export function TourDetailsClient({ tour }: TourDetailsClientProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'itinerary'>('overview');
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast.success('Tour link copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy link', err);
      toast.error('Failed to copy link');
    }
  };

  if (!tour.isActive) {
    return (
      <div className="min-h-screen bg-gray-50">

        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Tour Not Available</h1>
          <p className="text-gray-600 mb-8">This tour is no longer available.</p>
          <button
            onClick={() => router.push('/explore')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Other Tours
          </button>
        </div>

      </div>
    );
  }

  const formatDuration = (hours: number) => {
    if (hours < 1) return `${Math.round(hours * 60)} minutes`;
    if (hours === 1) return '1 hour';
    if (hours < 24) return `${hours} hours`;
    const days = Math.round(hours / 24);
    return `${days} day${days > 1 ? 's' : ''}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">


      <main>
        {/* Image Gallery */}
        <ImageGallery images={tour.images} title={tour.title} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Left Column - Tour Content */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="mb-6">
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-semibold">
                      {tour.category}
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-lg text-sm font-semibold">
                      {tour.city}
                    </span>
                  </div>

                  {/* Copy Link Button */}
                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white hover:bg-slate-50 text-slate-700 hover:text-blue-600 text-xs font-semibold rounded-xl border border-slate-200 shadow-2xs transition-all cursor-pointer shrink-0"
                    title="Copy tour link"
                  >
                    {copied ? <Check size={15} className="text-emerald-600" /> : <Share2 size={15} className="text-blue-600" />}
                    <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
                  </button>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {tour.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
                  <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-800">
                    <span className="mr-1.5">⏱️</span>
                    {formatDuration(tour.duration)}
                  </div>
                  <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-800">
                    <span className="mr-1.5">👥</span>
                    Max {tour.maxGroupSize} people
                  </div>
                  <div className="flex items-center font-medium text-blue-700 bg-blue-50 px-3 py-1.5 rounded-lg text-sm">
                    <span className="mr-1.5">📅</span>
                    <span>{tour.tourDate || '2026-08-05'}</span>
                  </div>
                  <div className="flex items-center font-medium text-purple-700 bg-purple-50 px-3 py-1.5 rounded-lg text-sm">
                    <span className="mr-1.5">⏰</span>
                    <span>{tour.tourTime || '09:30 AM'}</span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'itinerary', label: 'Itinerary' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="prose max-w-none">
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">About this tour</h2>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {tour.description}
                      </p>
                    </div>


                    <div className="bg-blue-50 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-900 mb-3">What&apos;s included</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center">
                          <span className="mr-2">✅</span>
                          Professional local guide
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✅</span>
                          Personalized experience
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✅</span>
                          Local insights and stories
                        </li>
                        <li className="flex items-center">
                          <span className="mr-2">✅</span>
                          Photo opportunities
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Meeting Point</h3>
                      <p className="text-gray-700">{tour.meetingPoint}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'itinerary' && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Tour Itinerary</h2>
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                      <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                        {tour.itinerary}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 lg:mt-0">
              <div className="sticky top-8 space-y-6">
                <BookingWidget tour={tour} user={user} />
              </div>
            </div>
          </div>
        </div>
      </main>


    </div>
  );
}