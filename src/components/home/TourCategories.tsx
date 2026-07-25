'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import {
  EffectCoverflow,
  Autoplay,
} from 'swiper/modules';
import { Star } from 'lucide-react';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  description: string;
  highlight: string;
  image: string;
  icon: string;
  rating: number;
  duration: string;
  tourCount: number;
  color: {
    from: string;
    to: string;
    glow: string;
  };
}

export function TourCategories() {
  const router = useRouter();
  const categories: Category[] = [
    {
      id: 'flight-bookings',
      name: 'Flight Bookings',
      description: 'Book domestic and international tickets with all major airlines at competitive pricing.',
      highlight: 'Instant Confirmation',
      image: '/assets/slider/air-tickets.webp',
      icon: '✈️',
      rating: 4.9,
      duration: '24/7 Support',
      tourCount: 1250,
      color: { from: 'from-blue-500', to: 'to-indigo-500', glow: 'blue' },
    },
    {
      id: 'hajj-umrah',
      name: 'Hajj & Umrah',
      description: 'Fully guided spiritual Hajj and Umrah packages with premium accommodations and guides.',
      highlight: 'Spiritual Journeys',
      image: '/assets/slider/hajj-umrah.webp',
      icon: '🕌',
      rating: 5.0,
      duration: 'Premium Hotels',
      tourCount: 450,
      color: { from: 'from-emerald-500', to: 'to-teal-500', glow: 'emerald' },
    },
    {
      id: 'visa-services',
      name: 'Visa Services',
      description: 'Hassle-free visa application and processing support for all major countries.',
      highlight: 'High Success Rate',
      image: '/assets/slider/visa-processing.webp',
      icon: '📄',
      rating: 4.8,
      duration: 'Express Support',
      tourCount: 950,
      color: { from: 'from-amber-500', to: 'to-yellow-500', glow: 'yellow' },
    },
    {
      id: 'holiday-packages',
      name: 'Holiday Packages',
      description: 'Exotic domestic and international tour packages customized to your travel budget.',
      highlight: 'Customized Deals',
      image: '/assets/slider/holiday-packages.webp',
      icon: '🏝️',
      rating: 4.9,
      duration: 'Family Friendly',
      tourCount: 870,
      color: { from: 'from-orange-500', to: 'to-red-500', glow: 'orange' },
    },
    {
      id: 'medical-tourism',
      name: 'Medical Tourism',
      description: 'Complete healthcare travel assistance, doctor appointments, and hospital packages abroad.',
      highlight: 'Complete Care Support',
      image: '/assets/slider/medical-tourism.webp',
      icon: '🏥',
      rating: 4.8,
      duration: 'India/Global Care',
      tourCount: 310,
      color: { from: 'from-pink-500', to: 'to-rose-500', glow: 'pink' },
    },
    {
      id: 'student-visa',
      name: 'Student Visa Support',
      description: 'Comprehensive counseling, university admission, and study visa processing services.',
      highlight: 'Study Abroad Support',
      image: '/assets/slider/student-visa.webp',
      icon: '🎓',
      rating: 4.9,
      duration: 'Admission Guidance',
      tourCount: 220,
      color: { from: 'from-purple-500', to: 'to-pink-500', glow: 'purple' },
    },
  ];

  const colors = [
    { from: "from-orange-500", to: "to-red-500", glow: "orange" },
    { from: "from-amber-500", to: "to-yellow-500", glow: "yellow" },
    { from: "from-green-500", to: "to-emerald-500", glow: "emerald" },
    { from: "from-purple-500", to: "to-pink-500", glow: "purple" },
    { from: "from-emerald-500", to: "to-teal-500", glow: "teal" },
    { from: "from-pink-500", to: "to-rose-500", glow: "pink" },
    { from: "from-blue-500", to: "to-cyan-500", glow: "blue" },
  ];

  return (
    <>
      <style>{`
        @keyframes float-up {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-float-up { animation: float-up 4s ease-in-out infinite; }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>

      <div className="relative container w-full mx-auto mt-10 px-4 pb-16 lg:pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-br from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl -z-10"></div>
        
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-4xl text-gray-800 dark:text-white md:text-5xl font-extrabold text-center mb-4">
            Tour <span className="text-blue-600">Categories</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-200 max-w-2xl mx-auto">
            Find experiences that match your interests and passions with our expert local guides
          </p>
        </div>
        
        <div className="relative">
          <Swiper
            effect={"coverflow"}
            grabCursor={false}
            centeredSlides={true}
            loop={true}
            slidesPerView={1}
            spaceBetween={20}
            coverflowEffect={{
              rotate: 10,
              stretch: 0,
              depth: 200,
              modifier: 1.5,
              slideShadows: false,
            }}
            pagination={false}
            breakpoints={{
              640: { slidesPerView: 1.5, spaceBetween: 25 },
              1024: { slidesPerView: 2.5, spaceBetween: 30 },
              1280: { slidesPerView: 3, spaceBetween: 35 },
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[EffectCoverflow, Autoplay]}
            className="!pb-4"
          >
            {categories.map((category, index) => {
              const colorScheme = colors[index % colors.length];
              return (
                <SwiperSlide key={index} className="!h-auto">
                  <div
                    onClick={() => router.push(`/explore?category=${encodeURIComponent(category.name)}`)}
                    className="group relative h-full rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] bg-white dark:bg-gray-800 select-none cursor-pointer"
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-3 py-2 rounded-full">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-white text-sm font-semibold">{category.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6 relative">
                      <div
                        className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${colorScheme.from} ${colorScheme.to} opacity-5 rounded-bl-full`}
                      ></div>
                      
                      <h3
                        className={`text-xl sm:text-2xl font-bold mb-3 bg-gradient-to-r ${colorScheme.from} ${colorScheme.to} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300 origin-left`}
                      >
                        {category.name}
                      </h3>
                      
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                        {category.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                          {category.tourCount} tours
                        </span>
                      </div>
                      
                      <div
                        className={`mt-4 h-1 w-16 bg-gradient-to-r ${colorScheme.from} ${colorScheme.to} rounded-full group-hover:w-full transition-all duration-500`}
                      ></div>
                    </div>

                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${colorScheme.from} ${colorScheme.to} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}
                    ></div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </>
  );
}