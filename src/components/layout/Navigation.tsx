"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Logo from "../Logo";

// Custom type for session user with extended properties
interface CustomUser {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role: string;
  profilePic?: string;
}

export function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  
  // State for Desktop Profile Dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // State for Mobile Menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Type assertion for session user
  const user = session?.user as CustomUser | undefined;
  const userRole = user?.role || 'tourist';
  const userName = user?.name || 'User';
  const userProfilePic = user?.profilePic || user?.image || '/profile.jpg';
  
  // Get user ID
  const userId = user?.id; 

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Don't use useEffect to close menus on pathname change
  // Instead, let the component unmount/remount naturally between layouts
  // or handle it in the Link onClick handlers

  // Function to close all menus
  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
    router.refresh();
  };

  const getDashboardLink = () => {
    switch (userRole) {
      case 'admin':
        return '/dashboard';
      case 'guide':
        return '/dashboard';
      case 'tourist':
        return '/dashboard/my-bookings';
      default:
        return '/';
    }
  };

  const getDashboardLabel = () => {
    switch (userRole) {
      case 'admin':
        return 'Admin Dashboard';
      case 'guide':
        return 'Guide Dashboard';
      case 'tourist':
        return 'My Dashboard';
      default:
        return 'Dashboard';
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo />
          </div>

          {/* --- DESKTOP NAVIGATION --- */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link
                  href="/explore"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  onClick={closeAllMenus}
                >
                  Explore Tours
                </Link>
                <Link
                  href="/become-guide"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  onClick={closeAllMenus}
                >
                  Become a Guide
                </Link>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  onClick={closeAllMenus}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                  onClick={closeAllMenus}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/explore"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                  onClick={closeAllMenus}
                >
                  Explore Tours
                </Link>

                {/* Desktop User Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                  >
                    <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-blue-100">
                      <Image
                        src={userProfilePic}
                        alt={userName}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                    
                    <svg
                      className={`w-4 h-4 text-gray-500 transition-transform ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Desktop Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden">
                            <Image
                              src={userProfilePic}
                              alt={userName}
                              fill
                              className="object-cover"
                              sizes="40px"
                            />
                          </div>
                          <div className="overflow-hidden">
                            <p className="font-semibold text-gray-900 truncate">{userName}</p>
                            <p className="text-xs text-gray-600 truncate">{user?.email}</p>
                            <span className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
                              userRole === 'admin' ? 'bg-purple-100 text-purple-800' :
                              userRole === 'guide' ? 'bg-green-100 text-green-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Dropdown Links */}
                      <div className="py-2">
                        <Link
                          href={getDashboardLink()}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={closeAllMenus}
                        >
                          <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          {getDashboardLabel()}
                        </Link>
                        
                        <Link
                          href={`/profile/${userId}`}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={closeAllMenus}
                        >
                          <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          My Profile
                        </Link>

                        {userRole === 'tourist' && (
                          <Link
                            href="/dashboard/my-bookings"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={closeAllMenus}
                          >
                            <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            My Bookings
                          </Link>
                        )}

                        {userRole === 'guide' && (
                          <Link
                            href="/dashboard/listings"
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={closeAllMenus}
                          >
                            <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            My Listings
                          </Link>
                        )}
                      </div>

                      {/* Logout Button */}
                      <div className="border-t border-gray-100 pt-2">
                        <button
                          onClick={() => {
                            closeAllMenus();
                            handleLogout();
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* --- MOBILE MENU BUTTON --- */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none p-2"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE NAVIGATION MENU --- */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {!user ? (
              // Mobile View: Logged OUT
              <>
                <Link
                  href="/explore"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={closeAllMenus}
                >
                  Explore Tours
                </Link>
                <Link
                  href="/become-guide"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={closeAllMenus}
                >
                  Become a Guide
                </Link>
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={closeAllMenus}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700 mt-2"
                  onClick={closeAllMenus}
                >
                  Register
                </Link>
              </>
            ) : (
              // Mobile View: Logged IN
              <>
                {/* Mobile User Summary */}
                <div className="flex items-center px-3 py-3 border-b border-gray-100 mb-2">
                  <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                    <Image
                      src={userProfilePic}
                      alt={userName}
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{userName}</div>
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </div>
                </div>

                <Link
                  href="/explore"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={closeAllMenus}
                >
                  Explore Tours
                </Link>

                <Link
                  href={getDashboardLink()}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={closeAllMenus}
                >
                  {getDashboardLabel()}
                </Link>

                <Link
                  href={`/profile/${userId}`}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                  onClick={closeAllMenus}
                >
                  My Profile
                </Link>

                {userRole === 'tourist' && (
                  <Link
                    href="/dashboard/my-bookings"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    onClick={closeAllMenus}
                  >
                    My Bookings
                  </Link>
                )}

                {userRole === 'guide' && (
                  <Link
                    href="/dashboard/listings"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                    onClick={closeAllMenus}
                  >
                    My Listings
                  </Link>
                )}

                <button
                  onClick={() => {
                    closeAllMenus();
                    handleLogout();
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 mt-2"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}