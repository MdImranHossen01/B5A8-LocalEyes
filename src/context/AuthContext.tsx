/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { createContext, useContext, useMemo } from 'react';
import { signOut, useSession } from 'next-auth/react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'tourist' | 'guide' | 'admin';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  // Memoize user object - Always return a consistent structure
  const user = useMemo(() => {
    if (!session?.user) return null;
    
    return {
      id: (session.user as any).id || '',
      name: session.user.name || '',
      email: session.user.email || '',
      role: ((session.user as any).role as 'tourist' | 'guide' | 'admin') || 'tourist',
    };
  }, [session]);

  const loading = status === 'loading';

  const logout = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  const contextValue = useMemo(() => ({
    user,
    loading,
    logout,
  }), [user, loading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}