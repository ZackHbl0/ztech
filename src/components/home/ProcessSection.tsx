'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { cn } from '@/lib/utils';

const PROCESS_STEPS = [
  { 
    num: '01', 
    title: 'ARCHITECTURE & STRATEGY', 
    desc: 'We do not start writing code blindly. We engineer the exact technical blueprint, defining the optimal tech stack, database schemas, and system architecture to guarantee hyper-scalability from day one.',
    tags: ['SYSTEM_DESIGN', 'FEASIBILITY', 'ROADMAP']
  },
  { 
    num: '02', 
    title: 'UX/UI & PROTOTYPING', 
    desc: 'Creating interfaces that command attention. We apply Apple-level restraint and premium motion design to craft an aesthetic that feels expensive, intentional, and effortless to use.',
    tags: ['WIREFRAMES', 'MOTION_DESIGN', 'DESIGN_SYSTEMS']
  },
  { 
    num: '03', 
    title: 'CORE ENGINEERING', 
    desc: 'Relentless execution. We build using modern edge-ready stacks (Next.js, React, WebGL) and strict typed languages to ensure zero-compromise performance and maximum security.',
    tags: ['FULL_STACK', 'WEBGL', 'PERFORMANCE']
  },
  { 
    num: '04', 
    title: 'DEPLOYMENT & SCALE', 
    desc: 'Rigorous CI/CD pipelines, automated testing, and global edge deployment. We launch your product with precision and remain as your technical partner for ongoing iteration and scale.',
    tags: ['CI/CD', 'EDGE_NETWORKS', 'MONITORING']
  },
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });

  return (
    <section className="relative py-32 md:py-48 bg-background border-b border-border overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--foreground)_1px,transparent_1px),linear-gradient(to_bottom,var(--foreground)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-32">
          <h2 className="text-sm font-mono tracking-widest text-muted-foreground uppercase mb-6 flex items-center justify-center gap-4">
            <div className="w-8 h-[1px] bg-foreground/20" />
            Methodology
            <div className="w-8 h-[1px] bg-foreground/20" />
          </h2>
          <h3 className="text-5xl md:text-7xl lg:text-[7rem] font-heading font-black tracking-tighter uppercase text-foreground leading-[0.9]">
            How We<br />
            <span className="text-foreground/30">Build.</span>
          </h3>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          
          {/* Center Line Background */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-border transform md:-translate-x-1/2" />
          
          {/* Center Line Active Progress */}
          <motion.div 
            style={{ scaleY: smoothProgress }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-blue-500 transform md:-translate-x-1/2 origin-top z-10"
          />

          {/* Timeline Steps */}
          <div className="flex flex-col gap-24 md:gap-48 relative z-20">
            {PROCESS_STEPS.map((step, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <TimelineStep 
                  key={step.num} 
                  step={step} 
                  isEven={isEven} 
                />
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TimelineStep({ step, isEven }: { step: any, isEven: boolean }) {
  const stepRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stepRef,
    offset: ["start 80%", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  const xOffset = isEven ? -50 : 50;
  const x = useTransform(scrollYProgress, [0, 1], [xOffset, 0]);
  
  // Mobile always slides from right
  const mobileX = useTransform(scrollYProgress, [0, 1], [30, 0]);

  return (
    <div ref={stepRef} className="relative flex flex-col md:flex-row items-center w-full group">
      
      {/* Center Dot */}
      <motion.div 
        style={{ scale: scrollYProgress, opacity }}
        className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-background transform -translate-x-1/2 z-20"
      />

      {/* Content Container (Alternating left/right on desktop) */}
      <div className={cn(
        "w-full md:w-1/2 pl-12 md:pl-0 flex flex-col",
        isEven ? "md:pr-24 md:items-end md:text-right" : "md:pl-24 md:ml-auto md:items-start md:text-left"
      )}>
        
        {/* Desktop Animation */}
        <motion.div 
          style={{ opacity, x }}
          className="hidden md:flex flex-col w-full"
        >
          <div className={cn("font-mono text-xs tracking-widest text-blue-500 mb-4", isEven ? "text-right" : "text-left")}>
            PHASE // {step.num}
          </div>
          <h4 className={cn("text-3xl lg:text-4xl font-heading font-bold uppercase tracking-tight text-foreground mb-6", isEven ? "text-right" : "text-left")}>
            {step.title}
          </h4>
          <p className={cn("text-muted-foreground text-sm lg:text-base leading-relaxed mb-8", isEven ? "text-right" : "text-left")}>
            {step.desc}
          </p>
          <div className={cn("flex flex-wrap gap-2", isEven ? "justify-end" : "justify-start")}>
            {step.tags.map((tag: string) => (
              <span key={tag} className="text-[10px] font-mono tracking-widest text-foreground/60 border border-border px-3 py-1 rounded-full uppercase bg-background">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Mobile Animation */}
        <motion.div 
          style={{ opacity, x: mobileX }}
          className="flex md:hidden flex-col w-full text-left items-start"
        >
          <div className="font-mono text-xs tracking-widest text-blue-500 mb-4">
            PHASE // {step.num}
          </div>
          <h4 className="text-3xl font-heading font-bold uppercase tracking-tight text-foreground mb-4">
            {step.title}
          </h4>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            {step.desc}
          </p>
          <div className="flex flex-wrap gap-2 justify-start">
            {step.tags.map((tag: string) => (
              <span key={tag} className="text-[10px] font-mono tracking-widest text-foreground/60 border border-border px-3 py-1 rounded-full uppercase bg-background">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
