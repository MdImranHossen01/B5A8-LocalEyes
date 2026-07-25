/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import Logo from '@/components/Logo';
import { 
  Home, 
  Compass, 
  Calendar, 
  User, 
  Settings, 
  LogOut,
  FileText,
  Users,
  LayoutDashboard,
  PlusCircle,
  Menu,
  X
} from 'lucide-react';

interface LeftSideNavProps {
  userRole: string;
}

export default function LeftSideNav({ userRole }: LeftSideNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [imgError, setImgError] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Get user from session
  const user = session?.user as any;
  const userId = user?.id;

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/login');
    window.location.reload(); // Force full reload to clear all states
  };

  const getNavItems = () => {
    if (userRole === 'admin') {
      return [
        { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { href: '/dashboard/admin/users', label: 'Users', icon: <Users size={20} /> },
        { href: '/dashboard/admin/manage-listings', label: 'Listings', icon: <FileText size={20} /> },
        { href: '/dashboard/listings/new', label: 'Add Tour', icon: <PlusCircle size={20} /> },
      ];
    }

    // Default regular user items
    return [
      { href: '/dashboard', label: 'Overview', icon: <LayoutDashboard size={20} /> },
      { href: '/dashboard/my-bookings', label: 'My Bookings', icon: <Calendar size={20} /> },
      { href: `/profile/${userId}`, label: 'Profile', icon: <User size={20} /> },
    ];
  };

  const navItems = getNavItems();
  const rawAvatar = user?.image || user?.profilePic;
  const showAvatar = !imgError && typeof rawAvatar === 'string' && rawAvatar.trim().length > 0;

  return (
    <>
      {/* Mobile Top Navbar (visible on mobile only) */}
      <div className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-xs w-full">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-drawer"
            className="p-2 rounded-xl text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle navigation menu"
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Logo />
        </div>
      </div>

      {/* Mobile Drawer Overlay Backdrop */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Mobile Navigation Drawer */}
      <aside
        id="mobile-drawer"
        aria-hidden={!isMobileOpen}
        {...(!isMobileOpen ? { inert: '' } : {})}
        className={`md:hidden fixed inset-y-0 left-0 w-72 bg-white z-50 flex flex-col justify-between overflow-y-auto shadow-2xl transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 flex flex-col min-h-0">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setIsMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-800 hover:text-blue-600 font-semibold text-base"
            >
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                <Home size={20} />
              </div>
              <span>Home Page</span>
            </Link>
            <button
              onClick={() => setIsMobileOpen(false)}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-100 bg-slate-50/70">
          {user && (
            <div className="mb-3 p-2.5 bg-white border border-slate-200/80 rounded-xl flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden border border-white">
                {showAvatar ? (
                  <img
                    src={rawAvatar}
                    alt={user?.name || 'User Avatar'}
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  (user?.name?.charAt(0) || user?.email?.charAt(0) || 'U').toUpperCase()
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-gray-900 truncate">
                  {user?.name || 'Logged User'}
                </p>
                <p className="text-[11px] text-gray-500 truncate" title={user?.email}>
                  {user?.email || ''}
                </p>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 text-xs font-semibold w-full transition-colors"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Desktop Sidebar (visible on md+ screens) */}
      <aside className="hidden md:flex w-64 bg-white border-r border-gray-200 h-screen sticky top-0 self-start flex-col justify-between overflow-y-auto shrink-0 z-30 shadow-sm">
        <div className="flex-1 flex flex-col min-h-0">
          {/* Top Header with Home Link */}
          <div className="p-4 border-b border-gray-100">
            <Link
              href="/"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-800 hover:text-blue-600 hover:bg-blue-50/70 font-semibold text-base transition-all group"
            >
              <div className="p-2 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-2xs">
                <Home size={20} />
              </div>
              <span>Home</span>
            </Link>
          </div>
        
          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-semibold border-l-4 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Card & Logout Section */}
        <div className="p-4 border-t border-gray-100 bg-slate-50/70">
          {user && (
            <div className="mb-3 p-2.5 bg-white border border-slate-200/80 rounded-xl shadow-2xs flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden shadow-2xs border border-white">
                {showAvatar ? (
                  <img 
                    src={rawAvatar} 
                    alt={user?.name || 'User Avatar'} 
                    referrerPolicy="no-referrer"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  (user?.name?.charAt(0) || user?.email?.charAt(0) || 'U').toUpperCase()
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <p className="text-xs font-bold text-gray-900 truncate leading-tight">
                    {user?.name || 'Logged User'}
                  </p>
                  <span className={`px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded ${
                    userRole === 'admin' 
                      ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                      : userRole === 'guide'
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                      : 'bg-blue-100 text-blue-700 border border-blue-200'
                  }`}>
                    {userRole}
                  </span>
                </div>
                <p className="text-[11px] text-gray-500 truncate mt-0.5" title={user?.email}>
                  {user?.email || ''}
                </p>
              </div>
            </div>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center space-x-2.5 px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 text-xs font-semibold w-full transition-colors"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}