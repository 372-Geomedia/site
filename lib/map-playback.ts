export const mapStages = [
  { id: 'observe', label: 'Observe', title: 'Every signal has a location.', description: 'Sample observations appear within mapped building footprints.' },
  { id: 'connect', label: 'Connect', title: 'Location gives signals context.', description: 'Nearby mapped footprints become part of the same spatial picture.' },
  { id: 'analyze', label: 'Analyze', title: 'Patterns come into focus.', description: 'A proximity grid reveals where the sample signals concentrate.' },
  { id: 'act', label: 'Act', title: 'A clearer place to start.', description: 'Footprints in stronger concentration areas are highlighted for review.' },
] as const;

export const stageDuration = 2600;
export function advanceMapPlayback(stage: number, elapsed: number, delta: number) {
  const total = elapsed + Math.max(0, delta);
  const next = stage + Math.floor(total / stageDuration);
  return { stage: Math.min(next, mapStages.length - 1), elapsed: total % stageDuration, complete: next >= mapStages.length };
}
