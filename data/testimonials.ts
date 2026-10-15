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
    name: '[Partner Name]',
    company: '[Distributor Company]',
    location: 'Chennai, Tamil Nadu',
  },
  {
    quote:
      'The Gurjan Face Dipping range transformed our product line. Every batch arrives perfectly calibrated — our commercial clients notice the difference immediately.',
    name: '[Partner Name]',
    company: '[Timber Merchant]',
    location: 'Kochi, Kerala',
  },
  {
    quote:
      'Working with JB Timber has been seamless from order to delivery. The documentation support for our supply contracts is thorough and professional.',
    name: '[Partner Name]',
    company: '[Corporate Supply Chain]',
    location: 'Coimbatore, Tamil Nadu',
  },
];

