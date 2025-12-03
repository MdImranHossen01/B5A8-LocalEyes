'use client';

import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  PieChart,
  BarChart3,
  Wallet,
  Target,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Eye,
  EyeOff,
  RefreshCw
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

// Install recharts if not already: npm install recharts

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'booking' | 'refund' | 'withdrawal' | 'bonus';
  status: 'completed' | 'pending' | 'failed';
  tourName: string;
}

interface MonthlyEarning {
  month: string;
  earnings: number;
  bookings: number;
}

interface ChartData {
  name: string;
  value: number;
}

const EarningsPage = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const [showBalance, setShowBalance] = useState(true);
  const [activeChart, setActiveChart] = useState<'line' | 'bar' | 'pie'>('line');

  // Sample data - replace with your API data
  const monthlyEarnings: MonthlyEarning[] = [
    { month: 'Jan', earnings: 4500, bookings: 12 },
    { month: 'Feb', earnings: 5200, bookings: 15 },
    { month: 'Mar', earnings: 4800, bookings: 13 },
    { month: 'Apr', earnings: 6100, bookings: 18 },
    { month: 'May', earnings: 5800, bookings: 16 },
    { month: 'Jun', earnings: 7200, bookings: 22 },
    { month: 'Jul', earnings: 6900, bookings: 20 },
  ];

  const recentTransactions: Transaction[] = [
    { id: '1', date: '2024-03-15', description: 'Golden Gate Tour', amount: 450, type: 'booking', status: 'completed', tourName: 'San Francisco Highlights' },
    { id: '2', date: '2024-03-14', description: 'Withdrawal', amount: -2000, type: 'withdrawal', status: 'completed', tourName: 'Bank Transfer' },
    { id: '3', date: '2024-03-12', description: 'Wine Tasting Experience', amount: 320, type: 'booking', status: 'completed', tourName: 'Napa Valley Tour' },
    { id: '4', date: '2024-03-10', description: 'Referral Bonus', amount: 100, type: 'bonus', status: 'completed', tourName: 'Referral Program' },
    { id: '5', date: '2024-03-08', description: 'City Lights Night Tour', amount: 280, type: 'booking', status: 'pending', tourName: 'Night Photography Tour' },
    { id: '6', date: '2024-03-05', description: 'Customer Refund', amount: -150, type: 'refund', status: 'completed', tourName: 'Hiking Tour Cancellation' },
    { id: '7', date: '2024-03-01', description: 'Alcatraz Historical Tour', amount: 390, type: 'booking', status: 'completed', tourName: 'Alcatraz Experience' },
  ];

  const earningsByTour: ChartData[] = [
    { name: 'Golden Gate Tour', value: 1800 },
    { name: 'Wine Tasting', value: 1250 },
    { name: 'City Lights Tour', value: 980 },
    { name: 'Alcatraz Tour', value: 1560 },
    { name: 'Hiking Adventures', value: 750 },
  ];

  const stats = {
    totalEarnings: 7280,
    pendingBalance: 1240,
    totalBookings: 22,
    avgPerBooking: 331,
    monthlyGrowth: 18.5,
    withdrawalAvailable: 3200,
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'booking': return <DollarSign className="w-4 h-4 text-blue-600" />;
      case 'withdrawal': return <CreditCard className="w-4 h-4 text-purple-600" />;
      case 'refund': return <ArrowDownRight className="w-4 h-4 text-red-600" />;
      case 'bonus': return <TrendingUp className="w-4 h-4 text-green-600" />;
      default: return <DollarSign className="w-4 h-4" />;
    }
  };

  const handleExport = () => {
    // Implement export logic here
    alert('Exporting earnings data...');
  };

  const handleRefresh = () => {
    // Implement refresh logic here
    alert('Refreshing data...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Earnings Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your earnings, withdrawals, and financial insights</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Earnings</p>
              <div className="flex items-center gap-2 mt-2">
                {showBalance ? (
                  <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalEarnings)}</h3>
                ) : (
                  <h3 className="text-2xl font-bold text-gray-900">••••••</h3>
                )}
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-600 font-medium">+{stats.monthlyGrowth}% this month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Available for Withdrawal</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                {showBalance ? formatCurrency(stats.withdrawalAvailable) : '••••••'}
              </h3>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <Wallet className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Withdraw Funds
          </button>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Bookings</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">{stats.totalBookings}</h3>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Avg: {formatCurrency(stats.avgPerBooking)} per booking
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending Balance</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">
                {showBalance ? formatCurrency(stats.pendingBalance) : '••••••'}
              </h3>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <Calendar className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">Will be available in 7 days</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Earnings Overview</h3>
              <p className="text-gray-600 text-sm">Monthly revenue and booking trends</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveChart('line')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeChart === 'line' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <LineChart className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveChart('bar')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeChart === 'bar' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <BarChart3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveChart('pie')}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${activeChart === 'pie' ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <PieChart className="w-4 h-4" />
                </button>
              </div>
              <div className="flex bg-gray-100 p-1 rounded-lg">
                {(['week', 'month', 'year'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition-colors ${timeRange === range ? 'bg-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {activeChart === 'line' ? (
                <LineChart data={monthlyEarnings}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    formatter={(value) => [`$${value}`, 'Earnings']}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              ) : activeChart === 'bar' ? (
                <BarChart data={monthlyEarnings}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    formatter={(value) => [`$${value}`, 'Earnings']}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Bar dataKey="earnings" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              ) : (
                <RechartsPieChart>
                  <Pie
                    data={earningsByTour}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => `${entry.name}: $${entry.value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {earningsByTour.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, 'Earnings']} />
                </RechartsPieChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tour Performance */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Top Performing Tours</h3>
              <p className="text-gray-600 text-sm">Revenue by tour</p>
            </div>
            <Filter className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {earningsByTour.map((tour, index) => (
              <div key={tour.name} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: COLORS[index] }}>
                    <span className="text-xs font-medium text-white">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{tour.name}</p>
                    <p className="text-sm text-gray-500">{formatCurrency(tour.value)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{formatCurrency(tour.value)}</p>
                  <p className="text-sm text-gray-500">
                    {Math.round((tour.value / stats.totalEarnings) * 100)}% of total
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
              <p className="text-gray-600 text-sm">Latest earnings and withdrawals</p>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tour</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{transaction.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">{transaction.tourName}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(transaction.type)}
                      <span className="text-sm text-gray-900 capitalize">{transaction.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`text-sm font-medium ${transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.amount >= 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button className="w-full py-2 text-center text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            View All Transactions
          </button>
        </div>
      </div>

      {/* Quick Stats Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg">
              <ArrowUpRight className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-900">Best Month</p>
              <p className="text-lg font-bold text-blue-900">July: {formatCurrency(7200)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg">
              <Target className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-green-900">Monthly Goal</p>
              <p className="text-lg font-bold text-green-900">85% achieved</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-purple-900">Next Payout</p>
              <p className="text-lg font-bold text-purple-900">March 25, 2024</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EarningsPage;