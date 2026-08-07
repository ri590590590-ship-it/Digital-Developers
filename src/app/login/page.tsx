import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/config/site';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Admin Login',
  description: 'Secure login for the Digital Developers admin dashboard.',
  path: '/login',
});

export default function LoginPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#f5f3ee', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: 480, border: '1px solid rgba(255,179,0,0.2)', borderRadius: 24, padding: '2rem', background: 'rgba(17,18,20,0.95)', boxShadow: '0 20px 60px rgba(0,0,0,0.35)' }}>
        <p style={{ textTransform: 'uppercase', letterSpacing: '0.3em', color: '#ffb300', marginBottom: '0.5rem' }}>Admin Access</p>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>Sign in to your dashboard</h1>
        <p style={{ color: '#c9c5bd', marginBottom: '1.5rem' }}>Use your Supabase-authenticated admin account to continue.</p>
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          <a href="/admin/dashboard" className="btn btn-primary" style={{ justifyContent: 'center' }}>Continue to Dashboard</a>
          <Link href="/" className="btn admin-link" style={{ justifyContent: 'center' }}>Back to site</Link>
        </div>
        <p style={{ marginTop: '1rem', fontSize: '0.95rem', color: '#9a968f' }}>
          If you have not configured Supabase, the dashboard remains in demo mode until environment variables are set.
        </p>
      </div>
    </div>
  );
}
