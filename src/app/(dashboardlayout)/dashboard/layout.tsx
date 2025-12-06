/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import LeftSideNav from './components/leftSideNav';

// Inner component that uses useSession
function DashboardContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!session) {
    redirect('/login');
  }

  const userRole = (session.user as any).role || 'tourist';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <LeftSideNav userRole={userRole} />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

// Main layout component that wraps with SessionProvider
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <DashboardContent>{children}</DashboardContent>
    </SessionProvider>
  );
}