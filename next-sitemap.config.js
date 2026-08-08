/** @type {import('next-sitemap').NextSitemapConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  // Optional: generate robots.txt automatically
  generateRobotsTxt: true,
  // Optional: changefreq and priority settings
  // changefreq: 'weekly',
  // priority: 0.5,
};