import { featuredProducts } from '@/data/products';
import ProductGrid from '@/components/products/ProductGrid';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/button';
import FadeIn from '@/components/ui/FadeIn';

export default function FeaturedProducts() {
  return (
    <section className="py-24 px-6" style={{ background: 'var(--surface)' }}>
      <div className="max-w-[1240px] mx-auto flex flex-col gap-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Featured Products"
            title="Panels Built for Performance"
          />
          <FadeIn delay={160}>
            <Button href="/products" variant="secondary" className="shrink-0 self-start sm:self-auto">
              View Full Catalogue
            </Button>
          </FadeIn>
        </div>

        <ProductGrid products={featuredProducts} columns={4} />
      </div>
    </section>
  );
}

