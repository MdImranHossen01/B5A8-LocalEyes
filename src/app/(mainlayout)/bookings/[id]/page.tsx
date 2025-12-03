import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BookingDetailsClient } from '@/components/bookings/BookingDetailsClient';

interface PageProps {
  params: {
    id: string;
  };
}

async function getBooking(id: string) {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/bookings/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
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
  const booking = await getBooking(params.id);

  if (!booking) {
    return {
      title: 'Booking Not Found - Local Guide Platform',
    };
  }

  return {
    title: `Booking Details - ${booking.tour?.title} - Local Guide Platform`,
  };
}

export default async function BookingDetailsPage({ params }: PageProps) {
  const booking = await getBooking(params.id);

  if (!booking) {
    notFound();
  }

  return <BookingDetailsClient booking={booking} />;
}