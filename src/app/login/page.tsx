import { Metadata } from 'next';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Login - Local Guide Platform',
  description: 'Sign in to your Local Guide Platform account',
};

export default function LoginPage() {
  return <LoginForm />;
}