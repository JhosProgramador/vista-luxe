import { useState } from "react";
import {
  Home,
  FileText,
  Sparkles,
  MapPin,
  LayoutPanelTop,
  PlayCircle,
  CheckCircle2,
  Waves,
  Trees,
  Car,
  Wifi,
  Snowflake,
  Dumbbell,
  Flame,
  Shield,
} from "lucide-react";

const tabs = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "details", label: "Details", icon: FileText },
  { id: "amenities", label: "Amenities", icon: Sparkles },
  { id: "location", label: "Location", icon: MapPin },
  { id: "floor", label: "Floor Plan", icon: LayoutPanelTop },
  { id: "video", label: "Video", icon: PlayCircle },
] as const;

type TabId = (typeof tabs)[number]["id"];

export function PropertyTabs() {
  const [active, setActive] = useState<TabId>("overview");

  return (
    <section className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-card md:p-8">
      <div className="flex flex-wrap gap-1 border-b border-border">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`relative flex items-center gap-2 px-4 py-3 text-sm transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              {t.label}
              {isActive && (
                <span className="absolute inset-x-2 -bottom-px h-0.5 bg-gradient-gold" />
              )}
            </button>
          );
        })}
      </div>

      <div className="pt-6">
        {active === "overview" && <Overview />}
        {active === "details" && <Details />}
        {active === "amenities" && <Amenities />}
        {active === "location" && <LocationPanel />}
        {active === "floor" && <FloorPlan />}
        {active === "video" && <VideoPanel />}
      </div>
    </section>
  );
}

function Overview() {
  const highlights = [
    { k: "Year Built", v: "2022" },
    { k: "Property Type", v: "Villa" },
    { k: "Property Status", v: "For Sale" },
    { k: "Property ID", v: "VC-0450" },
  ];
  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <h3 className="font-display text-lg font-semibold">Description</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          This stunning modern villa offers luxury living in a serene private
          enclave. With spacious living areas, floor-to-ceiling windows, a
          private infinity pool and curated landscape design, every detail has
          been thought out to deliver an effortless lifestyle.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Perfect for those who appreciate architectural integrity, natural
          light and timeless materials — a true signature residence.
        </p>
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold">Property Highlights</h3>
        <ul className="mt-3 space-y-3">
          {highlights.map((h) => (
            <li key={h.k} className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">{h.k}:</span>
              <span className="text-foreground">{h.v}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Details() {
  const rows = [
    ["Interior Size", "3,200 sqft"],
    ["Lot Size", "8,500 sqft"],
    ["Bedrooms", "4"],
    ["Bathrooms", "3"],
    ["Garage", "2 cars"],
    ["Floors", "2"],
    ["Year Built", "2022"],
    ["Condition", "Brand New"],
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {rows.map(([k, v]) => (
        <div
          key={k}
          className="flex items-center justify-between rounded-lg border border-border bg-background/40 px-4 py-3 text-sm"
        >
          <span className="text-muted-foreground">{k}</span>
          <span className="font-medium text-foreground">{v}</span>
        </div>
      ))}
    </div>
  );
}

function Amenities() {
  const items = [
    { icon: Waves, label: "Infinity Pool" },
    { icon: Trees, label: "Private Garden" },
    { icon: Car, label: "2-Car Garage" },
    { icon: Wifi, label: "Smart Home" },
    { icon: Snowflake, label: "Climate Control" },
    { icon: Dumbbell, label: "Home Gym" },
    { icon: Flame, label: "Fireplace" },
    { icon: Shield, label: "24/7 Security" },
  ];
  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
      {items.map((a) => {
        const Icon = a.icon;
        return (
          <div
            key={a.label}
            className="flex items-center gap-3 rounded-lg border border-border bg-background/40 px-4 py-3 text-sm"
          >
            <Icon className="h-4 w-4 text-primary" />
            <span className="text-foreground">{a.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function LocationPanel() {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <iframe
        title="Map"
        className="h-80 w-full grayscale"
        src="https://www.openstreetmap.org/export/embed.html?bbox=-75.58%2C6.20%2C-75.55%2C6.23&layer=mapnik"
      />
    </div>
  );
}

function FloorPlan() {
  return (
    <div className="rounded-xl border border-dashed border-border bg-background/40 p-12 text-center">
      <LayoutPanelTop className="mx-auto h-10 w-10 text-primary" />
      <p className="mt-3 text-sm text-muted-foreground">
        Floor plan available upon request.
      </p>
    </div>
  );
}

function VideoPanel() {
  return (
    <div className="rounded-xl border border-dashed border-border bg-background/40 p-12 text-center">
      <PlayCircle className="mx-auto h-10 w-10 text-primary" />
      <p className="mt-3 text-sm text-muted-foreground">
        Video tour coming soon.
      </p>
    </div>
  );
}
