import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PropertyGallery } from "@/components/PropertyGallery";
import { PropertyTabs } from "@/components/PropertyTabs";
import { PropertySidebar } from "@/components/PropertySidebar";
import { useData } from "@/store/dataStore";

export const Route = createFileRoute("/properties/$id")({
  head: ({ params }) => ({
    meta: [
      { title: `Property ${params.id} — VC Estates` },
      {
        name: "description",
        content:
          "A signature residence curated by VC Estates. Schedule a private tour.",
      },
      { property: "og:title", content: "VC Estates — Luxury Residence" },
      { property: "og:url", content: `/properties/${params.id}` },
    ],
    links: [{ rel: "canonical", href: `/properties/${params.id}` }],
  }),
  component: PropertyDetailPage,
  notFoundComponent: NotFoundProperty,
});

function PropertyDetailPage() {
  const { id } = Route.useParams();
  const { getProperty } = useData();
  const property = getProperty(id);

  if (!property) {
    throw notFound();
  }

  const statusLabel =
    property.status === "Premium"
      ? "Premium"
      : property.type === "Rent"
      ? "For Rent"
      : "For Sale";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar solid />
      <main className="pt-28 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <Breadcrumb title={property.title} />

          <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
            <div>
              <PropertyGallery images={property.images} status={statusLabel} />
              <PropertyTabs />
            </div>
            <PropertySidebar
              propertyId={property.id}
              title={property.title}
              location={property.location}
              price={property.price}
              status={statusLabel}
              beds={property.beds}
              baths={property.baths}
              size={property.size}
            />
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function NotFoundProperty() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar solid />
      <main className="flex min-h-[60vh] items-center justify-center px-6 pt-28 text-center">
        <div>
          <h1 className="font-display text-3xl font-bold">Property not found</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            This listing may have been removed or is no longer available.
          </p>
          <Link
            to="/properties"
            className="mt-6 inline-flex rounded-full bg-gradient-gold px-5 py-2.5 text-xs uppercase tracking-widest text-primary-foreground shadow-glow"
          >
            View all properties
          </Link>
        </div>
      </main>
      <Footer />
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
