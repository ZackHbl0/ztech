import Link from 'next/link';
import { DEMO_PROJECTS } from '@/data/demo';

export default async function ProjectPage({ params }: { params: Promise<{ projectId: string }> }) {
  const { projectId } = await params;
  const project = DEMO_PROJECTS.find(p => p.id === projectId);

  if (!project) {
    return <div className="pt-32 text-center text-white text-4xl">DEBUG: Project not found for ID: "{projectId}"</div>;
  }

  // Get next project for the bottom link
  const currentIndex = DEMO_PROJECTS.findIndex(p => p.id === projectId);
  const nextProject = DEMO_PROJECTS[currentIndex >= 0 ? (currentIndex + 1) % DEMO_PROJECTS.length : 0];

  return (
    <main className="min-h-screen bg-background pt-32 pb-0">
      {/* Background Architectural Grid */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 md:px-24">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-16">
          {/* Left Column (Title & Desc) */}
          <div className="lg:col-span-7 flex flex-col">
            <Link 
              href="/#projects" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-mono text-[10px] tracking-widest uppercase transition-colors duration-300 group mb-12"
            >
              <span className="transform transition-transform duration-300 group-hover:-translate-x-1">&lsaquo;</span>
              Back to Projects
            </Link>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-foreground tracking-tight mb-8">
              {project.title}
            </h1>
            <p className="text-base md:text-lg text-foreground/70 font-light leading-relaxed max-w-xl">
              An integrated urban intelligence platform designed to harmonize city operations. We built this platform to process millions of real-time data points, transforming raw municipal data into actionable insights for city administrators and citizens alike.
            </p>
          </div>

          {/* Right Column (Metadata) */}
          <div className="lg:col-span-5 flex flex-col justify-end">
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                <span className="block font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-2">Client</span>
                <span className="font-sans text-sm text-foreground font-medium">{project.title}</span>
              </div>
              <div>
                <span className="block font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-2">Year</span>
                <span className="font-sans text-sm text-foreground font-medium">2026</span>
              </div>
              <div className="col-span-2">
                <span className="block font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-2">Role</span>
                <span className="font-sans text-sm text-foreground font-medium">{project.category}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-foreground text-background font-mono text-[10px] tracking-widest uppercase font-bold py-3 px-6 rounded-full hover:bg-foreground/90 transition-colors flex justify-center items-center gap-2">
                Live Site
                <span className="text-blue-500">&#8599;</span>
              </button>
              <button className="w-12 h-12 flex items-center justify-center border border-border rounded-full text-foreground hover:bg-foreground/5 transition-colors">
                <span className="text-xs">&lt;/&gt;</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Image Section */}
      <div className="relative w-full h-[50vh] md:h-[70vh] mb-24 mt-8">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
          alt={project.title} 
          className="w-full h-full object-cover"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-background/10 mix-blend-overlay"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-12 md:px-24 max-w-6xl">
        {/* Case Study Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 gap-x-12 lg:gap-x-24 mb-32">
          
          {/* The Challenge */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-foreground">The Challenge</h3>
          </div>
          <div className="lg:col-span-9">
            <p className="text-sm md:text-base text-foreground/80 leading-loose max-w-3xl font-light">
              Modern enterprises produce massive amounts of fragmented data across various services. The challenge was to create a centralized, low-latency ecosystem capable of ingesting high-frequency streams without crashing, while presenting the data in a hyper-intuitive interface.
            </p>
          </div>

          {/* Our Solution */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-foreground">Our Solution</h3>
          </div>
          <div className="lg:col-span-9">
            <p className="text-sm md:text-base text-foreground/80 leading-loose max-w-3xl font-light">
              We engineered a robust Go-based microservices backend paired with Apache Kafka for real-time stream processing. The frontend utilizes a highly optimized WebGL rendering engine built on Next.js to visualize city-wide data dynamically, allowing instant decision-making during operations.
            </p>
          </div>

          {/* Technologies */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-foreground">Technologies</h3>
          </div>
          <div className="lg:col-span-9">
            <div className="flex flex-wrap gap-3">
              {['Next.js', 'TypeScript', 'Tailwind CSS', 'Go', 'PostgreSQL', 'Kafka', 'WebGL'].map(tech => (
                <span key={tech} className="px-4 py-2 border border-border rounded-full text-xs font-mono text-foreground/70">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Business Impact */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-foreground">Business Impact</h3>
          </div>
          <div className="lg:col-span-9">
            <p className="text-sm md:text-base text-foreground/80 leading-loose max-w-3xl font-light">
              Reduced municipal response times by 40% and lowered urban energy consumption by 15% within the first six months of deployment.
            </p>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-bold text-blue-500">Results</h3>
          </div>
          <div className="lg:col-span-9">
            <p className="text-sm md:text-base text-foreground/80 leading-loose max-w-3xl font-light">
              Currently tracking over 2M active IoT nodes across 3 major metropolitan areas.
            </p>
          </div>

        </div>
      </div>

      {/* Next Project Section */}
      <div className="border-t border-border mt-32 py-32 flex flex-col items-center justify-center group cursor-pointer relative overflow-hidden">
        {/* Subtle hover effect background */}
        <div className="absolute inset-0 bg-foreground/[0.02] transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-in-out"></div>
        
        <Link href={`/projects/${nextProject.id}`} className="relative z-10 flex flex-col items-center justify-center">
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase mb-6">Next Project</span>
          <h2 className="text-5xl md:text-7xl font-heading font-black text-foreground group-hover:text-foreground/80 transition-colors duration-300">
            {nextProject.title}
          </h2>
        </Link>
      </div>
    </main>
  );
}
