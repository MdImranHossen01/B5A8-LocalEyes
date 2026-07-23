'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, Heart, PlusCircle, Sparkles, User, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface StoryItem {
  _id: string;
  title: string;
  content: string;
  location: string;
  images: string[];
  likes: number;
  authorName: string;
  authorImage?: string;
  createdAt: string;
}

export default function StoriesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedStories, setLikedStories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/stories');
      const data = await res.json();
      if (res.ok && data.stories) {
        setStories(data.stories);
      }
    } catch (err) {
      console.error('Error loading stories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = (storyId: string, currentLikes: number) => {
    const isLiked = likedStories[storyId];
    setLikedStories(prev => ({ ...prev, [storyId]: !isLiked }));
    setStories(prev =>
      prev.map(s =>
        s._id === storyId
          ? { ...s, likes: isLiked ? currentLikes - 1 : currentLikes + 1 }
          : s
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black/90 pb-20">
      {/* Hero Header */}
      <section className="relative bg-blue-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-indigo-900 opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Community Travel Diaries</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            Real Travelers, Real Stories
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto font-medium">
            Explore authentic experiences, hidden destinations, and unforgettable journeys shared by our travel community.
          </p>

          <div className="mt-8 flex justify-center">
            {user ? (
              <Link
                href="/dashboard/stories/new"
                className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-2xl font-bold text-sm shadow-xl transition-all hover:scale-105"
              >
                <PlusCircle className="w-5 h-5" />
                Share Your Story
              </Link>
            ) : (
              <Link
                href="/login?redirect=/dashboard/stories/new"
                className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-2xl font-bold text-sm shadow-xl transition-all hover:scale-105"
              >
                <PlusCircle className="w-5 h-5" />
                Log In to Share Story
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-800 h-96 rounded-3xl animate-pulse" />
            ))}
          </div>
        )}

        {!loading && stories.length === 0 && (
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 text-center shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">No Stories Found</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Be the first to share your travel story!</p>
          </div>
        )}

        {!loading && stories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <motion.div
                key={story._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200/80 dark:border-gray-800 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image Header */}
                <div 
                  className="relative h-64 w-full overflow-hidden cursor-pointer group"
                  onClick={() => router.push(`/stories/${story._id}`)}
                >
                  <Image
                    src={story.images?.[0] || '/assets/package/sundarbans.webp'}
                    alt={story.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Location Badge */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 text-white text-xs font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-red-400" />
                    <span>{story.location}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Author Row */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-blue-500/30">
                        {story.authorImage ? (
                          <Image
                            src={story.authorImage}
                            alt={story.authorName}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                          {story.authorName}
                        </h4>
                        <p className="text-[11px] text-gray-500">
                          {new Date(story.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => router.push(`/stories/${story._id}`)}
                      className="text-lg font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2 cursor-pointer leading-snug"
                    >
                      {story.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-2 line-clamp-3 leading-relaxed">
                      {story.content}
                    </p>
                  </div>

                  {/* Footer Row */}
                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between">
                    <button
                      onClick={() => router.push(`/stories/${story._id}`)}
                      className="text-xs font-extrabold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <span>Read Full Story</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleLike(story._id, story.likes)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                        likedStories[story._id]
                          ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-rose-600'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${likedStories[story._id] ? 'fill-rose-600' : ''}`} />
                      <span>{story.likes}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
