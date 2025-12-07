'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from 'swiper/modules';
import { ArrowLeft, ArrowRight, Star, Clock } from 'lucide-react';
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
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const categories: Category[] = [
    {
      id: 'food',
      name: 'Food & Dining',
      description: 'Experience authentic local cuisine with expert food guides who know the best spots in town.',
      highlight: 'Culinary Adventures',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
      icon: '🍜',
      rating: 4.8,
      duration: '2-4 hours',
      tourCount: 324,
      color: { from: 'from-orange-500', to: 'to-red-500', glow: 'orange' },
    },
    {
      id: 'history',
      name: 'History & Culture',
      description: 'Explore historical sites and cultural heritage with knowledgeable local historians.',
      highlight: 'Cultural Heritage',
      image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=800&q=80',
      icon: '🏛️',
      rating: 4.7,
      duration: '3-5 hours',
      tourCount: 287,
      color: { from: 'from-amber-500', to: 'to-yellow-500', glow: 'yellow' },
    },
    {
      id: 'adventure',
      name: 'Adventure',
      description: 'Thrilling outdoor activities and adrenaline-pumping adventures for thrill-seekers.',
      highlight: 'Outdoor Thrills',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
      icon: '⛰️',
      rating: 4.9,
      duration: '4-8 hours',
      tourCount: 156,
      color: { from: 'from-green-500', to: 'to-emerald-500', glow: 'emerald' },
    },
    {
      id: 'art',
      name: 'Art & Architecture',
      description: 'Discover local art scenes and architectural wonders with artist guides.',
      highlight: 'Creative Exploration',
      image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
      icon: '🎨',
      rating: 4.6,
      duration: '2-3 hours',
      tourCount: 198,
      color: { from: 'from-purple-500', to: 'to-pink-500', glow: 'purple' },
    },
    {
      id: 'nature',
      name: 'Nature & Wildlife',
      description: 'Connect with nature and local wildlife in pristine natural environments.',
      highlight: 'Wildlife Encounters',
      image: 'https://images.unsplash.com/photo-1631280634576-c631714f1a72?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      icon: '🌿',
      rating: 4.8,
      duration: '3-6 hours',
      tourCount: 142,
      color: { from: 'from-emerald-500', to: 'to-teal-500', glow: 'teal' },
    },
    {
      id: 'shopping',
      name: 'Shopping & Markets',
      description: 'Local markets and unique shopping experiences with personal shopping guides.',
      highlight: 'Market Finds',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
      icon: '🛍️',
      rating: 4.5,
      duration: '2-3 hours',
      tourCount: 89,
      color: { from: 'from-pink-500', to: 'to-rose-500', glow: 'pink' },
    },
    {
      id: 'photography',
      name: 'Photography Tours',
      description: 'Capture stunning photos with professional photographer guides at picturesque locations.',
      highlight: 'Photo Ops',
      image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=800&q=80',
      icon: '📷',
      rating: 4.7,
      duration: '3-4 hours',
      tourCount: 112,
      color: { from: 'from-blue-500', to: 'to-cyan-500', glow: 'blue' },
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

  const handleCategoryClick = (category: string) => {
    router.push(`/explore?category=${encodeURIComponent(category)}`);
  };

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
        
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #3b82f6;
          opacity: 0.5;
          transition: all 0.3s;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          width: 32px;
          border-radius: 6px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
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
            grabCursor={true}
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
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              nextEl: ".pagination-next",
              prevEl: ".pagination-pre",
            }}
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
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="!pb-16"
          >
            {categories.map((category, index) => {
              const colorScheme = colors[index % colors.length];
              return (
                <SwiperSlide key={index} className="!h-auto">
                  <div
                    onClick={() => handleCategoryClick(category.id)}
                    className="group relative h-full rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] bg-white dark:bg-gray-800 cursor-pointer"
                  >
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <Image
                        src={category.image}
                        alt={category.name}
                        fill
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
              
                      <div className="absolute top-4 left-4">
                        <div
                          className="px-4 py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full shadow-lg border-2 border-white/50"
                        >
                          <span
                            className={`text-lg font-bold bg-gradient-to-r ${colorScheme.from} ${colorScheme.to} bg-clip-text text-transparent`}
                          >
                            {category.name}
                          </span>
                        </div>
                      </div>
                      
                      <div className="absolute top-4 right-4">
                        <div className="w-12 h-12 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-2xl animate-float-up border-2 border-white/50">
                          {category.icon}
                        </div>
                      </div>
                      
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
                        <div
                          className={`px-4 py-2 bg-gradient-to-r ${colorScheme.from} ${colorScheme.to} rounded-xl shadow-lg backdrop-blur-sm`}
                        >
                          <div className="flex items-center justify-center gap-2 text-white font-bold text-sm">
                            <span>{category.highlight}</span>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                          {category.tourCount} tours →
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
          
          <button className="pagination-pre absolute left-0 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center group transition-all duration-300 hover:scale-110 border-2 border-blue-500/20">
            <ArrowLeft className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          
          <button className="pagination-next absolute right-0 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-xl hover:shadow-2xl flex items-center justify-center group transition-all duration-300 hover:scale-110 border-2 border-blue-500/20">
            <ArrowRight className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform" />
          </button>
          
          <div className="swiper-pagination !bottom-0"></div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => router.push('/explore')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:shadow-xl transition-all duration-300 font-semibold text-lg hover:scale-105"
          >
            Browse All Categories
          </button>
        </div>
      </div>
    </>
  );
}