export type Insight = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  sections: { id: string; heading: string; paragraphs: string[]; source?: { label: string; href: string } }[];
};

// Original editorial copy prepared for this website. No publication dates,
// authors, client engagements or measured outcomes are invented.
export const insights: Insight[] = [
  {
    slug: 'location-as-common-context',
    title: 'Location is the common context.',
    category: 'Connected information',
    summary: 'How geography helps separate records become part of the same operational question.',
    sections: [
      { id: 'shared-context', heading: 'Separate records, shared places', paragraphs: [
        'A facility register, a maintenance spreadsheet and a field report may describe the same place without sharing a common record number. One uses an asset ID, another an address, and a third a point captured on a phone. Looking at each source separately makes those relationships easy to miss.',
        'Location offers another way to connect them. A building can sit within a parcel, a service area and an administrative boundary at the same time. These relationships give otherwise separate records a shared frame of reference. W3C and OGC guidance recommends persistent identifiers, explicit spatial relationships and clear coordinate information.',
      ], source: { label: 'W3C/OGC spatial data best practices', href: 'https://www.w3.org/TR/2017/NOTE-sdw-bp-20170928/' } },
      { id: 'operational-question', heading: 'Begin with an operational question', paragraphs: [
        'Consider an illustrative maintenance workflow. A supervisor needs to identify facilities near reported drainage problems. Linking reports to facility locations and service boundaries could create an initial review list. The application should also show each report’s timestamp and source, so the supervisor can distinguish a recent field report from an older imported record.',
        'Standards can support access to the underlying information. OGC API Features defines ways to retrieve individual features and query collections using spatial and temporal parameters. A shared application can request relevant records for an area without requiring every participating system to adopt the same internal database.',
      ], source: { label: 'OGC API Features', href: 'https://docs.ogc.org/is/17-069r4/17-069r4.html' } },
      { id: 'check-connections', heading: 'Check the connections', paragraphs: [
        'Two nearby points do not necessarily represent the same asset. Addresses may refer to entrances rather than buildings, and boundaries can change. A useful implementation records how each match was made, preserves the original identifiers and sends uncertain matches for review.',
        'Start with one question and the records needed to answer it. Establish the relationships, check them with the people who know the work, and then choose the map, list or dashboard that makes those relationships usable.',
      ] },
    ],
  },
  {
    slug: 'trace-the-information',
    title: 'Trace the information behind the decision.',
    category: 'Data & systems',
    summary: 'Why sources, transformations and new observations belong in the same information environment.',
    sections: [
      { id: 'evidence', heading: 'A result needs its evidence', paragraphs: [
        'A priority list can look definitive even when its inputs are incomplete or outdated. To judge whether the list is useful, a reviewer needs to understand where the records came from, how they changed and which assumptions shaped the result. That history is data lineage.',
        'W3C’s PROV model provides a vocabulary for recording this history. It distinguishes entities, such as datasets and reports; activities, such as an analysis or update; and agents responsible for the work, including people, organizations and software. These connections help users evaluate information and understand how a result was produced.',
      ], source: { label: 'W3C PROV Model Primer', href: 'https://www.w3.org/TR/prov-primer/' } },
      { id: 'outputs-inputs', heading: 'Outputs become inputs', paragraphs: [
        'Consider an illustrative infrastructure assessment. Field reports are checked against an asset register, duplicates are reviewed, and a scoring method creates an inspection queue. The queue should retain links to the source reports, the asset-register version and the scoring method. A reviewer can then investigate why a particular site received attention.',
        'The queue can also become an input to the next stage. Inspections generate new reports, which may revise an asset’s condition and change the next queue. W3C PROV describes derivation and revision: a new entity can be generated from an earlier entity through a documented activity. The relationship between versions is part of the information.',
      ], source: { label: 'W3C PROV Data Model', href: 'https://www.w3.org/TR/prov-dm/' } },
      { id: 'practical-start', heading: 'Keep different origins visible', paragraphs: [
        'A calculated risk score is a derived result; a technician’s recorded inspection is a new observation. Both can inform later decisions, and the system should preserve their different origins and the methods behind them.',
        'For a practical starting point, capture source identifiers, collection and processing times, versions, transformations and responsible parties. Keep the method and assumptions beside the result. A dashboard becomes more useful when someone can move from a displayed status back to the evidence that supports it.',
      ] },
    ],
  },
  {
    slug: 'storm-signals-to-priorities',
    title: 'From storm signals to operational priorities.',
    category: 'Emergency management',
    summary: 'Connecting hazard information to facilities, responsibilities and the work that follows.',
    sections: [
      { id: 'responsibility', heading: 'Start with a responsibility', paragraphs: [
        'Storm information becomes operationally useful when it connects a forecast to a specific responsibility. A facility manager may need to review backup power readiness, while a public works team needs to understand changing access conditions. Both need geography, but their questions and decisions differ.',
        'The National Hurricane Center’s forecast cone represents the probable track of a tropical cyclone’s center. It should not be treated as a boundary containing every potential impact. A facility’s position outside the cone is not, by itself, a basis for deciding that it needs no further review.',
      ], source: { label: 'NHC forecast cone definition', href: 'https://www.nhc.noaa.gov/aboutcone.shtml' } },
      { id: 'hazards', heading: 'Keep hazards and sources distinct', paragraphs: [
        'NHC identifies hurricane hazards including storm surge, heavy rainfall and inland flooding, high winds, rip currents and tornadoes. An operational view should distinguish these hazards and retain the relevant official products. Combining everything into one undifferentiated storm-risk layer can conceal which threat a team is evaluating.',
        'An illustrative planning workflow could begin with official advisories, facility locations, asset dependencies and verified status reports. The system would identify records requiring review, show each forecast’s source and issue time, and distinguish forecast conditions from observed conditions. Missing information should remain visible.',
      ], source: { label: 'NHC hurricane hazards', href: 'https://www.nhc.noaa.gov/prepare/hazards.php' } },
      { id: 'review-action', heading: 'Connect review to action', paragraphs: [
        'Teams might review a facility’s role, its dependencies, readiness status and the applicable hazard information. Any ranking should expose its criteria and support review by the responsible personnel. A map can organize that discussion; the decision and its owner should remain explicit.',
        'As new advisories and field reports arrive, the working view should update while retaining earlier versions. Recording assignments, status changes and completed checks connects planning to the work that follows. Official warnings and established emergency procedures remain the operational authority.',
      ] },
    ],
  },
];

export function readingTime(insight: Insight) {
  const words = insight.sections.flatMap(section => section.paragraphs).join(' ').split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}
