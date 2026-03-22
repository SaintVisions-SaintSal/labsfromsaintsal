import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { AgentsSection } from "@/components/agents-section";
import { CTASection } from "@/components/cta-section";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <FeaturesSection />
        <AgentsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
