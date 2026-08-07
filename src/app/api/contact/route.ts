import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { errorResponse, okResponse } from '@/lib/server/responses';
import { sanitizeString, validateEmail } from '@/lib/server/validation';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  hits.set(ip, timestamps);

  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) hits.delete(key);
    }
  }

  return timestamps.length > RATE_LIMIT_MAX;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim()
      || req.headers.get('x-real-ip')
      || 'unknown';

    if (isRateLimited(ip)) {
      return NextResponse.json(errorResponse('Too many requests. Please try again in a few minutes.'), { status: 429 });
    }

    const body = await req.json();
    const name = sanitizeString(body?.name);
    const email = sanitizeString(body?.email).toLowerCase();
    const phone = sanitizeString(body?.phone);
    const company = sanitizeString(body?.company);
    const projectType = sanitizeString(body?.projectType);
    const message = sanitizeString(body?.message);

    if (!name || !email || !message) {
      return NextResponse.json(errorResponse('Name, email and message are required.'), { status: 400 });
    }

    if (!validateEmail(email)) {
      return NextResponse.json(errorResponse('Invalid email address.'), { status: 400 });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

    let saved = false;
    if (url && anonKey) {
      try {
        const supabase = createClient(url, anonKey);
        const { error } = await supabase.from('contact_submissions').insert([
          { name, email, phone: phone || '', message, status: 'unread' },
        ]);

        if (error) {
          console.warn('[api/contact] supabase insert error:', error.message);
        } else {
          saved = true;
        }
      } catch (err) {
        console.warn('[api/contact] supabase error:', err);
      }
    }

    const waMsg = [
      'New Consultation Request',
      '',
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : '',
      company ? `Company: ${company}` : '',
      projectType ? `Project Type: ${projectType}` : '',
      `Details: ${message}`,
    ].filter(Boolean).join('\n');

    const waUrl = `https://wa.me/923710753644?text=${encodeURIComponent(waMsg)}`;

    return NextResponse.json(okResponse({ ok: true, saved, configured: Boolean(url && anonKey), waUrl }));
  } catch (err) {
    console.error('[api/contact] error:', err);
    return NextResponse.json(errorResponse('Internal server error.'), { status: 500 });
  }
}
