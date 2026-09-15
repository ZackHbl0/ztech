import { Hero } from "@/components/hero/Hero";
import { AboutSection } from "@/components/home/AboutSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProjectsSection } from "@/components/home/ProjectsSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { FoundersSection } from "@/components/home/FoundersSection";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { TechStackSection } from "@/components/home/TechStackSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col overflow-x-clip">
      <Hero />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ProcessSection />
      <FoundersSection />
      <StatsSection />
      <TestimonialsSection />
      <TechStackSection />
    </main>
  );
}
