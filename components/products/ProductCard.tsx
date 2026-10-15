'use client';
import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/data/products';
import { SITE } from '@/data/site';

type Props = {
  product: Product;
};

function CoreTag({ core, dipping }: { core: string; dipping?: boolean }) {
  const isFullRed = core.toLowerCase().includes('full red');
  const isEucalyptus = core.toLowerCase().includes('eucalyptus') || core.toLowerCase().includes('mahogany');
  const bg = isFullRed ? 'var(--red-core)' : isEucalyptus ? 'var(--sage)' : 'var(--surface-alt)';
  const color = (isFullRed || isEucalyptus) ? 'var(--bg)' : 'var(--brown)';

  return (
    <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-sm font-medium" style={{ background: bg, color }}>
      {core}
      {dipping && <span className="opacity-80">· dipped</span>}
    </span>
  );
}

function GradeTag({ grade }: { grade: string }) {
  return (
    <span
      className="inline-flex items-center text-xs px-2 py-0.5 rounded-sm font-semibold"
      style={{ background: 'var(--gold)', color: 'var(--ink)' }}
    >
      {grade}
    </span>
  );
}

export default function ProductCard({ product }: Props) {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((o) => !o), []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <article
      className="product-card rounded cursor-pointer"
      data-open={open}
      onClick={toggle}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-expanded={open}
      aria-label={`${product.name} — click to see details`}
      id={product.slug}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Name */}
      <div className="p-4">
        <div style={{ borderTop: '1px solid var(--gold)', paddingTop: '12px' }}>
          <h3
            className="font-display font-semibold leading-snug tracking-[0.03em]"
            style={{ fontSize: '17px', color: 'var(--brown)' }}
          >
            {product.name}
          </h3>
          {product.category && (
            <p className="text-xs mt-1 uppercase tracking-[0.1em] font-medium" style={{ color: 'var(--gold-text)' }}>
              {product.category.replace('-', ' / ')}
            </p>
          )}
        </div>

        {/* Expandable details */}
        <div className="product-details">
          <div>
            <div className="pt-4 flex flex-col gap-3">
              {/* Size */}
              <div>
                <p className="text-xs uppercase tracking-[0.12em] font-semibold mb-1" style={{ color: 'var(--gold-text)' }}>Size</p>
                <p className="text-sm" style={{ color: 'var(--ink)' }}>{product.size}</p>
              </div>

              {/* Thickness chips */}
              <div>
                <p className="text-xs uppercase tracking-[0.12em] font-semibold mb-2" style={{ color: 'var(--gold-text)' }}>
                  {product.category === 'film-faced' ? 'Weight variants (12 mm)' : 'Thickness (mm)'}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {product.thicknesses.map((t, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-0.5 rounded-sm font-medium"
                      style={{ background: 'var(--surface-alt)', color: 'var(--brown)' }}
                    >
                      {t.label ?? `${t.mm} mm`}
                      {SITE.SHOW_PRICES && (
                        <span className="ml-1 opacity-70">₹{t.price}</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Material tags */}
              <div>
                <p className="text-xs uppercase tracking-[0.12em] font-semibold mb-2" style={{ color: 'var(--gold-text)' }}>Materials</p>
                <div className="flex flex-wrap gap-1.5">
                  <CoreTag core={product.core} dipping={product.dipping} />
                  {product.grade && <GradeTag grade={product.grade} />}
                  <span
                    className="text-xs px-2 py-0.5 rounded-sm font-medium"
                    style={{ background: 'var(--surface-alt)', color: 'var(--brown)' }}
                  >
                    {product.resin}
                  </span>
                </div>
              </div>

              {/* Prices */}
              {SITE.SHOW_PRICES && (
                <div>
                  <p className="text-xs uppercase tracking-[0.12em] font-semibold mb-2" style={{ color: 'var(--gold-text)' }}>
                    Ex-factory rate {product.unit ? `(${product.unit})` : ''}
                  </p>
                  <div className="flex flex-col divide-y" style={{ borderColor: 'var(--surface-alt)' }}>
                    {product.thicknesses.map((t, i) => (
                      <div key={i} className="flex justify-between py-1 text-sm">
                        <span style={{ color: 'var(--brown)' }}>{t.label ?? `${t.mm} mm`}</span>
                        <span className="font-semibold" style={{ color: 'var(--gold-text)' }}>₹{t.price}</span>
                      </div>
                    ))}
                  </div>
                  {product.dipping && (
                    <p className="text-xs mt-1 opacity-60">* Dipping ₹1 extra</p>
                  )}
                </div>
              )}

              {/* CTA link */}
              <Link
                href={`/contact?product=${product.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold transition-colors mt-1 group/link"
                style={{ color: 'var(--gold-text)' }}
                onClick={(e) => e.stopPropagation()}
              >
                Enquire about this product
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover/link:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

