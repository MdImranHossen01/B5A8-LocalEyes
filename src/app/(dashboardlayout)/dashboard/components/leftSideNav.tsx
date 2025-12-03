"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  MapPin,
  Calendar,
  User,
  Settings,
  LogOut,
  PlusCircle,
  List,
  Briefcase,
  DollarSign,
  Star,
  Users,
  BarChart3,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Define a user type matching your Mongoose model
interface AppUser {
  id?: string;
  name?: string;
  email?: string;
  role?: "tourist" | "guide" | "admin";
  profilePic?: string;
  bio?: string;
  isVerified?: boolean;
  isActive?: boolean;
  rating?: number;
  reviewsCount?: number;
  expertise?: string[];
  dailyRate?: number;
  travelPreferences?: string[];
  lastLogin?: Date;
}

const LeftSideNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();

  // Type assertion for user
  const appUser = user as AppUser | null;

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const getStatusDisplay = () => {
    if (!appUser?.isActive) {
      return {
        text: "Inactive",
        color: "bg-gray-400",
        icon: <XCircle className="w-3 h-3 text-white" />,
        type: "inactive",
      };
    }

    if (appUser?.isVerified) {
      return {
        text: "Verified",
        color: "bg-green-500",
        icon: <CheckCircle className="w-3 h-3 text-white" />,
        type: "verified",
      };
    }

    // Default: Active but not verified
    return {
      text: "Unverified",
      color: "bg-yellow-500",
      icon: <Clock className="w-3 h-3 text-white" />,
      type: "unverified",
    };
  };

  // Helper function to get role display name
  const getRoleDisplayName = (role?: string) => {
    switch (role) {
      case "tourist":
        return "Tourist";
      case "guide":
        return "Tour Guide";
      case "admin":
        return "Administrator";
      default:
        return "User";
    }
  };

  // Helper function to get user initials
  const getUserInitials = () => {
    if (!appUser?.name) return "U";
    return appUser.name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const userRole = appUser?.role || "tourist";
  const userRoleDisplay = getRoleDisplayName(userRole);
  const userInitials = getUserInitials();

  // Common navigation items for all users
  const commonNavItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <Home className="w-5 h-5" />,
      active: pathname === "/dashboard",
      badge: null,
    },
    {
      name: "Explore Tours",
      href: "/explore",
      icon: <MapPin className="w-5 h-5" />,
      active: pathname === "/explore",
      badge: "Hot",
    },
    {
      name: "My Bookings",
      href: "/dashboard/my-bookings",
      icon: <Calendar className="w-5 h-5" />,
      active: pathname === "/dashboard/my-bookings",
      badge:
        appUser?.role === "tourist"
          ? `${appUser?.travelPreferences?.length || 0}`
          : null,
    },
    {
      name: "My Profile",
      href: `/profile/${appUser?.id || ""}`,
      icon: <User className="w-5 h-5" />,
      active: pathname.startsWith("/profile"),
      badge: !appUser?.isVerified
        ? "Verify"
        : appUser?.rating
        ? `${appUser.rating.toFixed(1)}★`
        : null,
    },
  ];

  // Guide-specific navigation items
  const guideNavItems = [
    {
      name: "My Listings",
      href: "/dashboard/listings",
      icon: <List className="w-5 h-5" />,
      active:
        pathname.startsWith("/dashboard/listings") &&
        pathname !== "/dashboard/listings/new",
      badge: null,
    },
    {
      name: "Create Listing",
      href: "/dashboard/listings/new",
      icon: <PlusCircle className="w-5 h-5" />,
      active: pathname === "/dashboard/listings/new",
      badge: "New",
    },
    {
      name: "Earnings",
      href: "/dashboard/earnings",
      icon: <DollarSign className="w-5 h-5" />,
      active: pathname === "/dashboard/earnings",
      badge: appUser?.dailyRate ? `$${appUser.dailyRate}/day` : null,
    },
    {
      name: "My Reviews",
      href: "/dashboard/reviews",
      icon: <Star className="w-5 h-5" />,
      active: pathname === "/dashboard/reviews",
      badge: appUser?.reviewsCount ? `${appUser.reviewsCount}` : null,
    },
  ];

  // Admin-specific navigation items
  const adminNavItems = [
    {
      name: "Admin Dashboard",
      href: "/admin",
      icon: <BarChart3 className="w-5 h-5" />,
      active: pathname === "/admin",
      badge: null,
    },
    {
      name: "Manage Users",
      href: "/admin/users",
      icon: <Users className="w-5 h-5" />,
      active: pathname.startsWith("/admin/users"),
      badge: "Admin",
    },
    {
      name: "All Listings",
      href: "/admin/listings",
      icon: <Briefcase className="w-5 h-5" />,
      active: pathname === "/admin/listings",
      badge: null,
    },
    {
      name: "Verifications",
      href: "/admin/verifications",
      icon: <Shield className="w-5 h-5" />,
      active: pathname === "/admin/verifications",
      badge: "Verify",
    },
    {
      name: "System Settings",
      href: "/admin/settings",
      icon: <Settings className="w-5 h-5" />,
      active: pathname === "/admin/settings",
      badge: null,
    },
  ];

  // Get user-specific nav items
  const getUserSpecificNavItems = () => {
    switch (userRole) {
      case "guide":
        return [...commonNavItems, ...guideNavItems];
      case "admin":
        return [...commonNavItems, ...adminNavItems];
      default: // tourist
        return commonNavItems;
    }
  };

  const navItems = getUserSpecificNavItems();

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-white to-gray-50">
      {/* User Profile Summary */}
      <div className="p-5 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <div className="relative">
            {appUser?.profilePic ? (
              <img
                src={appUser.profilePic}
                alt={appUser.name || "User"}
                className="w-12 h-12 rounded-full object-cover border-2 border-white"
              />
            ) : (
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                {userInitials}
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">
              {appUser?.name || "User Name"}
            </p>
            <p className="text-xs text-gray-500 capitalize">
              {userRoleDisplay}
            </p>
          </div>
        </div>

      
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
            Navigation
          </p>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${
                item.active
                  ? "bg-linear-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold border border-blue-200 shadow-sm"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:shadow-sm"
              }`}
            >
              <div
                className={`${
                  item.active
                    ? "text-blue-600"
                    : "text-gray-400 group-hover:text-gray-600"
                }`}
              >
                {item.icon}
              </div>
              <span className="text-sm flex-1">{item.name}</span>

              {/* Badge */}
              {item.badge && (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    item.badge === "New" || item.badge === "Hot"
                      ? "bg-red-100 text-red-700"
                      : item.badge === "Verify"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {item.badge}
                </span>
              )}

              {item.active && (
                <div className="ml-2 w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-200 bg-white">
        {/* Support/Help */}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors group border border-red-200 hover:border-red-300"
        >
          <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="text-sm font-medium">Logout</span>
        </button>

      
      </div>
    </div>
  );
};

export default LeftSideNav;
