import Image from 'next/image';
import Link from 'next/link';
import { Arrow } from './arrow';
import { MobileNavigation } from './mobile-navigation';
import { company, navigation } from '@/lib/site-content';

export function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="372 GeoMedia home">
          <Image src="/logo.png" alt="372 GeoMedia — layered globe logo" width={642} height={223} priority sizes="(max-width: 640px) 166px, 202px" />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map(link => <a href={link.href} key={link.label}>{link.label}</a>)}
          <a href={company.contact}>Contact</a>
        </nav>
        <a className="header-cta" href={company.contact}>Talk with us <Arrow diagonal /></a>
        <MobileNavigation />
      </div>
    </header>
  );
}
