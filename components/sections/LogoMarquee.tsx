import Image from 'next/image';
import type { Client } from '@/data/clients';
import FadeIn from '@/components/ui/FadeIn';

type Props = {
  logos: Client[];
  eyebrow?: string;
};

export default function LogoMarquee({
  logos,
}: Props) {
  // Replicate logos 4 times per set (24 logos per half), comfortably exceeding any screen width up to 4K displays
  const REPEAT_COUNT = 4;
  const singleSet = Array.from({ length: REPEAT_COUNT }, () => logos).flat();
  // Duplicate for seamless 50% infinite CSS marquee animation
  const fullTrack = [...singleSet, ...singleSet];

  return (
    <section
      className="py-12 px-4 overflow-hidden"
      style={{
        background: 'var(--surface)',
        borderTop: '1px solid var(--surface-alt)',
        borderBottom: '1px solid var(--surface-alt)',
      }}
    >
      {/* <FadeIn>
        <p
          className="text-xs uppercase tracking-[0.18em] font-semibold text-center mb-8"
          style={{ color: 'var(--gold-text)' }}
        >
          {eyebrow}
        </p>
      </FadeIn> */}

      <div
        className="marquee overflow-hidden w-full relative"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        }}
        aria-label="Partner and certification logos"
      >
        <div className="marquee-track flex gap-12 sm:gap-16 items-center">
          {fullTrack.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="shrink-0 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300 flex items-center justify-center px-2"
              aria-label={logo.name}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={130}
                height={50}
                className="object-contain h-10 w-auto max-w-[130px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
