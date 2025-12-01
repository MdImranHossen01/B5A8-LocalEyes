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

      if (requiredRole && user.role !== requiredRole && user.role !== 'admin') {
        // Redirect to home if user doesn't have required role
        router.push('/');
        return;
      }
    }
  }, [user, isLoading, requiredRole, router]);

  return { user, isLoading };
}