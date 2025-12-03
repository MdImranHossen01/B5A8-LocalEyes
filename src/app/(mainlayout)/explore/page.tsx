import { Metadata } from 'next';
import { ExploreContent } from '@/components/explore/ExploreContent';

export const metadata: Metadata = {
  title: 'Explore Tours - Local Guide Platform',
  description: 'Discover amazing local experiences and find your perfect guide',
};

export default function ExplorePage() {
  return <ExploreContent />;
}