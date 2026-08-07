# Digital Developers — Luxury Web Agency Website

Production-ready **Next.js 14 + TypeScript + Tailwind** source code for the
Digital Developers website (matte-black × glowing amber luxury theme with a
real-time Three.js shard background, GSAP scroll choreography, custom cursor,
WhatsApp integration, SEO blog and a Supabase admin dashboard).

This project **mirrors the live v12 site exactly** — same design, content,
animations and behaviour — restructured as a proper, runnable Next.js app.

---

## ✨ Features

- **Luxury matte-black + amber theme** (`#0a0a0a` / `#111214`, `#FFB300` / `#FFA53C` / `#FFC46B`, warm-white `#F5F3EE`)
- **Three.js fractured-shard 3D background** with central amber polyhedron,
  ember particles and crack lines — scroll-synced via one GSAP ScrollTrigger timeline
- **Custom cursor** (dot + elastic ring, magnetic hover, amber ripple sparks on click)
- **15 services** with real photography, each with a dedicated SEO service page
- **Why Choose Us (12) · Process (7) · Portfolio (15 + filters) · Tech (17) ·
  Stats counters · Testimonials carousel · FAQ accordion · Contact form**
- **WhatsApp integration** — floating button, all CTAs, contact form submits to
  `wa.me/923710753644` with prefilled details (+ optional Supabase save)
- **SEO blog** — listing with category chips + live search + load-more, 6 full
  articles with related posts + CTA, BlogPosting JSON-LD
- **Supabase admin dashboard** (`/admin`) — login/register, roles (admin /
  super_admin), managers for services, portfolio, blogs, testimonials, team,
  contact submissions, settings, uploads, admin-request approvals
- **SEO/accessibility** — per-page metadata, Open Graph, Twitter cards,
  canonical, JSON-LD (Organization/WebSite/Service/BlogPosting/Blog),
  dynamic `sitemap.xml`, `robots.txt`, semantic HTML, skip links, focus states
- **Performance** — pixelRatio cap 2, pause on hidden tab, single RAF loop,
  debounced resize + ScrollTrigger.refresh, lazy images, transform/opacity animations

---

## 🚀 Quick Start

### Prerequisites
- **Node.js ≥ 18.17** (Node 20 recommended)
- **npm** (comes with Node)

### 1. Install dependencies
```bash
npm install
```

### 2. Run in development
```bash
npm run dev
```
Open **http://localhost:3000** — the full site is live locally.

### 3. Production build
```bash
npm run build
npm run start
```

---

## 🔌 Supabase Setup (admin dashboard + contact storage)

The site runs fine **without** Supabase (contact form still opens WhatsApp;
admin shows a friendly "Connect Supabase" screen). To enable the full admin
dashboard and save contact submissions:

