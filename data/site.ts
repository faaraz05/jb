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
  mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3914.429742747596!2d77.4407869751324!3d11.155783252081719!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba909ae589cbce9%3A0xa1426b9fae6e7c34!2sKarukkankatupudur!5e0!3m2!1sen!2sin!4v1792152694588!5m2!1sen!2sin',
};

export const NAV_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Contact Us', href: '/contact' },
] as const;

