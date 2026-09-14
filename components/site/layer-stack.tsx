import geography from '@/lib/geography/galveston-map.json';

// The same projected coast and road network register across all three planes.
// The affine transform provides an oblique view without a WebGL dependency.
export function LayerStack() {
  const { layers, viewBox } = geography;
  const plane = 'M0 0H1200V903.42H0Z';
  const frame = (y: number) => `matrix(.235 .082 -.205 .136 220 ${y})`;
  return (
    // An inline SVG needs its image role to expose its title and description.
    // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
    <svg className="layer-stack" viewBox="0 0 570 540" role="img" aria-labelledby="layer-title layer-description">
      <title id="layer-title">Information connected through shared geography</title>
      <desc id="layer-description">Three aligned map layers show geographic context, infrastructure and networks, and observations. Their shared locations allow separate sources of information to be understood together.</desc>
      <defs>
        <pattern id="layer-grid" width="100" height="100" patternUnits="userSpaceOnUse"><path d="M100 0H0V100" fill="none" stroke="#8c9788" strokeWidth="1" /></pattern>
        <g id="layer-context"><path d={layers.land.path} fill="#b1baa7" fillRule="evenodd" /><path d={layers.coastline.path} fill="none" stroke="#6b7b66" strokeWidth="2" /></g>
        <g id="layer-network"><path d={layers.industrial.path} fill="#87927d" fillRule="evenodd" /><path d={layers.roadsMajor.path} fill="none" stroke="#5b6e55" strokeWidth="4" /><path d={layers.roadsMinor.path} fill="none" stroke="#93a18a" strokeWidth="1.7" /></g>
      </defs>
      <path className="layer-guides" d="M220 85V285M502 183V383M317 306V506M35 208V408" />
      <g transform={frame(260)}>
        <path d={plane} fill="#e4e7dc" stroke="#a3ae99" strokeWidth="3" />
        <use href="#layer-context" />
        <rect width={viewBox[2]} height={viewBox[3]} fill="url(#layer-grid)" opacity=".35" />
      </g>
      <g transform={frame(155)}>
        <path d={plane} fill="#f0f1e8" fillOpacity=".92" stroke="#a2ad99" strokeWidth="3" />
        <path d={layers.coastline.path} fill="none" stroke="#abb4a1" strokeWidth="2" />
        <use href="#layer-network" />
      </g>
      <g transform={frame(50)}>
        <path d={plane} fill="#f7f6f2" fillOpacity=".9" stroke="#adb6a3" strokeWidth="3" />
        <path d={layers.land.path} fill="#d8dece" fillRule="evenodd" />
        <path d={layers.coastline.path} fill="none" stroke="#96a38b" strokeWidth="2" />
        <path d={layers.industrial.path} fill="#bd2b29" fillOpacity=".4" stroke="#bd2b29" strokeWidth="1.5" fillRule="evenodd" />
        {[[589, 220], [795, 482], [867, 604], [380, 398], [630, 566]].map(([x, y]) => <g key={x}><circle cx={x} cy={y} r="22" fill="none" stroke="#bd2b29" strokeWidth="2" opacity=".35" /><circle cx={x} cy={y} r="6" fill="#bd2b29" /></g>)}
      </g>
      <g className="layer-label">
        <text x="27" y="43"><tspan className="layer-number">03</tspan><tspan dx="13">Observations</tspan></text>
        <path className="layer-label-line" d="M28 55H134L174 98" />
        <text x="375" y="301"><tspan className="layer-number">02</tspan><tspan dx="10">Networks</tspan></text>
        <path className="layer-label-line" d="M374 311H506V259" />
        <text x="26" y="451"><tspan className="layer-number">01</tspan><tspan dx="13">Geography</tspan></text>
        <path className="layer-label-line" d="M27 428V411H68" />
      </g>
    </svg>
  );
}
