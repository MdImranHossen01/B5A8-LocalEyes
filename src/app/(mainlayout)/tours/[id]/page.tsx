import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TourDetailsClient } from '@/components/tours/TourDetailsClient';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getTour(id: string) {
  try {
    // Use relative URL for API calls
    const res = await fetch(`http://localhost:3000/api/listings/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.tour;
  } catch (error) {
    console.error('Error fetching tour:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Await params first
  const { id } = await params;
  const tour = await getTour(id);

  if (!tour) {
    return {
      title: 'Tour Not Found - Local Guide Platform',
    };
  }

  return {
    title: `${tour.title} - Local Guide Platform`,
    description: tour.description.substring(0, 160),
    openGraph: {
      title: tour.title,
      description: tour.description.substring(0, 160),
      images: tour.images?.[0] ? [tour.images[0]] : [],
    },
  };
}

export default async function TourDetailsPage({ params }: PageProps) {
  // Await params first
  const { id } = await params;
  const tour = await getTour(id);

  if (!tour) {
    notFound();
  }

  return <TourDetailsClient tour={tour} />;
}