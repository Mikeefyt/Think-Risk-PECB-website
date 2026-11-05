import type { NextConfig } from 'next';

// Old static-site URLs (e.g. /about.html, /course-27001-lead-auditor.html) redirect to the new ones.
const pages = ['about', 'contact', 'courses', 'faqs', 'pathway', 'training'];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      ...pages.map(p => ({ source: `/${p}.html`, destination: `/${p}`, permanent: true })),
      { source: '/course-:slug.html', destination: '/courses/:slug', permanent: true },
    ];
  },
};

export default nextConfig;
