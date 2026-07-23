import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Compass, Users, Heart, Award } from "lucide-react";

export const metadata = {
  title: "About Us - Khulna Tours & Travels",
  description: "Learn more about our mission to bring authentic travel experiences to the world.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black italic tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            About Our Journey
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-medium">
            Connecting travelers with authentic local experiences since 2024.
          </p>
        </div>
        <div className="absolute inset-0 bg-blue-900/10 pointer-events-none" />
      </div>

      {/* Our Mission & Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">Our Story</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              Khulna Tours & Travels started with a simple belief: that travel is most rewarding when you experience it through local eyes. We bridges the gap between travelers searching for authentic journeys and professional guides eager to share their expertise.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              From flight ticket bookings and visa processing to specialized Sundarbans expeditions, Hajj & Umrah guidance, and international flight mapping, we curate comprehensive, hassle-free travel solutions.
            </p>
          </div>
          <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800"
              alt="Our Story Illustration"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-white dark:bg-gray-900 py-16 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-600 dark:text-blue-400">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Compass className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Authenticity</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                We believe in genuine connections and raw experiences that create memories of a lifetime.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Customer Care</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Your safety and comfort are our topmost priority with 24/7 dedicated travel support.
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Top-rated packages, vetted hotels, and professional flight configurations for premium itineraries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
