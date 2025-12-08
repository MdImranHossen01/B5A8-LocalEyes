"use client";

import { useState, useEffect } from "react";

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

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
      setIsTransitioning(false);
    }, 300);
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(
        (prev) => (prev - 1 + bannerImages.length) % bannerImages.length
      );
      setIsTransitioning(false);
    }, 300);
  };

  const goToSlide = (index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <section className="relative text-white overflow-hidden h-[70vh] sm:h-[75vh] md:h-[85vh] lg:h-[90vh]">
      {/* Background Images */}
      <div className="absolute inset-0">
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
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
            {/* Overlay gradient for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent md:from-black/70 md:via-black/50 md:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div
          className={`transition-all duration-500 ease-out transform ${
            isTransitioning
              ? "translate-y-4 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          {/* Image Title & Description */}
          <div className="mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-3 md:mb-4">
              {bannerImages[currentSlide].title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200">
              {bannerImages[currentSlide].description}
            </p>
          </div>

          {/* Search/CTA Section */}
          <div className="mt-6 sm:mt-8 md:mt-10 max-w-lg">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <input
                type="text"
                placeholder="Where do you want to explore?"
                className="flex-grow px-4 py-3 sm:py-4 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 sm:py-4 rounded-lg transition-colors duration-300">
                Find Tours
              </button>
            </div>
            <p className="mt-3 text-sm sm:text-base text-gray-300">
              Discover unique experiences with local guides
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 sm:p-3 rounded-full transition-all z-20"
        aria-label="Previous slide"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
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
        className="absolute right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 sm:p-3 rounded-full transition-all z-20"
        aria-label="Next slide"
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6"
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

      {/* Slide Indicators - Only visible on mobile/tablet */}
      <div className="absolute bottom-20 sm:bottom-24 md:hidden left-0 right-0 flex justify-center z-20">
        <div className="flex space-x-2">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentSlide === index
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent pt-8 pb-4 sm:pt-12 sm:pb-6 md:pt-16 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-center">
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
                500+
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-300">
                Local Guides
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
                1,200+
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-300">
                Tours Available
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
                98%
              </div>
              <div className="text-xs sm:text-sm md:text-base text-gray-300">
                Satisfaction Rate
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators for Desktop */}
      <div className="hidden md:block absolute bottom-32 lg:bottom-36 left-0 right-0">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex space-x-3">
            {bannerImages.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${
                  currentSlide === index
                    ? "bg-white/20 backdrop-blur-sm"
                    : "bg-transparent hover:bg-white/10"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    currentSlide === index ? "bg-white" : "bg-white/50"
                  }`}
                />
                <div className="text-left">
                  <div className="text-sm font-semibold">{image.title}</div>
                  <div className="text-xs text-gray-300">{image.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}