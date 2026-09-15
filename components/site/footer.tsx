import Link from 'next/link';
import { Arrow } from './arrow';
import { company, navigation } from '@/lib/site-content';

export function Footer() {
  return <footer className="site-footer">
    <div className="shell footer-inner">
      <Link className="footer-brand" href="/">372 <span>GeoMedia</span></Link>
      <p>Geographic understanding. Informed action.</p>
      <Link className="text-link" href={company.contact}>Start a conversation <Arrow diagonal /></Link>
    </div>
    <div className="shell footer-lower">
      <nav aria-label="Footer navigation">{navigation.map(link => <Link href={link.href} key={link.href}>{link.label}</Link>)}</nav>
      <a href={`mailto:${company.email}`}>{company.email}</a>
    </div>
  </footer>;
}
