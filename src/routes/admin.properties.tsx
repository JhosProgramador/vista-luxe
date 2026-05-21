import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Plus, Pencil, Trash2, X, Upload, Search } from "lucide-react";

export const Route = createFileRoute("/admin/properties")({
  component: AdminProperties,
});

type Property = {
  id: string;
  title: string;
  location: string;
  price: string;
  status: "Published" | "Draft" | "Premium";
  type: "Sale" | "Rent";
  beds: number;
  baths: number;
  size: string;
};

const initial: Property[] = [
  { id: "P-2401", title: "Modern Villa El Poblado", location: "Medellín", price: "$2,450,000", status: "Published", type: "Sale", beds: 4, baths: 3, size: "3200 sqft" },
  { id: "P-2402", title: "Oceanfront Villa", location: "Cartagena", price: "$3,250,000", status: "Premium", type: "Sale", beds: 5, baths: 4, size: "4500 sqft" },
  { id: "P-2403", title: "Sky Penthouse", location: "Medellín", price: "$2,150,000", status: "Draft", type: "Rent", beds: 4, baths: 3, size: "2400 sqft" },
  { id: "P-2404", title: "Mountain Retreat", location: "Llanogrande", price: "$1,950,000", status: "Published", type: "Sale", beds: 3, baths: 2, size: "1600 sqft" },
  { id: "P-2405", title: "Beachfront Villa", location: "Bocagrande", price: "$4,250,000", status: "Premium", type: "Sale", beds: 4, baths: 5, size: "3100 sqft" },
];

function AdminProperties() {
  const [items, setItems] = useState<Property[]>(initial);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | Property["status"]>("all");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Property | null>(null);

  const filtered = items.filter(
    (p) =>
      (filter === "all" || p.status === filter) &&
      (p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.location.toLowerCase().includes(query.toLowerCase()))
  );

  const openNew = () => {
    setEditing(null);
    setOpen(true);
  };
  const openEdit = (p: Property) => {
    setEditing(p);
    setOpen(true);
  };
  const remove = (id: string) => setItems((xs) => xs.filter((x) => x.id !== id));

  const save = (data: Omit<Property, "id">) => {
    if (editing) {
      setItems((xs) => xs.map((x) => (x.id === editing.id ? { ...editing, ...data } : x)));
    } else {
      setItems((xs) => [
        { ...data, id: `P-${2400 + xs.length + 10}` },
        ...xs,
      ]);
    }
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <AdminHeader title="Properties" subtitle={`${items.length} listings in inventory`} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search properties…"
              className="w-72 rounded-full border border-border bg-background/60 py-2 pl-9 pr-4 text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="flex overflow-hidden rounded-full border border-border text-xs">
            {(["all", "Published", "Draft", "Premium"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 uppercase tracking-widest transition-colors ${
                  filter === f
                    ? "bg-gradient-gold text-primary-foreground"
                    : "text-muted-foreground hover:text-primary"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={openNew}
          className="flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-2.5 text-xs font-medium tracking-widest text-primary-foreground shadow-glow transition-smooth hover:scale-[1.03]"
        >
          <Plus className="h-4 w-4" /> NEW PROPERTY
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
        <table className="w-full text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-widest text-muted-foreground">
            <tr>
              <th className="py-4 pl-6 text-left font-normal">ID</th>
              <th className="py-4 text-left font-normal">Property</th>
              <th className="py-4 text-left font-normal">Location</th>
              <th className="py-4 text-left font-normal">Type</th>
              <th className="py-4 text-left font-normal">Status</th>
              <th className="py-4 text-right font-normal">Price</th>
              <th className="py-4 pr-6 text-right font-normal">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-border/60 last:border-0 hover:bg-muted/40">
                <td className="py-4 pl-6 font-mono text-xs text-muted-foreground">{p.id}</td>
                <td className="py-4">
                  <div className="font-medium">{p.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {p.beds} bd · {p.baths} ba · {p.size}
                  </div>
                </td>
                <td className="py-4 text-muted-foreground">{p.location}</td>
                <td className="py-4 text-muted-foreground">{p.type}</td>
                <td className="py-4"><StatusPill status={p.status} /></td>
                <td className="py-4 text-right text-primary">{p.price}</td>
                <td className="py-4 pr-6">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEdit(p)}
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:border-primary hover:text-primary"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => remove(p.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:border-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="py-12 text-center text-sm text-muted-foreground">
                  No properties match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {open && (
        <PropertyDialog
          initial={editing}
          onClose={() => setOpen(false)}
          onSave={save}
        />
      )}
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

function PropertyDialog({
  initial,
  onClose,
  onSave,
}: {
  initial: Property | null;
  onClose: () => void;
  onSave: (p: Omit<Property, "id">) => void;
}) {
  const [form, setForm] = useState<Omit<Property, "id">>(
    initial ?? {
      title: "",
      location: "",
      price: "",
      status: "Draft",
      type: "Sale",
      beds: 3,
      baths: 2,
      size: "",
    }
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-luxury">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h3 className="font-display text-lg font-semibold">
            {initial ? "Edit Property" : "New Property"}
          </h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(form);
          }}
          className="grid gap-4 p-6 sm:grid-cols-2"
        >
          <Field label="Title" className="sm:col-span-2">
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="input"
            />
          </Field>
          <Field label="Location">
            <input
              required
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="input"
            />
          </Field>
          <Field label="Price">
            <input
              required
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              placeholder="$1,500,000"
              className="input"
            />
          </Field>
          <Field label="Type">
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value as Property["type"] })}
              className="input"
            >
              <option>Sale</option>
              <option>Rent</option>
            </select>
          </Field>
          <Field label="Status">
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as Property["status"] })}
              className="input"
            >
              <option>Draft</option>
              <option>Published</option>
              <option>Premium</option>
            </select>
          </Field>
          <Field label="Beds">
            <input
              type="number"
              min={0}
              value={form.beds}
              onChange={(e) => setForm({ ...form, beds: Number(e.target.value) })}
              className="input"
            />
          </Field>
          <Field label="Baths">
            <input
              type="number"
              min={0}
              value={form.baths}
              onChange={(e) => setForm({ ...form, baths: Number(e.target.value) })}
              className="input"
            />
          </Field>
          <Field label="Size" className="sm:col-span-2">
            <input
              value={form.size}
              onChange={(e) => setForm({ ...form, size: e.target.value })}
              placeholder="3200 sqft"
              className="input"
            />
          </Field>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">
              Images
            </label>
            <div className="flex h-32 cursor-pointer items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:border-primary hover:text-primary">
              <Upload className="mr-2 h-4 w-4" /> Drop or click to upload
            </div>
          </div>

          <div className="mt-2 flex justify-end gap-3 sm:col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-border px-5 py-2 text-xs uppercase tracking-widest text-muted-foreground hover:border-primary hover:text-primary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-gradient-gold px-6 py-2 text-xs font-medium uppercase tracking-widest text-primary-foreground shadow-glow"
            >
              {initial ? "Save Changes" : "Create Property"}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.625rem;
          border: 1px solid var(--border);
          background: var(--background);
          padding: 0.55rem 0.875rem;
          font-size: 0.875rem;
          color: var(--foreground);
          outline: none;
        }
        .input:focus { border-color: var(--primary); }
      `}</style>
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}
