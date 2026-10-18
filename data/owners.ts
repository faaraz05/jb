// data/owners.ts
// Replace with actual owner names, designations, photos, and bios.

export type Owner = {
  id: string;
  name: string;
  designation: string;
  image: string;
  bio?: string;
};

export const owners: Owner[] = [
  {
    id: 'managing-director',
    name: 'Jithinshah Azeez',
    designation: 'Managing Director',
    image: '/images/owners/Jithinshah.jpeg',
    bio: 'Leading JB Timber Tech with a vision for factory-direct excellence across Southern India.',
  },
  {
    id: 'director-operations',
    name: 'Muhammed Bilal',
    designation: 'Director — Operations',
    image: '/images/owners/bilal.jpeg',
    bio: 'Overseeing manufacturing quality and wholesale supply chain operations.',
  },
];

