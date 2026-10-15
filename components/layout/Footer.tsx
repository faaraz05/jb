import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { SITE } from '@/data/site';
import { products } from '@/data/products';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const year = CURRENT_YEAR;

  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--bg)' }}>
      {/* Gold rule */}
      <div style={{ height: '1px', background: 'var(--gold)' }} aria-hidden="true" />

      <div className="max-w-[1240px] mx-auto px-6 py-16">
        <div
          className="grid gap-12"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}
        >
          {/* Col 1 — Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold rounded" aria-label="JB Timber Tech — Home">
              <Image
                src="/jb_golden_tree.svg"
                alt="JB Timber Tech Logo"
                width={32}
                height={32}
                className="w-8 h-8 object-contain"
              />
              <span className="font-display font-semibold tracking-[0.06em] text-sm" style={{ color: 'var(--bg)' }}>
                JB TIMBER TECH
              </span>
            </Link>
            <p className="font-accent italic text-lg leading-[1.3]" style={{ color: 'var(--gold-light)' }}>
              {SITE.tagline}
            </p>
            <p className="text-sm opacity-70">{SITE.region}</p>
          </div>

          {/* Col 2 — Contact */}
          <div className="flex flex-col gap-4">
            <h3
              className="text-xs uppercase tracking-[0.18em] font-semibold"
              style={{ color: 'var(--gold-light)' }}
            >
              Contact
            </h3>
            <ul className="flex flex-col gap-3 text-sm opacity-80" role="list">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-start gap-2 hover:text-gold-light transition-colors"
                  style={{ color: 'inherit' }}
                >
                  <Mail size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--gold)' }} aria-hidden="true" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 hover:text-gold-light transition-colors"
                  style={{ color: 'inherit' }}
                >
                  <Phone size={16} className="shrink-0" style={{ color: 'var(--gold)' }} aria-hidden="true" />
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--gold)' }} aria-hidden="true" />
                {SITE.address}
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} className="shrink-0" style={{ color: 'var(--gold)' }} aria-hidden="true" />
                {SITE.workingHours}
              </li>
            </ul>
          </div>

          {/* Col 3 — Products */}
          <div className="flex flex-col gap-4">
            <h3
              className="text-xs uppercase tracking-[0.18em] font-semibold"
              style={{ color: 'var(--gold-light)' }}
            >
              Products
            </h3>
            <ul className="flex flex-col gap-2 text-sm opacity-80" role="list">
              {products.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/products#${p.slug}`}
                    className="transition-colors hover:opacity-100 hover:text-gold-light"
                    style={{ color: 'inherit' }}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/products"
              className="text-xs uppercase tracking-[0.12em] font-semibold transition-colors hover:opacity-100"
              style={{ color: 'var(--gold)' }}
            >
              View full catalogue →
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid var(--gold)' }}>
        <div className="max-w-[1240px] mx-auto px-6 py-4">
          <p className="text-xs opacity-50 text-center">
            © {year} {SITE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
