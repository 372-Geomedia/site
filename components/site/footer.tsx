import { Arrow } from './arrow';
import Link from 'next/link';
import { company } from '@/lib/site-content';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <Link className="footer-brand" href="/">372 <span>GeoMedia</span></Link>
        <p>Geographic understanding. Informed action.</p>
        <a className="text-link" href={company.contact}>Start a conversation <Arrow diagonal /></a>
      </div>
    </footer>
  );
}
