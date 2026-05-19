import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

const locations = ["All Locations", "Medellín", "Bogotá", "Cartagena", "Santa Marta", "Miami"];
const types = ["Any Type", "House", "Apartment", "Penthouse", "Villa", "Land"];
const bedOptions = ["Any", "1+", "2+", "3+", "4+", "5+"];
const bathOptions = ["Any", "1+", "2+", "3+", "4+"];

export function PropertyFilters() {
  const [price, setPrice] = useState<[number, number]>([240, 2600]);

  return (
    <div className="rounded-2xl border border-border bg-card/60 p-6 shadow-card backdrop-blur">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">Filters</h2>
        <button
          onClick={() => setPrice([240, 2600])}
          className="text-xs uppercase tracking-widest text-primary transition-colors hover:text-gold-soft"
        >
          Clear All
        </button>
      </div>

      <Field label="Location">
        <Select options={locations} />
      </Field>

      <Field label="Property Type">
        <Select options={types} />
      </Field>

      <Field label="Price Range">
        <div className="text-sm text-foreground">
          ${price[0]}k <span className="text-muted-foreground">—</span> ${price[1]}k
        </div>
        <div className="mt-3 space-y-2">
          <input
            type="range"
            min={0}
            max={5000}
            step={50}
            value={price[0]}
            onChange={(e) => setPrice([Number(e.target.value), price[1]])}
            className="range-gold w-full"
          />
          <input
            type="range"
            min={0}
            max={5000}
            step={50}
            value={price[1]}
            onChange={(e) => setPrice([price[0], Number(e.target.value)])}
            className="range-gold w-full"
          />
        </div>
        <div className="mt-1 flex justify-between text-[11px] text-muted-foreground">
          <span>${price[0]}k</span>
          <span>${price[1]}k</span>
        </div>
      </Field>

      <Field label="Bedrooms">
        <Select options={bedOptions} />
      </Field>

      <Field label="Bathrooms">
        <Select options={bathOptions} />
      </Field>

      <div className="mb-6">
        <label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
          Property Status
        </label>
        <Checkbox label="For Sale (120)" defaultChecked />
        <Checkbox label="For Rent (45)" />
        <Checkbox label="Premium (28)" />
      </div>

      <button className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-5 py-3 text-xs font-medium tracking-widest text-primary-foreground shadow-glow transition-smooth hover:scale-[1.02]">
        APPLY FILTERS
        <SlidersHorizontal className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <label className="mb-2 block text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </label>
      {children}
    </div>
  );
}

function Select({ options }: { options: string[] }) {
  return (
    <select className="w-full appearance-none rounded-lg border border-border bg-background/60 px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary">
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function Checkbox({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) {
  return (
    <label className="mt-2 flex cursor-pointer items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="h-4 w-4 accent-primary"
      />
      {label}
    </label>
  );
}
