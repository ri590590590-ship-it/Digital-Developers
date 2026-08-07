'use client';

/**
 * Supabase client factory.
 * Reads NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY from
 * the environment (.env.local). If either is missing, returns null so the
 * app degrades gracefully (WhatsApp-only contact form, demo-mode admin).
 */
import { createClient, SupabaseClient } from '@supabase/supabase-js';

let cached: SupabaseClient | null = null;
let attempted = false;

export function getSupabase(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  if (!url || !anonKey) return null;
  if (cached && !attempted) return cached;
  attempted = true;
  try {
    cached = createClient(url, anonKey);
  } catch (err) {
    console.warn('[Supabase] init failed:', err);
    cached = null;
  }
  return cached;
}

export function supabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
