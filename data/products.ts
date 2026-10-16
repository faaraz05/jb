// data/products.ts

export type Category = 'semi-hardwood' | 'hardwood' | 'marine-premium' | 'film-faced';

export type Product = {
  slug: string;
  name: string;
  category: Category;
  image: string;
  featured?: boolean;
  size: string;
  face: string;
  core: string;
  resin: string;
  grade?: string;
  dipping?: boolean;
  // For film-faced, weight variants are represented as separate thickness entries with weight in the mm field label
  thicknesses: { mm: number; price: number; label?: string }[];
  unit?: string; // price unit — to confirm with client (e.g. "₹ / sq ft")
};

export const products: Product[] = [
  {
    slug: 'semi-hardwood-okuma',
    name: 'Semi Hardwood Okuma',
    category: 'semi-hardwood',
    image: '/images/products/okuma.jpg',
    featured: true,
    size: '8 ft × 4 ft (2440 × 1220 mm)',
    face: 'Okuma',
    core: 'Semi hardwoods',
    resin: 'UF resin bonded',
    thicknesses: [
      { mm: 18, price: 48 },
      { mm: 16, price: 47 },
      { mm: 12, price: 38 },
      { mm: 9, price: 36 },
      { mm: 6, price: 28 },
    ],
  },
  {
    slug: 'semi-hardwood-gurjan',
    name: 'Semi Hardwood Gurjan',
    category: 'semi-hardwood',
    image: '/images/products/gurjan-semi.jpg',
    featured: false,
    size: '8 ft × 4 ft (2440 × 1220 mm)',
    face: 'Gurjan',
    core: 'Semi hardwoods',
    resin: 'UF resin bonded',
    thicknesses: [
      { mm: 18, price: 52 },
      { mm: 16, price: 51 },
      { mm: 12, price: 42 },
      { mm: 9, price: 39 },
      { mm: 6, price: 32 },
    ],
  },
  {
    slug: 'alternate-gurjan-dipping',
    name: 'Alternate Plywood, Gurjan Face Dipping',
    category: 'hardwood',
    image: '/images/products/alternate-gurjan.jpg',
    featured: false,
    size: '8 ft × 4 ft (2440 × 1220 mm)',
    face: 'Gurjan (dipped)',
    core: 'Alternate red, eucalyptus, mahogany',
    resin: 'MUF glue',
    grade: 'BWR',
    dipping: true,
    thicknesses: [
      { mm: 18, price: 60 },
      { mm: 16, price: 58 },
      { mm: 12, price: 50 },
      { mm: 9, price: 47 },
      { mm: 6, price: 37 },
    ],
  },
  {
    slug: 'full-red-gurjan-dipping',
    name: 'Full Red Plywood, Gurjan Face Dipping',
    category: 'hardwood',
    image: '/images/products/full-red.jpg',
    featured: true,
    size: '8 ft × 4 ft (2440 × 1220 mm)',
    face: 'Gurjan (dipped)',
    core: 'Full red wood, eucalyptus, mahogany',
    resin: 'MUF glue',
    grade: 'BWR',
    dipping: true,
    thicknesses: [
      { mm: 18, price: 63 },
      { mm: 16, price: 61 },
      { mm: 12, price: 53 },
      { mm: 9, price: 50 },
      { mm: 6, price: 43 },
    ],
  },
  {
    slug: 'hardwood-premium-isi-303',
    name: 'Full Hardwood Premium ISI 303',
    category: 'marine-premium',
    image: '/images/products/isi-303.jpg',
    featured: false,
    size: '8 ft × 4 ft (2440 × 1220 mm)',
    face: 'Gurjan (dipped)',
    core: 'Hardwoods, eucalyptus',
    resin: 'Melamine bonded',
    grade: 'ISI 303, BWR',
    dipping: true,
    thicknesses: [
      { mm: 18, price: 80 },
      { mm: 16, price: 75 },
      { mm: 12, price: 70 },
      { mm: 9, price: 62 },
      { mm: 6, price: 50 },
    ],
  },
  {
    slug: 'hardwood-premium-isi-710',
    name: 'Full Hardwood Premium ISI 710',
    category: 'marine-premium',
    image: '/images/products/isi-710.jpg',
    featured: true,
    size: '8 ft × 4 ft (2440 × 1220 mm)',
    face: 'Hardwood',
    core: 'Hardwoods, eucalyptus',
    resin: 'Phenol bonded',
    grade: 'ISI 710',
    thicknesses: [
      { mm: 18, price: 95 },
      { mm: 16, price: 90 },
      { mm: 12, price: 85 },
      { mm: 9, price: 75 },
      { mm: 6, price: 60 },
    ],
  },
  {
    slug: 'film-faced-shuttering',
    name: 'Film Faced Plywood (Shuttering)',
    category: 'film-faced',
    image: '/images/products/film-faced.jpg',
    featured: true,
    size: '8 ft × 4 ft (2440 × 1220 mm)',
    face: 'Phenolic film',
    core: 'Hardwood',
    resin: 'Phenol',
    // Three weight variants at 12mm
    thicknesses: [
      { mm: 12, price: 55, label: '34 kg' },
      { mm: 12, price: 52, label: '30 kg' },
      { mm: 12, price: 43, label: '24 kg' },
    ],
  },
];

export const featuredProducts = products.filter((p) => p.featured);

export const CATEGORY_LABELS: Record<Category, string> = {
  'semi-hardwood': 'Semi Hardwood',
  hardwood: 'Hardwood',
  'marine-premium': 'Marine / Premium',
  'film-faced': 'Film Faced',
};

