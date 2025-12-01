'use client';

import { useState, useEffect } from 'react';
import { useProtectedRoute } from '@/hooks/useProtectedRoute';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'tourist' | 'guide' | 'admin';
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
  const [filterRole, setFilterRole] = useState<'all' | 'tourist' | 'guide' | 'admin'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    }
    
    setFilteredUsers(results);
  }, [users, filterRole, filterStatus, searchQuery]);

  const fetchUsers = async () => {
    setIsLoadingData(true);
    try {
      const response = await fetch('/api/admin/users');
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
    if (!confirm(`Are you sure you want to ${currentStatus ? 'deactivate' : 'activate'} this user?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${userId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isActive: !currentStatus }),
      });

      if (response.ok) {
        // Update local state
        setUsers(users.map(user => 
          user._id === userId 
            ? { ...user, isActive: !currentStatus }
            : user
        ));
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const handleVerifyUser = async (userId: string, isVerified: boolean) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/verify`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isVerified: !isVerified }),
      });

      if (response.ok) {
        // Update local state
        setUsers(users.map(user => 
          user._id === userId 
            ? { ...user, isVerified: !isVerified }
            : user
        ));
      }
    } catch (error) {
      console.error('Error verifying user:', error);
    }
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    if (!confirm(`Change user role to ${newRole}?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });

      if (response.ok) {
        // Update local state
        setUsers(users.map(user => 
          user._id === userId 
            ? { ...user, role: newRole as any }
            : user
        ));
      }
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (isLoading || isLoadingData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const userCounts = {
    total: users.length,
    tourists: users.filter(u => u.role === 'tourist').length,
    guides: users.filter(u => u.role === 'guide').length,
    admins: users.filter(u => u.role === 'admin').length,
    active: users.filter(u => u.isActive).length,
    inactive: users.filter(u => !u.isActive).length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600 mt-2">Manage platform users, roles, and permissions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">{userCounts.total}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Tourists</p>
            <p className="text-2xl font-bold text-blue-600">{userCounts.tourists}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Guides</p>
            <p className="text-2xl font-bold text-green-600">{userCounts.guides}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Admins</p>
            <p className="text-2xl font-bold text-purple-600">{userCounts.admins}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Active</p>
            <p className="text-2xl font-bold text-green-600">{userCounts.active}</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
            <p className="text-sm text-gray-600">Inactive</p>
            <p className="text-2xl font-bold text-red-600">{userCounts.inactive}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {/* Role Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Role:</span>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value as any)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Roles</option>
                  <option value="tourist">Tourist</option>
                  <option value="guide">Guide</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Status:</span>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">User</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Role</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Verified</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Joined</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={user.profilePic || '/api/placeholder/40/40?text=U'}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                          <p className="text-xs text-gray-600">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={user.role}
                        onChange={(e) => handleUpdateRole(user._id, e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="tourist">Tourist</option>
                        <option value="guide">Guide</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                        user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleVerifyUser(user._id, user.isVerified)}
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          user.isVerified 
                            ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {user.isVerified ? 'Verified' : 'Verify'}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleToggleStatus(user._id, user.isActive)}
                          className={`text-sm ${
                            user.isActive 
                              ? 'text-red-600 hover:text-red-700' 
                              : 'text-green-600 hover:text-green-700'
                          }`}
                        >
                          {user.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">👥</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No users found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* User Details Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="border-b border-gray-200 p-6">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>
                <p className="text-gray-600">Complete user information and activity</p>
              </div>

              <div className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={selectedUser.profilePic || '/api/placeholder/80/80?text=U'}
                    alt={selectedUser.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedUser.name}</h3>
                    <p className="text-gray-600">{selectedUser.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Role</p>
                    <p className="font-semibold text-gray-900 capitalize">{selectedUser.role}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Status</p>
                    <p className={`font-semibold ${selectedUser.isActive ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedUser.isActive ? 'Active' : 'Inactive'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Verified</p>
                    <p className={`font-semibold ${selectedUser.isVerified ? 'text-blue-600' : 'text-gray-600'}`}>
                      {selectedUser.isVerified ? 'Verified' : 'Not Verified'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Member Since</p>
                    <p className="font-semibold text-gray-900">{formatDate(selectedUser.createdAt)}</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => handleToggleStatus(selectedUser._id, selectedUser.isActive)}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      selectedUser.isActive 
                        ? 'bg-red-600 text-white hover:bg-red-700' 
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    {selectedUser.isActive ? 'Deactivate User' : 'Activate User'}
                  </button>
                  <button
                    onClick={() => {
                      // In a real app, this would send a message
                      alert(`Messaging ${selectedUser.name} at ${selectedUser.email}`);
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}