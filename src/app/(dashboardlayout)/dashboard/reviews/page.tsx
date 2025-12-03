'use client';

import React, { useState } from 'react';
import {
  Star,
  Filter,
  Search,
  MoreVertical,
  ThumbsUp,
  MessageSquare,
  Flag,
  Edit,
  Trash2,
  RefreshCw,
  Download,
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  tourName: string;
  helpfulCount: number;
  replyCount: number;
  status: 'published' | 'pending' | 'hidden' | 'reported';
  isVerified: boolean;
  photos: string[];
}

const MyReviewsPage = () => {
  const [filter, setFilter] = useState<'all' | 'published' | 'pending' | 'reported'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'highest' | 'lowest' | 'helpful'>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReviews, setSelectedReviews] = useState<string[]>([]);

  // Sample data - replace with API data
  const reviews: Review[] = [
    {
      id: '1',
      userName: 'John Doe',
      userAvatar: '',
      rating: 5,
      date: '2024-03-15',
      comment: 'Amazing experience! The guide was extremely knowledgeable and made the tour very enjoyable. Highly recommended!',
      tourName: 'Golden Gate Bridge Tour',
      helpfulCount: 12,
      replyCount: 2,
      status: 'published',
      isVerified: true,
      photos: [],
    },
    {
      id: '2',
      userName: 'Sarah Wilson',
      userAvatar: '',
      rating: 4,
      date: '2024-03-10',
      comment: 'Good tour overall. The guide was friendly and professional. Would have liked more historical details.',
      tourName: 'San Francisco City Tour',
      helpfulCount: 5,
      replyCount: 1,
      status: 'published',
      isVerified: true,
      photos: [],
    },
    {
      id: '3',
      userName: 'Mike Johnson',
      userAvatar: '',
      rating: 2,
      date: '2024-03-05',
      comment: 'Tour started late and guide seemed unprepared. Not worth the price.',
      tourName: 'Alcatraz Night Tour',
      helpfulCount: 3,
      replyCount: 3,
      status: 'reported',
      isVerified: false,
      photos: [],
    },
    {
      id: '4',
      userName: 'Emma Chen',
      userAvatar: '',
      rating: 5,
      date: '2024-03-01',
      comment: 'Best tour guide ever! Made the history come alive. Will definitely book again.',
      tourName: 'Wine Country Experience',
      helpfulCount: 8,
      replyCount: 1,
      status: 'published',
      isVerified: true,
      photos: [],
    },
    {
      id: '5',
      userName: 'David Brown',
      userAvatar: '',
      rating: 3,
      date: '2024-02-28',
      comment: 'Average experience. Guide was okay but the itinerary was too rushed.',
      tourName: 'Golden Gate Bridge Tour',
      helpfulCount: 2,
      replyCount: 0,
      status: 'published',
      isVerified: false,
      photos: [],
    },
    {
      id: '6',
      userName: 'Lisa Garcia',
      userAvatar: '',
      rating: 5,
      date: '2024-02-25',
      comment: 'Perfect from start to finish! The photography tips were incredibly helpful.',
      tourName: 'San Francisco Photography Tour',
      helpfulCount: 15,
      replyCount: 2,
      status: 'pending',
      isVerified: true,
      photos: [],
    },
    {
      id: '7',
      userName: 'Robert Kim',
      userAvatar: '',
      rating: 4,
      date: '2024-02-20',
      comment: 'Great value for money. Learned a lot about local history and culture.',
      tourName: 'Chinatown Walking Tour',
      helpfulCount: 6,
      replyCount: 1,
      status: 'published',
      isVerified: true,
      photos: [],
    },
    {
      id: '8',
      userName: 'Alex Turner',
      userAvatar: '',
      rating: 1,
      date: '2024-02-15',
      comment: 'Terrible experience. Guide was rude and unprofessional.',
      tourName: 'Golden Gate Bridge Tour',
      helpfulCount: 1,
      replyCount: 5,
      status: 'hidden',
      isVerified: false,
      photos: [],
    },
  ];

  // Stats data
  const stats = {
    totalReviews: 42,
    averageRating: 4.3,
    fiveStar: 18,
    fourStar: 12,
    threeStar: 7,
    twoStar: 3,
    oneStar: 2,
    responseRate: '85%',
    recentReviews: 8,
  };

  // Chart data
  const ratingDistribution = [
    { name: '5 Stars', value: stats.fiveStar, color: '#10B981' },
    { name: '4 Stars', value: stats.fourStar, color: '#3B82F6' },
    { name: '3 Stars', value: stats.threeStar, color: '#F59E0B' },
    { name: '2 Stars', value: stats.twoStar, color: '#EF4444' },
    { name: '1 Star', value: stats.oneStar, color: '#6B7280' },
  ];

  // Filter reviews based on selected filter and search
  const filteredReviews = reviews.filter(review => {
    const matchesFilter = filter === 'all' || review.status === filter;
    const matchesSearch = review.tourName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpfulCount - a.helpfulCount;
      default:
        return 0;
    }
  });

  // Helper functions
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const config = {
      published: { color: 'bg-green-100 text-green-800', icon: <CheckCircle className="w-3 h-3" /> },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: <Clock className="w-3 h-3" /> },
      hidden: { color: 'bg-gray-100 text-gray-800', icon: <XCircle className="w-3 h-3" /> },
      reported: { color: 'bg-red-100 text-red-800', icon: <AlertCircle className="w-3 h-3" /> },
    }[status];

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon}
        <span className="capitalize">{status}</span>
      </span>
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${index < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-1 text-sm font-medium text-gray-900">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const handleSelectReview = (id: string) => {
    setSelectedReviews(prev =>
      prev.includes(id) ? prev.filter(reviewId => reviewId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedReviews.length === sortedReviews.length) {
      setSelectedReviews([]);
    } else {
      setSelectedReviews(sortedReviews.map(review => review.id));
    }
  };

  const handleBulkAction = (action: 'delete' | 'hide' | 'publish') => {
    // Implement bulk action logic
    alert(`Performing ${action} on ${selectedReviews.length} reviews`);
    setSelectedReviews([]);
  };

  const handleReply = (reviewId: string) => {
    // Implement reply logic
    alert(`Replying to review ${reviewId}`);
  };

  const handleDelete = (reviewId: string) => {
    // Implement delete logic
    if (confirm('Are you sure you want to delete this review?')) {
      alert(`Deleting review ${reviewId}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Reviews</h1>
          <p className="text-gray-600 mt-1">Manage and respond to customer reviews</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Average Rating</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-2xl font-bold text-gray-900 ml-2">{stats.averageRating.toFixed(1)}</span>
                </div>
                <span className="text-sm text-green-600 font-medium">+0.2</span>
              </div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">{stats.totalReviews} total reviews</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Response Rate</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">{stats.responseRate}</h3>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <MessageSquare className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">Respond within 24 hours</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Recent Reviews</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">{stats.recentReviews}</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">Last 30 days</p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Verified Reviews</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                {reviews.filter(r => r.isVerified).length}/{reviews.length}
              </h3>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">From actual customers</p>
        </div>
      </div>

      {/* Rating Distribution Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Rating Distribution</h3>
              <p className="text-gray-600 text-sm">Breakdown of all ratings received</p>
            </div>
            <BarChart3 className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-4">
            {ratingDistribution.map((item, index) => (
              <div key={item.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5 - index)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.value}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${(item.value / stats.totalReviews) * 100}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Rating Summary</h3>
            <PieChart className="w-5 h-5 text-gray-400" />
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ratingDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {ratingDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} reviews`, 'Count']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {ratingDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-gray-600">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters and Bulk Actions */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search reviews..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="pending">Pending</option>
                <option value="hidden">Hidden</option>
                <option value="reported">Reported</option>
              </select>
            </div>

            <select
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="newest">Newest First</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedReviews.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedReviews.length === sortedReviews.length}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-blue-900">
                  {selectedReviews.length} reviews selected
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleBulkAction('publish')}
                  className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                >
                  Publish
                </button>
                <button
                  onClick={() => handleBulkAction('hide')}
                  className="px-3 py-1.5 bg-yellow-600 text-white text-sm rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Hide
                </button>
                <button
                  onClick={() => handleBulkAction('delete')}
                  className="px-3 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                {/* Checkbox for bulk selection */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    checked={selectedReviews.includes(review.id)}
                    onChange={() => handleSelectReview(review.id)}
                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="font-semibold text-blue-600">
                          {review.userName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                          {review.isVerified && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">
                              <CheckCircle className="w-3 h-3" />
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(review.status)}
                      <div className="relative">
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                          <MoreVertical className="w-5 h-5 text-gray-400" />
                        </button>
                        {/* Dropdown menu would go here */}
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mt-3">
                    {renderStars(review.rating)}
                  </div>

                  {/* Review Content */}
                  <div className="mt-4">
                    <h5 className="font-medium text-gray-900 mb-1">{review.tourName}</h5>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>

                  {/* Photos if any */}
                  {review.photos.length > 0 && (
                    <div className="flex gap-2 mt-4">
                      {review.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt="Review"
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-4 mt-6">
                    <button
                      onClick={() => handleReply(review.id)}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span className="text-sm font-medium">Reply</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 hover:text-gray-700">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm font-medium">{review.helpfulCount} helpful</span>
                    </button>
                    {review.replyCount > 0 && (
                      <span className="text-sm text-gray-500">
                        {review.replyCount} {review.replyCount === 1 ? 'reply' : 'replies'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mt-6 pt-6 border-t border-gray-100">
                <button
                  onClick={() => handleReply(review.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Reply to Review
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(review.id)}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
                {review.status !== 'reported' && (
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium flex items-center gap-2">
                    <Flag className="w-4 h-4" />
                    Report
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {sortedReviews.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No reviews found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your filters or search term</p>
          <button
            onClick={() => {
              setFilter('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Pagination */}
      {sortedReviews.length > 0 && (
        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{' '}
            <span className="font-medium">{sortedReviews.length}</span> of{' '}
            <span className="font-medium">{reviews.length}</span> reviews
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      )}

      {/* Tips Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-lg">
            <MessageSquare className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-blue-900 mb-2">Tips for Managing Reviews</h4>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Always respond professionally, even to negative reviews</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Respond within 24 hours for better engagement</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Use negative feedback to improve your services</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                <span>Thank customers for positive reviews</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReviewsPage;