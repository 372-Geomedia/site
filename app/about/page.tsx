import Link from 'next/link';
import { PageIntro } from '@/components/site/page-intro';
import { Experience } from '@/components/site/experience';
import { ContactCTA } from '@/components/site/contact-cta';
import { LayerStack } from '@/components/site/layer-stack';
import { Arrow } from '@/components/site/arrow';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata('About', 'Meet 372 GeoMedia: geospatial technology and consulting backed by 50+ years of combined team experience.');

export default function AboutPage() {
  return <><PageIntro label="About" title={<>Geography is<br /><span>the common ground.</span></>} description="372 GeoMedia is a geospatial technology and consulting company. We connect data, technology and people to make complex information useful in the context of a place." />
    <section className="shell about-introduction"><div><p className="eyebrow"><span className="red-square" />Our perspective</p><h2>Understanding starts<br />with relationships.</h2><p>An observation belongs to a place. A place is connected to infrastructure, people and activity. A decision makes more sense when those relationships are visible.</p><p>Our work brings them together through GIS, spatial analysis, GeoAI, custom software and data integration. We work from the operational question to the system that helps answer it.</p><Link className="text-link" href="/capabilities">Explore our capabilities <Arrow diagonal /></Link></div><figure className="about-layers"><LayerStack /><figcaption>Separate sources. Shared geography.</figcaption></figure></section>
    <Experience onAboutPage />
    <section className="shell working-principles"><div className="editorial-heading"><h2>People make<br />information useful.</h2><p>Field personnel observe. Analysts interpret. Teams coordinate. A useful system supports the handoffs between them.</p></div><div className="principle-grid"><article><span className="mono">01</span><h3>Start with the work.</h3><p>Understand who needs the information, the decisions they make and the conditions in which they operate.</p></article><article><span className="mono">02</span><h3>Keep the source in view.</h3><p>Make assumptions, information gaps and the origin of a result visible to the people who rely on it.</p></article><article><span className="mono">03</span><h3>Build for what follows.</h3><p>Connect collection, analysis and action so that the next person has the context they need.</p></article></div></section>
    <section className="brand-story"><div className="shell brand-story-grid"><div className="brand-code" aria-hidden="true">372<span className="mono">A code for “map”</span></div><div><p className="eyebrow">A name with meaning</p><h2>Trusted information.<br />Informed action.</h2><p>Our name comes from the Culper Code Book, where 372 stood for “map.” It is a concise reminder of what geographic information can do: establish context and help people decide what comes next.</p><a className="text-link" href="https://www.mountvernon.org/george-washington/the-revolutionary-war/spying-and-espionage/the-culper-code-book">Explore the code book at Mount Vernon <Arrow diagonal /></a></div></div></section><ContactCTA /></>;
}
