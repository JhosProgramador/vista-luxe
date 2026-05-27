import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Linkedin,
  Facebook,
  Send,
  Building2,
  CheckCircle2,
} from "lucide-react";
import { z } from "zod";
import contactHero from "@/assets/contact-hero.jpg";
import { useT } from "@/i18n/I18nProvider";
import { useData } from "@/store/dataStore";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — VC Estates | Private Luxury Real Estate" },
      {
        name: "description",
        content:
          "Get in touch with VC Estates. Our private advisors are available for confidential consultations across Bogotá, Medellín and Cartagena.",
      },
      { property: "og:title", content: "Contact — VC Estates" },
      {
        property: "og:description",
        content:
          "Schedule a private consultation with our luxury real estate advisors.",
      },
      { property: "og:image", content: contactHero },
    ],
  }),
  component: ContactPage,
});

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

const offices = [
  {
    city: "Bogotá",
    address: "Cra. 11 #93-46, Chicó Norte",
    phone: "+57 320 000 0001",
    hours: "Mon–Fri 9:00–18:00",
  },
  {
    city: "Medellín",
    address: "Cra. 37 #8A-43, El Poblado",
    phone: "+57 320 000 0002",
    hours: "Mon–Fri 9:00–18:00",
  },
  {
    city: "Cartagena",
    address: "Cl. del Arzobispado, Centro",
    phone: "+57 320 000 0003",
    hours: "Mon–Sat 10:00–19:00",
  },
];

const subjects = [
  "General inquiry",
  "Buy a property",
  "Sell my property",
  "Premium portfolio",
  "International client",
  "Press / Media",
];

