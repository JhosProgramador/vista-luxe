import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PropertyGallery } from "@/components/PropertyGallery";
import { PropertyTabs } from "@/components/PropertyTabs";
import { PropertySidebar } from "@/components/PropertySidebar";
import hero from "@/assets/detail-hero.jpg";
import d1 from "@/assets/detail-1.jpg";
import d2 from "@/assets/detail-2.jpg";
import d3 from "@/assets/detail-3.jpg";
import d4 from "@/assets/detail-4.jpg";

export const Route = createFileRoute("/properties/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Modern Villa in El Poblado — VC Estates` },
      {
        name: "description",
        content:
          "A signature modern villa with infinity pool, private garden and curated interiors. Schedule a private tour.",
      },
      { property: "og:title", content: "Modern Villa in El Poblado — VC Estates" },
      {
        property: "og:description",
        content: "Luxury villa for sale — schedule a private tour.",
      },
      { property: "og:url", content: `/properties/${params.id}` },
    ],
    links: [{ rel: "canonical", href: `/properties/${params.id}` }],
  }),
  component: PropertyDetailPage,
});

const property = {
  title: "Modern Villa in El Poblado",
  location: "Medellín, CO",
  price: "$2,450,000",
  status: "For Sale",
  beds: 4,
  baths: 3,
  size: "3,200 sqft",
  images: [hero, d1, d2, d3, d4],
};

function PropertyDetailPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <Breadcrumb title={property.title} />

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
            <div>
              <PropertyGallery images={property.images} status={property.status} />
              <PropertyTabs />
            </div>
            <PropertySidebar {...property} />
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function Breadcrumb({ title }: { title: string }) {
  return (
    <nav className="flex items-center gap-2 text-xs text-muted-foreground">
      <Link to="/" className="hover:text-primary">
        Home
      </Link>
      <ChevronRight className="h-3.5 w-3.5" />
      <Link to="/properties" className="hover:text-primary">
        Properties
      </Link>
      <ChevronRight className="h-3.5 w-3.5" />
      <span className="text-foreground">{title}</span>
    </nav>
  );
}
