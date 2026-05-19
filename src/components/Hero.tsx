import { Search, MapPin, Home, DollarSign } from "lucide-react";
import heroImg from "@/assets/hero-mansion.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      <img
        src={heroImg}
        alt="Luxury Colombian estate at twilight"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-32 pb-20">
        <div className="max-w-3xl">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/30 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-primary backdrop-blur">
            <span className="h-1 w-1 rounded-full bg-primary" /> Private Real Estate · Colombia
          </span>

          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-7xl lg:text-[5.5rem]">
            Discover <span className="text-gradient-gold">premium</span><br />
            properties in Colombia
          </h1>

          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            A curated portfolio of luxury homes, beachfront villas and elite
            residences — handpicked for discerning buyers and international
            investors.
          </p>
        </div>

        {/* Glass search */}
        <div className="glass-strong mt-12 max-w-5xl rounded-2xl p-3 shadow-luxury">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-[1.2fr_1fr_1fr_auto]">
            <SearchField icon={<MapPin className="h-4 w-4" />} label="Location" placeholder="Cartagena, Medellín..." />
            <SearchField icon={<Home className="h-4 w-4" />} label="Property type" placeholder="Villa, Penthouse..." />
            <SearchField icon={<DollarSign className="h-4 w-4" />} label="Price range" placeholder="$500K – $5M" />
            <button className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-gold px-7 py-4 text-sm font-medium tracking-widest text-primary-foreground shadow-glow transition-smooth hover:scale-[1.02]">
              <Search className="h-4 w-4" />
              FIND NOW
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid max-w-3xl grid-cols-3 gap-8 border-t border-border pt-8">
          <Stat value="240+" label="Curated listings" />
          <Stat value="18" label="Years of expertise" />
          <Stat value="$1.2B" label="In transactions" />
        </div>
      </div>
    </section>
  );
}

function SearchField({
  icon,
  label,
  placeholder,
}: {
  icon: React.ReactNode;
  label: string;
  placeholder: string;
}) {
  return (
    <div className="group rounded-xl border border-transparent bg-background/20 px-4 py-3 transition-smooth hover:border-primary/40">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-primary/80">
        {icon}
        {label}
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="mt-1 w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
      />
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-semibold text-foreground md:text-4xl">
        {value}
      </div>
      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
