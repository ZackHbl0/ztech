import { Container } from "@/components/ui/Container";
import { ProcessSection } from "@/components/home/ProcessSection";

export const metadata = {
  title: "Process | ZTech",
  description: "How we build premium digital products.",
};

export default function ProcessPage() {
  return (
    <main className="pt-32 pb-24 min-h-screen">
      <Container>
        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8">Engineering Process</h1>
      </Container>
      <ProcessSection />
    </main>
  );
}
