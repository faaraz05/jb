import type { Metadata } from 'next';
import { Suspense } from 'react';
import PageHero from '@/components/ui/PageHero';
import ContactForm from '@/components/sections/ContactForm';
import ContactInfoGrid from '@/components/sections/ContactInfoGrid';
import MapEmbed from '@/components/sections/MapEmbed';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeIn from '@/components/ui/FadeIn';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Speak directly with the factory. Send an enquiry about wholesale plywood supply, ex-factory rates, or product specifications.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Contact Us"
        tagline="Speak directly with the factory."
        eyebrowColor="var(--gold-text)"
        titleColor="var(--brown)"
        taglineColor="var(--gold-text)"
      />

      {/* Form section */}
      <section className="py-24 px-6" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Form — 60% */}
            <div className="lg:w-3/5">
              <FadeIn>
                <div
                  className="p-8 rounded"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--surface-alt)',
                  }}
                >
                  <SectionHeading
                    eyebrow="Send an Enquiry"
                    title="Let's discuss your supply needs"
                  />
                  <div className="mt-8">
                    {/* Suspense needed because ContactForm uses useSearchParams */}
                    <Suspense fallback={<p className="text-sm" style={{ color: 'var(--ink)' }}>Loading form…</p>}>
                      <ContactForm />
                    </Suspense>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right — intro + guild note */}
            <FadeIn direction="right" className="lg:w-2/5 flex flex-col gap-6">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] font-semibold mb-3" style={{ color: 'var(--gold-text)' }}>
                  Factory Direct
                </p>
                <p className="text-base leading-relaxed" style={{ color: 'var(--ink)' }}>
                  Reach out to discuss bulk requirements, panel specifications, pricing, and logistics.
                  We serve wholesale distributors, timber merchants, and corporate supply chains across
                  Tamil Nadu, Kerala, and interstate.
                </p>
              </div>
              <div
                className="rounded p-6 flex flex-col gap-3"
                style={{ background: 'var(--surface)', border: '1px solid var(--gold)' }}
              >
                <p className="text-xs uppercase tracking-[0.14em] font-semibold" style={{ color: 'var(--gold-text)' }}>
                  JB Timber Guild
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)' }}>
                  Interested in long-term wholesale partnerships? Ask about our Guild membership for
                  factory-direct allocations, tier pricing, and dedicated batch documentation.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Map + contact info */}
      <section className="py-24 px-6" style={{ background: 'var(--surface)' }}>
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-col lg:flex-row-reverse gap-12">
            {/* Map — right on desktop */}
            <div className="lg:w-1/2">
              <MapEmbed />
            </div>
            {/* Contact info — left on desktop */}
            <div className="lg:w-1/2 flex flex-col gap-8 justify-center">
              <SectionHeading
                eyebrow="Find Us"
                title="Contact Details"
              />
              <ContactInfoGrid />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

