export const company = {
  name: '372 GeoMedia',
  url: 'https://372geomedia.com',
  contact: '/contact',
  email: 'support@372geomedia.com',
  experience: { years: '50+', description: 'years of combined team experience' },
};

export const navigation = [
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
];

export function isActiveRoute(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}
