/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, Menu, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Navigation() {
  const { data: session } = useSession();
  const router = useRouter();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const logoutRef = useRef<HTMLButtonElement>(null);

  // FIXED: Use "click" not "mousedown"
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current) return;

      if (dropdownRef.current.contains(event.target as Node)) return;
      if (logoutRef.current?.contains(event.target as Node)) return;

      setDropdownOpen(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // ✅ Simple & Stable Logout — works everywhere
  const handleLogout = async () => {
    try {
      await signOut();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="bg-white border-b-2 py-4 px-5 sm:px-10 md:px-16 flex justify-between items-center shadow-md fixed top-0 w-full z-50">
      <h2 className="text-primaryColor font-bold text-xl sm:text-2xl">
        <span className="text-black">Jia</span>pixel
      </h2>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-8 items-center text-sm font-semibold tracking-wide">
        {session ? (
          <>
            <Link href="/dashboard" className="hover:text-primaryColor transition">
              Dashboard
            </Link>
            <Link href="/add-project" className="hover:text-primaryColor transition">
              Add Project
            </Link>

            {/* Dropdown */}
            <div className="relative">
              <button
                className="flex items-center gap-2 hover:text-primaryColor transition"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <User className="w-5 h-5" />
                <span>{session.user?.name || "User"}</span>
                <Menu className="w-4 h-4" />
              </button>

              {dropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg p-2 border"
                >
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                  >
                    Profile
                  </Link>

                  <button
                    ref={logoutRef}
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-red-100 text-red-600 rounded-md"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link href="/login" className="hover:text-primaryColor transition">
              Login
            </Link>
            <Link href="/signup" className="hover:text-primaryColor transition">
              Sign Up
            </Link>
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center">
        <MobileMenu session={session} handleLogout={handleLogout} />
      </div>
    </nav>
  );
}

/* ---------------- MOBILE MENU ---------------- */

function MobileMenu({
  session,
  handleLogout,
}: {
  session: any;
  handleLogout: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>
        <Menu className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="absolute top-16 right-5 bg-white w-48 rounded-lg shadow-xl p-4 border z-50">
          {session ? (
            <>
              <Link
                href="/dashboard"
                className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/add-project"
                className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Add Project
              </Link>

              <button
                onClick={handleLogout}
                className="mt-2 w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-red-100 text-red-600 rounded-md"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
}
