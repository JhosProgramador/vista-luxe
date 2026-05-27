import { useState } from "react";
import { MapPin, Bed, Bath, Maximize, Phone, MessageCircle, Mail, CheckCircle2 } from "lucide-react";
import { useData } from "@/store/dataStore";

type Props = {
  propertyId?: string;
  title: string;
  location: string;
  price: string;
  status: string;
  beds: number;
  baths: number;
  size: string;
};

export function PropertySidebar({
  propertyId,
  title,
  location,
  price,
  status,
  beds,
  baths,
  size,
}: Props) {
  const { addLead, addMessage } = useData();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [sent, setSent] = useState(false);

  return (
    <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <h1 className="font-display text-2xl font-bold leading-tight">{title}</h1>
        <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-primary" />
          {location}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="font-display text-3xl font-bold text-gradient-gold">
            {price}
          </div>
          <span className="rounded-md border border-primary/40 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-primary">
            {status}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-5 text-xs text-muted-foreground">
          <Spec icon={<Bed className="h-4 w-4" />} value={`${beds} Beds`} />
          <Spec icon={<Bath className="h-4 w-4" />} value={`${baths} Baths`} />
          <Spec icon={<Maximize className="h-4 w-4" />} value={size} />
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-gold font-display text-lg font-bold text-primary-foreground">
            VC
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Your Advisor
            </p>
            <h3 className="font-display text-base font-semibold text-foreground">
              Valentina Castro
            </h3>
            <p className="text-xs text-muted-foreground">Senior Luxury Specialist</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <a
            href="https://wa.me/573200000000?text=Hola%2C%20me%20interesa%20esta%20propiedad"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-2.5 text-xs font-medium text-white transition-smooth hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <a
            href="mailto:hello@vcestates.com"
            className="flex items-center justify-center gap-1.5 rounded-lg border border-primary/50 px-3 py-2.5 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
          >
            <Mail className="h-4 w-4" />
            Email
          </a>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <h2 className="font-display text-lg font-semibold">Schedule a Tour</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Fill out the form and our advisor will contact you to schedule a
          private visit.
        </p>

        <form
          className="mt-4 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Input
            placeholder="Your Name"
            value={form.name}
            onChange={(v) => setForm({ ...form, name: v })}
          />
          <Input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(v) => setForm({ ...form, email: v })}
          />
          <Input
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={(v) => setForm({ ...form, phone: v })}
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-gold px-5 py-3 text-sm font-medium tracking-wide text-primary-foreground shadow-glow transition-smooth hover:scale-[1.02]"
          >
            Request Tour
          </button>
        </form>

        <div className="mt-5 border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">Or call us directly</p>
          <a
            href="tel:+573200000000"
            className="mt-1 flex items-center gap-2 font-display text-lg font-semibold text-primary"
          >
            <Phone className="h-4 w-4" /> +57 320 000 0000
          </a>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
        <h2 className="font-display text-lg font-semibold">Location</h2>
        <p className="mt-1 text-xs text-muted-foreground">{location}</p>
        <div className="mt-3 overflow-hidden rounded-lg border border-border">
          <iframe
            title="Mini map"
            className="h-32 w-full grayscale"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-75.58%2C6.20%2C-75.55%2C6.23&layer=mapnik"
          />
        </div>
        <button className="mt-3 w-full rounded-lg border border-primary/50 px-4 py-2 text-xs uppercase tracking-widest text-primary transition-colors hover:bg-primary/10">
          View on Map
        </button>
      </div>
    </aside>
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

function Input({
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
    />
  );
}
