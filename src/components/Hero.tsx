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
      {/* Always-dark cinematic overlay (independent of theme) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.12 0.012 250 / 0.35) 0%, oklch(0.12 0.012 250 / 0.78) 70%, var(--background) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pt-32 pb-20">
        <div className="max-w-3xl">
          <span className="reveal mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.3em] text-gold-soft backdrop-blur">
            <span className="h-1 w-1 rounded-full bg-gold-soft" /> Private Real Estate · Colombia
          </span>

          <h1 className="reveal reveal-delay-1 font-display text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl lg:text-[5.5rem]"
              style={{ textShadow: "0 2px 30px oklch(0 0 0 / 0.4)" }}>
            Discover{" "}
            <span
              className="text-gradient-gold"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, #FFFFFF 0%, #F5E6B8 35%, #D4AF6A 70%, #B8893E 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                filter: "drop-shadow(0 2px 18px oklch(0.78 0.12 80 / 0.45))",
              }}
            >
              premium
            </span>
            <br />
            properties in Colombia
          </h1>

          <p className="reveal reveal-delay-2 mt-6 max-w-xl text-base text-white/85 md:text-lg">
            A curated portfolio of luxury homes, beachfront villas and elite
            residences — handpicked for discerning buyers and international
            investors.
          </p>
        </div>

        {/* Glass search — always-dark glass for contrast over the hero image */}
        <div className="glass-hero reveal reveal-delay-3 mt-12 max-w-5xl rounded-2xl p-3 shadow-luxury">
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
        <div className="reveal reveal-delay-4 mt-16 grid max-w-3xl grid-cols-3 gap-8 border-t border-white/15 pt-8">
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
    <div className="group rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 transition-smooth hover:border-gold-soft/60 hover:bg-white/[0.1]">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-gold-soft">
        {icon}
        {label}
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="mt-1 w-full bg-transparent text-sm text-white placeholder:text-white/45 focus:outline-none"
      />
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-semibold text-white md:text-4xl">
        {value}
      </div>
      <div className="mt-1 text-xs uppercase tracking-[0.2em] text-white/70">
        {label}
      </div>
    </div>
  );
}
