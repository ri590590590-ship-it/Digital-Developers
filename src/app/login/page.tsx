import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import LoginForm from '@/components/LoginForm';

export const metadata: Metadata = buildMetadata({
  title: 'Admin Login',
  description: 'Secure login for the Digital Developers admin dashboard.',
  path: '/login',
});

export default function LoginPage() {
  return <LoginForm />;
}
