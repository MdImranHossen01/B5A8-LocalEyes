"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

interface Tour {
  _id: string;
  title: string;
  description: string;
  tourFee: number;
  duration: number;
  city: string;
  category: string;
  images: string[];
  rating: number;
  reviewsCount: number;
  guide: {
    _id: string;
    name: string;
    profilePic?: string;
    rating: number;
    reviewsCount: number;
    languages: string[];
  };
}

interface TourGridProps {
  tours: Tour[];
  isLoading: boolean;
}

export function TourGrid({ tours, isLoading }: TourGridProps) {
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse"
          >
            <div className="h-48 bg-gray-300"></div>
            <div className="p-6 space-y-4">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tours.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No tours found
        </h3>
        <p className="text-gray-600 mb-6">
          Try adjusting your search filters or browse all categories
        </p>
        <button
          onClick={() => router.push("/explore")}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse All Tours
        </button>
      </div>
    );
  }

  const handleTourClick = (tourId: string) => {
    router.push(`/tours/${tourId}`);
  };

  const formatDuration = (hours: number) => {
    if (hours < 1) return `${Math.round(hours * 60)}min`;
    if (hours === 1) return "1 hour";
    if (hours < 24) return `${hours} hours`;
    return `${Math.round(hours / 24)} days`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tours.map((tour) => (
        <div
          key={tour._id}
          className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover cursor-pointer"
          onClick={() => handleTourClick(tour._id)}
        >
          {/* Tour Image */}
          <div className="relative h-48">
            <Image
              src={tour.images?.[0] || "/profile.jpg"}
              alt={tour.title}
              height={400}
              width={400}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-sm font-semibold text-gray-900">
                ${tour.tourFee}
              </span>
            </div>
            <div className="absolute top-3 right-3">
              <span className="bg-black/70 text-white px-2 py-1 rounded text-sm">
                {tour.category}
              </span>
            </div>
          </div>

          {/* Tour Content */}
          <div className="p-6">
            {/* Guide Info */}
            <div className="flex items-center mb-4">
              <Image
                src={tour.guide.profilePic || "/profile.jpg"}
                alt={tour.guide.name}
                fill
                className="w-10 h-10 rounded-full object-cover mr-3"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-sm">
                  {tour.guide.name}
                </h4>
                <div className="flex items-center text-sm text-gray-600">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span>{tour.guide.rating || 4.5}</span>
                  <span className="mx-1">•</span>
                  <span>{tour.guide.reviewsCount || 0} reviews</span>
                </div>
              </div>
            </div>

            {/* Tour Title & Description */}
            <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
              {tour.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {tour.description}
            </p>

            {/* Tour Details */}
            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
              <div className="flex items-center">
                <span className="mr-2">📍</span>
                {tour.city}
              </div>
              <div className="flex items-center">
                <span className="mr-2">⏱️</span>
                {formatDuration(tour.duration)}
              </div>
            </div>

            {/* Languages */}
            <div className="flex flex-wrap gap-1 mb-4">
              {tour.guide.languages?.slice(0, 3).map((language) => (
                <span
                  key={language}
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                >
                  {language}
                </span>
              ))}
              {tour.guide.languages && tour.guide.languages.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{tour.guide.languages.length - 3} more
                </span>
              )}
            </div>

            {/* Action Button */}
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              View Details
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
