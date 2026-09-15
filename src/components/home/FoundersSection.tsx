'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const founders = [
  {
    name: 'Zakaria Habli',
    role: 'Co-Founder & Lead Engineer',
    bio: 'Architecting scalable systems and leading technical strategy. Specialized in high-performance web applications and cloud infrastructure.',
    image: '/images/founders/zakaria.jpg',
    color: 'from-blue-500/20'
  },
  {
    name: 'Marouane Bouftama',
    role: 'Co-Founder & Strategist',
    bio: 'Driving business expansion and brand direction. Focused on creating digital products that dominate their market categories.',
    image: '/images/founders/marouane-new.jpg',
    color: 'from-purple-500/20'
  }
];

export function FoundersSection() {
  return (
    <section className="relative py-32 bg-background border-b border-border">
      {/* Subtle Background */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-7xl">
        
        {/* Section Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between border-b border-border pb-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-heading font-black text-foreground uppercase tracking-tighter">
              Leadership
            </h2>
            <p className="font-mono text-xs tracking-widest text-muted-foreground uppercase mt-4">
              The minds behind ZTech.
            </p>
          </div>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {founders.map((founder, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative aspect-[3/4] md:aspect-[4/5] w-full overflow-hidden border border-border bg-foreground/5 mb-6">
                
                {/* Image */}
                <Image 
                  src={founder.image} 
                  alt={founder.name}
                  fill
                  className="object-cover object-top transition-all duration-700 ease-in-out group-hover:scale-105"
                />
                
                {/* Overlay Gradients */}
                <div className={`absolute inset-0 bg-gradient-to-t ${founder.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-overlay`} />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent opacity-40 transition-opacity duration-700" />
                
                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 w-2 h-2 bg-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 right-4 text-[10px] font-mono tracking-widest text-foreground uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  0{index + 1}
                </div>
              </div>

              <div className="relative">
                <h3 className="text-3xl md:text-4xl font-heading font-bold uppercase tracking-tight text-foreground mb-2 group-hover:text-blue-500 transition-colors duration-300">
                  {founder.name}
                </h3>
                <h4 className="text-sm font-mono tracking-widest text-muted-foreground uppercase mb-6">
                  {founder.role}
                </h4>
                <p className="text-foreground/70 font-light leading-relaxed max-w-sm">
                  {founder.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