function ContactPage() {
  const t = useT();
  const { addLead, addMessage } = useData();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fe: Record<string, string> = {};
      for (const issue of result.error.issues) {
        fe[String(issue.path[0])] = issue.message;
      }
      setErrors(fe);
      return;
    }
    setErrors({});
    addLead({
      name: form.name,
      email: form.email,
      phone: form.phone,
      property: form.subject || "General enquiry",
      message: form.message,
    });
    addMessage({
      from: form.name,
      email: form.email,
      subject: form.subject || "General enquiry",
      text: form.message,
    });
    setSent(true);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="relative isolate overflow-hidden pt-40 pb-24">
          <div
            className="absolute inset-0 -z-10 opacity-30"
            style={{
              backgroundImage: `url(${contactHero})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background/70 via-background/85 to-background" />
          <div className="mx-auto max-w-4xl px-6 text-center">
            <span className="text-xs uppercase tracking-[0.4em] text-primary">
              {t("Contact")}
            </span>
            <h1 className="mt-6 font-display text-5xl font-light leading-tight md:text-7xl">
              {t("Let's start a")}
              <span className="block text-gradient-gold italic">
                {t("private conversation.")}
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-base text-muted-foreground md:text-lg">
              {t("Our private advisors are available for confidential consultations across Bogotá, Medellín and Cartagena.")}
            </p>
          </div>
        </section>

        {/* Form + Info */}
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="glass rounded-3xl p-8 md:p-12">
                <span className="text-xs uppercase tracking-[0.4em] text-primary">
                  {t("Send us a message")}
                </span>
                <h2 className="mt-3 font-display text-3xl font-light md:text-4xl">
                  {t("How can we help?")}
                </h2>

                {sent && (
                  <div className="mt-6 flex items-center gap-3 rounded-xl border border-primary/40 bg-primary/10 p-4 text-sm text-primary">
                    <CheckCircle2 className="h-5 w-5" />
                    {t("Thank you. One of our advisors will contact you shortly.")}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field
                      label={t("Full name")}
                      error={errors.name}
                      value={form.name}
                      onChange={(v) => setForm({ ...form, name: v })}
                      maxLength={100}
                      placeholder="Jane Doe"
                    />
                    <Field
                      label={t("Email")}
                      type="email"
                      error={errors.email}
                      value={form.email}
                      onChange={(v) => setForm({ ...form, email: v })}
                      maxLength={255}
                      placeholder="jane@email.com"
                    />
                  </div>

                  <div className="grid gap-5 md:grid-cols-2">
                    <Field
                      label={t("Phone")}
                      error={errors.phone}
                      value={form.phone}
                      onChange={(v) => setForm({ ...form, phone: v })}
                      maxLength={40}
                      placeholder="+57 320 000 0000"
                    />
                    <div>
                      <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                        {t("Subject")}
                      </label>
                      <select
                        value={form.subject}
                        onChange={(e) =>
                          setForm({ ...form, subject: e.target.value })
                        }
                        className="mt-2 w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                      >
                        <option value="">{t("Select a topic…") }</option>
                        {subjects.map((s) => (
                          <option key={s} value={s}>
                            {t(s)}
                          </option>
                        ))}
                      </select>
                      {errors.subject && (
                        <p className="mt-1 text-xs text-destructive">
                          {errors.subject}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      {t("Message")}
                    </label>
                    <textarea
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      maxLength={1000}
                      rows={6}
                      placeholder={t("Tell us about the property or service you're interested in…")}
                      className="mt-2 w-full resize-none rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                    />
                    <div className="mt-1 flex justify-between">
                      {errors.message ? (
                        <p className="text-xs text-destructive">
                          {errors.message}
                        </p>
                      ) : (
                        <span />
                      )}
                      <span className="text-xs text-muted-foreground">
                        {form.message.length}/1000
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="group inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-3 text-xs font-medium uppercase tracking-[0.25em] text-primary-foreground shadow-glow transition-smooth hover:scale-[1.02]"
                  >
                    {t("Send Message")}
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              </div>
            </div>

            {/* Info */}
            <aside className="lg:col-span-2 space-y-6">
              <div className="glass rounded-3xl p-8">
                <Building2 className="h-6 w-6 text-primary" />
                <h3 className="mt-4 font-display text-2xl">Direct line</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Reach our headquarters directly — Monday through Friday.
                </p>
                <ul className="mt-6 space-y-4 text-sm">
                  <InfoRow icon={Phone} label="+57 320 000 0000" />
                  <InfoRow icon={Mail} label="hello@vcestates.co" />
                  <InfoRow
                    icon={Clock}
                    label="Mon–Fri · 9:00–18:00 (COT)"
                  />
                </ul>
                <div className="mt-8 flex gap-3 border-t border-border pt-6">
                  {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="rounded-full border border-border p-2.5 text-muted-foreground transition-smooth hover:border-primary hover:text-primary"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl bg-gradient-gold p-8 text-primary-foreground">
                <h3 className="font-display text-2xl">Premium clients</h3>
                <p className="mt-2 text-sm opacity-90">
                  For confidential, off-market portfolio inquiries, contact our
                  Premium desk directly.
                </p>
                <a
                  href="mailto:premium@vcestates.co"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-background/15 px-5 py-2.5 text-xs uppercase tracking-[0.25em] backdrop-blur transition-colors hover:bg-background/25"
                >
                  <Mail className="h-3.5 w-3.5" />
                  premium@vcestates.co
                </a>
              </div>
            </aside>
          </div>
        </section>

        {/* Offices */}
        <section className="border-t border-border bg-card/40">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs uppercase tracking-[0.4em] text-primary">
                {t("Our Offices")}
              </span>
              <h2 className="mt-4 font-display text-4xl font-light md:text-5xl">
                {t("Visit us in person.")}
              </h2>
            </div>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {offices.map((o) => (
                <div
                  key={o.city}
                  className="hover-lift glass rounded-2xl p-8 transition-smooth hover:border-primary/40"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-primary">
                    {o.city}
                  </p>
                  <h3 className="mt-3 font-display text-2xl">VC Estates</h3>
                  <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
                    <InfoRow icon={MapPin} label={o.address} />
                    <InfoRow icon={Phone} label={o.phone} />
                    <InfoRow icon={Clock} label={o.hours} />
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 overflow-hidden rounded-3xl border border-border">
              <iframe
                title="VC Estates location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-74.06%2C4.66%2C-74.04%2C4.68&layer=mapnik"
                className="h-[420px] w-full grayscale"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  type = "text",
  maxLength,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  maxLength?: number;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <li className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
      <span>{label}</span>
    </li>
  );
}
