'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GlassCard } from './GlassCard';

interface TiltCardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  children: React.ReactNode;
}

export function TiltCard({ children, className, ...props }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReducedMotion) return;
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isReducedMotion ? 0 : rotateX,
        rotateY: isReducedMotion ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      className={cn("w-full [perspective:1000px]", className)}
      {...props}
    >
      <GlassCard className="h-full w-full" style={{ transform: isReducedMotion ? "none" : "translateZ(30px)" }}>
        {children}
      </GlassCard>
    </motion.div>
  );
}
