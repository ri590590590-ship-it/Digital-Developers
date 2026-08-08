
import { createClient } from '@/lib/supabase/server';

export interface AuthUser {
  id: string;
  email: string;
  role?: string;
  status?: string;
}

export async function getServerSession(): Promise<AuthUser | null> {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('[Auth] User lookup failed:', userError?.message);
      return null;
    }

    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('role, status')
      .eq('id', user.id)
      .maybeSingle();

    if (profileError) {
      console.error('[Auth] Profile lookup error:', profileError);
      return null;
    }

    return {
      id: user.id,
      email: user.email || '',
      role: profileData?.role || 'pending',
      status: profileData?.status,
    };
  } catch (error) {
    console.error('[Auth] Session error:', error);
    return null;
  }
}

export async function requireAdminSession() {
  const user = await getServerSession();

  if (!user) {
    return {
      allowed: false,
      redirectTo: '/login',
    };
  }

  if (!['admin', 'super_admin'].includes(user.role || '')) {
    return {
      allowed: false,
      redirectTo: '/login',
    };
  }

  return {
    allowed: true,
    user,
  };
}