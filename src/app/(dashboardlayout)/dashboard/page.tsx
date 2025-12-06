/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { TouristDashboard } from '@/components/dashboard/TouristDashboard';
import { GuideDashboard } from '@/components/dashboard/GuideDashboard';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';

interface DashboardData {
  bookings: any[];
  tours: any[];
  stats: any;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    bookings: [],
    tours: [],
    stats: {},
  });
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Hooks should always be called in the same order
  useEffect(() => {
    if (session?.user) {
      fetchDashboardData();
    } else {
      setIsLoadingData(false);
    }
  }, [session]);

  const fetchDashboardData = async () => {
    if (!session?.user) return;

    setIsLoadingData(true);
    try {
      const userId = (session.user as any).id;
      const role = (session.user as any).role || 'tourist';
      
      const queryParams = new URLSearchParams({
        userId,
        role,
      });

      const response = await fetch(`/api/dashboard?${queryParams}`);
      const data = await response.json();

      if (response.ok) {
        setDashboardData({
          bookings: data.bookings || [],
          tours: data.tours || [],
          stats: data.stats || {},
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  // Loading states
  if (status === 'loading' || isLoadingData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-300 h-32 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    redirect('/login');
  }

  const userRole = (session.user as any).role || 'tourist';

  // Render based on role - no hooks after this point
  const renderDashboard = () => {
    switch (userRole) {
      case 'tourist':
        return <TouristDashboard data={dashboardData} />;
      case 'guide':
        return <GuideDashboard data={dashboardData} />;
      case 'admin':
        return <AdminDashboard data={dashboardData} />;
      default:
        return <TouristDashboard data={dashboardData} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {session.user?.name || 'User'}!
        </h1>
        <p className="text-gray-600 mt-2">
          {userRole === 'tourist' 
            ? 'Manage your trips and bookings' 
            : userRole === 'guide' 
            ? 'Manage your tours and earnings'
            : 'Manage platform users and listings'}
        </p>
      </div>
      {renderDashboard()}
    </div>
  );
}