import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

export interface AuthUser {
  id: string;
  email: string;
  role?: string;
}

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (!url || !anonKey) {
    return null;
  }

  return createClient(url, anonKey);
}

export async function getServerSession(): Promise<AuthUser | null> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('sb-access-token')?.value;

    if (!accessToken) {
      return null;
    }

    const client = getSupabaseClient();
    if (!client) {
      return null;
    }

    const { data, error } = await client.auth.getUser(accessToken);
    if (error || !data.user) {
      return null;
    }

    return {
      id: data.user.id,
      email: data.user.email || '',
      role: data.user.user_metadata?.role || 'user',
    };
  } catch {
    return null;
  }
}

export async function requireAdminSession() {
  const user = await getServerSession();
  if (!user) {
    return { allowed: false, redirectTo: '/login' };
  }

  if (!['admin', 'super_admin'].includes(user.role || '')) {
    return { allowed: false, redirectTo: '/login' };
  }

  return { allowed: true, user };
}
