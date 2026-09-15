'use client';

import { motion } from 'framer-motion';
import { DEMO_SERVICES } from '@/data/demo';
import Link from 'next/link';
import Image from 'next/image';

export function ServicesSection() {
  return (
    <section className="py-32 relative bg-background border-b border-border overflow-hidden">
      {/* Background Architectural Elements */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <h2 className="text-5xl md:text-7xl font-heading font-black tracking-tighter uppercase text-foreground leading-[0.9]">
              Engineering<br />
              <span className="text-blue-500">Domination.</span>
            </h2>
          </div>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-6">
          {DEMO_SERVICES.map((service, index) => {
            // Determine grid span based on index for the Bento Box layout
            let spanClasses = "";
            if (index === 0) {
              // First item: Large, takes up 2 columns and 2 rows on Desktop
              spanClasses = "md:col-span-2 md:row-span-2";
            } else if (index === 1) {
              // Second item: 1 column, 1 row (top right)
              spanClasses = "md:col-span-1 md:row-span-1";
            } else if (index === 2) {
              // Third item: 1 column, 1 row (middle right)
              spanClasses = "md:col-span-1 md:row-span-1";
            } else if (index === 3) {
              // Fourth item: Full width row at the bottom
              spanClasses = "md:col-span-3 md:row-span-1";
            }

            return (
              <Link 
                key={service.id} 
                href={`/services/${service.id}`} 
                className={`group block relative rounded-[2rem] border border-border bg-foreground/[0.02] hover:bg-foreground/[0.05] transition-colors duration-500 overflow-hidden ${spanClasses}`}
              >
                {/* Background Image */}
                {service.image && (
                  <>
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill 
                      className="object-cover opacity-40 transition-all duration-700 group-hover:scale-105 group-hover:opacity-60" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
                  </>
                )}

                {/* Subtle Hover Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
                
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between z-10">
                  {/* Top: Tech stack & Arrow */}
                  <div className="flex justify-between items-start">
                    <div className="flex flex-wrap gap-2 max-w-[80%]">
                      {service.technologies.slice(0, index === 0 || index === 3 ? 5 : 3).map((tech) => (
                        <span 
                          key={tech} 
                          className="px-3 py-1.5 border border-foreground/10 rounded-full text-[10px] font-mono tracking-widest text-foreground/60 uppercase bg-background/50 group-hover:border-foreground/30 group-hover:text-foreground transition-all duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="w-12 h-12 shrink-0 rounded-full border border-border flex items-center justify-center group-hover:border-foreground group-hover:bg-foreground group-hover:text-background transition-all duration-500">
                      <svg className="w-4 h-4 transform group-hover:rotate-45 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Bottom: Title & Description */}
                  <div>
                    <h3 className={`font-heading font-black uppercase tracking-tight text-foreground mb-4 group-hover:text-blue-500 transition-colors duration-500 ${index === 0 ? 'text-5xl md:text-7xl' : 'text-3xl md:text-4xl'}`}>
                      {service.title}
                    </h3>
                    {(index === 0 || index === 3) && (
                      <p className="text-foreground/60 font-light text-base md:text-lg max-w-2xl">
                        {service.description}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
