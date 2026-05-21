import { Bell, Search } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function AdminHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Search…"
            className="w-64 rounded-full border border-border bg-background/60 py-2 pl-9 pr-4 text-sm outline-none focus:border-primary"
          />
        </div>
        <button className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:text-primary">
          <Bell className="h-4 w-4" />
        </button>
        <ThemeToggle />
        <div className="flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-gold text-xs font-semibold text-primary-foreground">
            VC
          </div>
          <span className="text-xs text-muted-foreground">Admin</span>
        </div>
      </div>
    </header>
  );
}
