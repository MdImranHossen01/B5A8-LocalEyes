import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Helper function to get the base URL
function getBaseUrl() {
  // In production (Vercel), use the environment variable or current origin
  if (process.env.NODE_ENV === 'production') {
    return process.env.NEXT_PUBLIC_APP_URL || 'https://localeyes-psi.vercel.app';
  }
  // In development, use localhost
  return 'http://localhost:3000';
}

async function getUser(id: string) {
  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/users/${id}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error('API Error status:', res.status);
      return null;
    }

    const data = await res.json();
    return data.user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

async function getUserTours(guideId: string) {
  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/listings?guideId=${guideId}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return data.tours || [];
  } catch (error) {
    console.error('Error fetching tours:', error);
    return [];
  }
}

async function getUserBookingsCount(userId: string) {
  try {
    const baseUrl = getBaseUrl();
    const res = await fetch(`${baseUrl}/api/bookings?userId=${userId}&role=tourist`, {
      cache: 'no-store',
    });
    if (!res.ok) return 0;
    const data = await res.json();
    return (data.bookings || []).length;
  } catch (error) {
    console.error('Error fetching bookings count:', error);
    return 0;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    
    if (!id || id === 'undefined') {
      return {
        title: 'Profile Not Found - Local Eyes',
      };
    }
    
    const user = await getUser(id);

    if (!user) {
      return {
        title: 'Profile Not Found - Local Eyes',
      };
    }

    return {
      title: `${user.name} - ${user.role === 'guide' ? 'Local Guide' : 'Traveler'} - Local Eyes`,
      description: user.bio || `View ${user.name}'s profile on Local Eyes`,
    };
  } catch (error) {
    console.error('Error in generateMetadata:', error);
    return {
      title: 'Profile - Local Eyes',
    };
  }
}

export default async function ProfilePage({ params }: PageProps) {
  try {
    // Await params first
    const { id } = await params;
    
    console.log('Profile page params id:', id);
    
    // Add validation for undefined/null
    if (!id || id === 'undefined') {
      console.error('Invalid or undefined user ID:', id);
      notFound();
    }
    
    const user = await getUser(id);

    if (!user) {
      notFound();
    }

    // Fetch additional data based on user role
    let tours = [];
    let bookingsCount = 0;

    if (user.role === 'guide') {
      tours = await getUserTours(id);
    } else {
      bookingsCount = await getUserBookingsCount(id);
    }

    // Dynamically import the client component to avoid server-side rendering issues
    const { ProfileClient } = await import('@/components/profile/ProfileClient');
    
    return <ProfileClient user={user} tours={tours} bookingsCount={bookingsCount} />;
  } catch (error) {
    console.error('Error in ProfilePage:', error);
    notFound();
  }
}