import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DEMO_PROJECTS } from "@/data/demo";
import Link from "next/link";

export const metadata = {
  title: "Work | ZTech",
  description: "Selected case studies and premium digital products built by ZTech.",
};

export default function ProjectsPage() {
  return (
    <main className="pt-32 pb-24 min-h-screen">
      <Container>
        <SectionHeading subtitle="Selected Work">
          Featured Projects
        </SectionHeading>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {DEMO_PROJECTS.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`} className="group block">
              <div 
                className="aspect-video rounded-3xl overflow-hidden relative mb-6 border border-border bg-foreground/5"
              >
                <img src={project.images[0]} alt={project.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>
              <h3 className="text-2xl font-bold font-heading group-hover:text-primary transition-colors">{project.title}</h3>
              <p className="text-muted">{project.category}</p>
            </Link>
          ))}
        </div>
      </Container>
    </main>
  );
}
