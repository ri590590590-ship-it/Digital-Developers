#!/usr/bin/env node
/**
 * QA helper — validates every application/ld+json block on the given routes
 * (or all known routes if none passed). Usage: node scripts/check-jsonld.js
 */
const http = require('http');

const BASE = process.env.CHECK_URL || 'http://localhost:3111';
const ROUTES = [
  '/', '/blog', '/admin',
  '/services/business-website', '/services/web-application', '/services/e-commerce',
  '/services/react-development', '/services/next-js-development', '/services/website-redesign',
  '/services/seo', '/services/maintenance', '/services/hosting', '/services/ai-integration',
  '/services/api-development', '/services/dashboard-systems', '/services/corporate-website',
  '/services/landing-page', '/services/portfolio-website',
  '/blog/high-converting-business-website', '/blog/nextjs-vs-react-2026',
  '/blog/core-web-vitals-explained', '/blog/custom-web-apps-vs-templates',
  '/blog/seo-guide-pakistan', '/blog/cost-of-website-pakistan',
];

function fetchHtml(path) {
  return new Promise((resolve, reject) => {
    http.get(BASE + path, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

(async () => {
  let failures = 0;
  let total = 0;
  for (const route of ROUTES) {
    const html = await fetchHtml(route);
    const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g;
    let m;
    let count = 0;
    while ((m = re.exec(html))) {
      total++;
      count++;
      try {
        const d = JSON.parse(m[1].trim());
        if (!d['@type']) throw new Error('missing @type');
        if (d['@context'] && d['@context'] !== 'https://schema.org') throw new Error('bad @context');
        console.log(`OK   ${route} JSON-LD #${count}: ${d['@type']}`);
      } catch (e) {
        failures++;
        console.error(`FAIL ${route} JSON-LD #${count}: ${e.message}`);
      }
    }
    if (count === 0) {
      // /admin is an auth-gated panel — intentionally not indexed, no JSON-LD required.
      if (route === '/admin') {
        console.log(`SKIP ${route}: admin panel — JSON-LD intentionally omitted`);
        continue;
      }
      failures++;
      console.error(`FAIL ${route}: no JSON-LD found`);
    }
  }
  console.log(`\nChecked ${total} JSON-LD blocks across ${ROUTES.length} routes — ${failures} failure(s).`);
  process.exit(failures ? 1 : 0);
})();