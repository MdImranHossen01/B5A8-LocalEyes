/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { MoreVertical } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';

interface DashboardData {
  bookings: any[];
  tours: any[];
  stats: any;
}

interface AdminDashboardProps {
  data: DashboardData;
}

function BookingActionsDropdown({
  booking,
  onUpdateStatus,
  onDeleteBooking,
  onViewBooking
}: {
  booking: any;
  onUpdateStatus: (id: string, newStatus: string, extraData?: any) => void;
  onDeleteBooking: (id: string) => void;
  onViewBooking: (id: string) => void;
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
      const actualHeight = dropdownRef.current?.offsetHeight || 190;
      const spaceBelow = window.innerHeight - rect.bottom;
      
      // Only open upwards if viewport space below is smaller than dropdown height
      const openUpward = spaceBelow < (actualHeight + 10) && rect.top > actualHeight;

      const top = openUpward
        ? rect.top - actualHeight - 4
        : rect.bottom + 4;

      const left = Math.max(10, rect.right - dropdownWidth);

      setCoords({ top, left });
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

    // Recalculate once mounted in DOM to get exact height
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
        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
        title="Booking Actions"
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
            onClick={() => { setIsOpen(false); onViewBooking(booking._id); }}
            className="w-full px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
          >
            <span>👁️</span> View Details
          </button>

          <button
            onClick={() => { setIsOpen(false); onUpdateStatus(booking._id, 'confirmed'); }}
            className="w-full px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 flex items-center gap-2 cursor-pointer"
          >
            <span>✅</span> Confirm Booking
          </button>

          <button
            onClick={() => { setIsOpen(false); onUpdateStatus(booking._id, 'paid', { paymentStatus: 'paid' }); }}
            className="w-full px-3 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 flex items-center gap-2 cursor-pointer"
          >
            <span>💳</span> Mark as Paid
          </button>

          <button
            onClick={() => { setIsOpen(false); onUpdateStatus(booking._id, 'cancelled'); }}
            className="w-full px-3 py-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 flex items-center gap-2 cursor-pointer"
          >
            <span>❌</span> Cancel Booking
          </button>

          <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>

          <button
            onClick={() => { setIsOpen(false); onDeleteBooking(booking._id); }}
            className="w-full px-3 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 cursor-pointer"
          >
            <span>🗑️</span> Delete Booking
          </button>
        </div>,
        document.body
      )}
    </>
  );
}

function ListingActionsDropdown({
  tour,
  onToggleStatus,
  onDeleteListing,
  onViewListing,
  onEditListing
}: {
  tour: any;
  onToggleStatus: (id: string, currentStatus: boolean) => void;
  onDeleteListing: (id: string, title?: string) => void;
  onViewListing: (id: string) => void;
  onEditListing: (id: string) => void;
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
        ? rect.top - actualHeight - 4
        : rect.bottom + 4;

      const left = Math.max(10, rect.right - dropdownWidth);

      setCoords({ top, left });
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
        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
        title="Listing Actions"
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
            <span>👁️</span> View Tour
          </button>

          <button
            onClick={() => { setIsOpen(false); onEditListing(tour._id); }}
            className="w-full px-3 py-1.5 text-xs font-semibold text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 flex items-center gap-2 cursor-pointer"
          >
            <span>✏️</span> Edit Tour
          </button>

          <button
            onClick={() => { setIsOpen(false); onToggleStatus(tour._id, tour.isActive); }}
            className={`w-full px-3 py-1.5 text-xs font-semibold flex items-center gap-2 cursor-pointer ${
              tour.isActive 
                ? 'text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40' 
                : 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
            }`}
          >
            <span>{tour.isActive ? '⏸️' : '▶️'}</span> {tour.isActive ? 'Deactivate' : 'Activate'}
          </button>

          <div className="border-t border-slate-100 dark:border-slate-800 my-1"></div>

          <button
            onClick={() => { setIsOpen(false); onDeleteListing(tour._id, tour.title); }}
            className="w-full px-3 py-1.5 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 cursor-pointer"
          >
            <span>🗑️</span> Delete Tour
          </button>
        </div>,
        document.body
      )}
    </>
  );
}

