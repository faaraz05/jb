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
  TOTAL_FRAMES,
  frameSrc,
  preloadedImagesCache,
} from '@/components/Preloader';

const FRAME_BG = '#F0EDDA';
const ASPECT_RATIO = 16 / 9;
const SCALE = 0.7; // 30% reduction in visible image dimensions (70% size)

interface ScrollSequenceProps {
  images?: HTMLImageElement[] | null;
  isReady?: boolean;
}

export default function ScrollSequence({ images, isReady = true }: ScrollSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const internalImagesRef = useRef<HTMLImageElement[]>([]);
  const lastDrawnIndexRef = useRef<number>(-1);
  const rafIdRef = useRef<number | null>(null);
  const [imagesAvailable, setImagesAvailable] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  // Scroll mapping: maps scroll progress 0→0.85 to frames 0→TOTAL_FRAMES-1, holding the last frame until 1.0
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  const frameMotionValue = useTransform(
    smoothProgress,
    [0, 0.85, 1],
    [0, TOTAL_FRAMES - 1, TOTAL_FRAMES - 1]
  );

  // Draw a specific frame to canvas
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    const activeList =
      internalImagesRef.current.length === TOTAL_FRAMES
        ? internalImagesRef.current
        : preloadedImagesCache;

    const img = activeList[index];
    if (!img || !img.complete) return;

    ctx.save();
    ctx.scale(dpr, dpr);

    // Letterbox background fill
    ctx.fillStyle = FRAME_BG;
    ctx.fillRect(0, 0, width, height);

    // Contain-fit calculation with 30% size reduction (70% scale)
    const canvasRatio = width / height;
    let drawW: number;
    let drawH: number;

    if (canvasRatio > ASPECT_RATIO) {
      drawH = height * SCALE;
      drawW = drawH * ASPECT_RATIO;
    } else {
      drawW = width * SCALE;
      drawH = drawW / ASPECT_RATIO;
    }

    // Perfectly centered horizontally and vertically
    const drawX = (width - drawW) / 2;
    const drawY = (height - drawH) / 2;

    // Draw the frame
    ctx.drawImage(img, drawX, drawY, drawW, drawH);

    // Feather over the sparkle watermark in the bottom-right corner (approx x: 88-93%, y: 80-87%)
    const cx = drawX + drawW * 0.905;
    const cy = drawY + drawH * 0.835;
    const radius = Math.max(drawW * 0.05, 20);

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    grad.addColorStop(0, FRAME_BG);
    grad.addColorStop(0.65, FRAME_BG);
    grad.addColorStop(1, 'rgba(240, 237, 218, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
    lastDrawnIndexRef.current = index;
  }, []);

  // Request Animation Frame wrapper
  const requestFrameDraw = useCallback(
    (targetIndex: number) => {
      const clamped = Math.max(0, Math.min(TOTAL_FRAMES - 1, targetIndex));
      if (clamped === lastDrawnIndexRef.current) return;

      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      rafIdRef.current = requestAnimationFrame(() => {
        drawFrame(clamped);
      });
    },
    [drawFrame]
  );

  // Resize canvas to match display size * DPR
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || window.innerWidth;
    const h = rect.height || window.innerHeight;

    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);

    const currentIndex =
      lastDrawnIndexRef.current >= 0 ? lastDrawnIndexRef.current : 0;
    drawFrame(currentIndex);
  }, [drawFrame]);

  // Initialize and track images
  useEffect(() => {
    if (images && images.length === TOTAL_FRAMES) {
      internalImagesRef.current = images;
      setImagesAvailable(true);
    } else if (preloadedImagesCache.length === TOTAL_FRAMES) {
      internalImagesRef.current = preloadedImagesCache;
      setImagesAvailable(true);
    } else {
      // Lazy fallback if rendered before preloader finishes
      const list: HTMLImageElement[] = [];
      let loaded = 0;
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const img = new window.Image();
        img.src = frameSrc(i);
        img.onload = () => {
          loaded++;
          if (loaded >= TOTAL_FRAMES) {
            internalImagesRef.current = list;
            setImagesAvailable(true);
          }
        };
        list.push(img);
      }
    }
  }, [images]);

  // Setup canvas size and window resize listener
  useEffect(() => {
    resizeCanvas();

    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(resizeCanvas, 80);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [resizeCanvas]);

  // Draw initial frame once images are available
  useEffect(() => {
    if (imagesAvailable && isReady) {
      if (prefersReducedMotion) {
        drawFrame(TOTAL_FRAMES - 1);
      } else {
        drawFrame(0);
      }
    }
  }, [imagesAvailable, isReady, prefersReducedMotion, drawFrame]);

  // Subscribe to scroll-smoothed motion changes
  useMotionValueEvent(frameMotionValue, 'change', (latest) => {
    if (prefersReducedMotion || !imagesAvailable) return;
    const target = Math.round(latest);
    requestFrameDraw(target);
  });

  return (
    <section
      ref={containerRef}
      className={`relative w-full ${
        prefersReducedMotion
          ? 'min-h-screen h-auto'
          : 'h-[300vh] sm:h-[350vh] lg:h-[400vh]'
      }`}
      style={{ background: FRAME_BG }}
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Fullscreen Canvas */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full block select-none pointer-events-none"
        />

        {/* Brand logo in bottom-right corner */}
        <div
          className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8 z-20 flex items-center gap-2 sm:gap-2.5 pointer-events-none select-none"
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

        {/* 160px vertical gradient at the bottom blending into the site's cream (#F5EFE0) */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-[160px] z-30"
          style={{
            background:
              'linear-gradient(to bottom, rgba(240, 237, 218, 0) 0%, var(--bg, #F5EFE0) 100%)',
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
