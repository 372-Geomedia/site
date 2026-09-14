'use client';

import { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { company, navigation } from '@/lib/site-content';
import { Arrow } from './arrow';

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="menu-trigger" aria-label="Open navigation">
        <span>Menu</span><svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M2 6h16M2 13h16" stroke="currentColor" strokeWidth="1.5" /></svg>
      </SheetTrigger>
      <SheetContent className="mobile-menu">
        <SheetTitle className="mobile-menu-title">372 GeoMedia</SheetTitle>
        <SheetDescription>Geography brings it together.</SheetDescription>
        <nav aria-label="Mobile navigation">
          {[...navigation, { label: 'Contact', href: company.contact }].map((link, index) => <a href={link.href} key={link.label} onClick={() => setOpen(false)}><span className="mono">0{index + 1}</span>{link.label}<Arrow diagonal /></a>)}
        </nav>
        <a className="button button-red" href={company.contact}>Talk with us <Arrow diagonal /></a>
      </SheetContent>
    </Sheet>
  );
}
