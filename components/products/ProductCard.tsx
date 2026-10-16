'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Product } from '@/data/products';
import { SITE } from '@/data/site';
import FlipCard from '@/components/ui/FlipCard';

type Props = {
  product: Product;
};

function CoreTag({ core, dipping }: { core: string; dipping?: boolean }) {
  const isFullRed = core.toLowerCase().includes('full red');
  const isEucalyptus = core.toLowerCase().includes('eucalyptus') || core.toLowerCase().includes('mahogany');
  const bg = isFullRed ? 'var(--red-core)' : isEucalyptus ? 'var(--sage)' : 'var(--surface-alt)';
  const color = isFullRed || isEucalyptus ? 'var(--bg)' : 'var(--brown)';

  return (
    <span
      className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-sm font-medium"
      style={{ background: bg, color }}
    >
      {core}
      {dipping && <span className="opacity-80">· dipped</span>}
    </span>
  );
}

function GradeTag({ grade }: { grade: string }) {
  return (
    <span
      className="inline-flex items-center text-[11px] px-2 py-0.5 rounded-sm font-semibold"
      style={{ background: 'var(--gold)', color: 'var(--ink)' }}
    >
      {grade}
    </span>
  );
}

export default function ProductCard({ product }: Props) {
  /* Front Face: Pure full-bleed image filling 2:3 card with gold double frame, zero text */
  const frontFace = (
    <div
      className="relative w-full h-full overflow-hidden rounded-[12px]"
      style={{
        border: '1px solid var(--gold)',
        boxShadow: 'inset 0 0 0 1px var(--gold-light)',
      }}
    >
      <Image
        src={product.image}
        alt={product.name}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        priority={false}
      />
    </div>
  );

  /* Back Face: Complete specs, materials, and enquiry CTA */
  const backFace = (
    <div
      className="relative w-full h-full p-5 sm:p-6 flex flex-col justify-between overflow-y-auto rounded-[12px]"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--gold)',
        boxShadow: 'inset 0 0 0 1px var(--gold-light)',
      }}
    >
      {/* Header */}
      <div>
        <div style={{ borderBottom: '1px solid var(--gold)', paddingBottom: '10px' }}>
          <h3
            className="font-display font-semibold leading-snug tracking-[0.03em] text-base sm:text-lg"
            style={{ color: 'var(--brown)' }}
          >
            {product.name}
          </h3>
          {product.category && (
            <p
              className="text-[11px] sm:text-xs mt-1 uppercase tracking-[0.14em] font-medium"
              style={{ color: 'var(--gold-text)' }}
            >
              {product.category.replace('-', ' / ')}
            </p>
          )}
        </div>

        {/* Specs Details */}
        <div className="pt-3.5 flex flex-col gap-2.5">
          {/* Size */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.14em] font-semibold mb-0.5" style={{ color: 'var(--gold-text)' }}>
              Standard Size
            </p>
            <p className="text-xs sm:text-sm font-medium" style={{ color: 'var(--ink)' }}>
              {product.size}
            </p>
          </div>

          {/* Thickness Chips */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.14em] font-semibold mb-1" style={{ color: 'var(--gold-text)' }}>
              {product.category === 'film-faced' ? 'Weight Variants' : 'Available Thickness'}
            </p>
            <div className="flex flex-wrap gap-1">
              {product.thicknesses.map((t, i) => (
                <span
                  key={i}
                  className="text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded-sm font-medium"
                  style={{ background: 'var(--surface-alt)', color: 'var(--brown)' }}
                >
                  {t.label ?? `${t.mm} mm`}
                  {SITE.SHOW_PRICES && <span className="ml-1 opacity-70">₹{t.price}</span>}
                </span>
              ))}
            </div>
          </div>

          {/* Material Tags */}
          <div>
            <p className="text-[10px] uppercase tracking-[0.14em] font-semibold mb-1" style={{ color: 'var(--gold-text)' }}>
              Materials & Core
            </p>
            <div className="flex flex-wrap gap-1">
              <CoreTag core={product.core} dipping={product.dipping} />
              {product.grade && <GradeTag grade={product.grade} />}
              <span
                className="text-[10px] sm:text-[11px] px-1.5 py-0.5 rounded-sm font-medium"
                style={{ background: 'var(--surface-alt)', color: 'var(--brown)' }}
              >
                {product.resin}
              </span>
            </div>
          </div>

          {/* Prices if enabled */}
          {SITE.SHOW_PRICES && (
            <div className="pt-1">
              <p className="text-[10px] uppercase tracking-[0.14em] font-semibold mb-1" style={{ color: 'var(--gold-text)' }}>
                Ex-Factory Rate {product.unit ? `(${product.unit})` : ''}
              </p>
              <div className="flex flex-col divide-y text-xs" style={{ borderColor: 'var(--surface-alt)' }}>
                {product.thicknesses.slice(0, 3).map((t, i) => (
                  <div key={i} className="flex justify-between py-0.5">
                    <span style={{ color: 'var(--brown)' }}>{t.label ?? `${t.mm} mm`}</span>
                    <span className="font-semibold" style={{ color: 'var(--gold-text)' }}>₹{t.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA Footer */}
      <div className="pt-3 mt-2 border-t" style={{ borderColor: 'rgba(184, 137, 58, 0.25)' }}>
        <Link
          href={`/contact?product=${product.slug}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition-colors group/link"
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
  );

  return (
    <div className="w-full aspect-[2/3]" id={product.slug}>
      <FlipCard
        front={frontFace}
        back={backFace}
        flipOnHover
        flipOnClick
        axis="y"
        tilt
        tiltMax={10}
        glare
        glareOpacity={0.18}
        hoverScale={1.02}
        perspective={1100}
        stiffness={160}
        damping={19}
        radius={12}
        background="var(--surface, #FBF8EF)"
        color="var(--ink, #2B1D10)"
        shadow
        shadowColor="rgba(43, 29, 16, 0.35)"
        shadowOpacity={0.35}
        ariaLabel={`${product.name} — hover or tap to see specifications`}
        className="w-full h-full"
      />
    </div>
  );
}
