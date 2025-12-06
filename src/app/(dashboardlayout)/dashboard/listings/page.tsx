'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { ListingManagementClient } from '@/components/listings/ListingManagementClient';

export default function ListingManagementPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-300 h-64 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    redirect('/login');
  }

  return <ListingManagementClient />;
}