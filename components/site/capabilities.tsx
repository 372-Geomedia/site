import { capabilities } from '@/lib/capabilities';
import { company } from '@/lib/site-content';
import { Arrow } from './arrow';
import { CapabilityMotif } from './capability-motif';
import Link from 'next/link';

export function Capabilities({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`capabilities-section${compact ? ' capabilities-compact' : ''}`} id="capabilities" aria-labelledby="capabilities-heading" tabIndex={-1}>
      <div className="shell">
        <div className={compact ? 'sr-only' : 'section-heading'}>
          <span className="eyebrow"><span className="section-number">02 /</span> Capabilities</span>
          <span className="section-rule" />
        </div>
        <div className={compact ? 'sr-only' : 'capabilities-intro'}>
          <h2 id="capabilities-heading">The right tools.<br /><span>A connected approach.</span></h2>
          <p>From a single field workflow to an enterprise GIS, we connect the data, analysis and software your work calls for.</p>
        </div>
        <div className="capability-grid">
          {capabilities.map((capability, index) => (
            <article className="capability-entry" key={capability.kind} aria-labelledby={`capability-${capability.kind}`}>
              <div className="capability-visual-row">
                <span className="capability-index mono" aria-hidden="true">0{index + 1}</span>
                <CapabilityMotif kind={capability.kind} />
              </div>
              <p className="capability-field mono">{capability.field}</p>
              <h3 id={`capability-${capability.kind}`}>{capability.title}</h3>
              <p className="capability-description">{capability.description}</p>
              <ul className="capability-applications">
                {capability.applications.map(application => <li key={application}>{application}</li>)}
              </ul>
            </article>
          ))}
        </div>
        <div className="capabilities-close">
          <p>Have a challenge that crosses these disciplines?<br /><span>That’s where geography brings it together.</span></p>
          <Link className="text-link" href={company.contact}>Talk through your project <Arrow diagonal /></Link>
        </div>
      </div>
    </section>
  );
}
