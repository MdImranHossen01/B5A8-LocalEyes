"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Type assertion for session user
  const user = session?.user as CustomUser | undefined;
  const userRole = user?.role || 'tourist';
  const userName = user?.name || 'User';
  const userProfilePic = user?.profilePic || user?.image || '/profile.jpg';
  
  // Get user ID - IMPORTANT FIX!
  const userId = user?.id; // NextAuth returns 'id' not '_id'

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
          <Logo />

          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {!user ? (
              <>
                <Link
                  href="/explore"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Explore Tours
                </Link>
                <Link
                  href="/become-guide"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Become a Guide
                </Link>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/explore"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium hidden md:block"
                >
                  Explore Tours
                </Link>

                {/* User Profile Dropdown */}
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

                  {/* Dropdown Menu */}
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
                          <div>
                            <p className="font-semibold text-gray-900">{userName}</p>
                            <p className="text-sm text-gray-600">{user?.email}</p>
                            <span className={`inline-block mt-1 px-2 py-1 text-xs rounded-full ${
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
                          onClick={() => setDropdownOpen(false)}
                        >
                          <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                          {getDashboardLabel()}
                        </Link>
                        
                        {/* FIXED PROFILE LINK - Now includes user ID */}
                        <Link
                          href={`/profile/${userId}`}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setDropdownOpen(false)}
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
                            onClick={() => setDropdownOpen(false)}
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
                            onClick={() => setDropdownOpen(false)}
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
                          onClick={handleLogout}
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
        </div>

        {/* Mobile Navigation Links (for logged in users) */}
        {user && (
          <div className="md:hidden pb-4 border-t border-gray-100 mt-2 pt-4">
            <div className="flex flex-wrap gap-2">
              <Link
                href="/explore"
                className="text-gray-700 hover:text-blue-600 px-3 py-1 rounded-md text-sm font-medium bg-gray-100"
              >
                Explore Tours
              </Link>
              
              {/* Add mobile profile link */}
              <Link
                href={`/profile/${userId}`}
                className="text-gray-700 hover:text-blue-600 px-3 py-1 rounded-md text-sm font-medium bg-gray-100"
              >
                My Profile
              </Link>
              
              {userRole === 'tourist' && (
                <Link
                  href="/dashboard/my-bookings"
                  className="text-gray-700 hover:text-blue-600 px-3 py-1 rounded-md text-sm font-medium bg-gray-100"
                >
                  My Bookings
                </Link>
              )}

              {userRole === 'guide' && (
                <Link
                  href="/dashboard/listings"
                  className="text-gray-700 hover:text-blue-600 px-3 py-1 rounded-md text-sm font-medium bg-gray-100"
                >
                  My Listings
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}