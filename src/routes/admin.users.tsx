import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Plus, Shield, ShieldCheck, User, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/users")({
  component: AdminUsers,
});

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Agent" | "Editor";
  status: "Active" | "Invited";
};

const initial: AdminUser[] = [
  { id: "U-01", name: "Valentina Castillo", email: "valentina@vcestates.co", role: "Owner", status: "Active" },
  { id: "U-02", name: "Mateo Restrepo", email: "mateo@vcestates.co", role: "Admin", status: "Active" },
  { id: "U-03", name: "Camila Ortiz", email: "camila@vcestates.co", role: "Agent", status: "Active" },
  { id: "U-04", name: "Daniel Pérez", email: "daniel@vcestates.co", role: "Editor", status: "Invited" },
];

const roleIcon: Record<AdminUser["role"], any> = {
  Owner: ShieldCheck,
  Admin: Shield,
  Agent: User,
  Editor: User,
};

function AdminUsers() {
  const [users, setUsers] = useState(initial);

  const remove = (id: string) => setUsers((xs) => xs.filter((u) => u.id !== id));

  return (
    <div className="flex flex-col gap-8">
      <AdminHeader title="Team & Users" subtitle={`${users.length} members in your workspace`} />

      <div className="flex justify-end">
        <button className="flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-2.5 text-xs font-medium tracking-widest text-primary-foreground shadow-glow">
          <Plus className="h-4 w-4" /> INVITE MEMBER
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="py-4 pl-6 text-left font-normal">Member</th>
              <th className="py-4 text-left font-normal">Email</th>
              <th className="py-4 text-left font-normal">Role</th>
              <th className="py-4 text-left font-normal">Status</th>
              <th className="py-4 pr-6 text-right font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const Icon = roleIcon[u.role];
              return (
                <tr key={u.id} className="border-b border-border/60 last:border-0 hover:bg-muted/40">
                  <td className="py-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-gold text-xs font-semibold text-primary-foreground">
                        {u.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="font-medium">{u.name}</span>
                    </div>
                  </td>
                  <td className="py-4 text-muted-foreground">{u.email}</td>
                  <td className="py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-0.5 text-[10px] uppercase tracking-widest text-muted-foreground">
                      <Icon className="h-3 w-3 text-primary" /> {u.role}
                    </span>
                  </td>
                  <td className="py-4">
                    <span
                      className={`rounded-md border px-2 py-0.5 text-[10px] uppercase tracking-widest ${
                        u.status === "Active"
                          ? "border-gold-soft/40 text-gold-soft"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="py-4 pr-6">
                    <div className="flex justify-end">
                      <button
                        onClick={() => remove(u.id)}
                        disabled={u.role === "Owner"}
                        className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition-colors hover:border-destructive hover:text-destructive disabled:opacity-30"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
