"use client";
import Link from 'next/link';
import { Compass, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
 

 

  return (
    <div className="min-h-screen pt-20 bg-linear-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-200 dark:bg-pink-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Animated 404 Graphic */}
        <div className="relative mb-12">
          <div className="text-9xl md:text-[12rem] font-bold text-gray-900 dark:text-white opacity-10">
            404
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="w-64 h-64 rounded-full border-8 border-dashed border-blue-500/30 animate-spin-slow"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-40 h-40 rounded-full border-4 border-dotted border-purple-500/40 animate-spin-reverse"></div>
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-20 h-20 bg-linear-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl animate-float">
                  <Compass className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
          Lost Your <span className="text-blue-600 dark:text-blue-400">Way?</span>
        </h1>
        
        {/* Description */}
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          It looks like the page you&apos;re searching for has wandered off the beaten path. 
          Don&apos;t worry, even the best explorers get lost sometimes!
        </p>

       
       

       

        {/* Main CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Return Home
          </Link>
          <Link
            href="/explore"
            className="group inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-2 border-blue-500 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Explore Tours
            <Compass className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          </Link>
        </div>

       

       
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 right-10 w-20 h-20 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-full animate-bounce"></div>
      <div className="absolute top-10 left-10 w-16 h-16 bg-linear-to-r from-pink-500/20 to-orange-500/20 rounded-full animate-bounce animation-delay-1000"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-linear-to-r from-green-500/20 to-teal-500/20 rounded-full animate-bounce animation-delay-2000"></div>

      {/* Map Background Element */}
      <div className="absolute bottom-0 right-0 opacity-5 dark:opacity-10">
        <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100,50 L150,80 L200,60 L250,90 L300,70" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5"/>
          <path d="M80,120 L120,150 L180,130 L220,160 L280,140" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5"/>
          <circle cx="150" cy="100" r="8" fill="currentColor"/>
          <circle cx="250" cy="80" r="8" fill="currentColor"/>
          <circle cx="180" cy="140" r="8" fill="currentColor"/>
          <circle cx="280" cy="120" r="8" fill="currentColor"/>
        </svg>
      </div>

      {/* Add Tailwind animations to globals.css instead */}
      <style jsx>{`
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;