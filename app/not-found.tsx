import Link from 'next/link';
import { Arrow } from '@/components/site/arrow';

export default function NotFound() {
  return <section className="not-found shell"><p className="eyebrow"><span className="red-square" />404 / Off the map</p><h1>Let’s get you<br />back on course.</h1><p>We couldn’t find that page. Explore our capabilities or return to the homepage.</p><div className="hero-actions"><Link className="button button-red" href="/">Back to the homepage <Arrow /></Link><Link className="text-link" href="/capabilities">Explore capabilities <Arrow diagonal /></Link></div></section>;
}
