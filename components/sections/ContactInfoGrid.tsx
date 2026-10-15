import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { SITE } from '@/data/site';
import FadeIn from '@/components/ui/FadeIn';

const tiles = [
  {
    Icon: Mail,
    label: 'Email',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
  },
  {
    Icon: Phone,
    label: 'Contact Number',
    value: SITE.phone,
    href: `tel:${SITE.phone.replace(/\s/g, '')}`,
  },
  {
    Icon: MapPin,
    label: 'Address',
    value: SITE.address,
    href: undefined,
  },
  {
    Icon: Clock,
    label: 'Working Hours',
    value: SITE.workingHours,
    href: undefined,
  },
];

export default function ContactInfoGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {tiles.map(({ Icon, label, value, href }, i) => (
        <FadeIn key={label} delay={i * 80}>
          <div
            className="flex items-start gap-4 p-5 rounded"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--surface-alt)',
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ background: 'var(--surface-alt)' }}
              aria-hidden="true"
            >
              <Icon size={18} style={{ color: 'var(--gold)' }} />
            </div>
            <div className="min-w-0">
              <p
                className="text-xs uppercase tracking-[0.14em] font-semibold mb-1"
                style={{ color: 'var(--gold-text)' }}
              >
                {label}
              </p>
              {href ? (
                <a
                  href={href}
                  className="text-sm break-words hover:underline"
                  style={{ color: 'var(--ink)' }}
                >
                  {value}
                </a>
              ) : (
                <p className="text-sm break-words" style={{ color: 'var(--ink)' }}>
                  {value}
                </p>
              )}
            </div>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

