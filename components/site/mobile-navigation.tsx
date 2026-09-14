'use client';

import { useRef, useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { company, navigation } from '@/lib/site-content';
import { Arrow } from './arrow';

export function MobileNavigation() {
  const [open, setOpen] = useState(false);
  const pendingSection = useRef<string | null>(null);

  function finishSectionNavigation(isOpen: boolean) {
    if (isOpen || !pendingSection.current) return;
    const section = document.getElementById(pendingSection.current);
    if (!section) return;
    const hash = `#${pendingSection.current}`;
    if (window.location.hash !== hash) window.history.pushState(null, '', hash);
    section.focus({ preventScroll: true });
    section.scrollIntoView({ block: 'start' });
  }

  return (
    <Sheet open={open} onOpenChange={(nextOpen) => {
      if (nextOpen) pendingSection.current = null;
      setOpen(nextOpen);
    }} onOpenChangeComplete={finishSectionNavigation}>
      <SheetTrigger className="menu-trigger" aria-label="Open navigation">
        <span>Menu</span><svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M2 6h16M2 13h16" stroke="currentColor" strokeWidth="1.5" /></svg>
      </SheetTrigger>
      <SheetContent className="mobile-menu" finalFocus={() => pendingSection.current ? document.getElementById(pendingSection.current) : true}>
        <SheetTitle className="mobile-menu-title">372 GeoMedia</SheetTitle>
        <SheetDescription>Geography brings it together.</SheetDescription>
        <nav aria-label="Mobile navigation">
          {[...navigation, { label: 'Contact', href: company.contact }].map((link, index) => <a href={link.href} key={link.label} onClick={(event) => {
            if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            if (link.href.startsWith('#')) {
              // Move focus and scroll after the dialog releases its scroll lock.
              event.preventDefault();
              pendingSection.current = link.href.slice(1);
            }
            setOpen(false);
          }}><span className="mono">0{index + 1}</span>{link.label}<Arrow diagonal /></a>)}
        </nav>
        <a className="button button-red" href={company.contact}>Talk with us <Arrow diagonal /></a>
      </SheetContent>
    </Sheet>
  );
}
