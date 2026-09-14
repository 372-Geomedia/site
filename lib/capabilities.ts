export type CapabilityKind = 'response' | 'platforms' | 'analysis' | 'software' | 'integration' | 'planning';

type Capability = {
  kind: CapabilityKind;
  field: string;
  title: string;
  description: string;
  applications: string[];
};

// Capability groups follow the redesign brief. Operational examples retain
// service offerings from the existing company pages, not claims of past results.
export const capabilities: Capability[] = [
  {
    kind: 'response',
    field: 'Response & recovery',
    title: 'Emergency Management',
    description: 'Bring incident, asset and field information into a shared operational picture.',
    applications: [
      'Situational awareness & mission tracking',
      'Blue Roof, debris & temporary power operations',
      'Infrastructure assessment & work orders',
    ],
  },
  {
    kind: 'platforms',
    field: 'Shared environments',
    title: 'Geospatial Platforms',
    description: 'Build a dependable place for spatial data, applications and the people who use them.',
    applications: [
      'Enterprise & cloud GIS',
      'Collaborative maps, dashboards & forms',
      'Existing GIS assessment & optimization',
    ],
  },
  {
    kind: 'analysis',
    field: 'Patterns & possibilities',
    title: 'Spatial Analysis & GeoAI',
    description: 'Combine geography, imagery and analytical models to understand patterns and assess options.',
    applications: [
      'Hazard, vulnerability & imagery analysis',
      'Property analysis & commercial site selection',
      'Predictive models & AI-assisted workflows',
    ],
  },
  {
    kind: 'software',
    field: 'Purpose-built tools',
    title: 'Custom Software',
    description: 'Create applications around the decisions and workflows that matter to your operation.',
    applications: [
      'Web, desktop & field applications',
      'Assignments, status tracking & reporting',
      'GIS extensions & ongoing support',
    ],
  },
  {
    kind: 'integration',
    field: 'Information in motion',
    title: 'Data Engineering & Integration',
    description: 'Connect separate systems and keep information useful as it moves between them.',
    applications: [
      'ETL, APIs & spatial databases',
      'Sensors, field data & real-time feeds',
      'Business-system integration & data lineage',
    ],
  },
  {
    kind: 'planning',
    field: 'People & place',
    title: 'Community & Planning',
    description: 'Make local information understandable for the people shaping a community’s future.',
    applications: [
      'StoryMaps & public engagement tools',
      'Zoning, parcels & infrastructure insights',
      'Demographic & development analysis',
    ],
  },
];
