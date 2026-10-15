'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/data/site';
import Button from '@/components/ui/button';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full flex justify-center px-4 pt-4 pb-2 pointer-events-none">
      <nav
        aria-label="Primary"
        className="pointer-events-auto w-full max-w-[920px] rounded-full px-5 flex items-center justify-between gap-4 transition-shadow duration-300"
        style={{
          background: 'color-mix(in srgb, var(--surface) 85%, transparent)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid var(--gold)',
          boxShadow: scrolled ? '0 8px 32px -8px rgba(43,29,16,.25)' : '0 2px 12px -4px rgba(43,29,16,.12)',
          height: '60px',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold rounded-full px-1"
          aria-label="JB Timber Tech — Home"
        >
          <Image
            src="/jb_golden_tree.svg"
            alt="JB Timber Tech Logo"
            width={28}
            height={28}
            className="w-7 h-7 object-contain"
            priority
          />
          <span
            className="font-display font-semibold tracking-[0.06em] text-sm leading-tight hidden sm:block"
            style={{ color: 'var(--brown)' }}
          >
            JB TIMBER TECH
          </span>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_LINKS.map(({ label, href }) => {
            const active = pathname === href || pathname.startsWith(href);
            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className="relative px-4 py-2 text-sm font-medium uppercase tracking-[0.08em] rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold group"
                  style={{ color: active ? 'var(--gold-text)' : 'var(--brown)' }}
                >
                  {label}
                  {/* Animated underline */}
                  <span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 h-[2px] rounded-full transition-all duration-250 group-hover:w-3/4"
                    style={{
                      background: 'var(--gold)',
                      width: active ? '60%' : '0',
                    }}
                    aria-hidden="true"
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right side: Get a Quote + mobile toggle */}
        <div className="flex items-center gap-2">
          <Button href="/contact" variant="primary" className="hidden md:inline-flex !h-9 !px-5 !text-xs">
            Get a Quote
          </Button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
            style={{ color: 'var(--brown)' }}
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      {menuOpen && (
        <div
          className="pointer-events-auto absolute top-[76px] left-4 right-4 rounded-2xl overflow-hidden shadow-xl"
          style={{ background: 'var(--surface)', border: '1px solid var(--gold)' }}
        >
          <ul className="flex flex-col" role="list">
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname === href || pathname.startsWith(href);
              return (
                <li key={href} style={{ borderBottom: '1px solid var(--surface-alt)' }}>
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className="flex items-center h-12 px-6 text-sm font-medium uppercase tracking-[0.08em] transition-colors"
                    style={{ color: active ? 'var(--gold-text)' : 'var(--brown)' }}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            <li className="p-4">
              <Button href="/contact" variant="primary" className="w-full justify-center">
                Get a Quote
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
