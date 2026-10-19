// data/site.ts
// Site-wide constants. Update with confirmed client data before launch.

export const SITE = {
  name: 'JB Timber Tech Solutions Pvt Ltd',
  tagline: 'Engineered from Strength. Rooted in Luxury.',
  taglineAlt1: 'The Wholesale Standard for Premium Timber Engineering.',
  taglineAlt2: 'Manufacturer Precision. Uncompromising Architectural Luxury.',
  phone: '+91 8086605556',
  email: 'jbtimbertech@gmail.com',
  address: 'Karukankattupudur, Tirupur, Perumanallur, Coimbatore-641666',
  workingHours: 'Mon – Sat, 9:00 AM – 6:00 PM',
  region: 'Tamil Nadu, Kerala, Karnataka & Pune',
  // Set to true to display prices on product cards
  SHOW_PRICES: false,
  // Google Maps embed URL — to be confirmed by client
  mapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3913.610108996888!2d77.34663977504827!3d11.2164561889603!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDEyJzU5LjIiTiA3N8KwMjAnNTcuMiJF!5e0!3m2!1sen!2sin!4v1792165821626!5m2!1sen!2sin',
};

export const NAV_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Contact Us', href: '/contact' },
] as const;

