export type WorkExample = {
  slug: string;
  title: string;
  summary: string;
  discipline: string;
  scale: string;
  visual: 'coast' | 'field' | 'community';
  challenge: string;
  sources: string[];
  approach: { title: string; detail: string }[];
  outputs: { title: string; detail: string }[];
  feedback: string;
};

// These are illustrative applications of confirmed capabilities, not client work.
// The record structure can also support approved case studies when supplied.
export const workExamples: WorkExample[] = [
  {
    slug: 'coastal-response',
    title: 'One event. Many signals. One operational picture.',
    summary: 'Connecting storm information, infrastructure and field operations around a Gulf Coast response scenario.',
    discipline: 'Emergency management',
    scale: 'Region → community → facility',
    visual: 'coast',
    challenge: 'During a coastal storm, forecasts, facility records and status reports answer different parts of the same question: what needs attention, where, and from whom? An operational view needs to connect those records while preserving their source, timing and uncertainty.',
    sources: ['Official forecast and hazard products', 'Terrain, imagery and community context', 'Infrastructure and facility inventories', 'Population and service-area information', 'Field observations and damage assessments', 'Assignments and mission status'],
    approach: [
      { title: 'Establish the shared geography', detail: 'Relate forecast products, facilities, assets and field reports by location. Retain issue times and distinguish forecast information from observed conditions.' },
      { title: 'Make priorities reviewable', detail: 'Bring potential exposure, facility roles, dependencies and verified status into a review queue. Record the criteria and assumptions behind any proposed priority.' },
      { title: 'Connect decisions to field work', detail: 'Turn reviewed priorities into assignments with an owner and a location. Return assessments and completion status to the shared picture.' },
    ],
    outputs: [
      { title: 'Operational picture', detail: 'A map and status view linking facilities, relevant hazards, source information and current assignments.' },
      { title: 'Assessment queue', detail: 'A reviewable set of sites requiring additional information, with criteria and information gaps visible.' },
      { title: 'Mission record', detail: 'A traceable connection between a decision, an assigned task and the resulting field report.' },
    ],
    feedback: 'A completed assessment changes what is known about a facility. That observation becomes an input to the next review, while earlier assessments remain traceable.',
  },
  {
    slug: 'connected-field-operations',
    title: 'From field observation to coordinated work.',
    summary: 'A location-based workflow connecting observations, asset records, assignments and progress.',
    discipline: 'Custom software & integration',
    scale: 'Asset → site → service area',
    visual: 'field',
    challenge: 'A report in a form, an asset in a GIS and an assignment in a work-order system may refer to the same location. Teams need to follow that relationship without manually reconciling each system whenever the status changes.',
    sources: ['Asset and facility registers', 'Georeferenced field forms and photographs', 'Inspection and maintenance history', 'Service boundaries and access information', 'Work orders and assignment status'],
    approach: [
      { title: 'Identify the place and the asset', detail: 'Preserve original record identifiers and establish matching rules. Give uncertain asset matches a review step instead of treating proximity as proof.' },
      { title: 'Fit the tool to the task', detail: 'Design the field form around the information a person can collect on site. Account for connection availability, validation and the checks required before submission.' },
      { title: 'Keep the systems in conversation', detail: 'Connect reviewed observations to assignments and status updates. Maintain a record of synchronization, changes and unresolved exceptions.' },
    ],
    outputs: [
      { title: 'Field application', detail: 'A focused form for observations, location, photographs and the context needed by the next person.' },
      { title: 'Work queue', detail: 'A location-based view of reviewed observations and assignments, including ownership and current status.' },
      { title: 'Traceable asset history', detail: 'A record of what was observed, what action followed and which source supports the latest status.' },
    ],
    feedback: 'Completing a task produces a new condition report. The updated asset history helps shape future inspections and maintenance work.',
  },
  {
    slug: 'community-location-intelligence',
    title: 'A clearer view of a place and its possibilities.',
    summary: 'Bringing parcels, infrastructure, local context and community knowledge into planning decisions.',
    discipline: 'Community, planning & real estate',
    scale: 'Parcel → neighborhood → community',
    visual: 'community',
    challenge: 'A development or community-planning question crosses several sources: parcels, zoning, utilities, local conditions and the experiences of people who live there. Comparing options requires a shared context and a clear explanation of what each source can establish.',
    sources: ['Parcel and property information', 'Zoning and land-use records', 'Utilities and public infrastructure', 'Demographic and local economic information', 'Community observations and points of interest'],
    approach: [
      { title: 'Set the decision criteria', detail: 'Define the planning question, geographic extent and factors to compare. Keep assumptions explicit and retain links to the authoritative records.' },
      { title: 'Compare places in context', detail: 'Relate sites to access, infrastructure and local characteristics. Show how different criteria affect a comparison and identify questions requiring further investigation.' },
      { title: 'Make the information understandable', detail: 'Present the findings through a property map, planning tool or StoryMap. Connect the analysis to local knowledge and provide a way to record additional observations.' },
    ],
    outputs: [
      { title: 'Site comparison', detail: 'A geographic view of options, criteria and source information for a documented review.' },
      { title: 'Public-facing map', detail: 'An understandable view of local information, with useful context and links to the underlying sources.' },
      { title: 'Planning record', detail: 'A record of the assumptions, information gaps and observations that shaped the discussion.' },
    ],
    feedback: 'Community input and site investigations can reveal information missing from the original datasets. Those observations inform the next comparison and keep earlier assumptions visible.',
  },
];
