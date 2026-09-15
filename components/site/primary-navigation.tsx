'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { isActiveRoute, navigation } from '@/lib/site-content';

export function PrimaryNavigation() {
  const pathname = usePathname();
  return <nav className="desktop-nav" aria-label="Main navigation">
    {navigation.map(link => <Link href={link.href} key={link.href} aria-current={isActiveRoute(pathname, link.href) ? 'page' : undefined}>{link.label}</Link>)}
  </nav>;
}
