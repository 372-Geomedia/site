import Link from 'next/link';
import { PageIntro } from '@/components/site/page-intro';
import { ContactCTA } from '@/components/site/contact-cta';
import { Arrow } from '@/components/site/arrow';
import { insights, readingTime } from '@/lib/insights';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata('Insights', 'Perspectives on connected spatial information, data lineage and operational understanding from 372 GeoMedia.');

export default function InsightsPage() {
  return <><PageIntro label="Insights" title={<>A closer look.<br /><span>A clearer perspective.</span></>} description="Notes on geography, connected information and the decisions that bring them together." />
    <div className="shell insight-collection">{insights.map((insight, index) => <article className="insight-entry" key={insight.slug}><span className="insight-number" aria-hidden="true">0{index + 1}</span><div><p className="eyebrow">{insight.category}<span className="reading-time">{readingTime(insight)}</span></p><h2><Link href={`/insights/${insight.slug}`}>{insight.title}</Link></h2><p className="insight-summary">{insight.summary}</p><Link className="text-link" href={`/insights/${insight.slug}`}>Read the perspective <Arrow diagonal /></Link></div></article>)}</div><ContactCTA /></>;
}
