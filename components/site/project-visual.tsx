import geography from '@/lib/geography/galveston-map.json';
import { CapabilityMotif } from './capability-motif';
import type { WorkExample } from '@/lib/work';

export function ProjectVisual({ visual }: { visual: WorkExample['visual'] }) {
  const { layers } = geography;
  return <figure className={`project-visual project-visual-${visual}`}>
    {visual === 'coast' ? <>
      <svg viewBox="180 40 1020 800" fill="none" aria-hidden="true" focusable="false"><path className="map-land" d={layers.land.path} fillRule="evenodd" /><path className="map-water" d={layers.water.path} fillRule="evenodd" /><path className="map-industrial" d={layers.industrial.path} fillRule="evenodd" /><path className="map-roads-major" d={layers.roadsMajor.path} /><path className="map-buildings" d={layers.buildings.path} fillRule="evenodd" /><path className="map-coastline" d={layers.coastline.path} /></svg>
      <figcaption><span>Galveston Bay / Geographic context</span><a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors</a></figcaption>
    </> : <>
      <div className="workflow-visual" aria-hidden="true"><CapabilityMotif kind={visual === 'field' ? 'integration' : 'planning'} /></div>
      <figcaption>{visual === 'field' ? 'Observation → asset → assignment → new observation' : 'Parcels + infrastructure + local knowledge'}</figcaption>
    </>}
  </figure>;
}
