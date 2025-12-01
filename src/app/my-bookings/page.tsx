import { Metadata } from 'next';
import { MyBookingsClient } from '@/components/bookings/MyBookingsClient';

export const metadata: Metadata = {
  title: 'My Bookings - Local Guide Platform',
  description: 'View and manage your tour bookings',
};

export default function MyBookingsPage() {
  return <MyBookingsClient />;
}