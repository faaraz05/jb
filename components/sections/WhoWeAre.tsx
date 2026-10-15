import Image from 'next/image';
import { Factory, Layers, Truck } from 'lucide-react';
import FadeIn from '@/components/ui/FadeIn';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/button';

const pillars = [
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

export default function WhoWeAre() {
  return (
    <section className="relative py-24 px-6 overflow-hidden" style={{ background: 'var(--bg)' }}>
      <div className="relative z-10 max-w-[1240px] mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-16">
          {/* Left — image */}
          <FadeIn direction="left" className="lg:w-[45%] w-full shrink-0">
            <div
              className="relative rounded overflow-hidden aspect-[4/3] rounded-lg"
              style={{
                border: '1px solid var(--gold)',
                boxShadow: 'inset 0 0 0 1px var(--gold-light)',
              }}
            >
              <Image
                src="/images/Modern Wood Sample Showroom.png"
                alt="JB Timber Tech manufacturing facility"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </FadeIn>

          {/* Right — text */}
          <div className="flex flex-col gap-6 lg:w-[55%]">
            <SectionHeading
              eyebrow="Who We Are"
              title="Direct Manufacturer Precision, Built for Scale and Distinction"
            />

            <FadeIn delay={100}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--ink)' }}>
                At JB Timber Tech Solutions, we engineer timber panels that set the industry standard
                for durability, surface perfection, and structural endurance. Serving wholesale
                distributors, regional timber stockists, and interstate corporate supply chains, we
                operate with a clear mandate: delivering factory-direct manufacturing consistency with
                the aesthetic refinement of luxury woodcraft.
              </p>
            </FadeIn>

            <FadeIn delay={160}>
              <p className="text-base leading-relaxed" style={{ color: 'var(--ink)' }}>
                We do not just supply sheets; we power wholesale distribution networks and
                enterprise-scale projects across Southern India with dependable volume, ex-factory
                rates, and unwavering structural reliability.
              </p>
            </FadeIn>

            {/* Pillars */}
            <div className="flex flex-col gap-4 mt-2">
              {pillars.map(({ Icon, title, desc }, i) => (
                <FadeIn key={title} delay={200 + i * 80}>
                  <div className="flex items-start gap-4">
                    <div
                      className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-0.5"
                      style={{ background: 'var(--surface-alt)' }}
                      aria-hidden="true"
                    >
                      <Icon size={18} style={{ color: 'var(--gold)' }} />
                    </div>
                    <div>
                      <p className="font-semibold text-sm mb-0.5" style={{ color: 'var(--brown)' }}>{title}</p>
                      <p className="text-sm leading-relaxed opacity-80" style={{ color: 'var(--ink)' }}>{desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={440}>
              <Button href="/about" variant="secondary" className="self-start mt-2">
                Learn More
              </Button>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

