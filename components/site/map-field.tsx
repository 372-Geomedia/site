import geography from '@/lib/geography/galveston-map.json';

const routeHighlight = geography.layers.roadsMajor.path.split(/(?=M)/).sort((a, b) => b.length - a.length).slice(0, 2).join('');
const observations = [
  { x: 589, y: 220 },
  { x: 795, y: 482 },
  { x: 867, y: 604 },
];

// All cartographic layers share one projected extent. Markers illustrate the
// information concept; they are not a live feed or actual field observations.
export function MapField() {
  const { layers, viewBox } = geography;
  return (
    <div className="map-field" aria-hidden="true">
      <svg className="hero-map" viewBox={viewBox.join(' ')} fill="none">
        <defs>
          <pattern id="spatial-grid" width="120" height="120" patternUnits="userSpaceOnUse"><path d="M120 0H0V120" className="map-grid" /></pattern>
        </defs>
        <rect width={viewBox[2]} height={viewBox[3]} fill="#1c2725" />
        <path d={layers.land.path} fillRule="evenodd" className="map-land" />
        <path d={layers.wetlands.path} fillRule="evenodd" className="map-wetlands" />
        <path d={layers.industrial.path} fillRule="evenodd" className="map-industrial" />
        <path d={layers.water.path} fillRule="evenodd" className="map-water" />
        <path d={layers.buildings.path} fillRule="evenodd" className="map-buildings" />
        <path d={layers.waterways.path} className="map-waterways" />
        <path d={layers.roadsMinor.path} className="map-roads-minor" />
        <path d={layers.roadsMajor.path} className="map-roads-major" />
        <path d={layers.coastline.path} className="map-coastline" />
        <rect width={viewBox[2]} height={viewBox[3]} fill="url(#spatial-grid)" />
        <path d={routeHighlight} className="map-registered-line" />
        {geography.labels.filter(label => !['WEST BAY', 'PELICAN ISLAND'].includes(label.name)).map(label => <text key={label.name} x={label.position[0]} y={label.position[1]} transform={`rotate(16 ${label.position[0]} ${label.position[1]})`} textAnchor="middle" className={`map-label ${label.name.includes('BAY') || label.name.includes('GULF') ? 'map-water-label' : ''}`}>{label.name}</text>)}
        {observations.map(({ x, y }, index) => <g key={x}><circle cx={x} cy={y} r="17" className="observation-ring" style={{ animationDelay: `${index * 180}ms` }} /><circle cx={x} cy={y} r="4" className="map-observation" /></g>)}
        <g transform="rotate(16 795 482)"><path d="M795 465V425H853" stroke="#d46a58" strokeWidth=".8" /><text x="862" y="429" className="map-detail-label">FIELD OBSERVATION</text></g>
      </svg>

    </div>
  );
}
