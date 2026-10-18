// data/testimonials.ts
// Replace placeholder quotes with real client-supplied testimonials before launch.

export type Testimonial = {
  quote: string;
  name: string;
  company: string;
  location: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      'JB Timber Tech has been our go-to supplier for ISI 710 boards. Consistent quality, reliable dispatch, and factory-direct rates that give us a real edge in our region.',
    name: 'Mahin A L',
    company: 'Plyland Agencies',
    location: 'Edapally, Kerala',
  },
  {
    quote:
      'The Gurjan Face Dipping range transformed our product line. Every batch arrives perfectly calibrated — our commercial clients notice the difference immediately.',
    name: 'Yogesh Krishna',
    company: 'Mahadeva Pvt.',
    location: 'Coimbatore, Tamil Nadu',
  },
  {
    quote:
      'Working with JB Timber has been seamless from order to delivery. The documentation support for our supply contracts is thorough and professional.',
    name: 'Balasubrahmanyan A',
    company: 'Gallaxy Interiors',
    location: 'Chennai, Tamil Nadu',
  },
];

