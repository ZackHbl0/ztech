import { ServicesSection } from "@/components/home/ServicesSection";

export const metadata = {
  title: "Services | ZTech",
  description: "Premium digital services and engineering capabilities.",
};

export default function ServicesPage() {
  return (
    <main className="pt-16 min-h-screen">
      <ServicesSection />
    </main>
  );
}
