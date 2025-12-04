import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getUser(id: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
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
    const res = await fetch(`http://localhost:3000/api/listings?guideId=${guideId}`, {
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

async function getUserReviews(userId: string, role: string) {
  try {
    const endpoint = role === 'guide' 
      ? `/api/reviews?guideId=${userId}`
      : `/api/reviews?touristId=${userId}`;
    
    const res = await fetch(`http://localhost:3000${endpoint}`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      return [];
    }

    const data = await res.json();
    return data.reviews || [];
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    
    if (!id || id === 'undefined') {
      return {
        title: 'Profile Not Found - Local Guide Platform',
      };
    }
    
    const user = await getUser(id);

    if (!user) {
      return {
        title: 'Profile Not Found - Local Guide Platform',
      };
    }

    return {
      title: `${user.name} - ${user.role === 'guide' ? 'Local Guide' : 'Traveler'} - Local Guide Platform`,
      description: user.bio || `View ${user.name}'s profile on Local Guide Platform`,
    };
  } catch (error) {
    console.error('Error in generateMetadata:', error);
    return {
      title: 'Profile - Local Guide Platform',
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
    let reviews = [];

    if (user.role === 'guide') {
      tours = await getUserTours(id);
    }
    
    reviews = await getUserReviews(id, user.role);

    // Dynamically import the client component to avoid server-side rendering issues
    const { ProfileClient } = await import('@/components/profile/ProfileClient');
    
    return <ProfileClient user={user} tours={tours} reviews={reviews} />;
  } catch (error) {
    console.error('Error in ProfilePage:', error);
    notFound();
  }
}