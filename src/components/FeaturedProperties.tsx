import { Bed, Bath, Maximize, MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import p1 from "@/assets/property-1.jpg";
import p2 from "@/assets/property-2.jpg";
import p3 from "@/assets/property-3.jpg";

const properties = [
  {
    id: "1",
    img: p1,
    title: "Sky Penthouse · El Poblado",
    location: "Medellín, Colombia",
    price: "$1,250,000",
    badge: "Premium",
    beds: 3,
    baths: 4,
    size: "320 m²",
  },
  {
    id: "2",
    img: p2,
    title: "Oceanfront Villa Bocagrande",
    location: "Cartagena, Colombia",
    price: "$2,890,000",
    badge: "Luxury",
    beds: 5,
    baths: 6,
    size: "640 m²",
  },
  {
    id: "3",
    img: p3,
    title: "Casa Moderna Chía",
    location: "Bogotá, Colombia",
    price: "$680,000",
    badge: "Standard",
    beds: 4,
    baths: 3,
    size: "410 m²",
  },
];

export function FeaturedProperties() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-28">
      <div className="mb-14 flex items-end justify-between gap-6">
        <div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-primary">
            Featured Properties
          </span>
          <h2 className="mt-3 max-w-xl font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Handpicked residences,<br />
            <span className="text-gradient-gold">extraordinary spaces.</span>
          </h2>
        </div>
        <button className="hidden items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs tracking-widest text-muted-foreground transition-smooth hover:border-primary hover:text-primary md:inline-flex">
          VIEW ALL
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((p) => (
          <article
            key={p.title}
            className="hover-lift group overflow-hidden rounded-2xl border border-border bg-card shadow-card"
          >
            <div className="relative h-72 overflow-hidden">
              <img
                src={p.img}
                alt={p.title}
                loading="lazy"
                width={1024}
                height={768}
                className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full border border-primary/40 bg-background/40 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-primary backdrop-blur">
                {p.badge}
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                {p.location}
              </div>
              <h3 className="mt-2 font-display text-xl font-semibold text-foreground">
                {p.title}
              </h3>
              <div className="mt-3 font-display text-2xl font-bold text-gradient-gold">
                {p.price}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                <Spec icon={<Bed className="h-4 w-4" />} value={`${p.beds} Beds`} />
                <Spec icon={<Bath className="h-4 w-4" />} value={`${p.baths} Baths`} />
                <Spec icon={<Maximize className="h-4 w-4" />} value={p.size} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
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
