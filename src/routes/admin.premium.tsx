import { createFileRoute } from "@tanstack/react-router";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Crown, Star, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/admin/premium")({
  component: AdminPremium,
});

const premium = [
  { id: "P-2402", title: "Oceanfront Villa", location: "Cartagena", priceUSD: "$3,250,000", views: 2105, leads: 14 },
  { id: "P-2405", title: "Beachfront Villa", location: "Bocagrande", priceUSD: "$4,250,000", views: 1820, leads: 11 },
  { id: "P-2410", title: "Andean Estate", location: "Llanogrande", priceUSD: "$5,100,000", views: 1450, leads: 8 },
];

function AdminPremium() {
  return (
    <div className="flex flex-col gap-8">
      <AdminHeader title="Premium Collection" subtitle="Signature listings with elevated exposure" />

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat icon={Crown} label="Premium Listings" value="12" />
        <Stat icon={Star} label="Avg. Engagement" value="x3.2" />
        <Stat icon={TrendingUp} label="Premium Revenue" value="$1.6M" />
      </div>

      <div className="overflow-hidden rounded-2xl border border-primary/30 bg-card shadow-glow">
        <div className="border-b border-border bg-gradient-to-r from-primary/10 to-transparent px-6 py-4">
          <h2 className="font-display text-lg font-semibold text-gradient-gold">Premium Inventory</h2>
          <p className="text-xs text-muted-foreground">Prices shown in USD</p>
        </div>
        <table className="w-full text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="py-4 pl-6 text-left font-normal">ID</th>
              <th className="py-4 text-left font-normal">Property</th>
              <th className="py-4 text-left font-normal">Location</th>
              <th className="py-4 text-right font-normal">Price (USD)</th>
              <th className="py-4 text-right font-normal">Views</th>
              <th className="py-4 pr-6 text-right font-normal">Leads</th>
            </tr>
          </thead>
          <tbody>
            {premium.map((p) => (
              <tr key={p.id} className="border-b border-border/60 last:border-0">
                <td className="py-4 pl-6 font-mono text-xs text-muted-foreground">{p.id}</td>
                <td className="py-4">{p.title}</td>
                <td className="py-4 text-muted-foreground">{p.location}</td>
                <td className="py-4 text-right text-primary">{p.priceUSD}</td>
                <td className="py-4 text-right text-muted-foreground">{p.views}</td>
                <td className="py-4 pr-6 text-right text-muted-foreground">{p.leads}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="mt-3 font-display text-3xl font-bold text-gradient-gold">{value}</div>
    </div>
  );
}
