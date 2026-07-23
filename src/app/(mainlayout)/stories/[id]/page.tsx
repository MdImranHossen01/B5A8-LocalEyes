'use client';

import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Heart, ArrowLeft, Calendar, User, Share2, Sparkles } from 'lucide-react';

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

export default function StoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [story, setStory] = useState<Story | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    fetchStory();
  }, [id]);

  const fetchStory = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/stories/${id}`);
      const data = await res.json();
      if (res.ok && data.story) {
        setStory(data.story);
        setLikesCount(data.story.likes || 0);
      }
    } catch (err) {
      console.error('Error fetching story:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLikeToggle = () => {
    if (liked) {
      setLiked(false);
      setLikesCount(prev => prev - 1);
    } else {
      setLiked(true);
      setLikesCount(prev => prev + 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black/90 py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-xl w-1/3" />
          <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-3xl" />
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-xl w-2/3" />
          <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!story) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black/90 py-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Story Not Found</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">The travel story you are looking for does not exist.</p>
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 mt-6 bg-blue-600 text-white px-6 py-2.5 rounded-2xl font-bold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Stories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black/90 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Navigation Breadcrumb / Back Link */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Stories
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <Link href="/stories" className="hover:underline">Stories</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white line-clamp-1 max-w-[150px]">{story.title}</span>
          </div>
        </div>

        {/* Story Container */}
        <article className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl border border-gray-200/80 dark:border-gray-800">
          
          {/* Cover Photo Container */}
          <div className="relative h-80 sm:h-96 md:h-[450px] w-full">
            <Image
              src={story.images?.[0] || '/assets/package/sundarbans.webp'}
              alt={story.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Location Pill */}
            <div className="absolute top-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-2 text-white text-xs font-bold shadow-lg">
              <MapPin className="w-4 h-4 text-red-400" />
              <span>{story.location}</span>
            </div>

            {/* Title overlay at bottom of image */}
            <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
              <div className="inline-flex items-center gap-1.5 bg-blue-600 px-3 py-1 rounded-full text-white text-xs font-bold mb-3 shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Travel Story</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight drop-shadow-md">
                {story.title}
              </h1>
            </div>
          </div>

          {/* Author Details & Date */}
          <div className="p-6 sm:p-8 md:p-10">
            <div className="flex flex-wrap items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800 gap-4">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500/40 shadow-sm">
                  {story.authorImage ? (
                    <Image
                      src={story.authorImage}
                      alt={story.authorName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-blue-600 flex items-center justify-center text-white font-bold">
                      <User className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-extrabold text-gray-900 dark:text-white text-base">
                    {story.authorName}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    <span>
                      Published on {new Date(story.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handleLikeToggle}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                    liked
                      ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 border border-rose-200 dark:border-rose-900'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-rose-50 hover:text-rose-600'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-rose-600' : ''}`} />
                  <span>{likesCount} Likes</span>
                </button>

                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: story.title, url: window.location.href });
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('Link copied to clipboard!');
                    }
                  }}
                  className="p-2.5 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-all"
                  title="Share Story"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Story Main Content */}
            <div className="mt-8 text-gray-800 dark:text-gray-200 text-base sm:text-lg leading-relaxed space-y-6 font-normal">
              <p className="whitespace-pre-line leading-loose">
                {story.content}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <Link
                href="/stories"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                Explore More Stories
              </Link>

              <Link
                href="/dashboard/stories/new"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-md transition-all"
              >
                Share Your Story
              </Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
