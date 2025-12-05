'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';

interface Review {
  _id: string;
  tourist: {
    _id: string;
    name: string;
    profilePic?: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewsSectionProps {
  tourId: string;
  guideId: string;
}

export function ReviewsSection({ tourId, guideId }: ReviewsSectionProps) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
  });

  useEffect(() => {
    fetchReviews();
  }, [guideId, tourId]);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/reviews?guideId=${guideId}&tourId=${tourId}`);
      const data = await response.json();

      if (response.ok) {
        setReviews(data.reviews || []);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert('Please login to submit a review');
      return;
    }

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tourist: user.id,
          guide: guideId,
          tour: tourId,
          rating: newReview.rating,
          comment: newReview.comment,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setReviews(prev => [data.review, ...prev]);
        setNewReview({ rating: 5, comment: '' });
        setShowReviewForm(false);
        alert('Review submitted successfully!');
      } else {
        alert(data.error || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('An error occurred while submitting your review');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="animate-pulse bg-gray-200 rounded-lg p-6">
            <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Traveler Reviews ({reviews.length})
        </h2>
        
        {user && user.role === 'tourist' && !showReviewForm && (
          <button
            onClick={() => setShowReviewForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Write a Review
          </button>
        )}
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h3>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Rating
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                    className="text-2xl focus:outline-none"
                  >
                    {star <= newReview.rating ? '★' : '☆'}
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review
              </label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Share your experience with this tour and guide..."
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-gray-400 text-6xl mb-4">💬</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews yet</h3>
          <p className="text-gray-600">Be the first to share your experience!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white border border-gray-200 rounded-lg p-6">
              {/* Review Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex relative items-center">
                  <Image
                    src={review.tourist.profilePic || '/profile.jpg'}
                    alt={review.tourist.name}
                    fill
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.tourist.name}</h4>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="text-yellow-400 mr-1">★</span>
                      <span>{review.rating}</span>
                      <span className="mx-2">•</span>
                      <span>{formatDate(review.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {review.comment}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}