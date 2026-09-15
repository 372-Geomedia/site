'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { advanceMapPlayback, mapStages } from '@/lib/map-playback';

export function HeroMapExperience({ map, children, caption }: { map: ReactNode; children: ReactNode; caption: ReactNode }) {
  // A complete analysis is also the server-rendered/no-JavaScript fallback.
  const [playback, setPlayback] = useState({ stage: 3, playing: false });
  const [ready, setReady] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const elapsed = useRef(0);
  const section = useRef<HTMLElement>(null);
  const running = playback.playing && visible && documentVisible && !reducedMotion;
  const current = mapStages[playback.stage];

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) {
        elapsed.current = 0;
        setAnimate(false);
        setPlayback({ stage: 3, playing: false });
      }
    };
    updatePreference();
    if (!preference.matches) {
      setAnimate(true);
      setPlayback({ stage: 0, playing: true });
    }
    setReady(true);
    preference.addEventListener('change', updatePreference);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.12 });
    if (section.current) observer.observe(section.current);
    const updateVisibility = () => setDocumentVisible(document.visibilityState === 'visible');
    updateVisibility();
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', updatePreference);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (!running) return;
    let previous = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      const next = advanceMapPlayback(playback.stage, elapsed.current, now - previous);
      previous = now;
      elapsed.current = next.elapsed;
      if (next.stage !== playback.stage || next.complete) setPlayback({ stage: next.stage, playing: !next.complete });
    }, 80);
    return () => window.clearInterval(timer);
  }, [running, playback.stage]);

  function selectStage(stage: number) {
    elapsed.current = 0;
    setAnimate(false);
    setPlayback({ stage, playing: false });
  }

  function togglePlayback() {
    if (playback.playing) {
      setPlayback({ ...playback, playing: false });
    } else {
      if (playback.stage === 3) elapsed.current = 0;
      setAnimate(true);
      setPlayback({ stage: playback.stage === 3 ? 0 : playback.stage, playing: true });
    }
  }

  return (
    <section ref={section} className="hero" aria-labelledby="hero-heading" data-stage={current.id} data-running={running} data-animate={animate}>
      {map}
      <div className="shell hero-inner">
        {children}
        <div className="hero-analysis-panel" role="group" aria-label="Illustrative map analysis">
          <div className="analysis-heading mono"><span className="analysis-status-mark" />Illustrative spatial analysis</div>
          <div className="analysis-stage-controls" role="group" aria-label="Analysis stages">
            {mapStages.map((stage, index) => (
              <Button key={stage.id} variant="ghost" disabled={!ready} className="analysis-stage-button" aria-pressed={index === playback.stage} aria-controls="analysis-description" onClick={() => selectStage(index)}>
                <span className="mono" aria-hidden="true">0{index + 1}</span>{stage.label}
              </Button>
            ))}
          </div>
          <div id="analysis-description" className="analysis-description">
            <p className="analysis-title">{current.title}</p>
            <p>{current.description}</p>
          </div>
          <div className="analysis-meta">
            <span className="mono">Synthetic observations</span>
            {!reducedMotion && <Button variant="ghost" className="analysis-playback" onClick={togglePlayback} aria-label={playback.playing ? 'Pause map animation' : playback.stage === 3 ? 'Replay map animation' : 'Play map animation'}>
              {playback.playing ? <Pause aria-hidden="true" /> : playback.stage === 3 ? <RotateCcw aria-hidden="true" /> : <Play aria-hidden="true" />}
              {playback.playing ? 'Pause' : playback.stage === 3 ? 'Replay' : 'Play'}
            </Button>}
          </div>
        </div>
        <div className="hero-bottom">
          <a href="#connected-view" className="scroll-link"><span className="scroll-icon">↓</span>A different perspective</a>
        </div>
      </div>
      {caption}
    </section>
  );
}
