import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Bed, Bath, Maximize, MapPin, Plus, LayoutGrid, List } from "lucide-react";
import { useData } from "@/store/dataStore";

const sortOptions = ["Newest", "Price: Low to High", "Price: High to Low"];

function parsePrice(s: string) {
  const n = parseFloat(s.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export function PropertyGrid() {
  const { properties } = useData();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState(sortOptions[0]);

  const visible = useMemo(() => {
    const list = properties.filter((p) => p.status !== "Draft");
    const sorted = [...list];
    if (sort === "Price: Low to High") sorted.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
    else if (sort === "Price: High to Low") sorted.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
    else sorted.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
    return sorted;
  }, [properties, sort]);

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          <span className="font-display text-base font-semibold text-primary">
            {visible.length}
          </span>{" "}
          properties found
        </p>

        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Sort by
          </span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-border bg-background/60 px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
          >
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
        {visible.map((p) => (
          <Card
            key={p.id}
            id={p.id}
            img={p.images[0]}
            title={p.title}
            location={p.location}
            price={p.price}
            status={p.status === "Premium" ? "Premium" : p.type === "Rent" ? "For Rent" : "For Sale"}
            beds={p.beds}
            baths={p.baths}
            size={p.size}
            layout={view}
          />
        ))}
        {visible.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
            No properties available yet.
          </div>
        )}
      </div>
    </div>
  );
}

function Card({
  id,
  img,
  title,
  location,
  price,
  status,
  beds,
  baths,
  size,
  layout,
}: {
  id: string;
  img?: string;
  title: string;
  location: string;
  price: string;
  status: string;
  beds: number;
  baths: number;
  size: string;
  layout: "grid" | "list";
}) {
  const statusColor =
    status === "Premium"
      ? "border-primary/50 text-primary"
      : status === "For Rent"
      ? "border-gold-soft/40 text-gold-soft"
      : "border-border text-muted-foreground";

  return (
    <article
      className={`hover-lift group overflow-hidden rounded-2xl border border-border bg-card shadow-card ${
        layout === "list" ? "flex flex-col md:flex-row" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden bg-muted ${
          layout === "list" ? "h-60 md:h-auto md:w-72 md:shrink-0" : "h-60"
        }`}
      >
        {img && (
          <img
            src={img}
            alt={title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
          />
        )}
        <span
          className={`absolute left-3 top-3 rounded-md border bg-background/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] backdrop-blur ${statusColor}`}
        >
          {status}
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
          params={{ id }}
          className="font-display text-lg font-semibold text-foreground transition-colors hover:text-primary"
        >
          {title}
        </Link>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          {location}
        </div>
        <div className="mt-3 font-display text-xl font-bold text-gradient-gold">
          {price}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
          <Spec icon={<Bed className="h-4 w-4" />} value={`${beds} Beds`} />
          <Spec icon={<Bath className="h-4 w-4" />} value={`${baths} Baths`} />
          <Spec icon={<Maximize className="h-4 w-4" />} value={size} />
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
