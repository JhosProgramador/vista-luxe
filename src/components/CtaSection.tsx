import { useT } from "@/i18n/I18nProvider";

export function CtaSection() {
  const t = useT();
  return (
    <section className="mx-auto max-w-5xl px-6 py-28 text-center">
      <span className="text-[11px] uppercase tracking-[0.3em] text-primary">
        {t("A bridge to your next home")}
      </span>
      <h2 className="mt-5 font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
        {t("Let us guide you to your")}<br />
        <span className="text-gradient-gold">{t("next signature address.")}</span>
      </h2>
      <p className="mx-auto mt-6 max-w-xl text-muted-foreground">
        {t("Our private advisors curate properties tailored to your lifestyle, portfolio and ambitions. Discreet, dedicated, distinguished.")}
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <button className="rounded-full bg-gradient-gold px-8 py-3.5 text-xs font-medium tracking-widest text-primary-foreground shadow-glow transition-smooth hover:scale-[1.03]">
          {t("SCHEDULE A CONSULTATION")}
        </button>
        <button className="rounded-full border border-border px-8 py-3.5 text-xs tracking-widest text-foreground transition-smooth hover:border-primary hover:text-primary">
          {t("BROWSE PROPERTIES")}
        </button>
      </div>
    </section>
  );
}
