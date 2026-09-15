import Image from 'next/image';
import Link from 'next/link';
import { Arrow } from './arrow';
import { MobileNavigation } from './mobile-navigation';
import { PrimaryNavigation } from './primary-navigation';
import { company } from '@/lib/site-content';

export function Header() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="372 GeoMedia home">
          <Image src="/logo.png" alt="372 GeoMedia — layered globe logo" width={642} height={223} priority sizes="(max-width: 640px) 166px, 202px" />
        </Link>
        <PrimaryNavigation />
        <Link className="header-cta" href={company.contact}>Talk with us <Arrow diagonal /></Link>
        <MobileNavigation />
      </div>
    </header>
  );
}
