import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminHeader } from "@/components/admin/AdminHeader";
import {
  Building2,
  TrendingUp,
  Eye,
  DollarSign,
  ArrowUpRight,
  Plus,
} from "lucide-react";
import { useData } from "@/store/dataStore";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function parsePrice(s: string) {
  const n = parseFloat(s.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function AdminDashboard() {
  const { properties, leads } = useData();

  const active = properties.filter((p) => p.status !== "Draft").length;
  const totalViews = properties.reduce((a, p) => a + (p.views ?? 0), 0);
  const openLeads = leads.filter((l) => l.status !== "Closed").length;
  const revenue = properties
    .filter((p) => p.status === "Published" || p.status === "Premium")
    .reduce((a, p) => a + parsePrice(p.price), 0);

  const stats = [
    { label: "Active Listings", value: active.toString(), trend: `${properties.length} total`, icon: Building2 },
    { label: "Total Views", value: totalViews.toLocaleString(), trend: "all-time", icon: Eye },
    { label: "Open Leads", value: openLeads.toString(), trend: `${leads.length} total`, icon: TrendingUp },
    {
      label: "Portfolio Value",
      value: revenue >= 1_000_000 ? `$${(revenue / 1_000_000).toFixed(1)}M` : `$${revenue.toLocaleString()}`,
      trend: "published + premium",
      icon: DollarSign,
    },
  ];

  const recentProperties = [...properties]
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, 5);
  const recentLeads = leads.slice(0, 4);

  return (
    <div className="flex flex-col gap-8">
      <AdminHeader
        title="Dashboard"
        subtitle="Welcome back. Here's what's happening across your portfolio."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-5 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                {s.label}
              </span>
              <s.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-3 font-display text-3xl font-bold text-gradient-gold">
              {s.value}
            </div>
            <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowUpRight className="h-3 w-3 text-primary" />
              {s.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <section className="rounded-2xl border border-border bg-card p-6 shadow-card lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-display text-lg font-semibold">Recent Properties</h2>
              <p className="text-xs text-muted-foreground">Latest listings in your inventory</p>
            </div>
            <Link
              to="/admin/properties"
              className="flex items-center gap-2 rounded-full bg-gradient-gold px-4 py-2 text-xs font-medium tracking-widest text-primary-foreground shadow-glow"
            >
              <Plus className="h-3.5 w-3.5" />
              ADD
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-widest text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="py-3 text-left font-normal">ID</th>
                  <th className="py-3 text-left font-normal">Property</th>
                  <th className="py-3 text-left font-normal">Status</th>
                  <th className="py-3 text-right font-normal">Price</th>
                  <th className="py-3 text-right font-normal">Views</th>
                </tr>
              </thead>
              <tbody>
                {recentProperties.map((p) => (
                  <tr key={p.id} className="border-b border-border/60 last:border-0">
                    <td className="py-3 font-mono text-[11px] text-muted-foreground">
                      {p.id.slice(0, 8)}
                    </td>
                    <td className="py-3">{p.title}</td>
                    <td className="py-3">
                      <StatusPill status={p.status} />
                    </td>
                    <td className="py-3 text-right text-primary">{p.price}</td>
                    <td className="py-3 text-right text-muted-foreground">{p.views}</td>
                  </tr>
                ))}
                {recentProperties.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-xs text-muted-foreground">
                      No properties yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
          <h2 className="font-display text-lg font-semibold">Recent Leads</h2>
          <p className="text-xs text-muted-foreground">Latest enquiries</p>
          <ul className="mt-5 flex flex-col gap-4">
            {recentLeads.map((l) => (
              <li key={l.id} className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                  {l.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1">
                  <p className="text-sm">{l.name}</p>
                  <p className="text-xs text-muted-foreground">{l.property}</p>
                </div>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {l.date}
                </span>
              </li>
            ))}
            {recentLeads.length === 0 && (
              <li className="py-6 text-center text-xs text-muted-foreground">
                No leads yet.
              </li>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const color =
    status === "Premium"
      ? "border-primary/40 text-primary"
      : status === "Draft"
      ? "border-border text-muted-foreground"
      : "border-gold-soft/40 text-gold-soft";
  return (
    <span className={`rounded-md border px-2 py-0.5 text-[10px] uppercase tracking-widest ${color}`}>
      {status}
    </span>
  );
}
