import Link from 'next/link';
import { DEMO_SERVICES } from '@/data/demo';
import { notFound } from 'next/navigation';

export default async function ServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // Let's see if we have a match, otherwise we fall back to generic content so it always works
  const service = DEMO_SERVICES.find(s => s.id === id);

  // Convert slug to title (e.g. 'web-architecture' -> 'Web Architecture')
  const formattedTitle = id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  const title = service?.title || formattedTitle;
  const subtitle = "Aligning technology with your business objectives.";
  
  const capabilities = service?.technologies || [
    "Digital Transformation Roadmapping",
    "Product Market Fit Analysis",
    "User Experience Strategy",
    "Technology Stack Evaluation"
  ];

  return (
    <main className="min-h-screen bg-background pt-32 pb-24">
      {/* Background Architectural Grid */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 md:px-24">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-16">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>&rsaquo;</span>
          <span className="text-muted-foreground">Expertise</span>
          <span>&rsaquo;</span>
          <span className="text-primary">{title}</span>
        </nav>

        {/* Page Header */}
        <div className="max-w-3xl mb-24">
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-foreground tracking-tight mb-6">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-foreground/70 font-light leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Content Body */}
        <div className="max-w-3xl border-t border-border/50 pt-16 mb-24">
          <div className="space-y-8 text-foreground/80 leading-loose">
            <p>
              At ZTech, we believe that true digital transformation starts with a solid foundation
              of strategy. We partner with ambitious organizations to navigate the complexities
              of the digital landscape, identifying opportunities for growth and innovation.
            </p>
            <p className="text-sm">
              Our approach is holistic, encompassing market research, competitive analysis, and an in-depth
              understanding of your operational capabilities. We don&apos;t just recommend technologies; we design
              roadmaps that ensure every digital initiative delivers measurable ROI.
            </p>
          </div>
        </div>

        {/* Core Capabilities */}
        <div className="max-w-3xl mb-32">
          <h3 className="text-2xl font-heading font-semibold mb-8 text-foreground">
            Core Capabilities
          </h3>
          <ul className="space-y-4 font-mono text-sm text-foreground/80 tracking-wide">
            {capabilities.map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Final CTA */}
        <div className="max-w-3xl border-t border-border/50 pt-12 pb-12">
          <div className="flex items-center gap-4">
            <h4 className="font-heading font-bold text-lg text-foreground">Ready to start a project?</h4>
            <Link href="/contact" className="text-blue-500 font-mono text-sm tracking-wide hover:text-blue-400 transition-colors inline-flex items-center gap-2 group">
              Let&apos;s talk
              <span className="transform transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
