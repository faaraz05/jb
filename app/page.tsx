'use client';

import { useState } from 'react';
import Preloader, { INTRO_TOTAL_FRAMES, introFrameCache } from '@/components/intro/Preloader';
import ScrollIntro from '@/components/intro/ScrollIntro';
import HeroHome from '@/components/sections/HeroHome';
import LogoMarquee from '@/components/sections/LogoMarquee';
import WhoWeAre from '@/components/sections/WhoWeAre';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import Testimonials from '@/components/sections/Testimonials';
import OwnersSection from '@/components/sections/OwnersSection';
import { clients } from '@/data/clients';
import { owners } from '@/data/owners';

export default function HomePage() {
  const [introReady, setIntroReady] = useState(
    () => introFrameCache.length === INTRO_TOTAL_FRAMES && !!introFrameCache[0]?.complete
  );

  return (
    <>
      {/* ── Intro: preloader + scroll sequence ── */}
      <Preloader
        onFramesLoaded={() => setIntroReady(true)}
        onComplete={() => setIntroReady(true)}
      />
      <ScrollIntro ready={introReady} />

      {/* ── Existing site content (unchanged) ── */}
      <HeroHome />
      <LogoMarquee logos={clients} />
      <WhoWeAre />
      <FeaturedProducts />
      <Testimonials />
      <OwnersSection owners={owners} />
    </>
  );
}
