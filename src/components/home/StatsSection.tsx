'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { DEMO_STATS } from '@/data/demo';

function Counter({ value, suffix }: { value: string, suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);
  const target = parseFloat(value);
  const isFloat = value.includes('.');

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {Number.isNaN(target) ? value : (isFloat ? count.toFixed(1) : Math.floor(count))}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="relative py-24 md:py-40 bg-background border-b border-border overflow-hidden">
      {/* Background wireframe */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-heading font-black text-foreground uppercase tracking-tighter"
          >
            Performance<br/>Index.
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:flex font-mono text-[10px] tracking-widest text-muted-foreground uppercase mt-8 md:mt-0"
          >
            SYS_STATUS: OPTIMAL / LIVE_DATA: SYNCHRONIZED
          </motion.div>
        </div>

        {/* Stats List */}
        <div className="flex flex-col border-t border-border">
          {DEMO_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col md:flex-row justify-between items-start md:items-center py-12 md:py-16 border-b border-border hover:bg-foreground/[0.02] transition-colors duration-500 cursor-default px-4 -mx-4"
            >
              {/* Left: Index & Label */}
              <div className="flex items-center gap-8 md:gap-16 mb-6 md:mb-0">
                <span className="font-mono text-xs text-muted-foreground tracking-widest group-hover:text-blue-500 transition-colors">
                  0{i + 1}
                </span>
                <span className="text-xl md:text-3xl font-heading font-bold uppercase tracking-tight text-foreground/80 group-hover:text-foreground transition-colors">
                  {stat.label}
                </span>
              </div>
              
              {/* Right: Massive Value */}
              <div className="text-6xl md:text-8xl lg:text-[10vw] font-heading font-black text-foreground tracking-tighter leading-none group-hover:scale-105 transition-transform duration-700 origin-left md:origin-right">
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
