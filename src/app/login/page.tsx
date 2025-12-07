import { Metadata } from 'next';
import { LoginForm } from '@/components/auth/LoginForm';

export const metadata: Metadata = {
  title: 'Login - Local Eyes',
  description: 'Sign in to your Local Eyes account',
};

export default function LoginPage() {
  return <LoginForm />;
}