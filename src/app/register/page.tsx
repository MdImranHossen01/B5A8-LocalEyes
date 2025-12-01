import { Metadata } from 'next';
import { RegisterForm } from '@/components/auth/RegisterForm';

export const metadata: Metadata = {
  title: 'Register - Local Guide Platform',
  description: 'Create your account to start exploring or sharing local experiences',
};

export default function RegisterPage() {
  return <RegisterForm />;
}