import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Mail, Phone, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/admin/leads")({
  component: AdminLeads,
});

type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  status: "New" | "Contacted" | "Qualified" | "Closed";
  date: string;
};

const leads: Lead[] = [
  { id: "L-001", name: "Sofía Mejía", email: "sofia@example.com", phone: "+57 320 555 0101", property: "Oceanfront Villa", status: "New", date: "2026-05-21" },
  { id: "L-002", name: "James Carter", email: "james@example.com", phone: "+1 305 555 0199", property: "El Poblado Villa", status: "Contacted", date: "2026-05-20" },
  { id: "L-003", name: "Camila Rivera", email: "camila@example.com", phone: "+57 311 555 0143", property: "Sky Penthouse", status: "Qualified", date: "2026-05-18" },
  { id: "L-004", name: "Lucas Bernal", email: "lucas@example.com", phone: "+57 300 555 0177", property: "Beachfront Bocagrande", status: "Closed", date: "2026-05-15" },
];

const statusColors: Record<Lead["status"], string> = {
  New: "border-gold-soft/40 text-gold-soft",
  Contacted: "border-primary/40 text-primary",
  Qualified: "border-primary/60 text-primary",
  Closed: "border-border text-muted-foreground",
};

function AdminLeads() {
  const [data, setData] = useState(leads);

  const updateStatus = (id: string, status: Lead["status"]) =>
    setData((xs) => xs.map((l) => (l.id === id ? { ...l, status } : l)));

  return (
    <div className="flex flex-col gap-8">
      <AdminHeader title="Leads" subtitle={`${data.length} active enquiries`} />

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="py-4 pl-6 text-left font-normal">Lead</th>
              <th className="py-4 text-left font-normal">Interest</th>
              <th className="py-4 text-left font-normal">Contact</th>
              <th className="py-4 text-left font-normal">Status</th>
              <th className="py-4 pr-6 text-right font-normal">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((l) => (
              <tr key={l.id} className="border-b border-border/60 last:border-0 hover:bg-muted/40">
                <td className="py-4 pl-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                      {l.name.split(" ").map((n) => n[0]).join("")}
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
                    <a href={`tel:${l.phone}`} className="hover:text-primary"><Phone className="h-4 w-4" /></a>
                    <a href="#" className="hover:text-primary"><MessageCircle className="h-4 w-4" /></a>
                  </div>
                </td>
                <td className="py-4">
                  <select
                    value={l.status}
                    onChange={(e) => updateStatus(l.id, e.target.value as Lead["status"])}
                    className={`rounded-md border bg-transparent px-2 py-1 text-[10px] uppercase tracking-widest ${statusColors[l.status]}`}
                  >
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Qualified</option>
                    <option>Closed</option>
                  </select>
                </td>
                <td className="py-4 pr-6 text-right text-xs text-muted-foreground">{l.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
