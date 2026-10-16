import Image from 'next/image';
import FadeIn from '@/components/ui/FadeIn';

type Props = {
  eyebrow?: string;
  title: string;
  tagline?: string;
  image?: string;
  imageAlt?: string;
  video?: string;
  videoPoster?: string;
  eyebrowColor?: string;
  titleColor?: string;
  taglineColor?: string;
};

export default function PageHero({
  eyebrow,
  title,
  tagline,
  image,
  imageAlt = '',
  video,
  videoPoster,
  eyebrowColor = 'var(--gold-text)',
  titleColor = 'var(--brown)',
  taglineColor = 'var(--gold-text)',
}: Props) {
  const hasMedia = Boolean(video || image);

  return (
    <section
      className="relative min-h-[60vh] flex items-center py-24 overflow-hidden"
      style={{ background: 'var(--bg)' }}
    >
      {/* Gold double frame container enclosing background media */}
      <div
        className="absolute inset-6 rounded overflow-hidden pointer-events-none z-10"
        style={{
          border: '1px solid var(--gold)',
          boxShadow: 'inset 0 0 0 1px var(--gold-light)',
        }}
      >
        {/* Media inside the gold double frame */}
        {video ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={videoPoster}
              className="w-full h-full object-cover"
              style={{ objectFit: 'cover' }}
            >
              <source src={video} type="video/mp4" />
            </video>
            {/* Gradient overlay for readability and brand tone */}
            {/* <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to right, rgba(245, 239, 224, 0.3) 0%, rgba(245, 239, 224, 0.3) 45%, rgba(245, 239, 224, 0.3) 100%)',
              }}
            /> */}
          </div>
        ) : image ? (
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <Image
              src={image}
              alt={imageAlt}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient overlay */}
            {/* <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to right, rgba(245, 239, 224, 0.94) 0%, rgba(245, 239, 224, 0.88) 45%, rgba(245, 239, 224, 0.65) 100%)',
              }}
            /> */}
          </div>
        ) : null}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-[1240px] mx-auto px-12 sm:px-16 w-full">
        <div className="max-w-3xl">
          {eyebrow && (
            <FadeIn>
              <p
                className="text-xs uppercase tracking-[0.18em] font-semibold mb-4"
                style={{ color: eyebrowColor }}
              >
                {eyebrow}
              </p>
            </FadeIn>
          )}
          <FadeIn delay={80}>
            <h1
              className="font-display font-semibold tracking-[0.04em] leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(36px, 5vw, 64px)', color: titleColor }}
            >
              {title}
            </h1>
          </FadeIn>
          {tagline && (
            <FadeIn delay={160}>
              <p
                className="font-accent italic leading-[1.3]"
                style={{ fontSize: 'clamp(20px, 2.4vw, 28px)', color: taglineColor }}
              >
                {tagline}
              </p>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}
