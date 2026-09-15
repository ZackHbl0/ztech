'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';

export function LoadingScreen() {
  const { isLoading, setIsLoading } = useUIStore();
  const [shouldShow, setShouldShow] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if we've already shown the intro in this session
    const hasSeenIntro = sessionStorage.getItem('ztech_intro_seen');
    
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeenIntro || prefersReducedMotion) {
      setIsLoading(false);
      setShouldShow(false);
    } else {
      setShouldShow(true);
      // Timeline is roughly 4.5 - 5 seconds
      // Then it triggers the exit transition
      const timer = setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem('ztech_intro_seen', 'true');
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [setIsLoading]);

  // Don't render anything on the server to prevent hydration mismatches
  if (!mounted) return null;
  // If we shouldn't show it, don't render it
  if (!shouldShow && !isLoading) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          // Exit animation: the black curtain splits or scales up to reveal the site seamlessly
          exit={{ 
            opacity: 0,
            scale: 1.05,
            filter: 'blur(10px)',
            transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden pointer-events-none"
        >
          {/* Phase 01: Architectural Grid Lines */}
          <div className="absolute inset-0 z-0">
            {/* Horizontal Line */}
            <motion.div 
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.2 }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="absolute top-1/2 left-0 right-0 h-[1px] bg-white origin-left"
            />
            {/* Vertical Line */}
            <motion.div 
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ scaleY: 1, opacity: 0.2 }}
              transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
              className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-white origin-top"
            />
            {/* Corner Markers */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="absolute inset-8 border border-white/10"
            >
              <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white" />
              <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-white" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-white" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white" />
            </motion.div>
          </div>

          {/* Phase 02 & 03: Typography Reveal */}
          <div className="relative z-10 flex flex-col items-center">
            {/* ZTECH Wordmark */}
            <div className="overflow-hidden relative pb-2">
              <motion.div
                initial={{ y: '100%', rotate: 2 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.16, 1, 0.3, 1], // Custom sophisticated easing
                  delay: 1.5 
                }}
                className="flex items-center gap-1 md:gap-2"
              >
                <span className="text-6xl md:text-[8rem] font-heading font-black tracking-tighter text-white">
                  ZTECH
                </span>
                <span className="text-blue-500 text-6xl md:text-[8rem] font-heading font-black">.</span>
              </motion.div>

              {/* Sweep light effect on text */}
              <motion.div 
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: '100%', opacity: 0.5 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 2.2 }}
                className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white to-transparent mix-blend-overlay -skew-x-12"
              />
            </div>

            {/* Phase 04: Brand Descriptor */}
            <div className="overflow-hidden mt-4">
              <motion.p
                initial={{ y: '-100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 0.8, 
                  ease: "easeOut",
                  delay: 3.2 
                }}
                className="font-mono text-xs md:text-sm tracking-[0.3em] uppercase text-white/50"
              >
                Digital Product Studio
              </motion.p>
            </div>
            
            {/* Precision Lines forming box */}
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: "circOut", delay: 2.8 }}
              className="w-full h-[1px] bg-white/30 mt-8 origin-center"
            />
          </div>

          {/* Micro-coordinates for technological feel */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-12 left-12 font-mono text-[9px] text-white/40 tracking-widest uppercase hidden md:flex flex-col gap-1"
          >
            <span>SYS_INIT: OK</span>
            <span>COORD: 34.0522° N, 118.2437° W</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
