/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    cpus: 4,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'static.teamily.ai' },
      { protocol: 'https', hostname: 'teamily-storage.becdn.net' },
    ],
  },
  output: 'standalone',
};

module.exports = nextConfig;