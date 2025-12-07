// src/app/(mainlayout)/explore/page.tsx
import { Metadata } from 'next';
import { Suspense } from 'react';
import ExplorePageContent from '@/components/explore/ExplorePageContent';
import ExploreLoading from './loading';

export const metadata: Metadata = {
  title: 'Explore Tours - Local Eyes',
  description: 'Discover amazing local experiences and find your perfect guide',
};

// This function runs at build time and on ISR revalidation
async function getTours(searchParams: Promise<{ [key: string]: string | string[] | undefined }>) {
  try {
    const params = await searchParams;
    const queryString = new URLSearchParams();
    
    // Add search params to query
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        if (Array.isArray(value)) {
          value.forEach(v => queryString.append(key, v));
        } else {
          queryString.append(key, value);
        }
      }
    });

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/listings?${queryString.toString()}`, {
      next: { 
        revalidate: 60 // Revalidate every 60 seconds for ISR
      }
    });

    if (!response.ok) {
      console.error('Failed to fetch tours:', response.status);
      return [];
    }

    const data = await response.json();
    return data.tours || [];
  } catch (error) {
    console.error('Error fetching tours:', error);
    return [];
  }
}

interface ExplorePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  // Fetch tours server-side with ISR
  const initialTours = await getTours(searchParams);
  
  return (
    <Suspense fallback={<ExploreLoading />}>
      <ExplorePageContent initialTours={initialTours} />
    </Suspense>
  );
}