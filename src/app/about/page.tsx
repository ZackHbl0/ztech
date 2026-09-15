import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata = {
  title: "About Us | ZTech",
  description: "Learn about ZTech, our mission, and the team behind our premium digital products.",
};

export default function AboutPage() {
  return (
    <main className="pt-32 pb-24 min-h-screen">
      <Container>
        <SectionHeading subtitle="About ZTech">
          We engineer the extraordinary
        </SectionHeading>
        
        <div className="mt-12 text-lg text-muted max-w-3xl leading-relaxed">
          <p className="mb-6">
            Founded with a singular vision to elevate the standard of digital products, ZTech combines Apple-level restraint with relentless engineering precision. 
          </p>
          <p>
            We don&apos;t believe in templates or shortcuts. We believe in crafting bespoke software solutions that act as massive competitive advantages for our clients. From fluid 3D experiences to hyper-scalable SaaS backends, our team of senior engineers and designers work as an extension of your business.
          </p>
        </div>
      </Container>
    </main>
  );
}
