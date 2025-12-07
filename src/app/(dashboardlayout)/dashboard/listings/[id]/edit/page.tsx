import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CreateEditTourClient } from '@/components/listings/CreateEditTourClient';

interface PageProps {
  params: {
    id: string;
  };
}

async function getTour(id: string) {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/listings/${id}`, {
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
  const tour = await getTour(params.id);

  if (!tour) {
    return {
      title: 'Tour Not Found - Local Eyes',
    };
  }

  return {
    title: `Edit ${tour.title} - Local Eyes`,
  };
}

export default async function EditTourPage({ params }: PageProps) {
  const tour = await getTour(params.id);

  if (!tour) {
    notFound();
  }

  return <CreateEditTourClient tour={tour} />;
}