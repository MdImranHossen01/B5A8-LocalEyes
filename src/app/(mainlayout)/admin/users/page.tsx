import { Metadata } from 'next';
import { AdminUsersClient } from '@/components/admin/AdminUsersClient';

export const metadata: Metadata = {
  title: 'User Management - Admin Panel',
  description: 'Manage platform users and permissions',
};

export default function AdminUsersPage() {
  return <AdminUsersClient />;
}