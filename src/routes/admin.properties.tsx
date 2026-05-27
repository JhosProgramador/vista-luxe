import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { Plus, Pencil, Trash2, X, Upload, Search, ImageIcon } from "lucide-react";
import { useData, type Property, type PropertyStatus, type PropertyType } from "@/store/dataStore";

export const Route = createFileRoute("/admin/properties")({
  component: AdminProperties,
});

function AdminProperties() {
  const { properties, addProperty, updateProperty, removeProperty } = useData();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | PropertyStatus>("all");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Property | null>(null);

  const filtered = properties.filter(
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

  const save = (data: Omit<Property, "id" | "createdAt" | "views">) => {
    if (editing) {
      updateProperty(editing.id, data);
    } else {
      addProperty(data);
    }
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <AdminHeader title="Properties" subtitle={`${properties.length} listings in inventory`} />

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
              <th className="py-4 pl-6 text-left font-normal">Image</th>
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
                <td className="py-3 pl-6">
                  <div className="h-12 w-16 overflow-hidden rounded-md border border-border bg-muted">
                    {p.images[0] ? (
                      <img src={p.images[0]} alt={p.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                        <ImageIcon className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </td>
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
                      onClick={() => {
                        if (confirm(`Delete "${p.title}"?`)) removeProperty(p.id);
                      }}
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

type DraftProperty = Omit<Property, "id" | "createdAt" | "views">;

function PropertyDialog({
  initial,
  onClose,
  onSave,
}: {
  initial: Property | null;
  onClose: () => void;
  onSave: (p: DraftProperty) => void;
}) {
  const [form, setForm] = useState<DraftProperty>(
    initial
      ? {
          title: initial.title,
          location: initial.location,
          price: initial.price,
          status: initial.status,
          type: initial.type,
          beds: initial.beds,
          baths: initial.baths,
          size: initial.size,
          description: initial.description ?? "",
          images: initial.images,
          featured: initial.featured ?? false,
        }
      : {
          title: "",
          location: "",
          price: "",
          status: "Draft",
          type: "Sale",
          beds: 3,
          baths: 2,
          size: "",
          description: "",
          images: [],
          featured: false,
        }
  );

  const fileRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;
    const readers = Array.from(files).map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const r = new FileReader();
          r.onload = () => resolve(r.result as string);
          r.onerror = reject;
          r.readAsDataURL(file);
        })
    );
    const dataUrls = await Promise.all(readers);
    setForm((f) => ({ ...f, images: [...f.images, ...dataUrls] }));
  };

  const removeImage = (idx: number) =>
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-border bg-card shadow-luxury">
        <div className="sticky top-0 flex items-center justify-between border-b border-border bg-card px-6 py-4">
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
              onChange={(e) => setForm({ ...form, type: e.target.value as PropertyType })}
              className="input"
            >
              <option>Sale</option>
              <option>Rent</option>
            </select>
          </Field>
          <Field label="Status">
            <select
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as PropertyStatus })}
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
          <Field label="Description" className="sm:col-span-2">
            <textarea
              rows={3}
              value={form.description ?? ""}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="input"
            />
          </Field>

          <div className="sm:col-span-2">
            <label className="flex cursor-pointer items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
              <input
                type="checkbox"
                checked={!!form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              Show on Home (Featured)
            </label>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs uppercase tracking-widest text-muted-foreground">
              Images
            </label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
            <div
              onClick={() => fileRef.current?.click()}
              className="flex h-28 cursor-pointer items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:border-primary hover:text-primary"
            >
              <Upload className="mr-2 h-4 w-4" /> Drop or click to upload
            </div>
            {form.images.length > 0 && (
              <div className="mt-3 grid grid-cols-4 gap-2">
                {form.images.map((src, i) => (
                  <div key={i} className="group relative h-20 overflow-hidden rounded-md border border-border">
                    <img src={src} alt="" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute right-1 top-1 hidden h-5 w-5 items-center justify-center rounded-full bg-background/80 text-foreground group-hover:flex"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
