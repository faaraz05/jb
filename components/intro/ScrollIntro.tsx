'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import {
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion';
import {
  INTRO_TOTAL_FRAMES,
  introFrameCache,
} from '@/components/intro/Preloader';

/* ── Constants ────────────────────────────────────────────────── */
const FRAME_BG = '#F0EDDA';
const ASPECT = 16 / 9;
const SCALE = 0.7; // 30% reduction in visible image dimensions (70% size)

/* ── Props ────────────────────────────────────────────────────── */
interface ScrollIntroProps {
  ready?: boolean;
}

/* ── Component ────────────────────────────────────────────────── */
export default function ScrollIntro({ ready }: ScrollIntroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lastIndexRef = useRef(-1);
  const rafRef = useRef<number | null>(null);

  // Initialize immediately to true if frames are already cached in memory
  const [imagesOk, setImagesOk] = useState(
    () => introFrameCache.length === INTRO_TOTAL_FRAMES && !!introFrameCache[0]?.complete
  );

  const prefersReducedMotion = useReducedMotion();

  /* ── Scroll tracking ───────────────────────────────────────── */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  // Map 0→0.85 of scroll to frames 0→119, then hold frame 119 from 0.85→1
  const frameIndex = useTransform(
    smoothProgress,
    [0, 0.85, 1],
    [0, INTRO_TOTAL_FRAMES - 1, INTRO_TOTAL_FRAMES - 1]
  );

  /* ── Drawing helpers ───────────────────────────────────────── */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;

    if (w <= 0 || h <= 0) return;

    const img = introFrameCache[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    ctx.save();
    ctx.scale(dpr, dpr);

    // Fill letterbox
    ctx.fillStyle = FRAME_BG;
    ctx.fillRect(0, 0, w, h);

    // Contain-fit calculation with 30% size reduction (70% scale)
    const canvasAspect = w / h;
    let dw: number;
    let dh: number;

    if (canvasAspect > ASPECT) {
      dh = h * SCALE;
      dw = dh * ASPECT;
    } else {
      dw = w * SCALE;
      dh = dw / ASPECT;
    }

    // Perfectly centered horizontally and vertically
    const dx = (w - dw) / 2;
    const dy = (h - dh) / 2;

    ctx.drawImage(img, dx, dy, dw, dh);

    // Feather over bottom-right watermark (x ~90.5%, y ~83.5% of rendered frame)
    const cx = dx + dw * 0.905;
    const cy = dy + dh * 0.835;
    const r = Math.max(dw * 0.05, 20);
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0, FRAME_BG);
    grad.addColorStop(0.6, FRAME_BG);
    grad.addColorStop(1, 'rgba(240, 237, 218, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
    lastIndexRef.current = index;
  }, []);

  const scheduleFrame = useCallback(
    (target: number) => {
      const clamped = Math.max(0, Math.min(INTRO_TOTAL_FRAMES - 1, target));
      if (clamped === lastIndexRef.current) return;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => drawFrame(clamped));
    },
    [drawFrame]
  );

  /* ── Resize canvas ─────────────────────────────────────────── */
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || window.innerWidth;
    const h = rect.height || window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);

    const current = frameIndex.get();
    const target = Number.isFinite(current) ? Math.round(current) : 0;
    drawFrame(lastIndexRef.current >= 0 ? lastIndexRef.current : target);
  }, [drawFrame, frameIndex]);

  /* ── Detect when images are available ──────────────────────── */
  useEffect(() => {
    if (ready || (introFrameCache.length === INTRO_TOTAL_FRAMES && introFrameCache[0]?.complete)) {
      setImagesOk(true);
    }
  }, [ready]);

  /* ── Canvas setup & resize listener ────────────────────────── */
  useEffect(() => {
    resizeCanvas();
    let tid: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(tid);
      tid = setTimeout(resizeCanvas, 80);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('resize', onResize);
      clearTimeout(tid);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [resizeCanvas]);

  /* ── Draw initial / current frame on mount and when images are ready ── */
  useEffect(() => {
    if (!imagesOk) return;
    if (prefersReducedMotion) {
      drawFrame(INTRO_TOTAL_FRAMES - 1);
    } else {
      const current = frameIndex.get();
      const target = Number.isFinite(current) ? Math.round(current) : 0;
      drawFrame(target);
    }
  }, [imagesOk, prefersReducedMotion, drawFrame, frameIndex]);

  /* ── Scroll-driven frame updates ───────────────────────────── */
  useMotionValueEvent(frameIndex, 'change', (v) => {
    if (prefersReducedMotion || !imagesOk) return;
    scheduleFrame(Math.round(v));
  });

  /* ── Render ────────────────────────────────────────────────── */
  return (
    <section
      ref={containerRef}
      className={
        prefersReducedMotion
          ? 'intro-container intro-container--static'
          : 'intro-container'
      }
      style={{ background: FRAME_BG }}
    >
      {/* Sticky viewport */}
      <div className="intro-sticky">
        {/* Canvas with smooth reveal fade */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="intro-canvas transition-opacity duration-700 ease-out"
          style={{ opacity: imagesOk ? 1 : 0 }}
        />

        {/* Brand logo in bottom-right corner with smooth reveal fade */}
        <div
          className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-20 flex items-center gap-2 sm:gap-2.5 pointer-events-none select-none transition-opacity duration-700 ease-out"
          style={{ opacity: imagesOk ? 0.9 : 0 }}
          aria-hidden="true"
        >
          <Image
            src="/jb_golden_tree.svg"
            alt="JB Timber Tech Logo"
            width={28}
            height={28}
            className="w-6 h-6 sm:w-7 sm:h-7 object-contain opacity-90"
          />
          <div className="flex flex-col">
            <span
              className="font-display font-semibold tracking-[0.14em] text-[11px] sm:text-xs leading-none"
              style={{ color: 'var(--brown, #5A3E26)' }}
            >
              JB TIMBER TECH
            </span>
            <span
              className="font-sans text-[8px] sm:text-[9px] uppercase tracking-[0.24em] leading-tight opacity-75 mt-0.5"
              style={{ color: 'var(--gold-text, #7A5A1E)' }}
            >
              Solutions
            </span>
          </div>
        </div>

        {/* Bottom gradient blending into existing --bg (#F5EFE0) */}
        <div className="intro-bottom-fade" aria-hidden="true" />
      </div>
    </section>
  );
}
