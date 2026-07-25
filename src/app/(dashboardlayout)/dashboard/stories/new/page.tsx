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
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5MB.');
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
    if (!apiKey) {
      setError('ImgBB API key is missing.');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      const uploadData = new FormData();
      uploadData.append('image', file);

      const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: uploadData,
      });

      const data = await res.json();
      if (data.success) {
        setFormData(prev => ({ ...prev, imageUrl: data.data.url }));
      } else {
        setError('Upload failed. Try again.');
      }
    } catch (err) {
      console.error('ImgBB upload error:', err);
      setError('Upload failed. Check your connection.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.location || !formData.content) {
      setError('Please fill in title, location, and story content.');
      return;
    }

    if (!formData.imageUrl) {
      setError('Please upload a cover photo first.');
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
          images: [formData.imageUrl],
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

            {/* Cover Photo Upload */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
                Cover Photo
              </label>
              
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-6 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 transition-colors relative">
                {isUploading ? (
                  <div className="flex flex-col items-center gap-2 py-4">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Uploading to ImgBB...</span>
                  </div>
                ) : formData.imageUrl ? (
                  <div className="relative w-full h-48 rounded-xl overflow-hidden group">
                    <img 
                      src={formData.imageUrl} 
                      alt="Cover Preview" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          const input = document.getElementById('story-img-upload') as HTMLInputElement;
                          if (input) input.click();
                        }}
                        className="bg-white/90 hover:bg-white text-gray-800 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Change Photo
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, imageUrl: '' }))}
                        className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={() => {
                      const input = document.getElementById('story-img-upload') as HTMLInputElement;
                      if (input) input.click();
                    }}
                    className="flex flex-col items-center gap-2 cursor-pointer py-6"
                  >
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-100 dark:border-gray-700 text-gray-400">
                      <ImageIcon className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-bold text-gray-600 dark:text-gray-400">Click to Upload Image</span>
                    <span className="text-xs text-gray-400">Supports JPG, PNG, GIF, WebP. Max 5MB.</span>
                  </div>
                )}

                <input
                  id="story-img-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
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
