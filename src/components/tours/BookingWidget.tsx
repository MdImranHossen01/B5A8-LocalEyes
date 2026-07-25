// src/components/tours/BookingWidget.tsx - UPDATED VERSION
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';

interface Tour {
  _id: string;
  title: string;
  tourFee: number;
  duration: number;
  maxGroupSize: number;
  tourDate?: string;
  tourTime?: string;
  guide: {
    _id: string;
  };
}

interface BookingWidgetProps {
  tour: Tour;
  user: any;
}

export function BookingWidget({ tour, user }: BookingWidgetProps) {
  const router = useRouter();
  const { data: session } = useSession();
  // Get tomorrow's date for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const currentUser = user || (session?.user as any);

  const [bookingData, setBookingData] = useState({
    date: minDate,
    time: '10:00',
    numberOfPeople: 1,
    specialRequests: '',
    name: '',
    email: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createdBookingId, setCreatedBookingId] = useState<string | null>(null);

  // Populate default name and email once user session is loaded
  useEffect(() => {
    if (currentUser) {
      setBookingData(prev => ({
        ...prev,
        name: prev.name || currentUser.name || '',
        email: prev.email || currentUser.email || '',
      }));
    }
  }, [currentUser]);

  const handleInputChange = (field: string, value: string | number) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const createBooking = async () => {

    if (!bookingData.name.trim()) {
      toast.error('Please enter your name');
      return false;
    }

    if (!bookingData.email.trim()) {
      toast.error('Please enter your email address');
      return false;
    }

    if (!bookingData.phone.trim()) {
      toast.error('Please enter your mobile number');
      return false;
    }

    setIsSubmitting(true);

    try {
      const guideId = typeof tour.guide === 'object' ? (tour.guide?._id || tour.guide) : (tour.guide || currentUser?.id);
      const bookingPayload = {
        tourist: currentUser?.id || undefined,
        guide: guideId,
        tour: tour._id,
        date: new Date(),
        numberOfPeople: bookingData.numberOfPeople,
        totalAmount: tour.tourFee * bookingData.numberOfPeople,
        specialRequests: bookingData.specialRequests,
        name: bookingData.name.trim(),
        email: bookingData.email.trim(),
        phone: bookingData.phone.trim(),
        status: 'pending_payment', // Initial status
      };

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingPayload),
      });

      const data = await response.json();

      if (response.ok) {
        setCreatedBookingId(data.booking._id);
        toast.success('Booking created successfully!');
        return data.booking._id;
      } else {
        toast.error(data.error || 'Failed to create booking');
        return false;
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('An error occurred while creating your booking');
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookNow = async () => {
    const bookingId = await createBooking();
    if (bookingId) {
      router.push(`/bookings/${bookingId}`);
    }
  };

  const totalAmount = tour.tourFee * bookingData.numberOfPeople;

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="mb-6">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-gray-900">৳{tour.tourFee}</span>
            <span className="text-gray-600">per person</span>
          </div>
          <p className="text-sm text-gray-600">All taxes and fees included</p>

          {(tour.tourDate || tour.tourTime) && (
            <div className="mt-4 p-3 bg-blue-50/80 rounded-xl border border-blue-100 text-sm text-gray-800">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
                Tour Schedule
              </span>
              <div className="flex flex-wrap items-center gap-3 font-medium">
                {tour.tourDate && <span>📅 {tour.tourDate}</span>}
                {tour.tourTime && <span>⏰ {tour.tourTime}</span>}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={bookingData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder="Enter your full name"
              className="w-full text-gray-800 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Email Address Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={bookingData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email address"
              className="w-full text-gray-800 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Mobile Number Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              value={bookingData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter your mobile number"
              className="w-full text-gray-800 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Number of People */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of People
            </label>
            <select
              value={bookingData.numberOfPeople}
              onChange={(e) => handleInputChange('numberOfPeople', parseInt(e.target.value))}
              className="w-full text-gray-800 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Array.from({ length: tour.maxGroupSize }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num} {num === 1 ? 'person' : 'people'}
                </option>
              ))}
            </select>
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Requests (Optional)
            </label>
            <textarea
              value={bookingData.specialRequests}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              rows={3}
              className="w-full text-gray-800 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Any dietary restrictions, accessibility needs, or special requests..."
            />
          </div>

          {/* Price Summary */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">৳{tour.tourFee} × {bookingData.numberOfPeople} people</span>
              <span className="font-semibold">৳{totalAmount}</span>
            </div>
            <div className="flex justify-between items-center font-semibold text-lg">
              <span>Total</span>
              <span className="text-green-600">৳{totalAmount}</span>
            </div>
          </div>

          {/* Book Button */}
          <button
            onClick={handleBookNow}
            disabled={isSubmitting || !bookingData.name.trim() || !bookingData.email.trim() || !bookingData.phone.trim()}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold text-lg cursor-pointer"
          >
            {isSubmitting ? 'Creating Booking...' : 'Book Now'}
          </button>

          {/* Payment Info */}
          {/* Contact Info */}
          <div className="text-center pt-2">
            <p className="text-sm font-semibold text-blue-600">
              📞 Our agent will contact you soon
            </p>
          </div>
        </div>
      </div>

      {/* Booking complete */}
    </>
  );
}