export function AdminDashboard({ data }: AdminDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'listings' | 'bookings'>('overview');
  const [bookingsList, setBookingsList] = useState<any[]>(data.bookings || []);

  useEffect(() => {
    setBookingsList(data.bookings || []);
  }, [data.bookings]);

  const handleUpdateBookingStatus = async (id: string, newStatus: string, extraData: any = {}) => {
    try {
      const payload = { status: newStatus, ...extraData };
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        const updatedRes = await res.json();
        const updatedBooking = updatedRes.booking;
        setBookingsList(prev => prev.map(b => b._id === id ? { ...b, ...updatedBooking, status: newStatus, ...extraData } : b));
        toast.success(`Booking status updated to ${newStatus}`);
      } else {
        const errData = await res.json();
        console.error('Update status failed:', errData);
        toast.error(errData?.details || errData?.error || 'Failed to update booking status');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred');
    }
  };

  const handleDeleteBooking = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this booking? This action cannot be undone.',
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
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setBookingsList(prev => prev.filter(b => b._id !== id));
        toast.success('Booking deleted successfully');
      } else {
        toast.error('Failed to delete booking');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred');
    }
  };

  const [toursList, setToursList] = useState<any[]>(data.tours || []);

  useEffect(() => {
    setToursList(data.tours || []);
  }, [data.tours]);

  const handleToggleTourStatus = async (tourId: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/listings/${tourId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      if (res.ok) {
        setToursList(prev => prev.map(t => t._id === tourId ? { ...t, isActive: !currentStatus } : t));
        toast.success(`Listing ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
      } else {
        toast.error('Failed to update listing status');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while updating status');
    }
  };

  const handleDeleteTour = async (tourId: string, title?: string) => {
    const result = await Swal.fire({
      title: 'Delete Tour Listing?',
      text: `Are you sure you want to delete "${title || 'this tour'}"? This action cannot be undone.`,
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
      const res = await fetch(`/api/listings/${tourId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setToursList(prev => prev.filter(t => t._id !== tourId));
        toast.success('Tour listing deleted successfully');
      } else {
        toast.error('Failed to delete tour listing');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while deleting tour');
    }
  };

  const getFirstDayOfCurrentMonth = () => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const offset = firstDay.getTimezoneOffset();
    const localFirstDay = new Date(firstDay.getTime() - (offset * 60 * 1000));
    return localFirstDay.toISOString().split('T')[0];
  };

  const getLastDayOfCurrentMonth = () => {
    const now = new Date();
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const offset = lastDay.getTimezoneOffset();
    const localLastDay = new Date(lastDay.getTime() - (offset * 60 * 1000));
    return localLastDay.toISOString().split('T')[0];
  };

  const [startDate, setStartDate] = useState(getFirstDayOfCurrentMonth());
  const [endDate, setEndDate] = useState(getLastDayOfCurrentMonth());

  // Mock data for admin (would come from API)
  const users = [
    { _id: '1', name: 'John Traveler', email: 'john@example.com', role: 'user', status: 'active', joined: '2024-01-15' },
    { _id: '2', name: 'Maria Host', email: 'maria@example.com', role: 'user', status: 'active', joined: '2024-01-10' },
    { _id: '3', name: 'Alex User', email: 'alex@example.com', role: 'user', status: 'inactive', joined: '2024-01-05' },
  ];

  const allTours = toursList;

  const filteredBookings = bookingsList.filter(booking => {
    if (!booking.date) return false;
    const bookingDateStr = booking.date.split('T')[0];
    return bookingDateStr >= startDate && bookingDateStr <= endDate;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage platform users, listings, and bookings</p>
        </div>

        {/* Date Range Filter UI */}
        <div className="flex flex-wrap items-center gap-3 bg-white p-4 rounded-xl border border-gray-200/80 shadow-2xs">
          <div className="flex items-center gap-2">
            <label htmlFor="admin-start-date" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">From:</label>
            <input
              id="admin-start-date"
              type="date"
              value={startDate}
              onChange={(e) => {
                const val = e.target.value;
                if (!endDate || val <= endDate) {
                  setStartDate(val);
                }
              }}
              className="text-sm border border-gray-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-800"
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="admin-end-date" className="text-xs font-semibold text-gray-500 uppercase tracking-wider">To:</label>
            <input
              id="admin-end-date"
              type="date"
              value={endDate}
              onChange={(e) => {
                const val = e.target.value;
                if (!startDate || val >= startDate) {
                  setEndDate(val);
                }
              }}
              className="text-sm border border-gray-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-gray-800"
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <span className="text-2xl">👥</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{data.stats?.totalUsers || 124}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <span className="text-2xl">🗺️</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Listings</p>
              <p className="text-2xl font-bold text-gray-900">{data.stats?.totalTours || 56}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg mr-4">
              <span className="text-2xl">📋</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Bookings in Range</p>
              <p className="text-2xl font-bold text-gray-900">{filteredBookings.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
              activeTab === 'users'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Users
          </button>
          <button
            onClick={() => setActiveTab('listings')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
              activeTab === 'listings'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Listings
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors cursor-pointer ${
              activeTab === 'bookings'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Bookings
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mb-8">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Users */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">Recent Users</h2>
                <button
                  onClick={() => setActiveTab('users')}
                  className="text-blue-600 hover:text-blue-700 text-xs font-semibold"
                >
                  View All
                </button>
              </div>
              <Table className="min-w-[450px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">User</TableHead>
                    <TableHead className="w-[160px]">Email</TableHead>
                    <TableHead className="w-[90px] text-right">Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.slice(0, 5).map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                            {user.name?.charAt(0)}
                          </div>
                          <span className="text-xs font-semibold text-slate-900 truncate">
                            {user.name}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-gray-500 truncate" title={user.email}>
                        {user.email}
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {user.role}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-900">Recent Bookings</h2>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className="text-blue-600 hover:text-blue-700 text-xs font-semibold"
                >
                  View All
                </button>
              </div>

              {filteredBookings.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-3">📋</div>
                  <p className="text-gray-600 text-xs">No bookings in selected range</p>
                </div>
              ) : (
                <Table className="min-w-[450px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[180px]">Tour</TableHead>
                      <TableHead className="w-[140px]">Traveler</TableHead>
                      <TableHead className="w-[100px]">Amount</TableHead>
                      <TableHead className="w-[90px] text-right">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.slice(0, 5).map((booking) => (
                      <TableRow key={booking._id}>
                        <TableCell>
                          <div className="space-y-0.5">
                            <p className="text-xs font-semibold text-slate-900 truncate">
                              {booking.tour?.title || 'Tour'}
                            </p>
                            <p className="text-[11px] text-gray-500">
                              {booking.date ? formatDate(booking.date) : 'Date not set'}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-xs text-gray-700 truncate">
                            {booking.tourist?.name || booking.name || 'Traveler'}
                          </p>
                        </TableCell>
                        <TableCell className="text-xs font-bold text-slate-900">
                          {formatCurrency(booking.totalAmount || 0)}
                        </TableCell>
                        <TableCell className="text-right">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                            booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' :
                            booking.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {booking.status || 'pending'}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">User Management</h2>
            
            <Table className="min-w-[640px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px] min-w-[150px]">User</TableHead>
                  <TableHead className="w-[180px] min-w-[150px]">Email</TableHead>
                  <TableHead className="w-[100px] min-w-[90px]">Role</TableHead>
                  <TableHead className="w-[100px] min-w-[90px]">Status</TableHead>
                  <TableHead className="w-[120px] min-w-[100px]">Joined</TableHead>
                  <TableHead className="w-[110px] min-w-[90px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center shrink-0">
                          <span className="text-gray-600 font-medium text-xs">
                            {user.name?.charAt(0)}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900 truncate">
                          {user.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-900">{user.email}</TableCell>
                    <TableCell>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                        user.role === 'guide' ? 'bg-indigo-100 text-indigo-800' :
                        user.role === 'tourist' || user.role === 'user' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                        user.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                      }`}>
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {formatDate(user.joined)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-700 text-xs font-semibold">
                          Edit
                        </button>
                        <button className="text-rose-600 hover:text-rose-700 text-xs font-semibold">
                          {user.status === 'active' ? 'Disable' : 'Enable'}
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {activeTab === 'listings' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 pb-36 min-h-[360px]">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Listing Management</h2>
            
            <Table className="min-w-[550px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[220px] min-w-[180px]">Tour</TableHead>
                  <TableHead className="w-[110px] min-w-[90px]">City</TableHead>
                  <TableHead className="w-[110px] min-w-[90px]">Price</TableHead>
                  <TableHead className="w-[100px] min-w-[90px]">Status</TableHead>
                  <TableHead className="w-[110px] min-w-[100px]">Created</TableHead>
                  <TableHead className="w-[80px] min-w-[70px] text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allTours.map((tour) => (
                  <TableRow key={tour._id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="relative w-9 h-9 shrink-0">
                          <Image
                            src={tour.images?.[0] || '/profile.jpg'}
                            alt={tour.title || 'Tour'}
                            fill
                            className="rounded-lg object-cover"
                            sizes="36px"
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 line-clamp-1">
                          {tour.title || 'Untitled Tour'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-gray-900">
                      {tour.city || 'Unknown'}
                    </TableCell>
                    <TableCell className="text-sm font-bold text-gray-900">
                      ৳{tour.tourFee || 0}
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                        tour.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                      }`}>
                        {tour.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {tour.createdAt ? formatDate(tour.createdAt) : 'Unknown'}
                    </TableCell>
                    <TableCell className="text-right">
                      <ListingActionsDropdown
                        tour={tour}
                        onToggleStatus={handleToggleTourStatus}
                        onDeleteListing={handleDeleteTour}
                        onViewListing={(id) => router.push(`/tours/${id}`)}
                        onEditListing={(id) => router.push(`/dashboard/listings/${id}/edit`)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 pb-36 min-h-[360px]">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Booking Management</h2>
            
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">📋</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings yet</h3>
                <p className="text-gray-600">Platform bookings in this range will appear here.</p>
              </div>
            ) : (
              <Table className="min-w-[600px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px] min-w-[80px]">ID</TableHead>
                    <TableHead className="w-[140px] min-w-[120px]">Traveler</TableHead>
                    <TableHead className="w-[160px] min-w-[140px]">Tour</TableHead>
                    <TableHead className="w-[120px] min-w-[100px]">Date</TableHead>
                    <TableHead className="w-[110px] min-w-[90px]">Amount</TableHead>
                    <TableHead className="w-[100px] min-w-[90px]">Status</TableHead>
                    <TableHead className="w-[80px] min-w-[70px] text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking._id}>
                      <TableCell className="text-xs text-gray-600">
                        {booking._id ? booking._id.substring(0, 8) + '...' : 'N/A'}
                      </TableCell>
                      <TableCell className="text-xs font-semibold text-gray-900">
                        {booking.tourist?.name || booking.name || 'Traveler'}
                      </TableCell>
                      <TableCell className="text-xs text-gray-900 line-clamp-1">
                        {booking.tour?.title || 'Tour'}
                      </TableCell>
                      <TableCell className="text-xs text-gray-600">
                        {booking.date ? formatDate(booking.date) : 'Date not set'}
                      </TableCell>
                      <TableCell className="text-xs font-bold text-gray-900">
                        {formatCurrency(booking.totalAmount || 0)}
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                          booking.status === 'confirmed' ? 'bg-emerald-50 text-emerald-700' :
                          booking.status === 'paid' ? 'bg-blue-50 text-blue-700 font-bold' :
                          booking.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                          booking.status === 'completed' ? 'bg-purple-50 text-purple-700' :
                          'bg-rose-50 text-rose-700'
                        }`}>
                          {booking.status || 'pending'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <BookingActionsDropdown
                          booking={booking}
                          onUpdateStatus={handleUpdateBookingStatus}
                          onDeleteBooking={handleDeleteBooking}
                          onViewBooking={(id) => router.push(`/bookings/${id}`)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}