'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MapPin, Clock, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface TourPackage {
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
}

export function FeaturedPackages() {
  const router = useRouter();
  const [packages, setPackages] = useState<TourPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'domestic' | 'international'>('all');

  const domesticCities = ['Sundarbans', 'Cox\'s Bazar', 'Sajek Valley', 'Sylhet', 'Sreemangal'];

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/listings?limit=12');
      const data = await res.json();
      if (res.ok && data.tours) {
        setPackages(data.tours);
      }
    } catch (err) {
      console.error('Error loading featured packages:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (hours: number) => {
    if (hours < 24) return `${hours} hours`;
    const days = Math.round(hours / 24);
    return `${days} day${days > 1 ? 's' : ''}`;
  };

  const filteredPackages = packages.filter((pkg) => {
    if (activeFilter === 'domestic') {
      return domesticCities.some(city => pkg.city.toLowerCase().includes(city.toLowerCase()));
    }
    if (activeFilter === 'international') {
      return !domesticCities.some(city => pkg.city.toLowerCase().includes(city.toLowerCase()));
    }
    return true;
  });

  return (
    <section className="py-10 md:py-16 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Handcrafted Journeys</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
              Featured Tour Packages
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 max-w-xl">
              Explore our best-selling domestic and international travel packages with transparent pricing and full visa & flight support.
            </p>
          </div>

          {/* Filter Pills & Controls */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-1.5 bg-white dark:bg-gray-900 p-1.5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                All ({packages.length})
              </button>
              <button
                onClick={() => setActiveFilter('domestic')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeFilter === 'domestic'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                🇧🇩 Domestic (5)
              </button>
              <button
                onClick={() => setActiveFilter('international')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeFilter === 'international'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                🌐 International (7)
              </button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button className="swiper-button-prev-pkg w-10 h-10 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="swiper-button-next-pkg w-10 h-10 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-800 h-96 rounded-3xl animate-pulse" />
            ))}
          </div>
        )}

        {/* Swiper Carousel */}
        {!loading && filteredPackages.length > 0 && (
          <div className="relative">
            <Swiper
              key={activeFilter}
              modules={[Autoplay, Navigation]}
              spaceBetween={28}
              slidesPerView={1}
              loop={filteredPackages.length > 3}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              navigation={{
                prevEl: '.swiper-button-prev-pkg',
                nextEl: '.swiper-button-next-pkg',
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 28,
                },
              }}
              className="featured-swiper"
            >
              {filteredPackages.map((pkg) => (
                <SwiperSlide key={pkg._id} className="h-auto">
                  <div className="group bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200/80 dark:border-gray-800 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full">
                    {/* Image Container */}
                    <div
                      className="relative h-60 w-full overflow-hidden cursor-pointer"
                      onClick={() => router.push(`/tours/${pkg._id}`)}
                    >
                      <Image
                        src={pkg.images?.[0] || '/assets/package/sundarbans.webp'}
                        alt={pkg.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Price Tag */}
                      <div className="absolute top-4 left-4 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-gray-200/50 dark:border-gray-800/50">
                        <span className="text-sm font-black text-gray-900 dark:text-white">
                          ${pkg.tourFee}
                        </span>
                      </div>

                      {/* Category Pill */}
                      <div className="absolute top-4 right-4 bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                        <span className="text-[11px] font-bold text-white uppercase tracking-wider">
                          {pkg.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3
                          onClick={() => router.push(`/tours/${pkg._id}`)}
                          className="text-xl font-extrabold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 cursor-pointer"
                        >
                          {pkg.title}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 line-clamp-2 leading-relaxed">
                          {pkg.description}
                        </p>
                      </div>

                      {/* Info Badges */}
                      <div className="pt-4 border-t border-gray-100 dark:border-gray-800/60 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 font-medium">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <span>{pkg.city}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-orange-500" />
                          <span>{formatDuration(pkg.duration)}</span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={() => router.push(`/tours/${pkg._id}`)}
                        className="w-full mt-2 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl transition-all font-bold text-sm shadow-sm group-hover:shadow-md"
                      >
                        View Details
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push('/explore')}
            className="inline-flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white px-8 py-3.5 rounded-2xl hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all font-bold text-sm shadow-sm"
          >
            Explore All 12 Packages
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
