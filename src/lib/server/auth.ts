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
    const authCookies = cookieStore
      .getAll()
      .filter((cookie) => cookie.name.includes('auth-token') && !cookie.name.includes('code-verifier'));
    const accessToken = authCookies[0]?.value;

    if (!accessToken) {
      return null;
    }

    const client = getSupabaseClient();
    if (!client) {
      return null;
    }

    const { data: userData, error: userError } = await client.auth.getUser(accessToken);
    if (userError || !userData.user) {
      return null;
    }

    const { data: profileData, error: profileError } = await client
      .from('profiles')
      .select('role, status')
      .eq('id', userData.user.id)
      .maybeSingle();

    if (profileError) {
      return null;
    }

    return {
      id: userData.user.id,
      email: userData.user.email || '',
      role: profileData?.role || 'pending',
    };
  } catch (error) {
    console.error('[Auth] Session error:', error);
    return null;
  }
}

    return {
      id: userData.user.id,
      email: userData.user.email || '',
      role: profileData?.role || 'pending',
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
