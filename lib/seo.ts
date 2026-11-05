import type { Metadata } from 'next';
import { SITE_URL } from './courses';

const OG_IMAGE = {
  url: '/assets/og-image.jpg',
  type: 'image/jpeg',
  width: 1200,
  height: 630,
  alt: 'Think Risk International: PECB certification training in business continuity, AI management and information security',
};

/** Title, description, canonical link, Open Graph and Twitter card tags for a page */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = SITE_URL + path;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      siteName: 'Think Risk International',
      locale: 'en_AU',
      title,
      description,
      url,
      images: [OG_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
