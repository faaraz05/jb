import FadeIn from '@/components/ui/FadeIn';

type Props = {
  eyebrow?: string;
  title: string;
  tagline?: string;
  centered?: boolean;
  dark?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  tagline,
  centered = false,
  dark = false,
}: Props) {
  const align = centered ? 'text-center items-center' : 'items-start';

  return (
    <div className={`flex flex-col gap-3 ${align}`}>
      {eyebrow && (
        <FadeIn>
          <p
            className="text-xs uppercase tracking-[0.18em] font-semibold"
            style={{ color: dark ? 'var(--gold-light)' : 'var(--gold-text)' }}
          >
            {eyebrow}
          </p>
        </FadeIn>
      )}
      <FadeIn delay={80}>
        <h2
          className="font-display font-semibold leading-[1.15] tracking-[0.04em]"
          style={{
            fontSize: 'clamp(28px, 4vw, 44px)',
            color: dark ? 'var(--bg)' : 'var(--brown)',
          }}
        >
          {title}
        </h2>
      </FadeIn>
      {tagline && (
        <FadeIn delay={160}>
          <p
            className="font-accent italic leading-[1.3]"
            style={{
              fontSize: 'clamp(20px, 2.4vw, 28px)',
              color: dark ? 'var(--gold-light)' : 'var(--gold-text)',
            }}
          >
            {tagline}
          </p>
        </FadeIn>
      )}
    </div>
  );
}

