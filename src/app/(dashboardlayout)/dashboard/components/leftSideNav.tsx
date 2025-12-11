/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { 
  Home, 
  Compass, 
  Calendar, 
  User, 
  Settings, 
  LogOut,
  Briefcase,
  Star,
  DollarSign,
  FileText,
  Users
} from 'lucide-react';

interface LeftSideNavProps {
  userRole: string;
}

export default function LeftSideNav({ userRole }: LeftSideNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  // Get user from session
  const user = session?.user as any;
  const userId = user?.id;

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
    window.location.reload(); // Force full reload to clear all states
  };

  const getNavItems = () => {
    const commonItems = [
      { href: '/dashboard', label: 'Overview', icon: <Home size={20} /> },
      { href: '/explore', label: 'Explore Tours', icon: <Compass size={20} /> },
      { href: `/profile/${userId}`, label: 'Profile', icon: <User size={20} /> }, // FIXED: Added user ID
    ];

    if (userRole === 'tourist') {
      return [
        ...commonItems,
        { href: '/dashboard/my-bookings', label: 'My Bookings', icon: <Calendar size={20} /> },
      ];
    }

    if (userRole === 'guide') {
      return [
        ...commonItems,
        { href: '/dashboard/listings', label: 'My Listings', icon: <Briefcase size={20} /> },
        { href: '/dashboard/my-bookings', label: 'Bookings', icon: <Calendar size={20} /> },
        { href: '/dashboard/earnings', label: 'Earnings', icon: <DollarSign size={20} /> },
        { href: '/dashboard/reviews', label: 'Reviews', icon: <Star size={20} /> },
      ];
    }

    if (userRole === 'admin') {
      return [
        { href: '/dashboard', label: 'Dashboard', icon: <Home size={20} /> },
        { href: '/dashboard/admin/users', label: 'Users', icon: <Users size={20} /> },
        { href: '/dashboard/admin/manage-listings', label: 'Listings', icon: <FileText size={20} /> },
        { href: '/dashboard/admin/settings', label: 'Settings', icon: <Settings size={20} /> },
      ];
    }

    return commonItems;
  };

  const navItems = getNavItems();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800">LocalEyes</h2>
        <p className="text-sm text-gray-600 mt-1">Dashboard</p>
      </div>
      
      <nav className="px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
        
        <button
          onClick={handleLogout}
          className="flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 w-full mt-8"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </nav>
    </aside>
  );
}