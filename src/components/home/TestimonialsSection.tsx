'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEMO_TESTIMONIALS } from '@/data/demo';

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative py-32 bg-background border-b border-border overflow-hidden">
      {/* Background wireframe */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* Left Column: Title & Client List */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <h2 className="text-sm font-bold font-mono tracking-widest text-muted-foreground uppercase mb-12">
                Market Response &mdash; 05
              </h2>
              <div className="flex flex-col gap-6">
                {DEMO_TESTIMONIALS.map((testimonial, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className="text-left group relative py-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-2xl md:text-3xl font-heading font-black tracking-tight transition-colors duration-500 uppercase ${
                        activeIndex === index ? 'text-foreground' : 'text-foreground/20 group-hover:text-foreground/50'
                      }`}>
                        {testimonial.name.split(' ')[0]} {/* Extract first name or company for style */}
                      </span>
                      {activeIndex === index && (
                        <motion.div 
                          layoutId="activeDot"
                          className="w-2 h-2 bg-foreground rounded-full"
                        />
                      )}
                    </div>
                    {/* Animated Line underneath */}
                    <div className="absolute bottom-0 left-0 h-[1px] bg-foreground/10 w-full overflow-hidden">
                      {activeIndex === index && (
                        <motion.div 
                          layoutId="activeLine"
                          className="absolute inset-0 bg-foreground"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Column: Active Quote */}
          <div className="lg:col-span-8 lg:pl-16 flex flex-col justify-center min-h-[40vh] md:min-h-[50vh] border-l border-border/50">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, filter: 'blur(10px)', x: 20 }}
                animate={{ opacity: 1, filter: 'blur(0px)', x: 0 }}
                exit={{ opacity: 0, filter: 'blur(10px)', x: -20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                {/* Massive Decorative Quote Mark */}
                <div className="absolute -top-16 -left-10 text-[10rem] font-serif leading-none text-foreground/[0.03] select-none pointer-events-none">
                  &ldquo;
                </div>
                
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.1] tracking-tight mb-12 text-foreground relative z-10 max-w-4xl">
                  {DEMO_TESTIMONIALS[activeIndex].content}
                </h3>
                
                <div className="flex items-center gap-6 mt-12">
                  <div className="w-16 h-[1px] bg-foreground/30"></div>
                  <div>
                    <h4 className="text-lg font-bold font-heading uppercase text-foreground mb-1">
                      {DEMO_TESTIMONIALS[activeIndex].name}
                    </h4>
                    <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                      {DEMO_TESTIMONIALS[activeIndex].role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