1. **Create a project** at [supabase.com](https://supabase.com) → New project.
2. **Run the schema** — open *SQL Editor* and paste the entire contents of
   [`supabase/schema.sql`](supabase/schema.sql), then **Run**.
   This creates all 9 tables (`profiles`, `services`, `portfolio`, `blogs`,
   `testimonials`, `team`, `contact_submissions`, `admin_requests`,
   `settings`), RLS policies, a public `site-images` storage bucket and a
   trigger that promotes the **first registered user to `super_admin`**.
3. **Copy `.env.example` → `.env.local`** and fill in:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://YOURPROJECT.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```
   (Find both under **Settings → API** in Supabase.)
4. **Restart** `npm run dev`.
5. Open **http://localhost:3000/admin**:
   - Register the first account → it automatically becomes **Super Admin**
     (via the trigger in schema.sql).
   - Super Admin approves further admin registration requests from
     `Requests` in the sidebar.

### How the admin dashboard works

`/admin` is a client component (`src/components/AdminDashboard.tsx`) that renders
the exact v12 admin markup and loads its behaviour from
**`public/admin/admin.js`** (extracted from the original inline IIFE). The
script is loaded via a real `<script src>` tag — React does **not** execute
`<script>` tags injected through `dangerouslySetInnerHTML`, which was the root
cause of the previous "blank admin" bug. `SUPABASE_CONFIG` lives at the top of
`public/admin/admin.js` — paste your URL + anon key there, or rely on
`.env.local` + the `/api` routes for the contact form.

---

## 🗂 Project Structure

```
digital-developers-next/
├── app/                      # Next.js App Router
│   ├── page.tsx              # Homepage (hero → footer, 10 sections)
│   ├── layout.tsx            # Root layout: fonts, CDN libs, metadata
│   ├── sitemap.ts            # /sitemap.xml (dynamic, 23 URLs)
│   ├── robots.ts             # /robots.txt
│   ├── blog/
│   │   ├── page.tsx          # Blog listing (chips + search + load-more)
│   │   └── [slug]/page.tsx   # 6 blog articles (BlogPosting JSON-LD)
│   ├── services/
│   │   └── [slug]/page.tsx   # 15 service detail pages (Service JSON-LD)
│   ├── admin/
│   │   └── page.tsx          # Admin dashboard (SPA, Supabase)
│   └── api/
│       ├── contact/route.ts  # Contact form → Supabase insert + wa.me URL
│       └── admin/
│           ├── [resource]/route.ts   # Admin CRUD (GET/POST/PUT/DELETE)
│           └── requests/approve/route.ts  # Super-admin approval
├── public/
│   ├── images/               # logo (nav/footer/favicon) + 15 service images
│   ├── blog/                 # (static fallbacks kept from live site)
│   ├── services/             # (static fallbacks kept from live site)
│   ├── sitemap.xml           # static fallback
│   └── robots.txt            # static fallback
├── src/
│   ├── components/           # Navbar, Footer, WhatsAppFloat, SiteChrome,
│   │                         # SiteEffects (cursor/3D/reveals/carousel/…),
│   │                         # Hero, Services, WhyUs, Process, Portfolio,
│   │                         # Tech, Stats, Testimonials, Faq, Contact,
│   │                         # BlogChrome, BlogListing, AdminDashboard
│   ├── config/site.ts        # Branding, contacts, palette, wa.me helpers
│   ├── data/                 # services, features, process, tech, stats,
│   │                         # portfolio, testimonials, faq, blogs, articles
│   ├── lib/                  # supabase.ts client, seo.tsx (metadata/JSON-LD)
│   └── styles/globals.css    # Full merged theme CSS (v12 exact)
├── supabase/
│   └── schema.sql            # Full DB schema + RLS + bucket + trigger
├── scripts/
│   └── check-scripts.js      # QA: node --check on inline scripts
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── .env.example
```

---

## 🧪 QA Scripts

```bash
npm run qa:scripts   # node --check every inline <script> in the project
npm run qa:admin     # node --check public/admin/admin.js + references
node scripts/check-jsonld.js   # validate JSON-LD on all 24 routes (server running)
```

---

## 🔧 Troubleshooting & Notes

### API routes (`src/app/api/`)
Only `/api/contact` remains as a server route. Two earlier admin API routes
(`/api/admin/[resource]` and `/api/admin/requests/approve`) were removed —
they were unauthenticated (anon-key-only, no session forwarded), unused by
the dashboard (which talks to Supabase directly from the browser with the
signed-in user's session), and the write-path handlers were missing their
table allow-list checks. Removing them shrinks the attack surface with no
functional loss.

### Admin security model
- **Data access** is enforced by **Supabase Row Level Security** — the real
  boundary. `profiles.role` + `profiles.status` gate every table (see
  `supabase/schema.sql`).
- **`admin.js`'s client-side gate fails closed**: if a profile can't be
  verified, or its role isn't `admin`/`super_admin`, or its status isn't
  `active`, the user is signed back out — it no longer defaults to admin on
  a lookup error.
- **`/admin` is excluded from search engines** (`X-Robots-Tag` via
  `src/middleware.ts` + a static `robots: noindex` on the page) and can't be
  framed by another site (`X-Frame-Options: DENY`).
- **What this doesn't do**: middleware can't redirect anonymous visitors away
  from `/admin` before the page renders, because the login form and the
  dashboard share one route/SPA bundle — there has to be a public entry
  point to sign in. Genuinely pre-render-gating `/admin` needs a route split
  (public `/admin/login`, gated `/admin/dashboard`) with cookie-based SSR
  sessions (e.g. `@supabase/ssr`) — worth doing if this becomes a bigger
  target, but out of scope for this pass.

### `npm start` and `output: "standalone"`
`next.config.js` sets `output: "standalone"`. `next start` prints a warning
that standalone builds must run via `node .next/standalone/server.js`.
For local production testing either:
```bash
npm run build && node .next/standalone/server.js   # standalone server
# or remove `output: "standalone"` and use: npm run build && npm start
```

### Admin dashboard
- The dashboard loads its behaviour from `public/admin/admin.js` (a real
  `<script src>` — React never executes `<script>` tags injected via
  `dangerouslySetInnerHTML`, which caused a blank dashboard in earlier builds).
- Without Supabase env vars it shows the **Connect Supabase** setup screen
  (demo mode). Add `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  to `.env.local` and restart to activate login + CRUD.
- Regenerate `admin.js` after editing the dashboard markup:
  `npm run qa:admin` (verifies) or `node scripts/extract-admin.js`.

### QA scripts
```bash
npm run qa:scripts   # node --check every inline script in the source tree
npm run qa:admin     # admin.js parses + AdminDashboard references it
npm run qa:jsonld    # validate JSON-LD on all routes (needs a running server:
                     #   CHECK_URL=http://localhost:3000 node scripts/check-jsonld.js)
```

---

## 📞 Contact

- Email: **ri590590590@gmail.com**
- Phone: **+92 371 0753644**
- WhatsApp: **https://wa.me/923710753644**
- Location: **Lahore, Punjab, Pakistan**

---

## 🛠 Tech Stack

Next.js 14 · React 18 · TypeScript · Tailwind CSS · Three.js (CDN) · GSAP +
ScrollTrigger (CDN) · @supabase/supabase-js · Sora + Inter fonts

## 📄 License

All rights reserved — Digital Developers.