import Image from 'next/image';
import type { Owner } from '@/data/owners';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeIn from '@/components/ui/FadeIn';

type Props = {
  owners: Owner[];
};

function OwnerCard({ owner }: { owner: Owner }) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      {/* Portrait */}
      <div
        className="relative overflow-hidden rounded"
        style={{
          width: '200px',
          height: '250px',
          border: '1px solid var(--gold)',
          boxShadow: 'inset 0 0 0 1px var(--gold-light)',
        }}
      >
        <Image
          src={owner.image}
          alt={owner.name}
          fill
          className="object-cover"
          sizes="200px"
        />
      </div>

      <div>
        <h3
          className="font-display font-semibold tracking-[0.04em]"
          style={{ fontSize: '20px', color: 'var(--brown)' }}
        >
          {owner.name}
        </h3>
        <p
          className="text-xs uppercase tracking-[0.12em] font-semibold mt-1"
          style={{ color: 'var(--gold-text)' }}
        >
          {owner.designation}
        </p>
        {owner.bio && (
          <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--ink)', opacity: 0.75 }}>
            {owner.bio}
          </p>
        )}
      </div>
    </div>
  );
}

export default function OwnersSection({ owners }: Props) {
  return (
    <section className="py-24 px-6" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1240px] mx-auto flex flex-col gap-12 items-center">
        <SectionHeading
          eyebrow="Leadership"
          title="Meet the Leadership"
          centered
        />

        <div className="flex flex-col sm:flex-row gap-16 justify-center">
          {owners.map((owner, i) => (
            <FadeIn key={owner.id ?? `${owner.name}-${i}`} delay={i * 120}>
              <OwnerCard owner={owner} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

