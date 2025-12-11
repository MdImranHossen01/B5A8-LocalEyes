'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import {
  CogIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  GlobeAltIcon,
  BellIcon,
  CreditCardIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';

const SettingsPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  
  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'LocalEyes',
    siteDescription: 'Discover authentic local experiences with expert guides',
    siteUrl: 'https://localeyes.com',
    contactEmail: 'admin@localeyes.com',
    supportEmail: 'support@localeyes.com',
    defaultCurrency: 'USD',
    timezone: 'UTC',
    maintenanceMode: false,
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    requireEmailVerification: true,
    requirePhoneVerification: false,
    twoFactorAuth: false,
    sessionTimeout: 30, // minutes
    maxLoginAttempts: 5,
    passwordMinLength: 8,
    passwordRequireSpecial: true,
    passwordRequireNumbers: true,
    enableIpWhitelist: false,
    allowedIps: '',
  });

  // User Settings
  const [userSettings, setUserSettings] = useState({
    allowUserRegistration: true,
    allowGuideRegistration: true,
    defaultUserRole: 'tourist',
    emailConfirmationRequired: true,
    profileCompletionRequired: true,
    maxProfilePictureSize: 5, // MB
    allowedFileTypes: 'jpg,jpeg,png,gif',
    userContentModeration: true,
    autoApproveGuides: false,
    guideVerificationRequired: true,
  });

  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: '',
    smtpPort: '',
    smtpUsername: '',
    smtpPassword: '',
    smtpFromName: 'LocalEyes',
    smtpFromEmail: 'noreply@localeyes.com',
    emailVerificationTemplate: '',
    passwordResetTemplate: '',
    bookingConfirmationTemplate: '',
  });

  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    stripeEnabled: true,
    stripePublishableKey: '',
    stripeSecretKey: '',
    stripeWebhookSecret: '',
    defaultCommissionRate: 15, // percentage
    payoutFrequency: 'weekly',
    payoutThreshold: 50,
    currency: 'USD',
    taxRate: 0,
    enableRefunds: true,
    refundPeriod: 7, // days
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    newUserNotification: true,
    newBookingNotification: true,
    newReviewNotification: true,
    newListingNotification: true,
    payoutNotification: true,
    newsletterEnabled: true,
    newsletterFrequency: 'weekly',
  });

  // Fetch settings from API
  const fetchSettings = async () => {
    try {
      setLoading(true);
      // In a real app, you would fetch from an API endpoint
      // const response = await fetch('/api/admin/settings');
      // const data = await response.json();
      
      // For now, we'll use mock data
      setTimeout(() => {
        setLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to load settings');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      // Check if user is admin
      if (session?.user?.role !== 'admin') {
        toast.error('Access denied. Admin only.');
        router.push('/dashboard');
        return;
      }
      fetchSettings();
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, session, router]);

  // Save settings
  const saveSettings = async () => {
    try {
      setSaving(true);
      
      // Prepare data based on active tab
      let settingsData = {};
      let endpoint = '';
      
      switch (activeTab) {
        case 'general':
          settingsData = generalSettings;
          endpoint = '/api/admin/settings/general';
          break;
        case 'security':
          settingsData = securitySettings;
          endpoint = '/api/admin/settings/security';
          break;
        case 'users':
          settingsData = userSettings;
          endpoint = '/api/admin/settings/users';
          break;
        case 'email':
          settingsData = emailSettings;
          endpoint = '/api/admin/settings/email';
          break;
        case 'payment':
          settingsData = paymentSettings;
          endpoint = '/api/admin/settings/payment';
          break;
        case 'notifications':
          settingsData = notificationSettings;
          endpoint = '/api/admin/settings/notifications';
          break;
      }
      
      // In a real app, you would send to API
      // const response = await fetch(endpoint, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(settingsData),
      // });
      
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  // Reset to defaults
  const resetSettings = () => {
    if (!confirm('Are you sure you want to reset all settings to default? This action cannot be undone.')) {
      return;
    }
    
    // Reset based on active tab
    switch (activeTab) {
      case 'general':
        setGeneralSettings({
          siteName: 'LocalEyes',
          siteDescription: 'Discover authentic local experiences with expert guides',
          siteUrl: 'https://localeyes.com',
          contactEmail: 'admin@localeyes.com',
          supportEmail: 'support@localeyes.com',
          defaultCurrency: 'USD',
          timezone: 'UTC',
          maintenanceMode: false,
        });
        break;
      case 'security':
        setSecuritySettings({
          requireEmailVerification: true,
          requirePhoneVerification: false,
          twoFactorAuth: false,
          sessionTimeout: 30,
          maxLoginAttempts: 5,
          passwordMinLength: 8,
          passwordRequireSpecial: true,
          passwordRequireNumbers: true,
          enableIpWhitelist: false,
          allowedIps: '',
        });
        break;
      case 'users':
        setUserSettings({
          allowUserRegistration: true,
          allowGuideRegistration: true,
          defaultUserRole: 'tourist',
          emailConfirmationRequired: true,
          profileCompletionRequired: true,
          maxProfilePictureSize: 5,
          allowedFileTypes: 'jpg,jpeg,png,gif',
          userContentModeration: true,
          autoApproveGuides: false,
          guideVerificationRequired: true,
        });
        break;
      case 'email':
        setEmailSettings({
          smtpHost: '',
          smtpPort: '',
          smtpUsername: '',
          smtpPassword: '',
          smtpFromName: 'LocalEyes',
          smtpFromEmail: 'noreply@localeyes.com',
          emailVerificationTemplate: '',
          passwordResetTemplate: '',
          bookingConfirmationTemplate: '',
        });
        break;
      case 'payment':
        setPaymentSettings({
          stripeEnabled: true,
          stripePublishableKey: '',
          stripeSecretKey: '',
          stripeWebhookSecret: '',
          defaultCommissionRate: 15,
          payoutFrequency: 'weekly',
          payoutThreshold: 50,
          currency: 'USD',
          taxRate: 0,
          enableRefunds: true,
          refundPeriod: 7,
        });
        break;
      case 'notifications':
        setNotificationSettings({
          emailNotifications: true,
          pushNotifications: true,
          newUserNotification: true,
          newBookingNotification: true,
          newReviewNotification: true,
          newListingNotification: true,
          payoutNotification: true,
          newsletterEnabled: true,
          newsletterFrequency: 'weekly',
        });
        break;
    }
    
    toast.success('Settings reset to defaults');
  };

  // Toggle maintenance mode
  const toggleMaintenanceMode = () => {
    if (!generalSettings.maintenanceMode) {
      if (!confirm('Enabling maintenance mode will restrict access to the site for non-admin users. Are you sure?')) {
        return;
      }
    }
    setGeneralSettings(prev => ({
      ...prev,
      maintenanceMode: !prev.maintenanceMode
    }));
  };

  // Test email configuration
  const testEmailConfiguration = async () => {
    try {
      toast.loading('Testing email configuration...');
      // In real app: await fetch('/api/admin/settings/test-email');
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.dismiss();
      toast.success('Email configuration test successful!');
    } catch (error) {
      toast.dismiss();
      toast.error('Email configuration test failed');
    }
  };

  // Test payment configuration
  const testPaymentConfiguration = async () => {
    try {
      toast.loading('Testing payment configuration...');
      // In real app: await fetch('/api/admin/settings/test-payment');
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.dismiss();
      toast.success('Payment configuration test successful!');
    } catch (error) {
      toast.dismiss();
      toast.error('Payment configuration test failed');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Tab configurations
  const tabs = [
    { id: 'general', name: 'General', icon: CogIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon },
    { id: 'users', name: 'Users', icon: UserGroupIcon },
    { id: 'email', name: 'Email', icon: EnvelopeIcon },
    { id: 'payment', name: 'Payment', icon: CreditCardIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Admin Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Configure platform settings and preferences
        </p>
      </div>

      {/* Warning Banner for Maintenance Mode */}
      {generalSettings.maintenanceMode && (
        <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400 mr-2" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Maintenance Mode Active
              </h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                The site is currently in maintenance mode. Non-admin users cannot access the site.
              </p>
            </div>
            <button
              onClick={toggleMaintenanceMode}
              className="ml-4 px-3 py-1 text-sm bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-800 dark:hover:bg-yellow-700 text-yellow-800 dark:text-yellow-200 rounded-md transition-colors"
            >
              Disable
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                  ${activeTab === tab.id
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
              >
                <tab.icon className="h-5 w-5 mr-3" />
                {tab.name}
              </button>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button
                onClick={testEmailConfiguration}
                className="w-full px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded transition-colors flex items-center"
              >
                <EnvelopeIcon className="h-4 w-4 mr-2" />
                Test Email
              </button>
              <button
                onClick={testPaymentConfiguration}
                className="w-full px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded transition-colors flex items-center"
              >
                <CreditCardIcon className="h-4 w-4 mr-2" />
                Test Payment
              </button>
              <button
                onClick={resetSettings}
                className="w-full px-3 py-2 text-sm bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-700 dark:text-red-300 rounded transition-colors flex items-center"
              >
                <ArrowPathIcon className="h-4 w-4 mr-2" />
                Reset to Defaults
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {tabs.find(t => t.id === activeTab)?.name} Settings
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Configure {activeTab} settings for your platform
                  </p>
                </div>
                <button
                  onClick={saveSettings}
                  disabled={saving}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircleIcon className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* General Settings */}
              {activeTab === 'general' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Site Name *
                      </label>
                      <input
                        type="text"
                        value={generalSettings.siteName}
                        onChange={(e) => setGeneralSettings(prev => ({ ...prev, siteName: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Default Currency
                      </label>
                      <select
                        value={generalSettings.defaultCurrency}
                        onChange={(e) => setGeneralSettings(prev => ({ ...prev, defaultCurrency: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="CAD">CAD (C$)</option>
                        <option value="AUD">AUD (A$)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Site Description
                    </label>
                    <textarea
                      value={generalSettings.siteDescription}
                      onChange={(e) => setGeneralSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Contact Email *
                      </label>
                      <input
                        type="email"
                        value={generalSettings.contactEmail}
                        onChange={(e) => setGeneralSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Support Email
                      </label>
                      <input
                        type="email"
                        value={generalSettings.supportEmail}
                        onChange={(e) => setGeneralSettings(prev => ({ ...prev, supportEmail: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={generalSettings.maintenanceMode}
                        onChange={toggleMaintenanceMode}
                        className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Enable Maintenance Mode
                      </span>
                    </label>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 ml-7">
                      When enabled, only administrators can access the site
                    </p>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Authentication</h3>
                    
                    <div>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={securitySettings.requireEmailVerification}
                          onChange={(e) => setSecuritySettings(prev => ({ ...prev, requireEmailVerification: e.target.checked }))}
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Require Email Verification
                        </span>
                      </label>
                    </div>

                    <div>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={securitySettings.twoFactorAuth}
                          onChange={(e) => setSecuritySettings(prev => ({ ...prev, twoFactorAuth: e.target.checked }))}
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Enable Two-Factor Authentication (2FA)
                        </span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Session Timeout (minutes)
                      </label>
                      <input
                        type="number"
                        min="5"
                        max="1440"
                        value={securitySettings.sessionTimeout}
                        onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: parseInt(e.target.value) }))}
                        className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Password Policy</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Minimum Password Length
                      </label>
                      <input
                        type="number"
                        min="6"
                        max="32"
                        value={securitySettings.passwordMinLength}
                        onChange={(e) => setSecuritySettings(prev => ({ ...prev, passwordMinLength: parseInt(e.target.value) }))}
                        className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={securitySettings.passwordRequireSpecial}
                          onChange={(e) => setSecuritySettings(prev => ({ ...prev, passwordRequireSpecial: e.target.checked }))}
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Require Special Characters
                        </span>
                      </label>
                    </div>

                    <div>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={securitySettings.passwordRequireNumbers}
                          onChange={(e) => setSecuritySettings(prev => ({ ...prev, passwordRequireNumbers: e.target.checked }))}
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Require Numbers
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* User Settings */}
              {activeTab === 'users' && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Registration</h3>
                    
                    <div>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={userSettings.allowUserRegistration}
                          onChange={(e) => setUserSettings(prev => ({ ...prev, allowUserRegistration: e.target.checked }))}
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Allow User Registration
                        </span>
                      </label>
                    </div>

                    <div>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={userSettings.allowGuideRegistration}
                          onChange={(e) => setUserSettings(prev => ({ ...prev, allowGuideRegistration: e.target.checked }))}
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Allow Guide Registration
                        </span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Default User Role
                      </label>
                      <select
                        value={userSettings.defaultUserRole}
                        onChange={(e) => setUserSettings(prev => ({ ...prev, defaultUserRole: e.target.value }))}
                        className="w-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      >
                        <option value="tourist">Tourist</option>
                        <option value="guide">Guide</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Guide Settings</h3>
                    
                    <div>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={userSettings.autoApproveGuides}
                          onChange={(e) => setUserSettings(prev => ({ ...prev, autoApproveGuides: e.target.checked }))}
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Auto-approve New Guides
                        </span>
                      </label>
                    </div>

                    <div>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={userSettings.guideVerificationRequired}
                          onChange={(e) => setUserSettings(prev => ({ ...prev, guideVerificationRequired: e.target.checked }))}
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Require Guide Verification
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Profile Settings</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Maximum Profile Picture Size (MB)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={userSettings.maxProfilePictureSize}
                        onChange={(e) => setUserSettings(prev => ({ ...prev, maxProfilePictureSize: parseInt(e.target.value) }))}
                        className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Allowed File Types
                      </label>
                      <input
                        type="text"
                        value={userSettings.allowedFileTypes}
                        onChange={(e) => setUserSettings(prev => ({ ...prev, allowedFileTypes: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="jpg,jpeg,png,gif"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Email Settings */}
              {activeTab === 'email' && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">SMTP Configuration</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          SMTP Host
                        </label>
                        <input
                          type="text"
                          value={emailSettings.smtpHost}
                          onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpHost: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder="smtp.gmail.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          SMTP Port
                        </label>
                        <input
                          type="text"
                          value={emailSettings.smtpPort}
                          onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPort: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder="587"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        SMTP Username
                      </label>
                      <input
                        type="text"
                        value={emailSettings.smtpUsername}
                        onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpUsername: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        SMTP Password
                      </label>
                      <input
                        type="password"
                        value={emailSettings.smtpPassword}
                        onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpPassword: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Sender Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          From Name
                        </label>
                        <input
                          type="text"
                          value={emailSettings.smtpFromName}
                          onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpFromName: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          From Email
                        </label>
                        <input
                          type="email"
                          value={emailSettings.smtpFromEmail}
                          onChange={(e) => setEmailSettings(prev => ({ ...prev, smtpFromEmail: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Settings */}
              {activeTab === 'payment' && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Stripe Configuration</h3>
                    
                    <div>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={paymentSettings.stripeEnabled}
                          onChange={(e) => setPaymentSettings(prev => ({ ...prev, stripeEnabled: e.target.checked }))}
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Enable Stripe Payments
                        </span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Stripe Publishable Key
                      </label>
                      <input
                        type="password"
                        value={paymentSettings.stripePublishableKey}
                        onChange={(e) => setPaymentSettings(prev => ({ ...prev, stripePublishableKey: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Stripe Secret Key
                      </label>
                      <input
                        type="password"
                        value={paymentSettings.stripeSecretKey}
                        onChange={(e) => setPaymentSettings(prev => ({ ...prev, stripeSecretKey: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Commission & Payouts</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Default Commission Rate (%)
                      </label>
                      <div className="flex items-center">
                        <input
                          type="number"
                          min="0"
                          max="50"
                          step="0.1"
                          value={paymentSettings.defaultCommissionRate}
                          onChange={(e) => setPaymentSettings(prev => ({ ...prev, defaultCommissionRate: parseFloat(e.target.value) }))}
                          className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                          Platform commission on each booking
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Payout Frequency
                      </label>
                      <select
                        value={paymentSettings.payoutFrequency}
                        onChange={(e) => setPaymentSettings(prev => ({ ...prev, payoutFrequency: e.target.value }))}
                        className="w-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Bi-weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Minimum Payout Threshold ($)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={paymentSettings.payoutThreshold}
                        onChange={(e) => setPaymentSettings(prev => ({ ...prev, payoutThreshold: parseInt(e.target.value) }))}
                        className="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notification Channels</h3>
                    
                    <div>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={notificationSettings.emailNotifications}
                          onChange={(e) => setNotificationSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Enable Email Notifications
                        </span>
                      </label>
                    </div>

                    <div>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={notificationSettings.pushNotifications}
                          onChange={(e) => setNotificationSettings(prev => ({ ...prev, pushNotifications: e.target.checked }))}
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Enable Push Notifications
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Admin Notifications</h3>
                    
                    <div>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={notificationSettings.newUserNotification}
                          onChange={(e) => setNotificationSettings(prev => ({ ...prev, newUserNotification: e.target.checked }))}
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Notify on New User Registration
                        </span>
                      </label>
                    </div>

                    <div>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={notificationSettings.newBookingNotification}
                          onChange={(e) => setNotificationSettings(prev => ({ ...prev, newBookingNotification: e.target.checked }))}
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Notify on New Bookings
                        </span>
                      </label>
                    </div>

                    <div>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={notificationSettings.newListingNotification}
                          onChange={(e) => setNotificationSettings(prev => ({ ...prev, newListingNotification: e.target.checked }))}
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Notify on New Listings
                        </span>
                      </label>
                    </div>

                    <div>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={notificationSettings.payoutNotification}
                          onChange={(e) => setNotificationSettings(prev => ({ ...prev, payoutNotification: e.target.checked }))}
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Notify on Payout Requests
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Newsletter</h3>
                    
                    <div>
                      <label className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={notificationSettings.newsletterEnabled}
                          onChange={(e) => setNotificationSettings(prev => ({ ...prev, newsletterEnabled: e.target.checked }))}
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Enable Newsletter
                        </span>
                      </label>
                    </div>

                    {notificationSettings.newsletterEnabled && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Newsletter Frequency
                        </label>
                        <select
                          value={notificationSettings.newsletterFrequency}
                          onChange={(e) => setNotificationSettings(prev => ({ ...prev, newsletterFrequency: e.target.value }))}
                          className="w-48 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Save/Reset Buttons at bottom */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={resetSettings}
              className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Reset to Defaults
            </button>
            <button
              onClick={saveSettings}
              disabled={saving}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving Changes...
                </>
              ) : (
                'Save All Changes'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;