// data/clients.ts

export type Client = {
  name: string;
  src: string;
};

export const clients: Client[] = [
  { name: 'CE Certified', src: '/logos/CE.svg' },
  { name: 'Eco Friendly Verified', src: '/logos/Eco.svg' },
  { name: 'IPIRTI Tested', src: '/logos/ipirti.svg' },
  { name: 'ISI Mark IS:303 / IS:710', src: '/logos/Isi_mark.svg' },
  { name: 'ISO 9001:2015', src: '/logos/ISO_9001-2015.svg' },
  { name: 'OHSAS 18001', src: '/logos/ohsas.svg' },
];
