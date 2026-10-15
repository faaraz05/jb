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
    name: '[Owner Name]',
    designation: 'Managing Director',
    image: '/images/owners/owner-1.svg',
    bio: 'Leading JB Timber Tech with a vision for factory-direct excellence across Southern India.',
  },
  {
    id: 'director-operations',
    name: '[Owner Name]',
    designation: 'Director — Operations',
    image: '/images/owners/owner-2.svg',
    bio: 'Overseeing manufacturing quality and wholesale supply chain operations.',
  },
];

