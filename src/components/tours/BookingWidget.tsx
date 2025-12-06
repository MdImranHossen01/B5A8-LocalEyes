// src/components/tours/BookingWidget.tsx - UPDATED VERSION
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { PaymentModal } from '@/components/payment/PaymentModal';

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
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '10:00',
    numberOfPeople: 1,
    specialRequests: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [createdBookingId, setCreatedBookingId] = useState<string | null>(null);

  const currentUser = user || (session?.user as any);

  const handleInputChange = (field: string, value: string | number) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const createBooking = async () => {
    if (!currentUser) {
      router.push('/login?returnUrl=' + encodeURIComponent(window.location.pathname));
      return false;
    }

    if (!bookingData.date) {
      alert('Please select a date');
      return false;
    }

    setIsSubmitting(true);

    try {
      const bookingPayload = {
        tourist: currentUser.id,
        guide: tour.guide._id,
        tour: tour._id,
        date: new Date(`${bookingData.date}T${bookingData.time}`),
        numberOfPeople: bookingData.numberOfPeople,
        totalAmount: tour.tourFee * bookingData.numberOfPeople,
        specialRequests: bookingData.specialRequests,
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
      setShowPaymentModal(true);
    }
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    if (createdBookingId) {
      router.push(`/bookings/${createdBookingId}?payment=success`);
    }
  };

  const totalAmount = tour.tourFee * bookingData.numberOfPeople;

  // Generate time slots
  const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  // Get tomorrow's date for min date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <div className="mb-6">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-bold text-gray-900">${tour.tourFee}</span>
            <span className="text-gray-600">per person</span>
          </div>
          <p className="text-sm text-gray-600">All taxes and fees included</p>
        </div>

        <div className="space-y-4">
          {/* Date Selector */}
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

          {/* Time Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Time
            </label>
            <select
              value={bookingData.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              className="w-full text-gray-800 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {timeSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
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
              <span className="text-gray-600">${tour.tourFee} × {bookingData.numberOfPeople} people</span>
              <span className="font-semibold">${totalAmount}</span>
            </div>
            <div className="flex justify-between items-center font-semibold text-lg">
              <span>Total</span>
              <span className="text-green-600">${totalAmount}</span>
            </div>
          </div>

          {/* Book Button */}
          <button
            onClick={handleBookNow}
            disabled={isSubmitting || !bookingData.date}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold text-lg"
          >
            {isSubmitting ? 'Creating Booking...' : currentUser ? 'Book Now & Pay' : 'Login to Book'}
          </button>

          {/* Payment Info */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              🔒 Payment required to confirm booking
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Free cancellation within 24 hours
            </p>
          </div>

          {/* Accepted Payments */}
          <div className="pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 mb-2">We accept:</p>
            <div className="flex justify-center space-x-4">
              <span className="text-gray-400">💳</span>
              <span className="text-gray-400">🏦</span>
              <span className="text-gray-400">📱</span>
              <span className="text-gray-400">💎</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {createdBookingId && (
        <PaymentModal
          bookingId={createdBookingId}
          amount={totalAmount}
          tourTitle={tour.title}
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
}