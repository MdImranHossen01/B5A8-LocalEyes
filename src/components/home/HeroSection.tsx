"use client";

import { useState, useEffect, useCallback } from "react";

const bannerImages = [
  {
    src: "https://i.ibb.co/Qjr8R41K/Cox-s-Bazar-Sea-Beach-6772e5838c.webp",
    alt: "Cox's Bazar Sea Beach",
    title: "Cox's Bazar",
    description: "World's longest natural sea beach",
  },
  {
    src: "https://i.ibb.co/xtDjbbK1/sajek.webp",
    alt: "Sajek Valley",
    title: "Sajek Valley",
    description: "The roof of Rangamati",
  },
  {
    src: "https://i.ibb.co/d4jLqtGN/pngtree-nice-deer-standing-water.webp",
    alt: "Deer in forest",
    title: "Wildlife & Nature",
    description: "Experience untouched wilderness",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(
        (prev) => (prev - 1 + bannerImages.length) % bannerImages.length
      );
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning]);

  // Go to specific slide (for dots)
  const goToSlide = (index: number) => {
    if (index === currentSlide || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 300);
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative text-white overflow-hidden h-[85vh] min-h-[550px] md:h-[90vh]">
      {/* Background Images */}
      <div className="absolute inset-0">
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              currentSlide === index
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
            style={{
              backgroundImage: `url(${image.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Darker Overlay for better text readability on all devices */}
            <div className="absolute inset-0 bg-black/40 md:bg-black/30" />
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col justify-center pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div
            className={`max-w-3xl transition-all duration-700 transform ${
              isTransitioning
                ? "translate-y-4 opacity-0"
                : "translate-y-0 opacity-100"
            }`}
          >
            {/* Image Title & Description */}
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                {bannerImages[currentSlide].title}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gray-200 max-w-xl font-medium">
                {bannerImages[currentSlide].description}
              </p>
              
              {/* Optional CTA Button */}
              <button className="mt-6 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-lg transition-colors duration-300 transform hover:scale-105">
                Explore Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Hidden on very small screens if needed, or adjusted size */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 md:left-8 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-white/20 backdrop-blur-sm p-2 md:p-3 rounded-full transition-all z-20 text-white border border-white/20"
        aria-label="Previous slide"
      >
        <svg
          className="w-5 h-5 md:w-6 md:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 md:right-8 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-white/20 backdrop-blur-sm p-2 md:p-3 rounded-full transition-all z-20 text-white border border-white/20"
        aria-label="Next slide"
      >
        <svg
          className="w-5 h-5 md:w-6 md:h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Slide Indicators (Dots) */}
      <div className="absolute bottom-24 md:bottom-32 left-0 right-0 z-20">
        <div className="flex justify-center space-x-2">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "bg-white w-6 md:w-8"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Stats Bar - Completely Redesigned for Mobile */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent pt-12 pb-6 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Using grid-cols-3 even on mobile to prevent vertical stacking taking up too much height */}
          <div className="grid grid-cols-3 gap-2 md:gap-8 text-center divide-x divide-white/20 md:divide-none">
            <div className="px-1">
              <div className="text-xl sm:text-3xl md:text-4xl font-bold mb-1 md:mb-2 text-teal-400">500+</div>
              <div className="text-[10px] sm:text-sm md:text-base text-gray-300 uppercase tracking-wider">Local Guides</div>
            </div>
            <div className="px-1">
              <div className="text-xl sm:text-3xl md:text-4xl font-bold mb-1 md:mb-2 text-teal-400">1.2k+</div>
              <div className="text-[10px] sm:text-sm md:text-base text-gray-300 uppercase tracking-wider">Tours</div>
            </div>
            <div className="px-1">
              <div className="text-xl sm:text-3xl md:text-4xl font-bold mb-1 md:mb-2 text-teal-400">98%</div>
              <div className="text-[10px] sm:text-sm md:text-base text-gray-300 uppercase tracking-wider">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}