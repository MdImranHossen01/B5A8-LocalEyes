'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, Heart, Sparkles, ArrowRight, User } from 'lucide-react';

interface Story {
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

export function TravelStoriesSection() {
  const router = useRouter();
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/stories?limit=3');
      const data = await res.json();
      if (res.ok && data.stories) {
        setStories(data.stories);
      }
    } catch (err) {
      console.error('Error fetching home stories:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!loading && stories.length === 0) return null;

  return (
    <section className="py-10 md:py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Real Experiences</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
              Traveler Stories & Memories
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 max-w-xl">
              Read authentic travel journals, photo stories, and unforgettable memories shared by our community travelers.
            </p>
          </div>

          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm hover:underline"
          >
            Explore All Stories
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Stories Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-200 dark:bg-gray-800 h-96 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.slice(0, 3).map((story, index) => (
              <motion.div
                key={story._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group bg-gray-50 dark:bg-gray-900 rounded-3xl overflow-hidden border border-gray-200/80 dark:border-gray-800 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image */}
                <div
                  className="relative h-60 w-full overflow-hidden cursor-pointer"
                  onClick={() => router.push(`/stories/${story._id}`)}
                >
                  <Image
                    src={story.images?.[0] || '/assets/package/sundarbans.webp'}
                    alt={story.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-semibold flex items-center gap-1.5 border border-white/20">
                    <MapPin className="w-3.5 h-3.5 text-red-400" />
                    <span>{story.location}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-blue-400">
                        {story.authorImage ? (
                          <Image src={story.authorImage} alt={story.authorName} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        {story.authorName}
                      </span>
                    </div>

                    <h3
                      onClick={() => router.push(`/stories/${story._id}`)}
                      className="text-lg font-extrabold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 cursor-pointer leading-snug"
                    >
                      {story.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 text-xs mt-2 line-clamp-2 leading-relaxed">
                      {story.content}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-200/60 dark:border-gray-800 flex items-center justify-between">
                    <button
                      onClick={() => router.push(`/stories/${story._id}`)}
                      className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <span>Read Full Story</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1 text-xs font-bold text-rose-500">
                      <Heart className="w-3.5 h-3.5 fill-rose-500" />
                      <span>{story.likes}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
