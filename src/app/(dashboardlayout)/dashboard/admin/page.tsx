import { Metadata } from 'next';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Local Eyes',
  description: 'Platform administration and management',
};

export default function AdminPage() {
  return <AdminDashboard />;
}