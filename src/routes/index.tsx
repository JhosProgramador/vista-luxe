import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedProperties } from "@/components/FeaturedProperties";
import { PremiumBanner } from "@/components/PremiumBanner";
import { CtaSection } from "@/components/CtaSection";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VC Estates — Premium Properties in Colombia" },
      {
        name: "description",
        content:
          "VC Estates is a private real estate agency curating luxury homes, beachfront villas and premium residences across Colombia for local and international investors.",
      },
      { property: "og:title", content: "VC Estates — Premium Properties in Colombia" },
      {
        property: "og:description",
        content:
          "Discover handpicked luxury properties in Colombia. A private agency for discerning local and international buyers.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <FeaturedProperties />
        <PremiumBanner />
        <CtaSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
