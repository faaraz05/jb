import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import ProductCatalogue from '@/components/products/ProductCatalogue';
import CtaBanner from '@/components/ui/CtaBanner';

export const metadata: Metadata = {
  title: 'Product Catalogue',
  description:
    'Browse the full range of JB Timber Tech plywood: semi-hardwood, full hardwood, marine/premium ISI grades, and film-faced shuttering ply.',
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Range"
        title="Product Catalogue"
        tagline="Manufacturer Precision. Uncompromising Architectural Luxury."
        eyebrowColor="rgb(0 0 0)"
        titleColor="rgb(0 0 0)"
        taglineColor="rgb(0 0 0)"
        image='/images/Plywood-product-page.jpeg'
      />
      <ProductCatalogue />
      <CtaBanner
        heading="Ready to place a bulk order?"
        body="Contact us for ex-factory rates, volume allocations, and logistics across Tamil Nadu & Kerala."
      />
    </>
  );
}

