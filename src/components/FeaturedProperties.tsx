import { Bed, Bath, Maximize, MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useT } from "@/i18n/I18nProvider";
import { useData } from "@/store/dataStore";

export function FeaturedProperties() {
  const t = useT();
  const { properties } = useData();
  const featured = properties
    .filter((p) => p.featured && p.status !== "Draft")
    .slice(0, 3);

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-28">
      <div className="mb-14 flex items-end justify-between gap-6">
        <div>
          <span className="text-[11px] uppercase tracking-[0.3em] text-primary">
            {t("Featured Properties")}
          </span>
          <h2 className="mt-3 max-w-xl font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {t("Handpicked residences,")}<br />
            <span className="text-gradient-gold">{t("extraordinary spaces.")}</span>
          </h2>
        </div>
        <Link
          to="/properties"
          className="hidden items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs tracking-widest text-muted-foreground transition-smooth hover:border-primary hover:text-primary md:inline-flex"
        >
          {t("VIEW ALL")}
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((p) => (
          <Link
            key={p.id}
            to="/properties/$id"
            params={{ id: p.id }}
            className="hover-lift group block overflow-hidden rounded-2xl border border-border bg-card shadow-card"
          >
            <div className="relative h-72 overflow-hidden bg-muted">
              {p.images[0] && (
                <img
                  src={p.images[0]}
                  alt={p.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full border border-primary/40 bg-background/40 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-primary backdrop-blur">
                {p.status}
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
                <Spec icon={<Bed className="h-4 w-4" />} value={`${p.beds} ${t("Beds")}`} />
                <Spec icon={<Bath className="h-4 w-4" />} value={`${p.baths} ${t("Baths")}`} />
                <Spec icon={<Maximize className="h-4 w-4" />} value={p.size} />
              </div>
            </div>
          </Link>
        ))}
        {featured.length === 0 && (
          <div className="col-span-full rounded-2xl border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
            {t("No featured properties yet.")}
          </div>
        )}
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
