import { CapabilityMotif } from './capability-motif';
import type { CapabilityKind } from '@/lib/capabilities';

const stages: { title: string; detail: string; items: string; motif: CapabilityKind }[] = [
  { title: 'Observe', detail: 'Bring the sources together.', items: 'Weather · imagery · field reports · assets', motif: 'response' },
  { title: 'Connect', detail: 'Relate information by place and time.', items: 'Shared locations · identifiers · relationships', motif: 'integration' },
  { title: 'Analyze', detail: 'Create something useful from the relationships.', items: 'Risk surfaces · damage models · priority areas', motif: 'analysis' },
  { title: 'Act', detail: 'Put the result into an operational workflow.', items: 'Assignments · inspections · decisions', motif: 'software' },
];

export function InformationCycle() {
  return <section className="information-cycle shell" aria-labelledby="cycle-heading">
    <div className="section-heading"><span className="eyebrow"><span className="section-number">01 /</span>A connected information environment</span><span className="section-rule" /></div>
    <div className="editorial-heading"><h2 id="cycle-heading">Every output can<br />become a new input.</h2><p>A field observation informs an analysis. An analysis shapes an assignment. The completed assignment adds a new observation—with a traceable connection to what came before.</p></div>
    <ol className="cycle-stages">{stages.map((stage, index) => <li key={stage.title}><div className="cycle-visual"><span className="mono">0{index + 1}</span><CapabilityMotif kind={stage.motif} /></div><h3>{stage.title}</h3><p>{stage.detail}</p><p className="cycle-inputs">{stage.items}</p></li>)}</ol>
    <div className="cycle-return"><span aria-hidden="true">↳</span><p><strong>Observe again.</strong> Field results and mission status feed back into the shared picture.</p><span aria-hidden="true">↰</span></div>
  </section>;
}
