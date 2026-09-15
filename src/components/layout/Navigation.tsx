'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import { MagneticButton } from '../animations/MagneticButton';

const links = [
  { href: '/', label: 'Home', num: '00' },
  { href: '/services', label: 'Services', num: '01' },
  { href: '/projects', label: 'Projects', num: '02' },
  { href: '/about', label: 'About', num: '03' },
  { href: '/process', label: 'Process', num: '04' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUIStore();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Desktop Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-40 flex justify-center w-full transition-all duration-500"
      >
        <motion.div 
          className={cn(
            "flex items-center justify-between w-full transition-all duration-500 ease-out",
            isScrolled 
              ? "h-16 bg-[#0a0a0a]/80 border-white/10 mt-6 max-w-4xl px-6 rounded-full border shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-md" 
              : "h-24 bg-transparent mt-0 max-w-none px-8 lg:px-16 rounded-none border-transparent"
          )}
        >
          {/* Logo Area */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-4 group">
              <span className={cn(
                "font-heading font-black tracking-tighter uppercase transition-colors duration-500 text-foreground",
                isScrolled ? "text-xl" : "text-2xl hover:text-foreground/70"
              )}>
                <span className="text-blue-500">Z</span>TECH
              </span>
            </Link>
          </div>
          
          {/* Right Area (Nav + CTAs) */}
          <div className="flex items-center gap-8">
            
            {/* Nav Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-8">
              {links.map(link => {
                const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                return (
                  <Link 
                    key={link.href} 
                    href={link.href} 
                    className="relative group py-2"
                  >
                    <span className={cn(
                      "text-sm font-sans font-medium transition-colors duration-300", 
                      isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    )}>
                      {link.label}
                    </span>
                    
                    {/* Subtle underline on hover/active */}
                    <div className={cn(
                      "absolute bottom-0 left-0 right-0 h-[2px] rounded-full bg-foreground transition-transform duration-300 origin-left",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )} />
                  </Link>
                );
              })}
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:block">
                <Link href="/contact" tabIndex={-1}>
                  <MagneticButton className="px-6 py-2.5 rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium text-sm transition-all shadow-sm">
                    Start Project
                  </MagneticButton>
                </Link>
              </div>

              {/* Mobile Actions */}
              <div className="flex lg:hidden items-center">
                <button
                  onClick={toggleMobileMenu}
                  className="relative z-50 flex items-center justify-center w-10 h-10 rounded-full border border-border bg-background hover:bg-foreground/5 transition-colors focus:outline-none"
                  aria-label="Toggle Menu"
                >
                  <div className="relative w-4 h-3 flex flex-col justify-between overflow-hidden">
                    <span className={cn("w-full h-[1.5px] bg-foreground transition-all duration-300 origin-left", isMobileMenuOpen && "rotate-45 translate-x-[2px] -translate-y-[1px]")} />
                    <span className={cn("w-full h-[1.5px] bg-foreground transition-all duration-300", isMobileMenuOpen && "opacity-0 translate-x-4")} />
                    <span className={cn("w-full h-[1.5px] bg-foreground transition-all duration-300 origin-left", isMobileMenuOpen && "-rotate-45 translate-x-[2px] translate-y-[1px]")} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-30 bg-background flex flex-col pt-24 pb-12 px-6 overflow-y-auto"
          >
            {/* Grid Background */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-center">
              <nav className="flex flex-col gap-6 w-full border-t border-border pt-12">
                {links.map((link, i) => {
                  const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={link.href}
                        className="group flex items-end justify-between border-b border-border pb-6 relative overflow-hidden"
                      >
                        {/* Hover reveal block */}
                        <div className="absolute inset-0 bg-foreground/[0.02] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                        
                        <div className="relative z-10 flex flex-col">
                          <span className="font-mono text-[10px] text-muted-foreground tracking-widest mb-2">
                            {link.num} &mdash;
                          </span>
                          <span className={cn(
                            "text-4xl md:text-6xl font-heading font-black uppercase tracking-tighter transition-all duration-300",
                            isActive ? "text-foreground" : "text-foreground/70 group-hover:text-foreground group-hover:tracking-tight"
                          )}>
                            {link.label}
                          </span>
                        </div>
                        <div className="relative z-10">
                          {isActive && <div className="w-3 h-3 bg-foreground rounded-full mb-2" />}
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="relative z-10 mt-12 pt-12 flex flex-col gap-8"
            >
              <Link href="/contact" className="w-full">
                <MagneticButton className="w-full py-6 text-sm font-mono uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 rounded-none border border-transparent flex justify-center items-center gap-4 group">
                  Initiate Sequence
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </MagneticButton>
              </Link>
              
              <div className="flex justify-between items-end border-t border-border pt-6 font-mono text-[10px] tracking-widest uppercase text-muted-foreground">
                <div className="flex flex-col gap-1">
                  <span>HQ: CASABLANCA</span>
                  <span>STATUS: ONLINE</span>
                </div>
                <span>&copy; {new Date().getFullYear()} ZTECH</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
