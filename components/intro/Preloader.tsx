'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Frame Constants ──────────────────────────────────────────── */
export const INTRO_TOTAL_FRAMES = 120;

export const introFrameSrc = (i: number) =>
  `/frames/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`;

/** Shared in-memory cache so ScrollIntro can access loaded images. */
export const introFrameCache: HTMLImageElement[] = [];

/* ── Props ────────────────────────────────────────────────────── */
interface PreloaderProps {
  onComplete: () => void;
  onFramesLoaded?: () => void;
}

/* ── Component ────────────────────────────────────────────────── */
export default function Preloader({ onComplete, onFramesLoaded }: PreloaderProps) {
  const isAlreadyLoaded =
    introFrameCache.length === INTRO_TOTAL_FRAMES && !!introFrameCache[0]?.complete;

  const [progress, setProgress] = useState(isAlreadyLoaded ? 100 : 0);
  const [done, setDone] = useState(isAlreadyLoaded);
  const hasFinishedRef = useRef(isAlreadyLoaded);

  useEffect(() => {
    // If frames are already in memory (e.g. returning to homepage), never lock scroll or block
    if (isAlreadyLoaded) {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (onFramesLoaded) onFramesLoaded();
      onComplete();
      return;
    }

    // Lock body scroll only while loading initial frames
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    let loadedCount = 0;
    const images: (HTMLImageElement | null)[] = new Array(INTRO_TOTAL_FRAMES).fill(null);

    const markLoaded = (index: number, img: HTMLImageElement) => {
      if (images[index]) return; // already counted
      images[index] = img;
      loadedCount++;
      setProgress(Math.min(100, Math.round((loadedCount / INTRO_TOTAL_FRAMES) * 100)));

      if (loadedCount >= INTRO_TOTAL_FRAMES && !hasFinishedRef.current) {
        hasFinishedRef.current = true;
        // Fill any gaps (failed frames) with the nearest previous frame
        for (let j = 0; j < INTRO_TOTAL_FRAMES; j++) {
          if (!images[j]) {
            images[j] = j > 0 ? images[j - 1] : images[0];
          }
          introFrameCache[j] = images[j] as HTMLImageElement;
        }

        // Notify ScrollIntro to draw Frame 0 NOW under the preloader before fade begins
        if (onFramesLoaded) {
          onFramesLoaded();
        }

        // Elegant pause at 100% so user sees completion before the smooth dissolve begins
        setTimeout(() => setDone(true), 350);
      }
    };

    for (let i = 0; i < INTRO_TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = introFrameSrc(i);

      if (typeof img.decode === 'function') {
        img
          .decode()
          .then(() => markLoaded(i, img))
          .catch(() => {
            if (img.complete && img.naturalWidth > 0) {
              markLoaded(i, img);
            } else {
              console.warn(`[Preloader] Frame ${i + 1} fallback.`);
              markLoaded(i, img);
            }
          });
      } else {
        img.onload = () => markLoaded(i, img);
        img.onerror = () => {
          console.warn(`[Preloader] Frame ${i + 1} failed.`);
          markLoaded(i, img);
        };
      }
    }

    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, [isAlreadyLoaded, onComplete, onFramesLoaded]);

  /* When done flag is set and exit animation completes → unlock scroll */
  const handleExitComplete = () => {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    onComplete();
  };

  // If already loaded before mounting, don't render preloader overlay at all
  if (isAlreadyLoaded) return null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!done && (
        <motion.div
          key="intro-preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="intro-preloader"
          style={{ pointerEvents: done ? 'none' : 'auto' }}
        >
          {/* Inner content with soft upward fade on exit */}
          <motion.div
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="intro-preloader__inner"
          >
            {/* Golden tree logo */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="intro-preloader__logo"
            >
              <Image
                src="/jb_golden_tree.svg"
                alt="JB Timber Tech Logo"
                fill
                priority
                className="object-contain"
              />
            </motion.div>

            {/* Brand name */}
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.45 }}
              className="intro-preloader__brand"
            >
              JB TIMBER TECH
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.22, duration: 0.45 }}
              className="intro-preloader__sub"
            >
              Solutions
            </motion.p>

            {/* Thin gold progress bar */}
            <div className="intro-preloader__bar-track">
              <div
                className="intro-preloader__bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Status text */}
            <div className="intro-preloader__status">
              <span className="intro-preloader__status-label">
                Preparing the grain…
              </span>
              <span className="intro-preloader__status-pct">
                {progress}%
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
