/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import Image from 'next/image';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'tourist' | 'admin';
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  lastLogin: string;
  profilePic?: string;
  toursCount?: number;
  bookingsCount?: number;
}

export function AdminUsersClient() {
  const { isLoading } = useProtectedRoute('admin');
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'user' | 'tourist' | 'admin'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let results = users;
    
    // Apply role filter
    if (filterRole !== 'all') {
      results = results.filter(user => user.role === filterRole);
    }
    
    // Apply status filter
    if (filterStatus !== 'all') {
      results = results.filter(user => 
        filterStatus === 'active' ? user.isActive : !user.isActive
      );
    }
    
    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(user => 
        user.name?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query)
      );
    }
    
    setFilteredUsers(results);
    setCurrentPage(1);
  }, [users, filterRole, filterStatus, searchQuery]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const fetchUsers = async () => {
    setIsLoadingData(true);
    try {
      const response = await fetch('/api/users');
      const data = await response.json();
      
      if (response.ok) {
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoadingData(false);
    }
  };

  const handleToggleStatus = async (userId: string, currentStatus: boolean) => {
    const actionText = currentStatus ? 'deactivate' : 'activate';
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you really want to ${actionText} this user?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: currentStatus ? '#ef4444' : '#10b981',
      cancelButtonColor: '#64748b',
      confirmButtonText: `Yes, ${actionText}`,
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'rounded-xl font-semibold px-4 py-2',
        cancelButton: 'rounded-xl font-semibold px-4 py-2',
      }
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`/api/users/${userId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.ok) {
        setUsers(users.map(user => 
          user._id === userId 
            ? { ...user, isActive: !currentStatus }
            : user
        ));
        toast.success(`User ${actionText}d successfully!`);
      } else {
        toast.error(`Failed to ${actionText} user`);
      }
    } catch (error) {
      console.error('Error updating user status:', error);
      toast.error('An error occurred');
    }
  };

  const handleVerifyUser = async (userId: string, isVerified: boolean) => {
    try {
      const response = await fetch(`/api/users/${userId}/verify`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isVerified: !isVerified }),
      });

      if (response.ok) {
        setUsers(users.map(user => 
          user._id === userId 
            ? { ...user, isVerified: !isVerified }
            : user
        ));
        toast.success(`User verification updated!`);
      } else {
        toast.error('Failed to update verification status');
      }
    } catch (error) {
      console.error('Error verifying user:', error);
      toast.error('An error occurred');
    }
  };

  const handleUpdateRole = async (userId: string, newRole: User['role']) => {
    const result = await Swal.fire({
      title: 'Change User Role',
      text: `Are you sure you want to change this user's role to ${newRole}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#2563eb',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, change role',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'rounded-xl font-semibold px-4 py-2',
        cancelButton: 'rounded-xl font-semibold px-4 py-2',
      }
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`/api/users/${userId}/role`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        setUsers(users.map(user => 
          user._id === userId 
            ? { ...user, role: newRole as User['role'] }
            : user
        ));
        toast.success(`Role updated to ${newRole}`);
      } else {
        toast.error('Failed to update role');
      }
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('An error occurred');
    }
  };

  const handleDeleteUser = async (userId: string, userName: string) => {
    const result = await Swal.fire({
      title: 'Delete User?',
      text: `Are you sure you want to delete user "${userName}"? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Yes, delete user',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'rounded-2xl',
        confirmButton: 'rounded-xl font-semibold px-4 py-2',
        cancelButton: 'rounded-xl font-semibold px-4 py-2',
      }
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsers(users.filter(u => u._id !== userId));
        toast.success(`User "${userName}" deleted successfully!`);
      } else {
        const data = await response.json();
        toast.error(data?.error || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('An error occurred while deleting user');
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (isLoading || isLoadingData) {
    return (
      <div className="w-full px-1 sm:px-2 py-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const userCounts = {
    total: users.length,
    regularUsers: users.filter(u => u.role === 'user' || u.role === 'tourist').length,
    admins: users.filter(u => u.role === 'admin').length,
    active: users.filter(u => u.isActive).length,
    inactive: users.filter(u => !u.isActive).length,
  };

  return (
    <div className="w-full space-y-5 px-1 sm:px-2">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">User Management</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage platform users, roles, and permissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xs border border-gray-200 dark:border-slate-800 p-4">
          <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Total Users</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{userCounts.total}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xs border border-gray-200 dark:border-slate-800 p-4">
          <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Customers / Users</p>
          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">{userCounts.regularUsers}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xs border border-gray-200 dark:border-slate-800 p-4">
          <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Admins</p>
          <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-1">{userCounts.admins}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xs border border-gray-200 dark:border-slate-800 p-4">
          <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Active</p>
          <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{userCounts.active}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xs border border-gray-200 dark:border-slate-800 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-600 dark:text-slate-400">Role:</span>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value as any)}
                className="border border-gray-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Roles</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-medium text-gray-600 dark:text-slate-400">Status:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="border border-gray-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-1.5 text-xs border border-gray-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-60"
            />
            <span className="absolute left-3 top-2 text-xs text-gray-400">🔍</span>
          </div>
        </div>
      </div>

      {/* Users Table using Shadcn UI Table */}
      <Table className="min-w-[640px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[220px] min-w-[180px]">User</TableHead>
            <TableHead className="w-[110px] min-w-[90px]">Role</TableHead>
            <TableHead className="w-[100px] min-w-[90px]">Status</TableHead>
            <TableHead className="w-[110px] min-w-[100px]">Verified</TableHead>
            <TableHead className="w-[120px] min-w-[100px]">Joined</TableHead>
            <TableHead className="w-[110px] min-w-[100px] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                No users found matching the criteria.
              </TableCell>
            </TableRow>
          ) : (
            paginatedUsers.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-gray-200 dark:border-slate-700">
                      <Image
                        src={user.profilePic || '/profile.jpg'}
                        alt={user.name || 'User'}
                        fill
                        className="object-cover"
                        sizes="32px"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900 dark:text-white text-xs truncate">{user.name}</p>
                      <p className="text-[11px] text-gray-500 dark:text-slate-400 truncate" title={user.email}>{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <select
                    value={user.role}
                    onChange={(e) => handleUpdateRole(user._id, e.target.value as User['role'])}
                    className="border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 capitalize"
                  >
                    <option value="user">User</option>
                    <option value="tourist">Tourist</option>
                    <option value="admin">Admin</option>
                  </select>
                </TableCell>
                <TableCell>
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                    user.isActive ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300'
                  }`}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell>
                  <button
                    onClick={() => handleVerifyUser(user._id, user.isVerified)}
                    className={`px-2 py-0.5 rounded text-xs font-medium transition-colors ${
                      user.isVerified 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-900' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {user.isVerified ? 'Verified' : 'Not Verified'}
                  </button>
                </TableCell>
                <TableCell className="text-xs text-gray-600 dark:text-slate-400">
                  {formatDate(user.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="text-blue-600 hover:text-blue-700 text-xs font-semibold"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleToggleStatus(user._id, user.isActive)}
                      className={`text-xs font-semibold ${
                        user.isActive 
                          ? 'text-amber-600 hover:text-amber-700' 
                          : 'text-emerald-600 hover:text-emerald-700'
                      }`}
                    >
                      {user.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user._id, user.name)}
                      className="text-rose-600 hover:text-rose-700 text-xs font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      {filteredUsers.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-900 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-600 dark:text-slate-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{Math.min((currentPage - 1) * itemsPerPage + 1, filteredUsers.length)}</span> to{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{Math.min(currentPage * itemsPerPage, filteredUsers.length)}</span> of{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{filteredUsers.length}</span> users
            </span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 dark:border-slate-700 rounded-lg px-2 py-1 text-xs bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
            >
              <option value={5}>5 / page</option>
              <option value={10}>10 / page</option>
              <option value={20}>20 / page</option>
              <option value={50}>50 / page</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 text-xs font-medium rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              Previous
            </button>
            <span className="text-xs text-gray-600 dark:text-slate-400 px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 text-xs font-medium rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 disabled:opacity-50 hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">User Details</h2>
              <button
                onClick={() => setSelectedUser(null)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0 border border-gray-200">
                <Image
                  src={selectedUser.profilePic || '/profile.jpg'}
                  alt={selectedUser.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white">{selectedUser.name}</h3>
                <p className="text-xs text-gray-500">{selectedUser.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-100 text-blue-800 capitalize">
                  {selectedUser.role}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-gray-600 dark:text-slate-300 border-t border-gray-100 dark:border-slate-800 pt-3">
              <p><span className="font-semibold">Status:</span> {selectedUser.isActive ? 'Active' : 'Inactive'}</p>
              <p><span className="font-semibold">Verified:</span> {selectedUser.isVerified ? 'Yes' : 'No'}</p>
              <p><span className="font-semibold">Joined:</span> {formatDate(selectedUser.createdAt)}</p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedUser(null)}
                className="w-full py-2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 text-slate-800 dark:text-slate-200 text-xs font-semibold rounded-xl transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}