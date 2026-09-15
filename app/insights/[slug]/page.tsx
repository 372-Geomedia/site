import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageIntro } from '@/components/site/page-intro';
import { ContactCTA } from '@/components/site/contact-cta';
import { Arrow } from '@/components/site/arrow';
import { insights, readingTime } from '@/lib/insights';
import { pageMetadata } from '@/lib/page-metadata';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return insights.map(({ slug }) => ({ slug })); }
function findInsight(slug: string) { const insight = insights.find(item => item.slug === slug); if (!insight) notFound(); return insight; }
export async function generateMetadata({ params }: Props) { const insight = findInsight((await params).slug); return pageMetadata(insight.title, insight.summary); }

export default async function InsightPage({ params }: Props) {
  const insight = findInsight((await params).slug);
  const next = insights[(insights.indexOf(insight) + 1) % insights.length];
  return <><PageIntro label={insight.category} back={{ href: '/insights', label: 'Insights' }} title={insight.title} description={insight.summary}><p className="article-meta mono">Perspective <span aria-hidden="true">/</span> {readingTime(insight)}</p></PageIntro>
    <div className="shell article-layout"><nav className="article-contents" aria-label="In this perspective"><p className="eyebrow">In this perspective</p><ol>{insight.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.heading}</a></li>)}</ol><Link className="text-link" href="/insights">All insights <Arrow /></Link></nav>
    <article className="article-body" aria-label={insight.title}>{insight.sections.map(section => <section id={section.id} key={section.id} tabIndex={-1}><h2>{section.heading}</h2>{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.source && <p className="article-source">Reference: <a href={section.source.href}>{section.source.label} <span aria-hidden="true">↗</span></a></p>}</section>)}<Link className="next-story" href={`/insights/${next.slug}`}><span><span className="eyebrow">Continue reading</span><strong>{next.title}</strong></span><Arrow diagonal /></Link></article></div><ContactCTA /></>;
}
