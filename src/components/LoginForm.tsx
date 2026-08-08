
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function LoginForm() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);

    try {
      const { error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        setError(signInError.message || 'Login failed.');
        return;
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch (error) {
      console.error('[Login] Error:', error);
      setError('An unexpected error occurred. Please try again.');
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
              style={{
                padding: '0.9rem 1rem',
                borderRadius: 12,
                border: '1px solid rgba(255,179,0,0.2)',
                background: '#111214',
                color: '#f5f3ee',
              }}
              placeholder="admin@example.com"
              autoComplete="email"
              required
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
              style={{
                padding: '0.9rem 1rem',
                borderRadius: 12,
                border: '1px solid rgba(255,179,0,0.2)',
                background: '#111214',
                color: '#f5f3ee',
              }}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </label>

          {error ? (
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
          ) : null}

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
            style={{
              justifyContent: 'center',
              opacity: isLoading ? 0.7 : 1,
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
