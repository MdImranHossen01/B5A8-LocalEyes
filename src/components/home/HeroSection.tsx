'use client';

import { useState, useEffect } from 'react';

const bannerImages = [
  {
    src: 'https://i.ibb.co/Qjr8R41K/Cox-s-Bazar-Sea-Beach-6772e5838c.webp',
    alt: 'Cox\'s Bazar Sea Beach',
    title: 'Cox\'s Bazar',
    description: 'World\'s longest natural sea beach'
  },
  {
    src: 'https://i.ibb.co/xtDjbbK1/sajek.webp',
    alt: 'Sajek Valley',
    title: 'Sajek Valley',
    description: 'The roof of Rangamati'
  },
  {
    src: 'https://i.ibb.co/d4jLqtGN/pngtree-nice-deer-standing-water.webp',
    alt: 'Deer in forest',
    title: 'Wildlife & Nature',
    description: 'Experience untouched wilderness'
  }
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
      setIsTransitioning(false);
    }, 300);
  };

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
      setIsTransitioning(false);
    }, 300);
  };

 



 

  return (
    <section className="relative text-white overflow-hidden h-[85vh] md:h-[90vh]">
      {/* Background Images */}
      <div className="absolute inset-0">
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index 
                ? 'opacity-100' 
                : 'opacity-0 pointer-events-none'
            }`}
            style={{
              backgroundImage: `url(${image.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`transition-all duration-700 transform ${
            isTransitioning ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'
          }`}>
            {/* Image Title & Description */}
            <div className="mb-8">
              <h2 className="text-3xl md:text-5xl font-bold mb-3">
                {bannerImages[currentSlide].title}
              </h2>
              <p className="text-xl md:text-2xl text-gray-200">
                {bannerImages[currentSlide].description}
              </p>
            </div>
      
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all z-20"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all z-20"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

   

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
              <div className="text-gray-300">Local Guides</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">1,200+</div>
              <div className="text-gray-300">Tours Available</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">98%</div>
              <div className="text-gray-300">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

     
    </section>
  );
}