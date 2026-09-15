'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { DEMO_PROJECTS } from '@/data/demo';
import Link from 'next/link';

export function ProjectsSection() {
  return (
    <section className="relative w-full">
      {DEMO_PROJECTS.map((project, index) => (
        <ProjectPanel key={project.id} project={project} index={index} />
      ))}
    </section>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
function ProjectPanel({ project, index }: { project: any, index: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track this panel's scroll progress as it enters and leaves the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects for the 3 images
  const y1 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [300, -300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div 
      ref={containerRef}
      className={`sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden ${project.bgColor}`}
    >
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10 h-full py-24 md:py-32 items-center">
        
        {/* Left Content Area */}
        <div className="flex flex-col justify-center text-white h-[50vh] lg:h-full z-20 order-last lg:order-first pb-12 lg:pb-0">
          <div className="flex gap-6 items-center mb-6">
            <span className="px-4 py-1.5 rounded-full border border-white/20 text-xs font-mono tracking-widest bg-black/20 backdrop-blur-md">
              {project.year}
            </span>
            <span className="text-white/60 text-sm md:text-base font-mono uppercase tracking-widest">
              {project.category}
            </span>
          </div>
          
          <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-heading font-black tracking-tighter leading-none mb-12 drop-shadow-2xl">
            {project.title}
          </h2>
          
          <Link href={`/projects/${project.id}`}>
            <button className="bg-white text-black px-8 py-4 rounded-full font-bold flex gap-3 items-center w-fit hover:scale-105 transition-transform duration-300">
              Explore Case Study 
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </Link>
        </div>

        {/* Right Image Collage Area */}
        <div className="relative h-[50vh] lg:h-full w-full block order-first lg:order-last perspective-1000">
          
          {/* Main Large Image (Center/Back) */}
          <motion.div 
            style={{ y: y3 }}
            className="absolute top-[10%] right-[10%] w-[70%] h-[60%] rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-10"
          >
            <div className="absolute inset-0 bg-black/20 z-10" />
            <img src={project.images[0]} alt="Project view 1" className="w-full h-full object-cover" />
          </motion.div>

          {/* Secondary Image (Bottom Left/Front) */}
          <motion.div 
            style={{ y: y1 }}
            className="absolute bottom-[10%] left-[5%] w-[45%] h-[45%] rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-30"
          >
            <img src={project.images[1]} alt="Project view 2" className="w-full h-full object-cover" />
          </motion.div>

          {/* Tertiary Image (Right/Middle) */}
          <motion.div 
            style={{ y: y2 }}
            className="absolute top-[30%] -right-[5%] w-[40%] h-[55%] rounded-3xl overflow-hidden shadow-2xl border border-white/10 z-20"
          >
            <img src={project.images[2]} alt="Project view 3" className="w-full h-full object-cover" />
          </motion.div>
          
        </div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none z-0" />
    </div>
  );
}
