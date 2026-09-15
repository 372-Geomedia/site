import Link from 'next/link';
import { PageIntro } from '@/components/site/page-intro';
import { Arrow } from '@/components/site/arrow';
import { company } from '@/lib/site-content';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata('Contact', 'Tell 372 GeoMedia what you are trying to understand, connect or build. Start a conversation about your geospatial project.');
const emailHref = `mailto:${company.email}?subject=${encodeURIComponent('A geospatial project for 372 GeoMedia')}&body=${encodeURIComponent('Hello 372 GeoMedia,\n\nHere is what we are trying to understand, connect or build:\n\n\nThe information and systems we are working with:\n\n\nThe people and decisions this needs to support:\n\n\nName / organization:\n')}`;

export default function ContactPage() {
  return <><PageIntro label="Contact" title={<>Bring the whole<br /><span>picture into view.</span></>} description="Tell us what you’re trying to understand, connect or build. A question, an existing system or an early idea is enough to start." />
    <section className="shell contact-layout"><div className="contact-address"><p className="eyebrow"><span className="red-square" />Start a conversation</p><h2>Let’s talk about<br />the work.</h2><a className="contact-email" href={`mailto:${company.email}`}>{company.email}<Arrow diagonal /></a><p>Send a note to our team, or use the prompts below to outline your project.</p><a className="button button-red" href={emailHref}>Open an email draft <Arrow diagonal /></a><p className="email-explanation">Opens your email app with a few prompts. Review and send the message there.</p></div>
    <div className="contact-prompts"><h2>A useful place to begin</h2><ol><li><h3>What needs to become clearer?</h3><p>The decision, task or information gap you want to address.</p></li><li><h3>What information already exists?</h3><p>Your GIS, spreadsheets, field records, imagery, applications or other systems.</p></li><li><h3>Who needs to use the result?</h3><p>The people, responsibilities and working conditions the solution needs to support.</p></li></ol><p>You don’t need a finished specification to start the conversation.</p></div></section>
    <section className="contact-links shell"><div><p className="eyebrow">Still exploring?</p><h2>Find the right starting point.</h2></div><Link className="text-link" href="/capabilities">What we do <Arrow /></Link><Link className="text-link" href="/work">How the pieces fit <Arrow /></Link></section></>;
}
