import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { SITE } from '@/config/site';
import { buildMetadata } from '@/lib/seo';
import { requireAdminSession } from '@/lib/server/auth';
import AdminDashboard from '@/components/AdminDashboard';

export const metadata: Metadata = buildMetadata({
  title: 'Admin Dashboard',
  description: `Secure admin dashboard for ${SITE.name}.`,
  path: '/admin/dashboard',
});

export default async function AdminDashboardPage() {
  const session = await requireAdminSession();

  if (!session.allowed) {
    redirect('/login');
  }

  return (
    <div id="admin-root">
      <AdminDashboard />
    </div>
  );
}
