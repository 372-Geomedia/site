import Link from 'next/link';
import { PageIntro } from '@/components/site/page-intro';
import { ContactCTA } from '@/components/site/contact-cta';
import { ProjectVisual } from '@/components/site/project-visual';
import { Arrow } from '@/components/site/arrow';
import { workExamples } from '@/lib/work';
import { pageMetadata } from '@/lib/page-metadata';

export const metadata = pageMetadata('Work', 'Explore example workflows for coastal response, connected field operations and community location intelligence.');

export default function WorkPage() {
  return <><PageIntro label="Work" title={<>Information at work.<br /><span>Decisions in context.</span></>} description="Explore how geography can connect a complex question to a useful operational tool." />
    <div className="shell work-collection">
      <p className="content-note"><span className="red-square" /><span>The workflows below are illustrative examples of our approach. They do not represent completed client projects or measured results.</span></p>
      {workExamples.map((example, index) => <article className="work-entry" key={example.slug}>
        <ProjectVisual visual={example.visual} />
        <div className="work-entry-copy"><p className="eyebrow"><span className="section-number">0{index + 1} /</span>{example.discipline}</p><h2><Link href={`/work/${example.slug}`}>{example.title}</Link></h2><p>{example.summary}</p><dl className="work-scale"><dt className="mono">Scale</dt><dd>{example.scale}</dd></dl><Link className="text-link" href={`/work/${example.slug}`}>Explore the workflow <Arrow diagonal /></Link></div>
      </article>)}
    </div><ContactCTA /></>;
}
