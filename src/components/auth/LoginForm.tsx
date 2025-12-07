/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Logo from '../Logo';

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
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
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.ok) {
        // Show success toast
        toast.success('Login successful! Redirecting to dashboard...', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        // Redirect to dashboard after short delay to show toast
        setTimeout(() => {
          router.push('/dashboard');
          router.refresh(); // Refresh to update session
        }, 1500);
      }
    } catch (error: any) {
      setErrors({ submit: error.message || 'Login failed' });
      // Show error toast
      toast.error(error.message || 'Login failed. Please check your credentials.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (email: string, password: string) => {
    setLoading(true);
    setFormData({ email, password });
    setErrors({});

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      if (result?.ok) {
        // Show success toast
        toast.success(`Logged in as ${email.includes('tourist') ? 'Tourist' : 'Guide'}! Redirecting...`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });

        // Redirect to dashboard after short delay to show toast
        setTimeout(() => {
          router.push('/dashboard');
          router.refresh(); // Refresh to update session
        }, 1500);
      }
    } catch (error: any) {
      setErrors({ submit: error.message || 'Login failed' });
      toast.error('Demo login failed. Please try again.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <Logo/>
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              create a new account
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    href="/forgot-password"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                loading={loading}
                disabled={loading}
              >
                Sign in
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Demo Accounts
                  </span>
                </div>
              </div>

              <div className="mt-4 grid w-full grid-cols-3 gap-1">
                <div className="text-center bg-amber-200">
                  <p className="text-xs text-gray-600 mb-1">Tourist</p>
                  <p className="text-xs text-gray-500">tourist@demo.com</p>
                  <p className="text-xs text-gray-500">password: 123456</p>
                  <button
                    onClick={() => handleDemoLogin('tourist@demo.com', '123456')}
                    disabled={loading}
                    className="mt-2 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors disabled:opacity-50"
                  >
                    Quick Login
                  </button>
                </div>
                <div className="text-center bg-amber-200">
                  <p className="text-xs text-gray-600 mb-1">Guide</p>
                  <p className="text-xs text-gray-500">guide@demo.com</p>
                  <p className="text-xs text-gray-500">password: 123456</p>
                  <button
                    onClick={() => handleDemoLogin('guide@demo.com', '123456')}
                    disabled={loading}
                    className="mt-2 text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded transition-colors disabled:opacity-50"
                  >
                    Quick Login
                  </button>
                </div>
                <div className="text-center bg-amber-200">
                  <p className="text-xs text-gray-600 mb-1">Admin</p>
                  <p className="text-xs text-gray-500">admin@demo.com</p>
                  <p className="text-xs text-gray-500">password: 123456</p>
                  <button
                    onClick={() => handleDemoLogin('admin@demo.com', '123456')}
                    disabled={loading}
                    className="mt-2 text-xs bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded transition-colors disabled:opacity-50"
                  >
                    Quick Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}