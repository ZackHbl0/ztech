'use client';

import { Suspense, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { MagneticButton } from '../animations/MagneticButton';

const Canvas = dynamic(() => import('@react-three/fiber').then(mod => mod.Canvas), { ssr: false });
const HeroScene = dynamic(() => import('../3d/HeroScene').then(mod => mod.HeroScene), { ssr: false });

export function Hero() {
  const { scrollY } = useScroll();
  
  const [isMounted, setIsMounted] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const y = useTransform(scrollY, [0, 1000], [0, isReducedMotion ? 0 : 200]);
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);
  const scale = useTransform(scrollY, [0, 1000], [1, isReducedMotion ? 1 : 1.2]);

  useEffect(() => {
    setIsMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
  }, []);

  const headlineLines = [
    "ENGINEERING",
    "UNFAIR",
    "ADVANTAGES"
  ];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background flex items-center justify-between border-b border-border">
      
      {/* Architectural Grid Background & Radial Vignette */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle grid guidelines */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        {/* Dark radial gradient shading to enhance depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)] opacity-80" />
        
        {/* Crosshairs & coordinates */}
        <div className="absolute top-8 left-8 w-4 h-4 border-l border-t border-foreground/30" />
        <div className="absolute top-8 right-8 w-4 h-4 border-r border-t border-foreground/30" />
        <div className="absolute bottom-8 left-8 w-4 h-4 border-l border-b border-foreground/30" />
        <div className="absolute bottom-8 right-8 w-4 h-4 border-r border-b border-foreground/30" />
      </div>

      {/* 3D Scene Wrapper */}
      <motion.div 
        style={{ y, opacity, scale }}
        className="absolute inset-0 z-0 pointer-events-none opacity-80"
      >
        {isMounted && !isReducedMotion && (
          <Suspense fallback={null}>
            <Canvas 
              camera={{ position: [0, 0, 8], fov: 45 }}
              className="pointer-events-auto"
            >
              <HeroScene />
            </Canvas>
          </Suspense>
        )}
      </motion.div>

      {/* Typographic Content */}
      <div className="relative container mx-auto px-6 lg:px-12 h-full flex flex-col justify-center items-start text-left pointer-events-none z-10">
        <div className="max-w-4xl pt-20 flex flex-col items-start">
          
          {/* Brutalist Headline */}
          <h1 className="text-[14vw] sm:text-[12vw] lg:text-[9vw] leading-[0.85] font-heading font-black tracking-tighter uppercase mb-10 relative">
            <div className="overflow-hidden pb-2">
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="origin-bottom text-foreground"
              >
                ENGINEERING
              </motion.div>
            </div>
            <div className="overflow-hidden pb-2">
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="origin-bottom text-transparent"
                style={{ WebkitTextStroke: '2px rgba(255,255,255,0.9)' }}
              >
                UNFAIR
              </motion.div>
            </div>
            <div className="overflow-hidden pb-2">
              <motion.div
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="origin-bottom text-foreground"
              >
                ADVANTAGES
              </motion.div>
            </div>
          </h1>

          {/* Descriptive Body */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start mb-14"
          >
            <p className="text-base sm:text-lg md:text-xl text-foreground/70 font-sans leading-relaxed max-w-xl">
              We discard the ordinary to forge hyper-optimized, visually devastating software. ZTech is the engineering partner for companies that refuse to blend in.
            </p>
          </motion.div>


        </div>
      </div>
      
      {/* Scroll anchor */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 right-12 z-10 hidden lg:flex items-center gap-4 font-mono text-[10px] text-muted-foreground tracking-widest uppercase rotate-90 origin-bottom-right pointer-events-none"
      >
        <span>Scroll to descend</span>
        <span className="w-12 h-[1px] bg-border" />
      </motion.div>

    </section>
  );
}
