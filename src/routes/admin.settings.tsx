import { createFileRoute } from "@tanstack/react-router";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun, Globe, Bell, Lock } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-8">
      <AdminHeader title="Settings" subtitle="Workspace preferences & account" />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Appearance" icon={theme === "dark" ? Moon : Sun}>
          <p className="text-sm text-muted-foreground">
            Switch between dark and light mode across the entire platform.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3">
            {(["dark", "light"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm capitalize transition-colors ${
                  theme === t
                    ? "border-primary bg-gradient-gold text-primary-foreground shadow-glow"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {t === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                {t}
              </button>
            ))}
          </div>
        </Card>

        <Card title="Language" icon={Globe}>
          <p className="text-sm text-muted-foreground">Default platform language.</p>
          <select className="mt-5 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-primary">
            <option>Español (ES)</option>
            <option>English (EN)</option>
          </select>
        </Card>

        <Card title="Notifications" icon={Bell}>
          <ul className="mt-2 flex flex-col gap-4 text-sm">
            <Toggle label="New leads" defaultChecked />
            <Toggle label="Property views weekly digest" defaultChecked />
            <Toggle label="Premium listing alerts" />
            <Toggle label="Marketing updates" />
          </ul>
        </Card>

        <Card title="Security" icon={Lock}>
          <ul className="mt-2 flex flex-col gap-4 text-sm">
            <Toggle label="Two-factor authentication" defaultChecked />
            <Toggle label="Session timeout (30 min)" />
          </ul>
          <button className="mt-6 rounded-full border border-border px-5 py-2 text-xs uppercase tracking-widest text-muted-foreground hover:border-primary hover:text-primary">
            Change Password
          </button>
        </Card>
      </div>
    </div>
  );
}

function Card({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 shadow-card">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <h2 className="font-display text-lg font-semibold">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Toggle({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
  return (
    <li className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <label className="relative inline-flex h-6 w-11 cursor-pointer items-center">
        <input type="checkbox" defaultChecked={defaultChecked} className="peer sr-only" />
        <span className="absolute inset-0 rounded-full bg-muted transition-colors peer-checked:bg-gradient-gold" />
        <span className="absolute left-0.5 h-5 w-5 rounded-full bg-background shadow transition-transform peer-checked:translate-x-5" />
      </label>
    </li>
  );
}
