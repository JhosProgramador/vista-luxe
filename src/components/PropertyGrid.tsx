import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bed, Bath, Maximize, MapPin, Plus, LayoutGrid, List } from "lucide-react";
import p1 from "@/assets/property-1.jpg";
import p2 from "@/assets/property-2.jpg";
import p3 from "@/assets/property-3.jpg";

type Property = {
  id: string;
  img: string;
  title: string;
  location: string;
  price: string;
  status: "For Sale" | "For Rent" | "Premium";
  beds: number;
  baths: number;
  size: string;
};

const properties: Property[] = [
  { id: "1", img: p1, title: "Modern Villa in El Poblado", location: "Medellín, CO", price: "$2,450,000", status: "For Sale", beds: 4, baths: 3, size: "3200 sqft" },
  { id: "2", img: p2, title: "Oceanfront Villa", location: "Cartagena, CO", price: "$3,250,000", status: "Premium", beds: 5, baths: 4, size: "4500 sqft" },
  { id: "3", img: p3, title: "Luxury Apartment", location: "Bogotá, CO", price: "$1,650,000", status: "For Sale", beds: 3, baths: 2, size: "1800 sqft" },
  { id: "4", img: p1, title: "Modern Townhouse", location: "Santa Marta, CO", price: "$1,250,000 /month", status: "For Rent", beds: 3, baths: 2, size: "1900 sqft" },
  { id: "5", img: p2, title: "Beachfront Villa", location: "Bocagrande, CO", price: "$4,250,000", status: "Premium", beds: 4, baths: 5, size: "3100 sqft" },
  { id: "6", img: p3, title: "Sky Penthouse", location: "Medellín, CO", price: "$2,150,000 /month", status: "For Rent", beds: 4, baths: 3, size: "2400 sqft" },
  { id: "7", img: p1, title: "Ocean View House", location: "Santa Marta, CO", price: "$2,850,000", status: "For Sale", beds: 4, baths: 3, size: "2800 sqft" },
  { id: "8", img: p2, title: "Mountain Retreat", location: "Llanogrande, CO", price: "$1,950,000", status: "For Sale", beds: 3, baths: 2, size: "1600 sqft" },
];

const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low", "Most Popular"];

export function PropertyGrid() {
  const [view, setView] = useState<"grid" | "list">("grid");

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-display text-base font-semibold text-primary">
            {properties.length}
          </span>{" "}
          properties found
        </p>

        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Sort by
          </span>
          <select className="rounded-lg border border-border bg-background/60 px-3 py-2 text-sm text-foreground outline-none focus:border-primary">
            {sortOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
          <div className="flex overflow-hidden rounded-lg border border-border">
            <button
              onClick={() => setView("grid")}
              className={`p-2 transition-colors ${
                view === "grid"
                  ? "bg-gradient-gold text-primary-foreground"
                  : "text-muted-foreground hover:text-primary"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 transition-colors ${
                view === "list"
                  ? "bg-gradient-gold text-primary-foreground"
                  : "text-muted-foreground hover:text-primary"
              }`}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
            : "flex flex-col gap-5"
        }
      >
        {properties.map((p) => (
          <Card key={p.id} property={p} layout={view} />
        ))}
      </div>

      <Pagination />
    </div>
  );
}

function Card({ property: p, layout }: { property: Property; layout: "grid" | "list" }) {
  const statusColor =
    p.status === "Premium"
      ? "border-primary/50 text-primary"
      : p.status === "For Rent"
      ? "border-gold-soft/40 text-gold-soft"
      : "border-border text-muted-foreground";

  return (
    <article
      className={`hover-lift group overflow-hidden rounded-2xl border border-border bg-card shadow-card ${
        layout === "list" ? "flex flex-col md:flex-row" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          layout === "list" ? "h-60 md:h-auto md:w-72 md:shrink-0" : "h-60"
        }`}
      >
        <img
          src={p.img}
          alt={p.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
        />
        <span
          className={`absolute left-3 top-3 rounded-md border bg-background/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] backdrop-blur ${statusColor}`}
        >
          {p.status}
        </span>
        <button
          aria-label="Save"
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background/60 text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <Link
          to="/properties/$id"
          params={{ id: p.id }}
          className="font-display text-lg font-semibold text-foreground transition-colors hover:text-primary"
        >
          {p.title}
        </Link>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          {p.location}
        </div>
        <div className="mt-3 font-display text-xl font-bold text-gradient-gold">
          {p.price}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
          <Spec icon={<Bed className="h-4 w-4" />} value={`${p.beds} Beds`} />
          <Spec icon={<Bath className="h-4 w-4" />} value={`${p.baths} Baths`} />
          <Spec icon={<Maximize className="h-4 w-4" />} value={p.size} />
        </div>
      </div>
    </article>
  );
}

function Spec({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-primary">{icon}</span>
      {value}
    </div>
  );
}

function Pagination() {
  const pages = [1, 2, 3, 4, "...", 10];
  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      {pages.map((p, i) => (
        <button
          key={i}
          className={`flex h-9 w-9 items-center justify-center rounded-md text-sm transition-colors ${
            p === 1
              ? "bg-gradient-gold text-primary-foreground shadow-glow"
              : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
          }`}
        >
          {p}
        </button>
      ))}
      <button className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:border-primary hover:text-primary">
        ›
      </button>
    </div>
  );
}
