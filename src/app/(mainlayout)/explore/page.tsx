import { Metadata } from 'next';
import { Suspense } from 'react';
import { ExploreContent } from '@/components/explore/ExploreContent';
import ExploreLoading from './loading';

export const metadata: Metadata = {
  title: 'Explore Tours - Local Guide Platform',
  description: 'Discover amazing local experiences and find your perfect guide',
};

export default function ExplorePage() {
  return (
    <Suspense fallback={<ExploreLoading />}>
      <ExploreContent />
    </Suspense>
  );
}