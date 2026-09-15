'use client';

import { motion } from 'framer-motion';

const CATEGORIES = [
  {
    name: "FRONTEND_CORE",
    items: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS v4"]
  },
  {
    name: "WEBGL_&_MOTION",
    items: ["Three.js", "React Three Fiber", "Framer Motion", "GSAP"]
  },
  {
    name: "BACKEND_INFRA",
    items: ["Node.js", "PostgreSQL", "Redis", "Cloudflare Workers"]
  },
  {
    name: "AI_&_COMPUTING",
    items: ["OpenAI", "Gemini", "Vercel AI SDK", "Python"]
  }
];

export function TechStackSection() {
  return (
    <section className="relative py-32 bg-background border-b border-border overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="flex flex-col items-center text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-sm"
          >
             <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
             <span className="font-mono text-[10px] tracking-widest text-blue-400 uppercase">Technology Arsenal</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-heading font-black text-foreground uppercase tracking-tighter leading-[0.9]"
          >
            Engineering<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-300">Stack.</span>
          </motion.h2>
        </div>
        
        <div className="w-full relative mt-12 py-12 rotate-[-2deg] scale-110">
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-20 pointer-events-none" />
          
          <div className="flex flex-col gap-4">
            {/* Row 1 (Scrolls Left) */}
            <div className="flex whitespace-nowrap overflow-hidden">
              <motion.div
                animate={{ x: ["0%", "-50%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                className="flex whitespace-nowrap items-center gap-12 pr-12"
              >
                {[...CATEGORIES[0].items, ...CATEGORIES[1].items, ...CATEGORIES[0].items, ...CATEGORIES[1].items].map((item, i) => (
                  <div key={i} className="flex items-center gap-12 group cursor-default">
                    <span className="text-6xl md:text-8xl lg:text-[7rem] font-heading font-black tracking-tighter uppercase text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.15)] group-hover:text-foreground group-hover:[-webkit-text-stroke:1px_transparent] transition-all duration-300">
                      {item}
                    </span>
                    <span className="w-4 h-4 bg-blue-500 rounded-full opacity-50" />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Row 2 (Scrolls Right) */}
            <div className="flex whitespace-nowrap overflow-hidden">
              <motion.div
                animate={{ x: ["-50%", "0%"] }}
                transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
                className="flex whitespace-nowrap items-center gap-12 pr-12"
              >
                {[...CATEGORIES[2].items, ...CATEGORIES[3].items, ...CATEGORIES[2].items, ...CATEGORIES[3].items].map((item, i) => (
                  <div key={i} className="flex items-center gap-12 group cursor-default">
                    <span className="text-6xl md:text-8xl lg:text-[7rem] font-heading font-black tracking-tighter uppercase text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.15)] group-hover:text-blue-500 group-hover:[-webkit-text-stroke:1px_transparent] transition-all duration-300">
                      {item}
                    </span>
                    <span className="w-4 h-4 bg-foreground rounded-full opacity-20" />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
