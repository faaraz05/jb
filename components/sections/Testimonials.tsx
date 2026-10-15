import { testimonials } from '@/data/testimonials';
import SectionHeading from '@/components/ui/SectionHeading';
import FadeIn from '@/components/ui/FadeIn';

export default function Testimonials() {
  return (
    <section className="py-24 px-6" style={{ background: 'var(--bg)' }}>
      <div className="max-w-[1240px] mx-auto flex flex-col gap-12">
        <SectionHeading
          eyebrow="Partner Feedback"
          title="What Our Partners Say"
          centered
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <FadeIn key={i} delay={i * 80}>
              <article
                className="rounded flex flex-col gap-4 p-8 h-full"
                style={{
                  background: 'var(--surface)',
                  borderTop: '3px solid var(--gold)',
                }}
              >
                <blockquote
                  className="font-accent italic leading-[1.5] flex-1"
                  style={{ fontSize: '21px', color: 'var(--ink)' }}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <footer>
                  <p className="font-semibold text-sm" style={{ color: 'var(--brown)' }}>{t.name}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--gold-text)' }}>
                    {t.company} · {t.location}
                  </p>
                </footer>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

