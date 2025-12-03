/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { TouristDashboard } from '@/components/dashboard/TouristDashboard';
import { GuideDashboard } from '@/components/dashboard/GuideDashboard';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';

interface DashboardData {
  bookings: any[];
  tours: any[];
  stats: any;
}

export function DashboardClient() {
  const { user } = useAuth();
  const { isLoading } = useProtectedRoute();
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    bookings: [],
    tours: [],
    stats: {},
  });
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    if (!user) return;

    setIsLoadingData(true);
    try {
      const queryParams = new URLSearchParams({
        userId: user.id,
        role: user.role,
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

  if (isLoading || isLoadingData) {
    return (
      <div className="min-h-screen bg-gray-50">
    
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
        
      </div>
    );
  }

  if (!user) {
    return null; // useProtectedRoute will handle redirect
  }

  const renderDashboard = () => {
    switch (user.role) {
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
    <div className="min-h-screen bg-gray-50">
     
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderDashboard()}
      </main>
    
    </div>
  );
}