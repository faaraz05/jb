import type { Metadata } from 'next';
import Image from 'next/image';
import { Factory, Layers, Truck, Shield } from 'lucide-react';
import PageHero from '@/components/ui/PageHero';
import PillarsGrid from '@/components/sections/PillarsGrid';
import LogoMarquee from '@/components/sections/LogoMarquee';
import OwnersSection from '@/components/sections/OwnersSection';
import CtaBanner from '@/components/ui/CtaBanner';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeIn from '@/components/ui/FadeIn';
import { clients } from '@/data/clients';
import { owners } from '@/data/owners';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about JB Timber Tech Solutions — factory-direct plywood manufacturer serving wholesale distributors across Tamil Nadu and Kerala.',
};

const operationPillars = [
  {
    Icon: Factory,
    title: 'Industrial-Grade Manufacturing',
    desc: 'Consistent core layering using full red wood, selected hardwoods, and eucalyptus cores bonded under high-pressure thermal presses.',
  },
  {
    Icon: Layers,
    title: 'Luxury & Specialty Range',
    desc: 'Premium Gurjan-dipped veneers and flawless surface calibrating tailored for high-end residential interiors and commercial architecture.',
  },
  {
    Icon: Truck,
    title: 'B2B & Wholesale Reliability',
    desc: 'Large-batch manufacturing capacities, seamless ex-factory dispatch schedules, and dedicated cross-state logistics.',
  },
];

const guildAdvantages = [
  {
    num: '01',
    title: 'Factory-Direct Allocation',
    desc: 'Lock in bulk production runs and guarantee continuous container/truckload fulfillment straight from the mill to your warehouses.',
  },
  {
    num: '02',
    title: 'Competitive Ex-Factory Pricing',
    desc: 'Direct tier pricing models on volume commitments, giving your wholesale business stronger regional margins across commercial and luxury segments.',
  },
  {
    num: '03',
    title: 'Technical Compliance & Documentation',
    desc: 'Comprehensive test certificates, ISI-grade verifications, and batch documentation for seamless inter-company contract supply.',
  },
  {
    num: '04',
    title: 'Custom Milling & Core Specifications',
    desc: 'Tailored pressing options ranging from standard 6mm lining sheets to heavy-duty 18mm/19mm structural cores and specified dipping options.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Direct Manufacturer Precision, Built for Scale and Distinction"
        tagline="The Wholesale Standard for Premium Timber Engineering."
        video="/images/Process-squished.mp4"
        eyebrowColor="#f5efe0"
        titleColor="#f5efe0"
        taglineColor="#f5efe0"
      />

      {/* Overview */}
      <section className="py-24 px-6" style={{ background: 'var(--bg)' }}>
        <div className="max-w-[1240px] mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-3/5 flex flex-col gap-6">
            <FadeIn>
              <p className="text-base leading-relaxed" style={{ color: 'var(--ink)' }}>
                At JB Timber Tech Solutions, we engineer timber panels that set the industry standard
                for durability, surface perfection, and structural endurance. Serving wholesale
                distributors, regional timber stockists, and interstate corporate supply chains, we
                operate with a clear mandate: delivering factory-direct manufacturing consistency with
                the aesthetic refinement of luxury woodcraft.
              </p>
            </FadeIn>
            <FadeIn delay={80}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--ink)' }}>
                Our manufacturing capabilities span the full spectrum of high-demand and luxury plywood
                grades. From calibrated Gurjan-face panels and high-density Okoume veneers to
                marine-grade ISI 710 phenol-bonded boards and precision-engineered shuttering ply, every
                panel is produced under strict quality controls.
              </p>
            </FadeIn>
            <FadeIn delay={160}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--ink)' }}>
                We do not just supply sheets; we power wholesale distribution networks and
                enterprise-scale projects across Southern India with dependable volume, ex-factory rates,
                and unwavering structural reliability.
              </p>
            </FadeIn>

            {/* Operation pillars */}
            <div className="flex flex-col gap-5 mt-4">
              <FadeIn delay={240}>
                <h3
                  className="font-display font-semibold tracking-[0.04em]"
                  style={{ fontSize: '20px', color: 'var(--brown)' }}
                >
                  The Pillars of Our Operations
                </h3>
              </FadeIn>
              {operationPillars.map(({ Icon, title, desc }, i) => (
                <FadeIn key={title} delay={280 + i * 80}>
                  <div className="flex items-start gap-4">
                    <div
                      className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center mt-0.5"
                      style={{ background: 'var(--surface-alt)' }}
                      aria-hidden="true"
                    >
                      <Icon size={16} style={{ color: 'var(--gold)' }} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-0.5" style={{ color: 'var(--brown)' }}>{title}</p>
                      <p className="text-sm leading-relaxed opacity-80" style={{ color: 'var(--ink)' }}>{desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Right image */}
          <FadeIn direction="right" className="lg:w-2/5 w-full flex flex-col self-stretch">
            <div
              className="relative w-full h-full flex-1 min-h-[380px] rounded overflow-hidden"
              style={{
                background: 'var(--surface-alt)',
                border: '1px solid var(--gold)',
                boxShadow: 'inset 0 0 0 1px var(--gold-light)',
              }}
            >
              <Image
                src="/images/Process.webp"
                alt="JB Timber Tech manufacturing process"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <PillarsGrid />

      {/* JB Timber Guild */}
      <section className="py-24 px-6" style={{ background: 'var(--surface-alt)' }}>
        <div className="max-w-[1240px] mx-auto">
          <SectionHeading
            eyebrow="JB Timber Guild"
            title="Empowering Wholesale Leaders & Inter-Company Trade"
            tagline="A collaborative B2B ecosystem built to drive high-margin supply chains and direct factory partnerships."
          />

          <FadeIn delay={120}>
            <p className="mt-6 text-base leading-relaxed max-w-2xl" style={{ color: 'var(--ink)' }}>
              The JB Timber Guild is our dedicated corporate network designed exclusively for wholesale
              distributors, timber merchants, and inter-company trading partners. We treat our business
              buyers not merely as accounts, but as long-term manufacturing partners backed by structural
              support, steady inventory, and transparent pricing.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
            {guildAdvantages.map(({ num, title, desc }, i) => (
              <FadeIn key={num} delay={i * 80}>
                <div
                  className="rounded p-6 flex gap-5"
                  style={{ background: 'var(--surface)', border: '1px solid var(--gold)' }}
                >
                  <span
                    className="font-display font-semibold text-2xl shrink-0"
                    style={{ color: 'var(--gold)' }}
                  >
                    {num}
                  </span>
                  <div>
                    <p className="font-semibold mb-1" style={{ color: 'var(--brown)' }}>{title}</p>
                    <p className="text-sm leading-relaxed opacity-80" style={{ color: 'var(--ink)' }}>{desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <LogoMarquee logos={clients} />
      <OwnersSection owners={owners} />
      <CtaBanner />
    </>
  );
}

