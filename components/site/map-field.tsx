import geography from '@/lib/geography/galveston-map.json';
import { createProximityAnalysis } from '@/lib/geography/proximity-analysis';

const analysis = createProximityAnalysis(geography);

// Render the complete illustrative analysis on the server as a static SVG.
export function MapField() {
  const { layers, viewBox } = geography;
  return (
    <div className="map-field" aria-hidden="true">
      <svg className="hero-map" viewBox={viewBox.join(' ')} fill="none">
        <defs>
          <pattern id="spatial-grid" width="120" height="120" patternUnits="userSpaceOnUse"><path d="M120 0H0V120" className="map-grid" /></pattern>
          <mask id="analysis-land" maskUnits="userSpaceOnUse" x="0" y="0" width={viewBox[2]} height={viewBox[3]} style={{ maskType: 'luminance' }}>
            <path d={layers.land.path} fillRule="evenodd" fill="white" />
            <path d={layers.water.path} fillRule="evenodd" fill="black" />
          </mask>
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
        <g mask="url(#analysis-land)">
          <g className="analysis-context">
            {analysis.observations.map(point => <g key={point.id} className="analysis-distance-rings"><circle cx={point.x} cy={point.y} r="76" /><circle cx={point.x} cy={point.y} r="148" /></g>)}
            <path d={analysis.nearby.map(footprint => footprint.path).join('')} fillRule="evenodd" className="analysis-nearby-footprints" />
          </g>
          <g className="analysis-field">
            {analysis.cells.map(cell => <rect key={`${cell.x}-${cell.y}`} x={cell.x - analysis.cellSize / 2} y={cell.y - analysis.cellSize / 2} width={analysis.cellSize - 1.2} height={analysis.cellSize - 1.2} className="analysis-cell" fill={cell.score > 0.72 ? '#dc6346' : cell.score > 0.4 ? '#c7a36d' : '#9baf98'} opacity={0.12 + cell.score * 0.47} />)}
          </g>
          <path d={analysis.candidates.map(footprint => footprint.path).join('')} fillRule="evenodd" className="analysis-candidates" />
        </g>
        {geography.labels.filter(label => !['WEST BAY', 'PELICAN ISLAND'].includes(label.name)).map(label => <text key={label.name} x={label.position[0]} y={label.position[1]} transform={`rotate(16 ${label.position[0]} ${label.position[1]})`} textAnchor="middle" className={`map-label ${label.name.includes('BAY') || label.name.includes('GULF') ? 'map-water-label' : ''}`}>{label.name}</text>)}
        <g className="analysis-observations">
          {analysis.observations.map(({ x, y, id }) => <g key={id}>
            <circle cx={x} cy={y} r="20" className="analysis-observation-ring" />
            <path d={`M${x - 9} ${y}h18M${x} ${y - 9}v18`} className="analysis-crosshair" />
            <circle cx={x} cy={y} r="3.4" className="map-observation" />
            <g transform={`rotate(16 ${x} ${y})`}><text x={x + 28} y={y + 4} className="analysis-point-label">{id}</text></g>
          </g>)}
        </g>
        <g className="analysis-result-label" transform={`translate(${analysis.observations[1].x} ${analysis.observations[1].y}) rotate(16)`}>
          <path d="M0 -28V-78H63" /><text x="72" y="-74">REVIEW CANDIDATES</text>
        </g>
      </svg>
    </div>
  );
}
