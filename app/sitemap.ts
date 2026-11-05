import type { MetadataRoute } from 'next';
import { courses, SITE_URL } from '@/lib/courses';

const LAST_MODIFIED = '2026-11-05';
const pages = ['/', '/about', '/contact', '/courses', '/faqs', '/pathway', '/training'];

export default function sitemap(): MetadataRoute.Sitemap {
  return [...pages, ...courses.map(c => `/courses/${c.id}`)].map(p => ({
    url: SITE_URL + p,
    lastModified: LAST_MODIFIED,
  }));
}
