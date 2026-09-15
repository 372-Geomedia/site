import Link from 'next/link';
import { Arrow } from './arrow';
import { company } from '@/lib/site-content';

export function ContactCTA() {
  return <section className="contact-cta" aria-labelledby="contact-cta-heading"><div className="shell contact-cta-inner">
    <div><p className="eyebrow"><span className="red-square" />Start with the question</p><h2 id="contact-cta-heading">Bring the whole picture<br />into view.</h2><p>Tell us what you’re trying to understand, connect or build.</p></div>
    <Link className="button button-red" href={company.contact}>Start a conversation <Arrow diagonal /></Link>
  </div></section>;
}
