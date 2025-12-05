"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Testimonial } from "./types";
import Image from "next/image";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(1); // Start with the middle one for visual balance if we had more, but 0-indexed logic applies
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials: Testimonial[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      location: "From Canada",
      avatar: "https://i.ibb.co.com/DDnRCVN7/lawyer-10.jpg",
      rating: 5,
      comment:
        "My guide Maria showed me parts of Barcelona I would never have found on my own. The tapas tour was incredible!",
      tour: "Barcelona Food & Culture Tour",
      date: "March 2024",
    },
    {
      id: "2",
      name: "Michael Chen",
      location: "From Australia",
      avatar: "https://i.ibb.co.com/PzjtJT3K/lawyer-9.jpg",
      rating: 5,
      comment:
        "Kenji-san made our Tokyo experience unforgettable. His knowledge of hidden temples and local cuisine was outstanding.",
      tour: "Tokyo Hidden Gems Tour",
      date: "February 2024",
    },
    {
      id: "3",
      name: "Emma Williams",
      location: "From UK",
      avatar: "https://i.ibb.co.com/8Dj17xYJ/lawyer-11.jpg",
      rating: 5,
      comment:
        "Sophie brought Parisian art to life in a way no museum tour ever could. An absolutely magical experience!",
      tour: "Paris Art Walk",
      date: "January 2024",
    },
  ];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAutoPlaying) {
      interval = setInterval(handleNext, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, handleNext]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Helper to get indices for the 3-card layout
  const getCardIndex = (offset: number) => {
    return (currentIndex + offset + testimonials.length) % testimonials.length;
  };

  const prevIndex = getCardIndex(-1);
  const nextIndex = getCardIndex(1);

  return (
    <section
      className="py-20 bg-linear-to-br from-[#d9f4e6] to-[#c8e6ff] overflow-hidden min-h-[800px] flex flex-col justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Traveler Stories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Don&apos;t just take our word for it - hear from travelers who&apos;ve
            explored with our guides
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative flex items-center justify-center gap-4 md:gap-8 lg:gap-12 mt-12">
          {/* Previous Card (Left) */}
          <div
            className="hidden md:block w-1/3 max-w-sm opacity-60 scale-90 transition-all duration-500 ease-in-out blur-[1px] hover:blur-0 hover:opacity-80 cursor-pointer"
            onClick={handlePrev}
          >
            <TestimonialCard data={testimonials[prevIndex]} isActive={false} />
          </div>

          {/* Navigation Button Left */}
          <button
            onClick={handlePrev}
            className="absolute left-[20%] md:static md:left-auto z-30 bg-[#0e4b6c] hover:bg-[#0c3e59] text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={32} strokeWidth={3} />
          </button>

          {/* Active Card (Center) */}
          <div className="w-full md:w-1/3 max-w-md z-20 scale-100 md:scale-110 transition-all duration-500 ease-in-out">
            <TestimonialCard
              data={testimonials[currentIndex]}
              isActive={true}
            />
          </div>

          {/* Navigation Button Right */}
          <button
            onClick={handleNext}
            className="absolute right-[20%] md:static md:right-auto z-30 bg-[#0e4b6c] hover:bg-[#0c3e59] text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 focus:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight size={32} strokeWidth={3} />
          </button>

          {/* Next Card (Right) */}
          <div
            className="hidden md:block w-1/3 max-w-sm opacity-60 scale-90 transition-all duration-500 ease-in-out blur-[1px] hover:blur-0 hover:opacity-80 cursor-pointer"
            onClick={handleNext}
          >
            <TestimonialCard data={testimonials[nextIndex]} isActive={false} />
          </div>
        </div>

        {/* Mobile Indicators */}
        <div className="flex justify-center mt-12 space-x-2 md:hidden">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? "bg-[#0e4b6c] w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Sub-component for individual cards
function TestimonialCard({
  data,
  isActive,
}: {
  data: Testimonial;
  isActive: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-4xl p-8 pt-0 shadow-xl relative mt-12 flex flex-col items-center text-center h-full transition-shadow duration-300 ${
        isActive ? "shadow-2xl" : "shadow-lg"
      }`}
    >
      {/* Avatar - Floating on top */}
      <div className="-mt-12 mb-6 relative">
        <div className="w-24 h-24 relative rounded-full overflow-hidden border-4 border-white shadow-md">
          <Image
            src={data.avatar}
            alt={data.name}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Content */}
      <h3 className="text-xl font-bold text-gray-900 mb-2">{data.name}</h3>

      {/* Stars */}
      <div className="flex gap-1 mb-6 text-[#0e4b6c]">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={20}
            fill={i < data.rating ? "#0e4b6c" : "none"}
            className="text-[#0e4b6c]"
          />
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-gray-600 italic leading-relaxed text-sm mb-6">
        &quot;{data.comment}&quot;
      </blockquote>

      {/* Location/Date (Optional - kept minimalist as per design) */}
      <div className="mt-auto pt-4 border-t border-gray-100 w-full">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
          {data.location}
        </p>
      </div>
    </div>
  );
}
