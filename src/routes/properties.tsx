import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PropertyFilters } from "@/components/PropertyFilters";
import { PropertyGrid } from "@/components/PropertyGrid";

export const Route = createFileRoute("/properties")({
  head: () => ({
    meta: [
      { title: "Properties — VC Estates" },
      {
        name: "description",
        content:
          "Browse our curated collection of luxury homes, penthouses and beachfront villas. Filter by location, type and price.",
      },
      { property: "og:title", content: "Properties — VC Estates" },
      {
        property: "og:description",
        content:
          "Explore premium residences for sale and rent across Colombia and beyond.",
      },
    ],
  }),
  component: PropertiesPage,
});

function PropertiesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <header className="mb-10">
            <span className="text-[11px] uppercase tracking-[0.3em] text-primary">
              Our Collection
            </span>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Properties
            </h1>
            <p className="mt-3 max-w-xl text-sm text-muted-foreground">
              A curated selection of signature residences. Use the filters to
              refine by location, type and price.
            </p>
          </header>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <PropertyFilters />
            </aside>
            <PropertyGrid />
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
