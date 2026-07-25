/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { createPortal } from 'react-dom';
import { MoreVertical } from 'lucide-react';
import {
  PencilIcon,
  TrashIcon,
  EyeIcon,
  MagnifyingGlassIcon,
  ArrowPathIcon,
  PlusIcon,
  StarIcon,
} from '@heroicons/react/24/outline';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';

function ListingActionsDropdown({
  tour,
  onToggleStatus,
  onDeleteListing,
  onViewListing,
  onEditListing,
  deletingId
}: {
  tour: any;
  onToggleStatus: (id: string, currentStatus: boolean) => void;
  onDeleteListing: (id: string) => void;
  onViewListing: (id: string) => void;
  onEditListing: (id: string) => void;
  deletingId: string | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = 176;  // w-44 = 176px
      const actualHeight = dropdownRef.current?.offsetHeight || 160;
      const spaceBelow = window.innerHeight - rect.bottom;
      
      const openUpward = spaceBelow < (actualHeight + 10) && rect.top > actualHeight;

      const top = openUpward
        ? rect.top - window.scrollY - actualHeight - 4
        : rect.bottom - window.scrollY + 4;

      const left = Math.max(10, rect.right - dropdownWidth);

      setCoords({ top: top + window.scrollY, left });
    }
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOpen) {
      updatePosition();
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (!isOpen) return;

    requestAnimationFrame(() => {
      updatePosition();
    });

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleScrollOrResize = () => {
      setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('scroll', handleScrollOrResize, true);
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScrollOrResize, true);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer inline-flex items-center"
        title="Actions"
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && mounted && createPortal(
        <div
          ref={dropdownRef}
          style={{
            position: 'fixed',
            top: `${coords.top}px`,
            left: `${coords.left}px`,
            zIndex: 99999,
          }}
          className="w-44 rounded-xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 py-1.5 text-left space-y-0.5 animate-in fade-in zoom-in-95 duration-100"
        >
          <button
            onClick={() => { setIsOpen(false); onViewListing(tour._id); }}
            className="w-full px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
          >
            <span>👁️</span> View details
          </button>

          <button
            onClick={() => { setIsOpen(false); onEditListing(tour._id); }}
            className="w-full px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
          >
            <span>✏️</span> Edit listing
          </button>

          <button
            onClick={() => { setIsOpen(false); onToggleStatus(tour._id, tour.isActive); }}
            className="w-full px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
          >
            <span>🔄</span> {tour.isActive ? 'Deactivate' : 'Activate'}
          </button>

          <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>

          <button
            onClick={() => { setIsOpen(false); onDeleteListing(tour._id); }}
            disabled={deletingId === tour._id}
            className="w-full px-3 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>🗑️</span> Delete listing
          </button>
        </div>,
        document.body
      )}
    </>
  );
}

// Define TypeScript interface for Tour
interface Tour {
  _id: string;
  title: string;
  description: string;
  tourFee: number;
  duration: number;
  maxGroupSize: number;
  city: string;
  category: string;
  isActive: boolean;
  rating: number;
  reviewsCount: number;
  createdAt: string;
  guide: {
    _id: string;
    name: string;
    email: string;
    profilePic?: string;
  };
}

const ManageListingsPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [tours, setTours] = useState<Tour[]>([]);
  const [filteredTours, setFilteredTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  
  // Stats
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
  });

  // Fetch all listings
  const fetchListings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/listings', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch listings');
      }

      const data = await response.json();
      setTours(data.tours || []);
      setFilteredTours(data.tours || []);
      
      // Calculate stats
      const activeCount = (data.tours || []).filter((tour: Tour) => tour.isActive).length;
      const inactiveCount = (data.tours || []).filter((tour: Tour) => !tour.isActive).length;
      
      setStats({
        total: (data.tours || []).length,
        active: activeCount,
        inactive: inactiveCount,
      });
      
    } catch (error) {
      console.error('Error fetching listings:', error);
      toast.error('Failed to load listings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      // Check if user is admin
      if (session?.user?.role !== 'admin') {
        toast.error('Access denied. Admin only.');
        router.push('/dashboard');
        return;
      }
      fetchListings();
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, session, router, fetchListings]);

  // Apply filters
  useEffect(() => {
    let filtered = [...tours];
    
    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(tour =>
        tour.title?.toLowerCase().includes(term) ||
        tour.description?.toLowerCase().includes(term) ||
        tour.city?.toLowerCase().includes(term) ||
        tour.guide?.name?.toLowerCase().includes(term) ||
        tour.guide?.email?.toLowerCase().includes(term)
      );
    }
    
    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(tour =>
        statusFilter === 'active' ? tour.isActive : !tour.isActive
      );
    }
    
    setFilteredTours(filtered);
  }, [searchTerm, statusFilter, tours]);

  // Delete a listing
  const handleDelete = async (tourId: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this listing? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'rounded-xl font-semibold px-4 py-2',
        cancelButton: 'rounded-xl font-semibold px-4 py-2',
      }
    });

    if (!result.isConfirmed) return;

    try {
      setDeletingId(tourId);
      
      const response = await fetch(`/api/listings/${tourId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete listing');
      }

      // Remove from state
      setTours(prev => prev.filter(tour => tour._id !== tourId));
      toast.success('Listing deleted successfully');
      
    } catch (error) {
      console.error('Error deleting listing:', error);
      toast.error('Failed to delete listing');
    } finally {
      setDeletingId(null);
    }
  };

  // Toggle listing status
  const toggleListingStatus = async (tourId: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/listings/${tourId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update listing status');
      }

      // Update local state
      setTours(prev =>
        prev.map(tour =>
          tour._id === tourId
            ? { ...tour, isActive: !currentStatus }
            : tour
        )
      );
      
      toast.success(`Listing ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
      
    } catch (error) {
      console.error('Error updating listing status:', error);
      toast.error('Failed to update listing status');
    }
  };

  // View listing details
  const handleView = (tourId: string) => {
    router.push(`/tours/${tourId}`);
  };

  // Edit listing
  const handleEdit = (tourId: string) => {
    router.push(`/dashboard/listings/${tourId}/edit`);
  };

  if (loading && tours.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4 px-1 sm:px-2 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Manage Listings
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            View, manage, and edit all published and draft tour listings
          </p>
        </div>

        <Link
          href="/dashboard/listings/new"
          className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium text-sm px-4 py-2.5 rounded-xl shadow-xs transition-all shrink-0"
        >
          <PlusIcon className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Tour</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-400">
                Total Listings
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {stats.total}
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-950/50 p-2.5 rounded-xl border border-blue-100 dark:border-blue-900/50">
              <EyeIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-400">
                Active Listings
              </p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                {stats.active}
              </p>
            </div>
            <div className="bg-emerald-50 dark:bg-emerald-950/50 p-2.5 rounded-xl border border-emerald-100 dark:border-emerald-900/50">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-slate-400">
                Inactive Listings
              </p>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">
                {stats.inactive}
              </p>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/50 p-2.5 rounded-xl border border-amber-100 dark:border-amber-900/50">
              <span className="inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-2xs">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, city, guide..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-all text-slate-900 dark:text-white"
            />
          </div>

          {/* Status Filter */}
          <div className="w-full md:w-44">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="inactive">Inactive Only</option>
            </select>
          </div>

          {/* Refresh Button */}
          <button
            onClick={fetchListings}
            className="px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm font-medium shrink-0"
          >
            <ArrowPathIcon className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Shadcn UI Table Component */}
      <Table className="min-w-[500px]">
        <TableHeader>
          <TableRow className="bg-slate-50/80 dark:bg-slate-800/80 hover:bg-slate-50/80">
            <TableHead className="w-[300px] min-w-[220px]">Tour Details</TableHead>
            <TableHead className="w-[160px] min-w-[130px]">Fee & Duration</TableHead>
            <TableHead className="w-[110px] min-w-[90px]">Status</TableHead>
            <TableHead className="w-[100px] min-w-[80px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTours.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="h-32 text-center">
                <div className="text-slate-500 dark:text-slate-400">
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                      <span>Loading listings...</span>
                    </div>
                  ) : (
                    'No listings found'
                  )}
                </div>
              </TableCell>
            </TableRow>
          ) : (
            filteredTours.map((tour) => (
              <TableRow key={tour._id}>
                {/* Tour Details */}
                <TableCell>
                  <div className="space-y-1.5">
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm line-clamp-1 leading-snug">
                      <Link href={`/tours/${tour._id}`} className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline transition-colors">
                        {tour.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                      {tour.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {tour.category && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-100 dark:border-blue-900/50">
                          {tour.category}
                        </span>
                      )}
                      {tour.city && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                          {tour.city}
                        </span>
                      )}
                      {tour.maxGroupSize && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-100 dark:border-purple-900/50">
                          Max {tour.maxGroupSize} people
                        </span>
                      )}
                    </div>
                  </div>
                </TableCell>

                {/* Fee & Duration */}
                <TableCell>
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      ৳{tour.tourFee?.toLocaleString('en-BD') || 0}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {tour.duration >= 24 && tour.duration % 24 === 0 
                        ? `${tour.duration / 24} ${tour.duration === 24 ? 'Day' : 'Days'}` 
                        : `${tour.duration || 0} hours`}
                    </p>
                  </div>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <button
                    onClick={() => toggleListingStatus(tour._id, tour.isActive)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all border ${
                      tour.isActive
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-900/60'
                        : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-900/60'
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${tour.isActive ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    <span>{tour.isActive ? 'Active' : 'Inactive'}</span>
                  </button>
                </TableCell>

                {/* Actions */}
                <TableCell className="text-right">
                  <ListingActionsDropdown
                    tour={tour}
                    onToggleStatus={toggleListingStatus}
                    onDeleteListing={handleDelete}
                    onViewListing={handleView}
                    onEditListing={handleEdit}
                    deletingId={deletingId}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Footer / Summary */}
      <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
        Showing {filteredTours.length} of {tours.length} total listings
      </div>
    </div>
  );
};

export default ManageListingsPage;