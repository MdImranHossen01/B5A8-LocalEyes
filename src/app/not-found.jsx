import Link from 'next/link';
import { Home, Compass, Search, ArrowLeft, MapPin, Navigation } from 'lucide-react';

const NotFoundPage = () => {
  const popularDestinations = [
    { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
    { name: 'Explore Tours', path: '/explore', icon: <Compass className="w-5 h-5" /> },
    { name: 'Become a Guide', path: '/become-guide', icon: <Navigation className="w-5 h-5" /> },
    { name: 'Contact Us', path: '/contact', icon: <MapPin className="w-5 h-5" /> },
  ];

  const suggestedSearches = [
    'Adventure Tours',
    'Food Experiences',
    'Historical Sites',
    'Local Guides',
    'City Walking Tours',
    'Cultural Activities',
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
      `}</style>

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-glow"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-glow animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-pink-200 dark:bg-pink-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse-glow animation-delay-4000"></div>
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
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl animate-float">
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

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Guides</div>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">1,200+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Tours</div>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">98%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Satisfied</div>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">50+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Countries</div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Navigation
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {popularDestinations.map((dest, index) => (
                <Link
                  key={index}
                  href={dest.path}
                  className="flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 px-6 py-3 rounded-lg transition-all hover:scale-105 hover:shadow-lg group"
                >
                  <span className="text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    {dest.icon}
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">{dest.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Search Suggestions */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Search className="w-5 h-5 text-gray-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                What are you looking for?
              </h3>
            </div>
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
              {suggestedSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => window.location.href = `/explore?search=${encodeURIComponent(search)}`}
                  className="px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-300 dark:border-gray-600 rounded-full text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:scale-105"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
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

          {/* Fun Message */}
          <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/30">
            <p className="text-gray-700 dark:text-gray-300 italic">
              &quot;Not all those who wander are lost.&quot; But if you are, we&apos;re here to help you find your way back!
            </p>
          </div>

          {/* Helpful Tips */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Check the URL for typos</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span>Use the search bar above</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Browse our popular pages</span>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full animate-float"></div>
        <div className="absolute top-10 left-10 w-16 h-16 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full animate-float animation-delay-1000"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-r from-green-500/20 to-teal-500/20 rounded-full animate-float animation-delay-2000"></div>

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

        <style jsx global>{`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes spin-reverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
          .animate-spin-reverse {
            animation: spin-reverse 15s linear infinite;
          }
          .animation-delay-1000 {
            animation-delay: 1s;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
        `}</style>
      </div>
    </>
  );
};

export default NotFoundPage;