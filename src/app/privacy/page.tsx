import Link from 'next/link';

export default function PrivacyPage() {
  const title = "Privacy Policy";
  const subtitle = "Protecting your data and ensuring complete transparency.";
  
  const capabilities = [
    "Data Collection & Usage",
    "Third-Party Integrations",
    "User Rights & Control",
    "Security Measures"
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
          <span className="text-muted-foreground">Legal</span>
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
              At ZTech, we take your privacy seriously. We only collect the minimal amount of data necessary to provide our premium engineering services. 
              Our systems are architected with security and privacy by design, ensuring your information remains confidential and protected against unauthorized access.
            </p>
            <p className="text-sm">
              We do not sell your personal data. Any third-party services utilized within our ecosystem are strictly vetted to adhere to the highest standards of data protection, compliance, and operational integrity.
            </p>
          </div>
        </div>

        {/* Core Capabilities */}
        <div className="max-w-3xl mb-32">
          <h3 className="text-2xl font-heading font-semibold mb-8 text-foreground">
            Policy Highlights
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
            <h4 className="font-heading font-bold text-lg text-foreground">Have questions about your data?</h4>
            <Link href="/contact" className="text-blue-500 font-mono text-sm tracking-wide hover:text-blue-400 transition-colors inline-flex items-center gap-2 group">
              Contact us
              <span className="transform transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
