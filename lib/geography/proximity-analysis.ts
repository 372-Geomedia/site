export type Point = { x: number; y: number };
type Ring = { path: string; points: Point[] };
type Geography = { viewBox: number[]; layers: Record<string, { path: string }> };

// The source contains absolute M/L/Z paths. These projected display coordinates
// are shared by every layer; they are not measurements of ground distance.
export function polygonRings(path: string): Ring[] {
  return (path.match(/M[^M]+Z/g) ?? []).map(path => {
    const coordinates = path.match(/-?\d+(?:\.\d+)?/g)!.map(Number);
    const points: Point[] = [];
    for (let i = 0; i < coordinates.length; i += 2) points.push({ x: coordinates[i], y: coordinates[i + 1] });
    return { path, points };
  });
}

export function insideRing({ x, y }: Point, points: Point[]) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const a = points[i], b = points[j];
    if ((a.y > y) !== (b.y > y) && x < (b.x - a.x) * (y - a.y) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}

// Match the SVG evenodd fill rule, including shoreline holes.
export function insidePolygons(point: Point, rings: Ring[]) {
  return rings.reduce((inside, ring) => inside !== insideRing(point, ring.points), false);
}

function centroid(points: Point[]): Point {
  let area = 0, x = 0, y = 0;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const a = points[j], b = points[i], cross = a.x * b.y - b.x * a.y;
    area += cross;
    x += (a.x + b.x) * cross;
    y += (a.y + b.y) * cross;
  }
  return { x: x / (3 * area), y: y / (3 * area) };
}

export function proximityScore(point: Point, observations: Point[]) {
  const sigma = 76;
  return Math.min(1, observations.reduce((sum, seed) => {
    const distanceSquared = (point.x - seed.x) ** 2 + (point.y - seed.y) ** 2;
    return sum + Math.exp(-distanceSquared / (2 * sigma ** 2));
  }, 0));
}

export function createProximityAnalysis(geography: Geography) {
  const land = polygonRings(geography.layers.land.path);
  const water = polygonRings(geography.layers.water.path);
  const onLand = (point: Point) => insidePolygons(point, land) && !insidePolygons(point, water);
  const footprints = polygonRings(geography.layers.buildings.path)
    .map(ring => ({ ...ring, center: centroid(ring.points) }))
    .filter(ring => insideRing(ring.center, ring.points) && onLand(ring.center));

  // Synthetic seeds use checked footprint interiors near three geographic areas.
  // No monitoring station, building use, incident, or client result is implied.
  const targets = [{ x: 440, y: 285 }, { x: 795, y: 482 }, { x: 867, y: 604 }];
  const observations = targets.map((target, index) => {
    const nearest = footprints.reduce((best, footprint) =>
      Math.hypot(footprint.center.x - target.x, footprint.center.y - target.y) <
      Math.hypot(best.center.x - target.x, best.center.y - target.y) ? footprint : best);
    return { ...nearest.center, id: `0${index + 1}` };
  });

  const cells: (Point & { score: number })[] = [];
  const cellSize = 18;
  for (let y = cellSize / 2; y < geography.viewBox[3]; y += cellSize) {
    for (let x = cellSize / 2; x < geography.viewBox[2]; x += cellSize) {
      const point = { x, y }, score = proximityScore(point, observations);
      if (score >= 0.16 && onLand(point)) cells.push({ ...point, score });
    }
  }
  const nearby = footprints.map(footprint => ({ ...footprint, score: proximityScore(footprint.center, observations) }))
    .filter(footprint => footprint.score >= 0.3);
  const candidates = nearby.filter(footprint => footprint.score >= 0.72);
  return { observations, cells, cellSize, nearby, candidates };
}
