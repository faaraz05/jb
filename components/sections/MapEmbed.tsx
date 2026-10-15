import { SITE } from '@/data/site';
import FadeIn from '@/components/ui/FadeIn';

export default function MapEmbed() {
  if (!SITE.mapsEmbedUrl) {
    // Placeholder until client provides the embed URL
    return (
      <FadeIn>
        <div
          className="w-full rounded flex items-center justify-center"
          style={{
            minHeight: '420px',
            background: 'var(--surface)',
            border: '1px solid var(--gold)',
            boxShadow: 'inset 0 0 0 1px var(--gold-light)',
          }}
        >
          <p className="text-sm opacity-50" style={{ color: 'var(--brown)' }}>
            Map embed coming soon — address to be confirmed.
          </p>
        </div>
      </FadeIn>
    );
  }

  return (
    <FadeIn>
      <div
        className="rounded overflow-hidden"
        style={{
          border: '1px solid var(--gold)',
          boxShadow: 'inset 0 0 0 1px var(--gold-light)',
        }}
      >
        <iframe
          src={SITE.mapsEmbedUrl}
          className="w-full border-0"
          style={{ minHeight: '420px', display: 'block' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="JB Timber Tech location"
          aria-label="Google Map showing JB Timber Tech location"
        />
      </div>
    </FadeIn>
  );
}

