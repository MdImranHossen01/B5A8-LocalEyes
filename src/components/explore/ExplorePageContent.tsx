/* eslint-disable @typescript-eslint/no-explicit-any */
// components/explore/ExplorePageContent.tsx
'use client';

import { ExploreContent } from './ExploreContent';

interface ExplorePageContentProps {
  initialTours: any[];
}

export default function ExplorePageContent({ initialTours }: ExplorePageContentProps) {
  return <ExploreContent initialTours={initialTours} />;
}