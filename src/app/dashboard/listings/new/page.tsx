import { Metadata } from 'next';
import { CreateEditTourClient } from '@/components/listings/CreateEditTourClient';

export const metadata: Metadata = {
  title: 'Create New Tour - Local Guide Platform',
  description: 'Create a new tour listing',
};

export default function CreateTourPage() {
  return <CreateEditTourClient />;
}