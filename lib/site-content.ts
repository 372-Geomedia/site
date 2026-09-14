export const company = {
  name: '372 GeoMedia',
  url: 'https://372geomedia.com',
  contact: 'https://372geomedia.com/contact/',
  experience: { years: '50+', description: 'years of combined team experience' },
};

// Keep existing destinations for content not yet represented on this homepage.
// Add Insights only when there is published material to link to.
export const navigation = [
  { label: 'Capabilities', href: '#capabilities' },
  { label: 'Work', href: `${company.url}/projects/` },
  { label: 'About', href: '#experience' },
];
