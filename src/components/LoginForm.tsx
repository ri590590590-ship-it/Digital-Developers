
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError('');
    setIsLoading(true);

    try {
      console.log('[LOGIN] Starting login...');
      console.log(
        '[LOGIN] Supabase URL configured:',
        Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL)
      );
      console.log(
        '[LOGIN] Supabase anon key configured:',
        Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
      );

      if (!email || !password) {
        setError('Please enter both email and password.');
        return;
      }

      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      console.log('[LOGIN] Supabase response:', {
        success: !signInError,
        hasUser: Boolean(data?.user),
        hasSession: Boolean(data?.session),
        error: signInError?.message || null,
      });

      if (signInError) {
        setError(`Login failed: ${signInError.message}`);
        return;
      }

      if (!data.session || !data.user) {
        setError(
          'Supabase login succeeded, but no session was returned. Check browser session configuration.'
        );
        return;
      }

      console.log('[LOGIN] User authenticated:', data.user.id);
      console.log('[LOGIN] Session received successfully.');

      const {
        data: sessionCheck,
        error: sessionError,
      } = await supabase.auth.getSession();

      console.log('[LOGIN] Browser session check:', {
        hasSession: Boolean(sessionCheck.session),
        error: sessionError?.message || null,
      });

      if (sessionError || !sessionCheck.session) {
        setError(
          'Login succeeded but the browser session was not saved. Check the browser cookies/session configuration.'
        );
        return;
      }

      console.log('[LOGIN] Redirecting to dashboard...');

      router.push('/admin/dashboard');
      router.refresh();
    } catch (err) {
      console.error('[LOGIN] Unexpected error:', err);

      setError(
        err instanceof Error
          ? `Unexpected error: ${err.message}`
          : 'An unexpected error occurred.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0a0a',
        color: '#f5f3ee',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 480,
          border: '1px solid rgba(255,179,0,0.2)',
          borderRadius: 24,
          padding: '2rem',
          background: 'rgba(17,18,20,0.95)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.35)',
        }}
      >
        <p
          style={{
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
            color: '#ffb300',
            marginBottom: '0.5rem',
          }}
        >
          Admin Access
        </p>

        <h1
          style={{
            fontSize: '2rem',
            marginBottom: '0.75rem',
          }}
        >
          Sign in to your dashboard
        </h1>

        <p
          style={{
            color: '#c9c5bd',
            marginBottom: '1.5rem',
          }}
        >
          Use your Supabase-authenticated admin account to continue.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'grid',
            gap: '0.9rem',
          }}
        >
          <label
            style={{
              display: 'grid',
              gap: '0.35rem',
              color: '#f5f3ee',
            }}
          >
            <span>Email</span>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="admin@example.com"
              required
              style={{
                padding: '0.9rem 1rem',
                borderRadius: 12,
                border: '1px solid rgba(255,179,0,0.2)',
                background: '#111214',
                color: '#f5f3ee',
              }}
            />
          </label>

          <label
            style={{
              display: 'grid',
              gap: '0.35rem',
              color: '#f5f3ee',
            }}
          >
            <span>Password</span>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              required
              style={{
                padding: '0.9rem 1rem',
                borderRadius: 12,
                border: '1px solid rgba(255,179,0,0.2)',
                background: '#111214',
                color: '#f5f3ee',
              }}
            />
          </label>

          {error && (
            <div
              style={{
                background: 'rgba(220,38,38,0.12)',
                color: '#fca5a5',
                border: '1px solid rgba(220,38,38,0.35)',
                borderRadius: 12,
                padding: '0.75rem 1rem',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
            style={{
              justifyContent: 'center',
            }}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div
          style={{
            marginTop: '1rem',
            display: 'grid',
            gap: '0.75rem',
          }}
        >
          <Link
            href="/"
            className="btn admin-link"
            style={{
              justifyContent: 'center',
            }}
          >
            Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}