// src/components/tours/BookingWidget.tsx - UPDATED VERSION
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Tour {
  _id: string;
  title: string;
  tourFee: number;
  duration: number;
  maxGroupSize: number;
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
      alert('Please enter your name');
      return false;
    }

    if (!bookingData.email.trim()) {
      alert('Please enter your email address');
      return false;
    }

    if (!bookingData.phone.trim()) {
      alert('Please enter your mobile number');
      return false;
    }

    setIsSubmitting(true);

    try {
      const bookingPayload = {
        tourist: currentUser?.id || undefined,
        guide: tour.guide._id,
        tour: tour._id,
        date: new Date(`${bookingData.date}T${bookingData.time}`),
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
        return data.booking._id;
      } else {
        alert(data.error || 'Failed to create booking');
        return false;
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('An error occurred while creating your booking');
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

          {/* Tour Date Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tour Date
            </label>
            <input
              type="date"
              min={minDate}
              value={bookingData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className="w-full text-gray-800 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Tour Time Picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tour Time
            </label>
            <input
              type="time"
              value={bookingData.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
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