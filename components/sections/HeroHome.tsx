'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/button';
import FadeIn from '@/components/ui/FadeIn';
import TiltedCard from '@/components/ui/TiltedCard';
import { ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export default function HeroHome() {
  const containerRef = useRef<HTMLElement>(null);

  // Track the entry of HeroHome as it reaches the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.35,
  });

  // Dramatic, seamless slide up into the whole viewport
  const y = useTransform(smoothProgress, [0, 1], ['45vh', '0vh']);
  const opacity = useTransform(smoothProgress, [0, 0.35, 1], [0.25, 0.85, 1]);
  const scale = useTransform(smoothProgress, [0, 1], [0.95, 1]);

  return (
    <motion.section
      ref={containerRef}
      id="hero"
      style={{ y, opacity, scale, background: 'var(--bg)' }}
      className="relative z-20 min-h-screen flex items-center py-16 px-6 shadow-[0_-24px_48px_-12px_rgba(43,29,16,0.15)] origin-bottom"
    >
      {/* Gold double frame */}
      <div
        className="absolute inset-6 rounded pointer-events-none"
        style={{
          border: '1px solid var(--gold)',
          boxShadow: 'inset 0 0 0 1px var(--gold-light)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-[1240px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 p-8">
          {/* Text — 55% */}
          <div className="lg:w-[55%]">
            <FadeIn>
              <p
                className="text-xs uppercase tracking-[0.18em] font-semibold mb-6"
                style={{ color: 'var(--gold-text)' }}
              >
                JB Timber Tech Solutions
              </p>
            </FadeIn>

            <FadeIn delay={100}>
              <h1
                className="font-display font-semibold tracking-[0.04em] leading-[1.05] mb-6"
                style={{
                  fontSize: 'clamp(38px, 6vw, 80px)',
                  color: 'var(--brown)',
                }}
              >
                Engineered from Strength.{' '}
                <span
                  style={{
                    background: 'var(--gold-foil)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    /* Solid fallback */
                    color: 'var(--gold-text)',
                  }}
                >
                  Rooted in Luxury.
                </span>
              </h1>
            </FadeIn>

            <FadeIn delay={200}>
              <p
                className="text-lg leading-relaxed mb-8 max-w-[500px]"
                style={{ color: 'var(--ink)' }}
              >
                Factory-direct plywood for wholesale distributors across Tamil Nadu and Kerala.
              </p>
            </FadeIn>

            <FadeIn delay={280}>
              <div className="flex flex-wrap gap-4">
                <Button href="/products" variant="primary">
                  View Products <ArrowRight size={16} aria-hidden="true" />
                </Button>
                <Button href="/contact" variant="secondary">
                  Contact Us
                </Button>
              </div>
            </FadeIn>
          </div>

          {/* Media — 45% */}
          <FadeIn delay={160} direction="right" className="lg:w-[45%] w-full flex justify-center">
            <TiltedCard
              imageSrc="/hero/jb_timber_tech_solutions.svg"
              altText="JB Timber Tech Solutions — Engineered for Nature"
              captionText="JB Timber Tech · Engineered from Nature"
              containerHeight="auto"
              containerWidth="100%"
              imageHeight="auto"
              imageWidth="100%"
              rotateAmplitude={12}
              scaleOnHover={1.03}
              showMobileWarning={false}
              showTooltip={true}
            >
              <div
                className="relative rounded-lg overflow-hidden w-full"
                style={{
                  border: '1px solid var(--gold)',
                  boxShadow: 'inset 0 0 0 1px var(--gold-light), 0 16px 36px -12px rgba(43,29,16,.35)',
                }}
              >
                {/* Video with reduced-motion fallback */}
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="/hero/jb_timber_tech_solutions.svg"
                  className="w-full rounded-lg"
                  style={{ display: 'block' }}
                >
                  <source src="/hero/plywood-making.webm" type="video/webm" />
                  <source src="/hero/plywood-making.mp4" type="video/mp4" />
                </video>
              </div>
            </TiltedCard>
          </FadeIn>
        </div>
      </div>
    </motion.section>
  );
}

