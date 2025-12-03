/* eslint-disable @typescript-eslint/no-explicit-any */
import { Metadata } from 'next';
import { DashboardClient } from '@/components/dashboard/DashboardClient';

export const metadata: Metadata = {
  title: 'Dashboard - Local Guide Platform',
  description: 'Manage your tours, bookings, and profile',
};

async function getDashboardData(userId: string, role: string) {
  try {
    let bookings = [];
    let tours = [];
    let stats = {};

    // Fetch user-specific data based on role
    if (role === 'tourist') {
      const bookingsRes = await fetch(`${process.env.NEXTAUTH_URL}/api/bookings?userId=${userId}&role=tourist`);
      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        bookings = bookingsData.bookings || [];
      }
      
      stats = {
        upcomingTrips: bookings.filter((b: any) => b.status === 'confirmed').length,
        pastTrips: bookings.filter((b: any) => b.status === 'completed').length,
        pendingRequests: bookings.filter((b: any) => b.status === 'pending').length,
      };
    } else if (role === 'guide') {
      const [bookingsRes, toursRes] = await Promise.all([
        fetch(`${process.env.NEXTAUTH_URL}/api/bookings?userId=${userId}&role=guide`),
        fetch(`${process.env.NEXTAUTH_URL}/api/listings?guideId=${userId}`),
      ]);

      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        bookings = bookingsData.bookings || [];
      }

      if (toursRes.ok) {
        const toursData = await toursRes.json();
        tours = toursData.tours || [];
      }

      stats = {
        upcomingTours: bookings.filter((b: any) => b.status === 'confirmed').length,
        pendingRequests: bookings.filter((b: any) => b.status === 'pending').length,
        activeListings: tours.filter((t: any) => t.isActive).length,
        totalEarnings: bookings
          .filter((b: any) => b.status === 'completed' && b.paymentStatus === 'paid')
          .reduce((sum: number, b: any) => sum + b.totalAmount, 0),
      };
    } else if (role === 'admin') {
      // Admin would fetch platform-wide stats
      stats = {
        totalUsers: 0,
        totalTours: 0,
        totalBookings: 0,
        totalRevenue: 0,
      };
    }

    return { bookings, tours, stats };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return { bookings: [], tours: [], stats: {} };
  }
}

export default async function DashboardPage() {
  // This would be replaced with proper session management
  // For now, we'll use client-side auth check
  return <DashboardClient />;
}