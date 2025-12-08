"use client";

import Link from "next/link";
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
              <Link href="/explore">
                <button className="mt-6 px-6 py-3 bg-primary text-white font-semibold rounded-lg transition-colors duration-300 transform hover:scale-105">
                  Explore Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
