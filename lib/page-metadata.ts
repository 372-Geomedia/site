import type { Metadata } from 'next';

export function pageMetadata(title: string, description: string): Metadata {
  const fullTitle = `${title} | 372 GeoMedia`;
  return { title: fullTitle, description, openGraph: { title: fullTitle, description, type: 'website', locale: 'en_US' } };
}
