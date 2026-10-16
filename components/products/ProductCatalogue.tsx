'use client';
import { useState } from 'react';
import { products, CATEGORY_LABELS, type Category } from '@/data/products';
import ProductGrid from './ProductGrid';
import { SITE } from '@/data/site';

const ALL = 'all' as const;
type Filter = typeof ALL | Category;

const filters: { label: string; value: Filter }[] = [
  { label: 'All', value: ALL },
  { label: 'Semi Hardwood', value: 'semi-hardwood' },
  { label: 'Hardwood', value: 'hardwood' },
  { label: 'Marine / Premium', value: 'marine-premium' },
  { label: 'Film Faced', value: 'film-faced' },
];

export default function ProductCatalogue() {
  const [active, setActive] = useState<Filter>(ALL);

  const filtered = active === ALL ? products : products.filter((p) => p.category === active);

  return (
    <section className="py-12 px-6 max-w-[1240px] mx-auto">
      {/* Filter chips */}
      <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter products by category">
        {filters.map(({ label, value }) => {
          const isActive = active === value;
          return (
            <button
              key={value}
              onClick={() => setActive(value)}
              className="h-9 px-5 rounded-full text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
              style={{
                background: isActive ? 'var(--gold)' : 'transparent',
                color: isActive ? 'var(--ink)' : 'var(--brown)',
                border: `1.5px solid ${isActive ? 'var(--gold)' : 'var(--surface-alt)'}`,
              }}
              aria-pressed={isActive}
            >
              {label}
            </button>
          );
        })}
      </div>

      <ProductGrid products={filtered} columns={3} />

      {/* Footnotes */}
      {SITE.SHOW_PRICES && (
        <div className="mt-10 flex flex-col gap-1 text-sm opacity-70" style={{ color: 'var(--ink)' }}>
          <p>* All rates are ex factory.</p>
          <p>* Dipping rate will be ₹1 extra.</p>
          <p>* Serving Tamil Nadu & Kerala.</p>
        </div>
      )}
    </section>
  );
}

