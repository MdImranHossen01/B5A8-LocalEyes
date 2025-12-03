// src/app/(mainlayout)/bookings/[id]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BookingDetailsClient } from '@/components/bookings/BookingDetailsClient';

// Update the interface - params is a Promise
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getBooking(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/bookings/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      const error = await res.json();
      console.error('API Error:', error);
      return null;
    }

    const data = await res.json();
    return data.booking;
  } catch (error) {
    console.error('Error fetching booking:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    // Await params to get the actual values
    const { id } = await params;
    
    // Add validation for undefined/null
    if (!id || id === 'undefined') {
      console.warn('Undefined booking ID in generateMetadata');
      return {
        title: 'Booking Not Found - Local Guide Platform',
      };
    }
    
    const booking = await getBooking(id);

    if (!booking) {
      return {
        title: 'Booking Not Found - Local Guide Platform',
      };
    }

    return {
      title: `Booking Details - ${booking.tour?.title || 'Booking'} - Local Guide Platform`,
    };
  } catch (error) {
    console.error('Error in generateMetadata:', error);
    return {
      title: 'Booking Details - Local Guide Platform',
    };
  }
}

export default async function BookingDetailsPage({ params }: PageProps) {
  try {
    // Await params to get the actual values
    const { id } = await params;
    
    console.log('Booking page params id:', id);
    
    // Add validation for undefined/null
    if (!id || id === 'undefined') {
      console.error('Invalid or undefined booking ID:', id);
      notFound();
    }
    
    const booking = await getBooking(id);

    if (!booking) {
      notFound();
    }

    return <BookingDetailsClient booking={booking} />;
  } catch (error) {
    console.error('Error in BookingDetailsPage:', error);
    notFound();
  }
}