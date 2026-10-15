import { Cpu, Leaf, Users, BadgeCheck } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeIn from '@/components/ui/FadeIn';

const pillars = [
  {
    Icon: Cpu,
    title: 'Innovation',
    desc: 'Balanced core assemblies and advanced MUF, Melamine and Phenol resins, pressed under high-pressure thermal presses.',
    iconBg: 'var(--gold)',
    iconColor: 'var(--ink)',
  },
  {
    Icon: Leaf,
    title: 'Sustainability',
    desc: 'Responsibly sourced hardwood and fast-growing eucalyptus cores, with efficient use of every log.',
    iconBg: 'var(--sage)',
    iconColor: 'var(--bg)',
  },
  {
    Icon: Users,
    title: 'Community',
    desc: 'The JB Timber Guild: long-term partnerships with wholesalers and merchants across Southern India.',
    iconBg: 'var(--brown)',
    iconColor: 'var(--bg)',
  },
  {
    Icon: BadgeCheck,
    title: 'Certifications',
    desc: 'ISI-grade verification, test certificates and batch documentation with every supply contract.',
    iconBg: 'var(--gold)',
    iconColor: 'var(--ink)',
  },
];

export default function PillarsGrid() {
  return (
    <section className="py-24 px-6" style={{ background: 'var(--surface)' }}>
      <div className="max-w-[1240px] mx-auto flex flex-col gap-12">
        <SectionHeading
          eyebrow="Our 4 Strong Pillars"
          title="What We Stand For"
          centered
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map(({ Icon, title, desc, iconBg, iconColor }, i) => (
            <FadeIn key={title} delay={i * 80}>
              <div
                className="rounded p-8 flex flex-col gap-5 h-full"
                style={{
                  background: 'var(--surface)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: iconBg }}
                  aria-hidden="true"
                >
                  <Icon size={22} style={{ color: iconColor }} />
                </div>
                <div>
                  <h3
                    className="font-display font-semibold tracking-[0.04em] mb-2"
                    style={{ fontSize: '18px', color: 'var(--brown)' }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--ink)', opacity: 0.8 }}>
                    {desc}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

