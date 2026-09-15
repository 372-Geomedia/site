'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { company, isActiveRoute, navigation } from '@/lib/site-content';
import { Arrow } from './arrow';

function Menu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  return <Sheet open={open} onOpenChange={setOpen}>
    <SheetTrigger className="menu-trigger" aria-label="Open navigation">
      <span>Menu</span><svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M2 6h16M2 13h16" stroke="currentColor" strokeWidth="1.5" /></svg>
    </SheetTrigger>
    <SheetContent className="mobile-menu">
      <SheetTitle className="mobile-menu-title">372 GeoMedia</SheetTitle>
      <SheetDescription>Geography brings it together.</SheetDescription>
      <nav aria-label="Mobile navigation">
        {navigation.map((link, index) => <Link href={link.href} key={link.href} aria-current={isActiveRoute(pathname, link.href) ? 'page' : undefined} onClick={event => {
          if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) setOpen(false);
        }}><span className="mono">0{index + 1}</span>{link.label}<Arrow diagonal /></Link>)}
      </nav>
      <Link className="button button-red" href={company.contact} onClick={() => setOpen(false)}>Talk with us <Arrow diagonal /></Link>
    </SheetContent>
  </Sheet>;
}

export function MobileNavigation() {
  const pathname = usePathname();
  // A route change resets dialog state, including browser Back/Forward navigation.
  return <Menu key={pathname} pathname={pathname} />;
}
