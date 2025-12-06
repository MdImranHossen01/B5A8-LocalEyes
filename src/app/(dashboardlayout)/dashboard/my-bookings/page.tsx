'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { MyBookingsClient } from '@/components/bookings/MyBookingsClient';

export default function MyBookingsPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    redirect('/login');
  }

  return <MyBookingsClient />;
}