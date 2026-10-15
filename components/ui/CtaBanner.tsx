import Button from '@/components/ui/button';
import FadeIn from '@/components/ui/FadeIn';

type Props = {
  heading?: string;
  body?: string;
};

export default function CtaBanner({
  heading = "Let's build your next supply chain",
  body = 'Speak directly with the factory. Factory-direct rates, bulk allocations, and dedicated logistics across Southern India.',
}: Props) {
  return (
    <section className="py-24 px-6" style={{ background: 'var(--ink)' }}>
      <FadeIn>
        <div
          className="max-w-[1240px] mx-auto rounded p-12 flex flex-col md:flex-row items-center gap-8 justify-between"
          style={{
            border: '1px solid var(--gold)',
            boxShadow: 'inset 0 0 0 1px var(--gold-light)',
          }}
        >
          <div className="flex-1 min-w-0">
            <h2
              className="font-display font-semibold tracking-[0.04em] mb-3"
              style={{ fontSize: 'clamp(24px, 3.5vw, 40px)', color: 'var(--bg)' }}
            >
              {heading}
            </h2>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--surface-alt)' }}>
              {body}
            </p>
          </div>
          <Button variant="on-dark" href="/contact" className="shrink-0">
            Contact Us
          </Button>
        </div>
      </FadeIn>
    </section>
  );
}

