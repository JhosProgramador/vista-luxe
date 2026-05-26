import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CtaSection } from "@/components/CtaSection";
import {
  Award,
  Globe2,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Building2,
  Instagram,
  Linkedin,
  Mail,
} from "lucide-react";
import aboutTeam from "@/assets/about-team.jpg";
import aboutStory from "@/assets/about-story.jpg";
import team1 from "@/assets/team-1.jpg";
import team2 from "@/assets/team-2.jpg";
import team3 from "@/assets/team-3.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — VC Estates | Private Luxury Real Estate" },
      {
        name: "description",
        content:
          "VC Estates is a private real estate agency curating premium properties in Colombia for discerning local and international clients. Discover our story, values and team.",
      },
      { property: "og:title", content: "About — VC Estates" },
      {
        property: "og:description",
        content:
          "A private boutique agency built on trust, discretion and a deep love for exceptional architecture.",
      },
      { property: "og:image", content: aboutTeam },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: ShieldCheck,
    title: "Discretion",
    text: "Every client and every listing is handled with absolute confidentiality.",
  },
  {
    icon: Sparkles,
    title: "Curation",
    text: "We don't list everything. We hand-pick properties that meet our standard.",
  },
  {
    icon: HeartHandshake,
    title: "Connection",
    text: "We bridge buyers and homes through a long, human relationship — not a transaction.",
  },
  {
    icon: Globe2,
    title: "Global Reach",
    text: "Local roots in Colombia, with clients and partners across the Americas and Europe.",
  },
];

const stats = [
  { value: "18+", label: "Years curating luxury" },
  { value: "240+", label: "Active listings" },
  { value: "$1.2B", label: "In transactions" },
  { value: "32", label: "Countries served" },
];

const team = [
  {
    name: "Valentina Castillo",
    role: "Founder & Principal Broker",
    img: team1,
  },
  {
    name: "Mateo Restrepo",
    role: "Head of Premium Portfolio",
    img: team2,
  },
  {
    name: "Camila Ortiz",
    role: "International Clients Director",
    img: team3,
  },
];

import { useT } from "@/i18n/I18nProvider";

function AboutPage() {
  const t = useT();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative isolate overflow-hidden pt-40 pb-24">
          <div
            className="absolute inset-0 -z-10 opacity-30"
            style={{
              backgroundImage: `url(${aboutTeam})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/70 via-background/85 to-background" />
          <div className="mx-auto max-w-4xl px-6 text-center">
            <span className="text-xs uppercase tracking-[0.4em] text-primary">
              {t("About VC Estates")}
            </span>
            <h1 className="mt-6 font-display text-5xl font-light leading-tight md:text-7xl">
              {t("A private agency for")}
              <span className="block text-gradient-gold italic">
                {t("signature addresses.")}
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-base text-muted-foreground md:text-lg">
              {t("VC Estates is a boutique real estate house. We curate a small, private portfolio of Colombia's most refined homes for clients who value architecture, privacy and a relationship that lasts.")}
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="relative">
              <img
                src={aboutStory}
                alt="VC Estates headquarters at twilight"
                width={1280}
                height={1024}
                loading="lazy"
                className="rounded-2xl shadow-luxury"
              />
              <div className="glass-strong absolute -bottom-8 -right-6 hidden rounded-2xl p-6 md:block">
                <Building2 className="h-6 w-6 text-primary" />
                <p className="mt-3 font-display text-2xl">Est. 2007</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  Bogotá · Medellín · Cartagena
                </p>
              </div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-[0.4em] text-primary">
                {t("Our Story")}
              </span>
              <h2 className="mt-4 font-display text-4xl font-light leading-tight md:text-5xl">
                {t("Built on trust, refined by")}{" "}
                <span className="text-gradient-gold">{t("time")}</span>.
              </h2>
              <div className="mt-8 space-y-5 text-muted-foreground">
                <p>
                  We started in 2007 with a simple conviction: a great home is
                  not a product to be sold, it's a story to be matched. Since
                  then, VC Estates has grown into one of Colombia's most
                  trusted private real estate houses, working with families,
                  investors and institutions across the world.
                </p>
                <p>
                  We do not run a marketplace. Every listing is invited into
                  the portfolio by our team, vetted for quality, location and
                  architectural integrity — and presented only to the clients
                  we believe will love it.
                </p>
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <span className="rounded-full border border-border px-4 py-1.5 text-xs tracking-widest text-muted-foreground">
                  PRIVATE
                </span>
                <span className="rounded-full border border-border px-4 py-1.5 text-xs tracking-widest text-muted-foreground">
                  BOUTIQUE
                </span>
                <span className="rounded-full border border-primary/40 px-4 py-1.5 text-xs tracking-widest text-primary">
                  AWARD WINNING
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-border bg-card/40">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-12 px-6 py-16 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-4xl text-gradient-gold md:text-5xl">
                  {s.value}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {t(s.label)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs uppercase tracking-[0.4em] text-primary">
              {t("Our Values")}
            </span>
            <h2 className="mt-4 font-display text-4xl font-light md:text-5xl">
              {t("What we stand for.")}
            </h2>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div
                key={v.title}
                className="hover-lift glass rounded-2xl p-8 transition-smooth hover:border-primary/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-gold">
                  <v.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <h3 className="mt-6 font-display text-xl">{v.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs uppercase tracking-[0.4em] text-primary">
                The Team
              </span>
              <h2 className="mt-4 font-display text-4xl font-light md:text-5xl">
                People behind the portfolio.
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              A small, senior team of advisors with deep market knowledge in
              Colombia and a global network of clients and partners.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {team.map((m) => (
              <div key={m.name} className="group">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={m.img}
                    alt={m.name}
                    width={768}
                    height={896}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-smooth group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-6">
                    <div>
                      <h3 className="font-display text-xl">{m.name}</h3>
                      <p className="text-xs uppercase tracking-widest text-primary">
                        {m.role}
                      </p>
                    </div>
                    <div className="flex gap-2 opacity-0 transition-smooth group-hover:opacity-100">
                      {[Instagram, Linkedin, Mail].map((Icon, i) => (
                        <a
                          key={i}
                          href="#"
                          className="rounded-full border border-border bg-background/60 p-2 text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Awards strip */}
        <section className="border-y border-border">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-16 gap-y-6 px-6 py-12 text-muted-foreground">
            {[
              "Forbes Global Properties",
              "Luxury Portfolio Intl.",
              "Christie's Affiliate",
              "Leading RE World",
              "Architectural Digest",
            ].map((label) => (
              <div
                key={label}
                className="flex items-center gap-2 text-xs uppercase tracking-[0.3em]"
              >
                <Award className="h-4 w-4 text-primary" />
                {label}
              </div>
            ))}
          </div>
        </section>

        <CtaSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
