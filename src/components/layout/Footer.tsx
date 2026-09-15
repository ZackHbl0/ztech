'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative bg-background pt-24 md:pt-32 pb-8 overflow-hidden border-t border-border">
      {/* Subtle Background Lines */}
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 flex flex-col justify-between min-h-[50vh]">
        
        {/* Massive CTA Block */}
        <div className="w-full bg-foreground/[0.02] border border-border hover:border-blue-500/30 transition-colors duration-500 rounded-[3rem] p-12 md:p-24 flex flex-col items-center text-center relative overflow-hidden mb-24">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[100px] pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <div className="font-mono text-[10px] tracking-widest text-blue-400 uppercase mb-8 flex justify-center items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Project Initiation
            </div>
            <h3 className="font-heading font-black text-5xl md:text-7xl uppercase tracking-tighter text-foreground mb-12 max-w-4xl leading-[0.9]">
              Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-300">dominate</span><br/>your market?
            </h3>
            
            <Link href="/contact" className="inline-block">
              <div className="px-10 py-5 bg-blue-600 text-white rounded-full font-bold tracking-widest uppercase text-sm shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:bg-blue-500 transition-all duration-300 hover:scale-105">
                Start Building Now
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 mb-24 w-full">
          {/* General Contact */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-6">
            <h4 className="font-mono text-[10px] tracking-widest text-foreground/40 uppercase font-bold">Direct Line</h4>
            <a href="mailto:zackhbl400@gmail.com" className="text-xl md:text-2xl font-heading font-bold text-foreground hover:text-blue-400 transition-colors duration-300 break-all">
              zackhbl400@gmail.com
            </a>
            <p className="text-muted-foreground text-sm max-w-[200px]">Casablanca, Morocco.<br/>Operating Worldwide.</p>
          </div>

          {/* Socials */}
          <div className="flex flex-col gap-6">
            <h4 className="font-mono text-[10px] tracking-widest text-foreground/40 uppercase font-bold">Connect</h4>
            <ul className="flex flex-col gap-4">
              {[
                { name: 'Instagram', url: 'https://www.instagram.com/ztech.studio1/' },
                { name: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61593598186922' },
                { name: 'GitHub', url: 'https://github.com/ZackHbl0' }
              ].map((link) => (
                <li key={link.name}>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 h-[1px] bg-foreground group-hover:w-3 transition-all duration-300" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Expertise */}
          <div className="flex flex-col gap-6">
            <h4 className="font-mono text-[10px] tracking-widest text-foreground/40 uppercase font-bold">Expertise</h4>
            <ul className="flex flex-col gap-4">
              {[
                { name: 'Digital Strategy', href: '/services/digital-strategy' },
                { name: 'Web Architecture', href: '/services/web-architecture' },
                { name: 'Mobile Engineering', href: '/services/mobile-engineering' },
                { name: 'AI Solutions', href: '/services/ai-solutions' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 h-[1px] bg-foreground group-hover:w-3 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-6">
            <h4 className="font-mono text-[10px] tracking-widest text-foreground/40 uppercase font-bold">Legal</h4>
            <ul className="flex flex-col gap-4">
              {[
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms of Service', href: '/terms' },
                { name: 'Cookie Policy', href: '/cookies' },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-300 flex items-center gap-2 group">
                    <span className="w-0 h-[1px] bg-foreground group-hover:w-3 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section: Massive Typography & Copyright */}
        <div className="flex flex-col w-full relative">
          
          {/* Giant Faded Logo */}
          <div className="w-full flex justify-center md:justify-between items-center overflow-hidden mb-8">
            <motion.h1 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-10%" }}
              className="text-[22vw] leading-[0.75] font-heading font-black tracking-tighter uppercase flex"
            >
              {"ZTECH".split('').map((letter, i) => (
                <motion.span
                  key={i}
                  variants={{
                    hidden: { y: "120%", rotate: 10, opacity: 0 },
                    visible: { 
                      y: "0%", 
                      rotate: 0,
                      opacity: 1,
                      transition: {
                        duration: 1,
                        ease: [0.16, 1, 0.3, 1],
                        delay: i * 0.1
                      }
                    }
                  }}
                  className="inline-block origin-bottom-left text-transparent bg-clip-text bg-gradient-to-b from-foreground via-foreground/60 to-background"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>
          </div>
          
          {/* Copyright Line */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/50 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
            <span>&copy; {new Date().getFullYear()} ZTech. All rights reserved.</span>
            <span className="mt-4 md:mt-0 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Designed in Casablanca
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
