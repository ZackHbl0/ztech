'use client';

import { ReactLenis } from 'lenis/react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lenisRef = useRef<any>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    
    gsap.ticker.add(update);
    
    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.on('scroll', ScrollTrigger.update);
    }
  }, []);

  return (
    <ReactLenis 
      root 
      ref={lenisRef} 
      autoRaf={false} 
      options={{ 
        lerp: 0.08, 
        smoothWheel: !isReducedMotion,
      }}
    >
      {children}
    </ReactLenis>
  );
}
