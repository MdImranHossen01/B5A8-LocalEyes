import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProfileClient } from '@/components/profile/ProfileClient';

interface PageProps {
  params: {
    id: string;
  };
}

async function getUserProfile(id: string) {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/users/${id}`, {
      next: { revalidate: 60 }, // Cache for 60 seconds
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data.user;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const user = await getUserProfile(params.id);

  if (!user) {
    return {
      title: 'Profile Not Found - Local Guide Platform',
    };
  }

  return {
    title: `${user.name} - ${user.role === 'guide' ? 'Local Guide' : 'Traveler'} - Local Guide Platform`,
    description: user.bio || `View ${user.name}'s profile on Local Guide Platform`,
  };
}

export default async function ProfilePage({ params }: PageProps) {
  const user = await getUserProfile(params.id);

  if (!user) {
    notFound();
  }

  return <ProfileClient user={user} />;
}