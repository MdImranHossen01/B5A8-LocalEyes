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
      name: "তানভীর আহমেদ",
      location: "ঢাকা, বাংলাদেশ",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      comment:
        "খুলনা ও সুন্দরবন ট্যুরের অভিজ্ঞতা অসাধারণ ছিল। হাউজবোট সার্ভিস এবং ম্যানগ্রোভ ফরেস্টের ওয়াইল্ডলাইফ সফরটি জীবনের অন্যতম সেরা মুহূর্ত।",
      tour: "Sundarbans Wild Exploration",
      date: "মার্চ ২০২৪",
    },
    {
      id: "2",
      name: "সাদিয়া রহমান",
      location: "চট্টগ্রাম, বাংলাদেশ",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      comment:
        "কক্সবাজার এবং সাজেক ভ্যালির ট্যুর প্যাকেজটি খুব সুন্দরভাবে অর্গানাইজ করা হয়েছিল। হোটেল রিকমেন্ডেশন ও গাইড চমৎকার ছিল!",
      tour: "Cox's Bazar & Sajek Valley",
      date: "ফেব্রুয়ারি ২০২৪",
    },
    {
      id: "3",
      name: "আরিফুল ইসলাম",
      location: "সিলেট, বাংলাদেশ",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      comment:
        "ষাট গম্বুজ মসজিদ এবং রূপসা রিভার ক্রুজ ট্যুর ছিল দারুণ শিক্ষণীয় ও উপভোগ্য। সার্ভিস কোয়ালিটি সত্যিই চমৎকার!",
      tour: "Historical Bagerhat & Rupsha Cruise",
      date: "জানুয়ারি ২০২৪",
    },
    {
      id: "4",
      name: "মাহমুদুল হাসান",
      location: "রাজশাহী, বাংলাদেশ",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      comment:
        "দুবাই ডেসার্ট সাফারি ও ইন্টারন্যাশনাল ট্যুর প্যাকেজটি আমার পুরো পরিবারের জন্য খুব নিরাপদ এবং আনন্দদায়ক ছিল।",
      tour: "Dubai Desert Safari",
      date: "মে ২০২৪",
    },
    {
      id: "5",
      name: "নুসরাত জাহান",
      location: "বরিশাল, বাংলাদেশ",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      comment:
        "শ্রীমঙ্গল চা বাগান এবং রাতারগুল জলার বন সফরটি মন ছুয়ে গেছে। সার্ভিস এবং গাইড আতিথেয়তা দারুণ ছিল!",
      tour: "Sylhet & Sreemangal Nature Tour",
      date: "এপ্রিল ২০২৪",
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
      className="py-10 md:py-16 overflow-hidden min-h-[500px] md:min-h-[800px] flex flex-col justify-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-primary mb-6 uppercase tracking-tight">
            Traveler Reviews
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg font-medium">
            আমাদের ভ্রমণ প্যাকেজে ঘুরে আসা সম্মানিত ট্রাভেলারদের মূল্যবান অনুভূতি ও পর্যালোচনা
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 lg:gap-12 mt-12">
          {/* Previous Card (Left) - desktop only */}
          <div
            className="hidden md:block w-1/3 max-w-sm opacity-60 scale-90 transition-all duration-500 ease-in-out blur-[1px] hover:blur-0 hover:opacity-80 cursor-pointer"
            onClick={handlePrev}
          >
            <TestimonialCard data={testimonials[prevIndex]} isActive={false} />
          </div>

          {/* Active Card (Center) */}
          <div className="w-full md:w-1/3 max-w-md z-20 scale-100 md:scale-110 transition-all duration-500 ease-in-out">
            <TestimonialCard
              data={testimonials[currentIndex]}
              isActive={true}
            />
          </div>

          {/* Desktop Navigation Buttons — Absolute Left & Right overlay */}
          <button
            onClick={handlePrev}
            className="hidden md:flex absolute left-4 lg:left-12 z-30 bg-[#0e4b6c] hover:bg-[#0c3e59] text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 focus:outline-none"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={32} strokeWidth={3} />
          </button>

          <button
            onClick={handleNext}
            className="hidden md:flex absolute right-4 lg:right-12 z-30 bg-[#0e4b6c] hover:bg-[#0c3e59] text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 focus:outline-none"
            aria-label="Next testimonial"
          >
            <ChevronRight size={32} strokeWidth={3} />
          </button>

          {/* Next Card (Right) - desktop only */}
          <div
            className="hidden md:block w-1/3 max-w-sm opacity-60 scale-90 transition-all duration-500 ease-in-out blur-[1px] hover:blur-0 hover:opacity-80 cursor-pointer"
            onClick={handleNext}
          >
            <TestimonialCard data={testimonials[nextIndex]} isActive={false} />
          </div>

          {/* Mobile Navigation Buttons — below card, no overlap */}
          <div className="flex md:hidden items-center justify-center gap-6 mt-4">
            <button
              onClick={handlePrev}
              className="bg-[#0e4b6c] hover:bg-[#0c3e59] text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110 focus:outline-none"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} strokeWidth={3} />
            </button>
            <button
              onClick={handleNext}
              className="bg-[#0e4b6c] hover:bg-[#0c3e59] text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110 focus:outline-none"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* Mobile Indicators */}
        <div className="flex justify-center mt-12 space-x-2 md:hidden">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-[#0e4b6c] w-6" : "bg-gray-300"
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
      className={`bg-white rounded-4xl p-8 pt-0 shadow-xl relative mt-12 flex flex-col items-center text-center h-full transition-shadow duration-300 ${isActive ? "shadow-2xl" : "shadow-lg"
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
      <h3 className="text-xl font-bold text-primary mb-2">{data.name}</h3>

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
      <blockquote className="text-muted-foreground italic leading-relaxed text-sm mb-6">
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
