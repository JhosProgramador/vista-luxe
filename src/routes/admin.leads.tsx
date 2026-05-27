import { createFileRoute } from "@tanstack/react-router";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Mail, Phone, MessageCircle, Trash2 } from "lucide-react";
import { useData, type LeadStatus } from "@/store/dataStore";

export const Route = createFileRoute("/admin/leads")({
  component: AdminLeads,
});

const statusColors: Record<LeadStatus, string> = {
  New: "border-gold-soft/40 text-gold-soft",
  Contacted: "border-primary/40 text-primary",
  Qualified: "border-primary/60 text-primary",
  Closed: "border-border text-muted-foreground",
};

function AdminLeads() {
  const { leads, updateLeadStatus, removeLead } = useData();

  return (
    <div className="flex flex-col gap-8">
      <AdminHeader title="Leads" subtitle={`${leads.length} active enquiries`} />

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="py-4 pl-6 text-left font-normal">Lead</th>
              <th className="py-4 text-left font-normal">Interest</th>
              <th className="py-4 text-left font-normal">Contact</th>
              <th className="py-4 text-left font-normal">Status</th>
              <th className="py-4 text-right font-normal">Date</th>
              <th className="py-4 pr-6 text-right font-normal"></th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.id} className="border-b border-border/60 last:border-0 hover:bg-muted/40">
                <td className="py-4 pl-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                      {l.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <div className="font-medium">{l.name}</div>
                      <div className="text-xs text-muted-foreground">{l.id}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4">{l.property}</td>
                <td className="py-4">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <a href={`mailto:${l.email}`} className="hover:text-primary"><Mail className="h-4 w-4" /></a>
                    {l.phone && <a href={`tel:${l.phone}`} className="hover:text-primary"><Phone className="h-4 w-4" /></a>}
                    {l.phone && (
                      <a
                        href={`https://wa.me/${l.phone.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </td>
                <td className="py-4">
                  <select
                    value={l.status}
                    onChange={(e) => updateLeadStatus(l.id, e.target.value as LeadStatus)}
                    className={`rounded-md border bg-transparent px-2 py-1 text-[10px] uppercase tracking-widest ${statusColors[l.status]}`}
                  >
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Qualified</option>
                    <option>Closed</option>
                  </select>
                </td>
                <td className="py-4 text-right text-xs text-muted-foreground">{l.date}</td>
                <td className="py-4 pr-6 text-right">
                  <button
                    onClick={() => {
                      if (confirm(`Delete lead from ${l.name}?`)) removeLead(l.id);
                    }}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:border-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={6} className="py-12 text-center text-sm text-muted-foreground">
                  No leads yet. Enquiries from the public site will appear here.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
