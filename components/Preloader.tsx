'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export const TOTAL_FRAMES = 50;
export const frameSrc = (i: number) =>
  `/frames/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`;

// Global in-memory cache so frames are retained across components
export const preloadedImagesCache: HTMLImageElement[] = [];

interface PreloaderProps {
  onComplete?: (images: HTMLImageElement[]) => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const loadedImagesRef = useRef<HTMLImageElement[]>(new Array(TOTAL_FRAMES));
  const hasFinishedRef = useRef(false);

  useEffect(() => {
    // Lock body scroll during preloading
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // If already preloaded into memory, finish immediately
    if (preloadedImagesCache.length === TOTAL_FRAMES && preloadedImagesCache[0]?.complete) {
      setProgress(100);
      setIsCompleted(true);
      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;
      };
    }

    let loadedCount = 0;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);

    const markLoaded = (index: number, img: HTMLImageElement) => {
      if (!images[index]) {
        images[index] = img;
        loadedCount++;
        const pct = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));
        setProgress(pct);

        if (loadedCount >= TOTAL_FRAMES && !hasFinishedRef.current) {
          hasFinishedRef.current = true;
          // Gracefully fill any gaps with adjacent frames
          for (let i = 0; i < TOTAL_FRAMES; i++) {
            if (!images[i]) {
              images[i] = images[i - 1] || images[0];
            }
            preloadedImagesCache[i] = images[i];
          }
          loadedImagesRef.current = images;

          // Brief moment at 100% for smooth visual transition
          setTimeout(() => {
            setIsCompleted(true);
          }, 250);
        }
      }
    };

    // Preload all 50 frames
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = frameSrc(i);

      if (typeof img.decode === 'function') {
        img
          .decode()
          .then(() => markLoaded(i, img))
          .catch(() => {
            // Fallback if decode rejects (network glitch or partial decode)
            if (img.complete && img.naturalWidth > 0) {
              markLoaded(i, img);
            } else {
              img.onload = () => markLoaded(i, img);
              img.onerror = () => {
                // Graceful fallback: reuse previous frame
                console.warn(`Frame ${i + 1} skipped on error.`);
                markLoaded(i, img);
              };
            }
          });
      } else {
        const fallbackImg = img as HTMLImageElement;
        fallbackImg.onload = () => markLoaded(i, fallbackImg);
        fallbackImg.onerror = () => markLoaded(i, fallbackImg);
      }
    }

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, []);

  const handleAnimationComplete = () => {
    // Unlock body scroll once fade-out completes
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
    setIsVisible(false);
    if (onComplete) {
      onComplete(loadedImagesRef.current);
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence onExitComplete={handleAnimationComplete}>
      {!isCompleted && (
        <motion.div
          key="preloader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 select-none"
          style={{ background: '#F0EDDA' }}
        >
          <div className="flex flex-col items-center text-center max-w-sm w-full">
            {/* Golden tree logo */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-16 h-16 sm:w-20 sm:h-20 mb-5"
            >
              <Image
                src="/jb_golden_tree.svg"
                alt="JB Timber Tech Logo"
                fill
                priority
                className="object-contain"
              />
            </motion.div>

            {/* Brand Title */}
            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="font-display font-semibold tracking-[0.2em] text-sm sm:text-base mb-1"
              style={{ color: 'var(--brown, #5A3E26)' }}
            >
              JB TIMBER TECH
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="text-[11px] uppercase tracking-[0.28em] font-sans mb-8"
              style={{ color: 'var(--gold-text, #7A5A1E)' }}
            >
              Solutions
            </motion.p>

            {/* Thin gold progress bar */}
            <div
              className="w-52 sm:w-64 h-[2.5px] rounded-full overflow-hidden mb-3 relative"
              style={{ background: 'rgba(184, 137, 58, 0.2)' }}
            >
              <div
                className="h-full rounded-full transition-all duration-150 ease-out"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #8A6428, #D9B66A 50%, #B8893A)',
                }}
              />
            </div>

            {/* Status & Counter */}
            <div className="flex items-center justify-between w-52 sm:w-64 text-xs font-sans tracking-wide">
              <span style={{ color: 'var(--brown, #5A3E26)', opacity: 0.75 }}>
                Preparing the grain...
              </span>
              <span
                className="font-medium tabular-nums"
                style={{ color: 'var(--gold-text, #7A5A1E)' }}
              >
                {progress}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
