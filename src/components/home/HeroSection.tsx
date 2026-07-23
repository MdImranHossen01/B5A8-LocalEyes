"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Compass } from "lucide-react";

const bannerImages = [
  {
    src: "/assets/banner/global-travel.webp",
    alt: "Global Travel & Visa Services",
    title: "Global Travel & Visa Services",
  },
  {
    src: "/assets/banner/hajj-umrah.webp",
    alt: "Spiritual Hajj & Umrah",
    title: "Spiritual Hajj & Umrah",
  },
  {
    src: "/assets/banner/luxury-holiday.webp",
    alt: "Premium Holiday Packages",
    title: "Premium Holiday Packages",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
  }, []);

  // Auto slide every 6 seconds for a relaxed, luxury feel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative text-white overflow-hidden h-[85vh] min-h-[550px] md:h-[90vh]">
      {/* Background Images with Cross-Fade */}
      <div className="absolute inset-0">
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              currentSlide === index
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105 pointer-events-none"
            }`}
            style={{
              backgroundImage: `url(${image.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Darker Overlay for maximum contrast */}
            <div className="absolute inset-0 bg-black/40 md:bg-black/35" />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col justify-center pb-12 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            
            {/* Title with AnimatePresence for Silky Smooth Transitions */}
            <div className="min-h-[100px] sm:min-h-[130px] md:min-h-[160px] lg:min-h-[180px] flex items-end">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={currentSlide}
                  initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-white drop-shadow-md"
                >
                  {bannerImages[currentSlide].title}
                </motion.h2>
              </AnimatePresence>
            </div>

            {/* Fixed Action Buttons */}
            <div className="flex flex-row items-center gap-3 mt-6">
              <Link href="/explore">
                <button className="px-3 py-1.5 sm:px-5 sm:py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Explore Now
                </button>
              </Link>

              <a
                href="https://wa.me/8801911170535"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex px-3 py-1.5 sm:px-5 sm:py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25 items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Contact
              </a>
            </div>

          </div>
        </div>

        {/* Slide Indicators / Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                currentSlide === index
                  ? "w-8 bg-blue-500"
                  : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
