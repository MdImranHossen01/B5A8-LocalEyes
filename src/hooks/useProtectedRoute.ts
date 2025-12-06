'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export function useProtectedRoute(requiredRole?: 'tourist' | 'guide' | 'admin') {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // Redirect to login if not authenticated
        router.push('/login');
        return;
      }

      if (requiredRole) {
        // Allow admin to access any route
        if (user.role === 'admin') {
          return;
        }
        
        // Check if non-admin user has the required role
        if (user.role !== requiredRole) {
          router.push('/');
          return;
        }
      }
    }
  }, [user, isLoading, requiredRole, router]);

  return { user, isLoading };
}