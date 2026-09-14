import type { CapabilityKind } from '@/lib/capabilities';

// Small diagrams of GIS primitives, not geographic datasets or operational feeds.
// Their meaning is also expressed in the adjacent capability text.
export function CapabilityMotif({ kind }: { kind: CapabilityKind }) {
  return (
    <svg className={`capability-motif motif-${kind}`} viewBox="0 0 160 92" fill="none" aria-hidden="true" focusable="false">
      {kind === 'response' && <>
        <path className="motif-muted" d="M14 70 40 49 63 54 85 30 144 13M18 14 43 32 40 49 57 78M43 32 75 15M63 54 102 62 146 43M102 62 122 81" />
        <path className="motif-area" d="m62 27 25-10 27 20-12 25-39-8-12-17Z" />
        <path className="motif-accent" d="m40 49 23 5 22-24" />
        <circle className="motif-point" cx="40" cy="49" r="3" /><circle className="motif-point" cx="85" cy="30" r="3" />
        <circle className="motif-accent" cx="85" cy="30" r="9" />
        <path className="motif-muted" d="M20 79h28m-28-3v6m28-6v6" />
      </>}
      {kind === 'platforms' && <>
        <path className="motif-muted" d="m20 54 60-27 60 27-60 28Z" />
        <path className="motif-line" d="m20 40 60-27 60 27-60 28Z" />
        <path className="motif-surface" d="m20 26 60-23 60 23-60 28Z" />
        <path className="motif-muted" d="m49 14 61 26M49 40l60-26M34 20l61 27M65 47l60-27" />
        <path className="motif-area" d="m65 21 15-6 15 6-15 7Z" />
        <path className="motif-accent" d="m65 21 15 7 15-7M80 28v13" />
      </>}
      {kind === 'analysis' && <>
        {[0, 1, 2, 3, 4].map(row => [0, 1, 2, 3, 4, 5].map(column => {
          const isSelected = (column === 3 && row >= 1 && row <= 3) || (column === 4 && row === 2);
          return <rect key={`${row}-${column}`} x={30 + column * 16} y={9 + row * 15} width="13" height="12" className={isSelected ? 'motif-raster-active' : 'motif-raster'} opacity={isSelected ? 1 : .35 + ((column + row) % 3) * .22} />;
        }))}
        <path className="motif-accent" d="M78 7C76 24 66 40 78 63s27 17 29 2-14-19-8-36S88 1 78 7Z" />
        <path className="motif-muted" d="M17 9v74h111" />
      </>}
      {kind === 'software' && <>
        <path className="motif-muted" d="M23 18H13v55h10M137 18h10v55h-10" />
        <path className="motif-line" d="m31 67 25-34 31 15 32-26M31 67l51 3 37-48M56 33l26 37" />
        <path className="motif-accent" d="m31 67 25-34 31 15 32-26" />
        <path className="motif-area" d="m56 33 31 15-5 22Z" />
        {[[31, 67], [56, 33], [87, 48], [119, 22]].map(([x, y]) => <rect key={x} className="motif-node" x={x - 3} y={y - 3} width="6" height="6" />)}
      </>}
      {kind === 'integration' && <>
        <path className="motif-line" d="M18 18h34l22 28h36M18 46h92M18 74h34l22-28" />
        <path className="motif-accent" d="M74 46h36l23-24" />
        <path className="motif-muted" d="m110 46 23 23M133 69H88l-14 11H38" strokeDasharray="3 4" />
        <circle className="motif-node" cx="18" cy="18" r="3" />
        <rect className="motif-node" x="15" y="43" width="6" height="6" />
        <path className="motif-node" d="m18 70 4 4-4 4-4-4Z" />
        <circle className="motif-point" cx="110" cy="46" r="4" />
        <path className="motif-area" d="m127 18 10-3 5 9-11 4Z" />
        <rect className="motif-node" x="130" y="66" width="6" height="6" />
      </>}
      {kind === 'planning' && <>
        <path className="motif-line" d="m25 22 30-10 7 24-28 9ZM34 45l28-9 8 28-28 9ZM68 8l30 9-7 24-22-5ZM69 36l22 5-9 29-12-6ZM108 20l27 10-9 24-26-9ZM100 45l26 9-10 25-25-7Z" />
        <path className="motif-area" d="m69 36 22 5-9 29-12-6Z" />
        <path className="motif-accent" d="m17 50 45-14 29 5 49 18" />
        <circle className="motif-point" cx="62" cy="36" r="3" />
      </>}
    </svg>
  );
}
