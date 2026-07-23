'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { BookOpen, MapPin, Image as ImageIcon, Send, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewStoryPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    content: '',
    imageUrl: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const sampleImages = [
    { label: 'Sundarbans', url: '/assets/package/sundarbans.webp' },
    { label: 'Cox\'s Bazar', url: '/assets/package/coxs-bazar.webp' },
    { label: 'Sajek Valley', url: '/assets/package/sajek-valley.webp' },
    { label: 'Sylhet Waterfalls', url: '/assets/package/sylhet.webp' },
    { label: 'Sreemangal Tea', url: '/assets/package/sreemangal.webp' },
    { label: 'Dubai Desert', url: '/assets/package/dubai-safari.webp' },
    { label: 'Rome Heritage', url: '/assets/package/italy-rome.webp' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.location || !formData.content) {
      setError('Please fill in title, location, and story content.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          location: formData.location,
          content: formData.content,
          images: [formData.imageUrl || '/assets/package/sundarbans.webp'],
        }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push('/stories');
      } else {
        setError(data.error || 'Failed to submit story.');
      }
    } catch (err) {
      console.error('Error creating story:', err);
      setError('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black/90 p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/stories"
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-blue-600 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Stories
        </Link>

        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200/80 dark:border-gray-800">
          <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100 dark:border-gray-800">
            <div className="p-3 bg-blue-100 dark:bg-blue-950/60 rounded-2xl text-blue-600 dark:text-blue-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-black text-gray-900 dark:text-white">
                Share Your Travel Story
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Tell the community about your latest adventure and memories.
              </p>
            </div>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 text-red-600 text-sm font-semibold p-4 rounded-2xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Story Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                Story Title
              </label>
              <input
                type="text"
                placeholder="e.g. Sunset Cruise along Cox's Bazar Marine Drive"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Sundarbans, Khulna"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  required
                />
                <MapPin className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            {/* Select Image */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                Cover Photo (Select from Assets)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {sampleImages.map((img) => (
                  <div
                    key={img.url}
                    onClick={() => setFormData(prev => ({ ...prev, imageUrl: img.url }))}
                    className={`cursor-pointer rounded-2xl p-2 border transition-all text-center ${
                      formData.imageUrl === img.url
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-600'
                        : 'border-gray-200 dark:border-gray-800 hover:border-gray-400'
                    }`}
                  >
                    <div className="relative h-16 w-full rounded-xl overflow-hidden mb-1">
                      <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[11px] font-bold block truncate">{img.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Content */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                Story Content
              </label>
              <textarea
                rows={6}
                placeholder="Write your story details here..."
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3.5 rounded-2xl transition-all font-bold text-sm shadow-lg"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? 'Publishing Story...' : 'Publish Story'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
