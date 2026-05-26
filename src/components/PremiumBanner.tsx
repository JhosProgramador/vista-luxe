import { ArrowUpRight } from "lucide-react";
import banner from "@/assets/premium-banner.jpg";
import { useT } from "@/i18n/I18nProvider";

export function PremiumBanner() {
  const t = useT();
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="relative overflow-hidden rounded-3xl border border-border shadow-luxury">
        <img
          src={banner}
          alt="Premium beachfront estate"
          loading="lazy"
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/10" />
        <div className="relative grid gap-6 p-10 md:grid-cols-2 md:p-16 lg:p-20">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-primary">
              {t("For International Investors")}
            </span>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
              {t("Premium properties.")}<br />
              <span className="text-gradient-gold">{t("Priced in USD.")}</span>
            </h2>
            <p className="mt-5 max-w-md text-muted-foreground">
              {t("Exclusive access to Colombia's most coveted addresses — beachfront estates, mountain retreats and signature residences, available to global investors with full concierge support.")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-xs font-medium tracking-widest text-primary-foreground shadow-glow transition-smooth hover:scale-[1.03]">
                {t("EXPLORE PREMIUM")}
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-xs tracking-widest text-foreground transition-smooth hover:border-primary hover:text-primary">
                {t("BOOK A PRIVATE TOUR")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
