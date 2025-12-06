/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import Logo from '../Logo';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'tourist' | 'guide';
  bio: string;
  languages: string;
  expertise: string;
  dailyRate: string;
  travelPreferences: string;
}

export function RegisterForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'tourist',
    bio: '',
    languages: '',
    expertise: '',
    dailyRate: '',
    travelPreferences: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (formData.role === 'guide' && !formData.dailyRate) {
      newErrors.dailyRate = 'Daily rate is required for guides';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const registerData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        bio: formData.bio || undefined,
        languages: formData.languages ? [formData.languages] : undefined,
        expertise: formData.expertise ? [formData.expertise] : undefined,
        dailyRate: formData.dailyRate ? parseInt(formData.dailyRate) : undefined,
        travelPreferences: formData.travelPreferences ? [formData.travelPreferences] : undefined,
      };

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      // Auto login after registration
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.ok) {
        router.push('/dashboard');
        router.refresh();
      }
    } catch (error: any) {
      setErrors({ submit: error.message || 'Registration failed' });
    } finally {
      setLoading(false);
    }
  };

  const languageOptions = [
    { value: '', label: 'Select Language' },
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
    { value: 'italian', label: 'Italian' },
    { value: 'japanese', label: 'Japanese' },
    { value: 'chinese', label: 'Chinese' },
  ];

  const expertiseOptions = [
    { value: '', label: 'Select Expertise' },
    { value: 'history', label: 'History' },
    { value: 'food', label: 'Food & Dining' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'art', label: 'Art & Culture' },
    { value: 'nature', label: 'Nature' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'nightlife', label: 'Nightlife' },
    { value: 'photography', label: 'Photography' },
  ];

  const preferenceOptions = [
    { value: '', label: 'Select Preference' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'culture', label: 'Culture' },
    { value: 'food', label: 'Food' },
    { value: 'relaxation', label: 'Relaxation' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'history', label: 'History' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
       <div className="flex justify-center">
              <Logo/>
            </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link
            href="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                {errors.submit}
              </div>
            )}

            <Input
              label="Full Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
              className='text-gray-800'
            />

            <Input
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
              className='text-gray-800'
            />

            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
              className='text-gray-800'
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
              className='text-gray-800'
            />

            <Select
              label="I want to join as a"
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={[
                { value: 'tourist', label: 'Traveler' },
                { value: 'guide', label: 'Local Guide' },
              ]}
              className='text-gray-800'
            />

            <Input
              label="Bio (Optional)"
              name="bio"
              type="text"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us a bit about yourself..."
              className='text-gray-800'
            />

            <Select
              label="Primary Language"
              name="languages"
              value={formData.languages}
              onChange={handleChange}
              options={languageOptions}
              className='text-gray-800'
            />

            {formData.role === 'guide' && (
              <>
                <Select
                  label="Area of Expertise"
                  name="expertise"
                  value={formData.expertise}
                  onChange={handleChange}
                  options={expertiseOptions}
                  className='text-gray-800'
                />

                <Input
                  label="Daily Rate ($)"
                  name="dailyRate"
                  type="number"
                  value={formData.dailyRate}
                  onChange={handleChange}
                  error={errors.dailyRate}
                  placeholder="50"
                  className='text-gray-800'
                />
              </>
            )}

            {formData.role === 'tourist' && (
              <Select
                label="Travel Preference"
                name="travelPreferences"
                value={formData.travelPreferences}
                onChange={handleChange}
                options={preferenceOptions}
                className='text-gray-800'
              />
            )}

            <Button
              type="submit"
              loading={loading}
              disabled={loading}
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  By signing up, you agree to our
                </span>
              </div>
            </div>
            <div className="text-center mt-2">
              <Link
                href="/terms"
                className="font-medium text-blue-600 hover:text-blue-500 text-sm"
              >
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link
                href="/privacy"
                className="font-medium text-blue-600 hover:text-blue-500 text-sm"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}