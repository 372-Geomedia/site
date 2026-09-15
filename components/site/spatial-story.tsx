import { Arrow } from './arrow';
import { LayerStack } from './layer-stack';
import Link from 'next/link';

const steps = [
  { title: 'Awareness', detail: 'See what is happening.' },
  { title: 'Connection', detail: 'Understand the relationships.' },
  { title: 'Synthesis', detail: 'Bring the signals together.' },
  { title: 'Action', detail: 'Make the next decision.' },
];

export function SpatialStory() {
  return (
    <section className="spatial-story" id="connected-view" aria-labelledby="story-heading">
      <div className="shell">
        <div className="section-heading"><span className="eyebrow"><span className="section-number">01 /</span> The connected view</span><span className="section-rule" /></div>
        <div className="story-grid">
          <div className="story-copy">
            <h2 id="story-heading">More than maps.<br /><span>A connected view<br className="desktop-break" /> of the world.</span></h2>
            <p className="story-lead">Organizations rarely lack data.<br />They lack context.</p>
            <p>Location is the common ground. It connects observations, infrastructure, weather, assets and people—even when that information lives in separate systems.</p>
            <p>We build the systems that bring those relationships into view.</p>
            <Link className="text-link story-link" href="/about">Meet 372 GeoMedia <Arrow diagonal /></Link>
          </div>
          <figure className="layer-figure">
            <LayerStack />
            <figcaption><span className="red-square" />Many sources. One shared geography.</figcaption>
          </figure>
        </div>
        <ol className="understanding-sequence" aria-label="From information to informed action">
          {steps.map((step, index) => <li key={step.title}><div className="step-heading"><span className="mono">0{index + 1}</span><h3>{step.title}</h3>{index < steps.length - 1 ? <Arrow /> : <span className="step-end">↗</span>}</div><p>{step.detail}</p></li>)}
        </ol>
      </div>
    </section>
  );
}
