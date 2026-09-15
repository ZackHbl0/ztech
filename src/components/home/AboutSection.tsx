'use client';

import { motion } from 'framer-motion';

export function AboutSection() {
  return (
    <section className="relative py-32 lg:py-48 bg-background border-b border-border overflow-hidden flex flex-col items-center justify-center">
      {/* Architectural Grid Extension */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Glowing Orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-foreground/[0.03] border border-border mb-12 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">The ZTech Doctrine</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black leading-[0.9] tracking-tighter text-foreground mb-16 uppercase">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="block mb-2 md:mb-4"
            >
              We don&apos;t just
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="block mb-2 md:mb-4"
            >
              write code.
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-300 mb-2 md:mb-4"
            >
              We engineer
            </motion.span>
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="block text-foreground/30"
            >
              advantages.
            </motion.span>
          </h2>
        </div>

        <div className="flex flex-col max-w-5xl mx-auto mt-24 border-t border-border">
          {/* Item 01 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group flex flex-col md:flex-row gap-6 md:gap-12 py-12 md:py-16 border-b border-border items-start md:items-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-blue-500/[0.02] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <div className="relative z-10 font-mono text-4xl md:text-6xl text-foreground/20 font-light group-hover:text-blue-500 transition-colors duration-500 w-24">01</div>
            <h3 className="relative z-10 text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter text-foreground group-hover:tracking-tight transition-all duration-500 md:w-1/3">Global<br/>Scale</h3>
            <p className="relative z-10 text-foreground/60 font-sans text-base md:text-lg leading-relaxed font-light md:w-1/2">Architectures designed to handle millions of requests without breaking a sweat. We build infrastructure for the future, not just for today.</p>
          </motion.div>

          {/* Item 02 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group flex flex-col md:flex-row gap-6 md:gap-12 py-12 md:py-16 border-b border-border items-start md:items-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-blue-500/[0.02] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <div className="relative z-10 font-mono text-4xl md:text-6xl text-foreground/20 font-light group-hover:text-blue-500 transition-colors duration-500 w-24">02</div>
            <h3 className="relative z-10 text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter text-foreground group-hover:tracking-tight transition-all duration-500 md:w-1/3">Zero<br/>Compromise</h3>
            <p className="relative z-10 text-foreground/60 font-sans text-base md:text-lg leading-relaxed font-light md:w-1/2">Military-grade protection for your data and users. Security isn&apos;t an afterthought, it&apos;s the absolute foundation of our engineering process.</p>
          </motion.div>

          {/* Item 03 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="group flex flex-col md:flex-row gap-6 md:gap-12 py-12 md:py-16 border-b border-border items-start md:items-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-blue-500/[0.02] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            <div className="relative z-10 font-mono text-4xl md:text-6xl text-foreground/20 font-light group-hover:text-blue-500 transition-colors duration-500 w-24">03</div>
            <h3 className="relative z-10 text-3xl md:text-5xl font-heading font-black uppercase tracking-tighter text-foreground group-hover:tracking-tight transition-all duration-500 md:w-1/3">Bleeding<br/>Edge</h3>
            <p className="relative z-10 text-foreground/60 font-sans text-base md:text-lg leading-relaxed font-light md:w-1/2">We leverage the absolute latest in React, Next.js, and WebGL to deliver experiences that your competitors simply cannot match.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
