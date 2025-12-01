import { Metadata } from 'next';
import { ListingManagementClient } from '@/components/listings/ListingManagementClient';

export const metadata: Metadata = {
  title: 'My Listings - Local Guide Platform',
  description: 'Manage your tour listings',
};

export default function ListingManagementPage() {
  return <ListingManagementClient />;
}