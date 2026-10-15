// data/site.ts
// Site-wide constants. Update with confirmed client data before launch.

export const SITE = {
  name: 'JB Timber Tech Solutions Pvt Ltd',
  tagline: 'Engineered from Strength. Rooted in Luxury.',
  taglineAlt1: 'The Wholesale Standard for Premium Timber Engineering.',
  taglineAlt2: 'Manufacturer Precision. Uncompromising Architectural Luxury.',
  phone: '+91 8086505556',
  email: 'jbtimbertech@gmail.com',
  address: '[Factory Address — to be confirmed by client]',
  workingHours: 'Mon – Sat, 9:00 AM – 6:00 PM',
  region: 'Tamil Nadu & Kerala',
  // Set to true to display prices on product cards
  SHOW_PRICES: false,
  // Google Maps embed URL — to be confirmed by client
  mapsEmbedUrl: '',
};

export const NAV_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Contact Us', href: '/contact' },
] as const;

