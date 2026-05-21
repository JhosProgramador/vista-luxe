import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  Users,
  Inbox,
  Settings,
  LogOut,
  Crown,
} from "lucide-react";
import { Logo } from "@/components/Logo";

const items = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/properties", label: "Properties", icon: Building2 },
  { to: "/admin/premium", label: "Premium", icon: Crown },
  { to: "/admin/leads", label: "Leads", icon: Inbox },
  { to: "/admin/messages", label: "Messages", icon: MessageSquare },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border bg-card/40 px-4 py-6 backdrop-blur lg:flex">
      <div className="px-2">
        <Logo />
        <p className="mt-1 px-1 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Admin Console
        </p>
      </div>

      <nav className="mt-10 flex flex-1 flex-col gap-1">
        {items.map((it) => {
          const active = it.exact ? pathname === it.to : pathname.startsWith(it.to);
          return (
            <Link
              key={it.to}
              to={it.to}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-gradient-gold text-primary-foreground shadow-glow"
                  : "text-muted-foreground hover:bg-muted hover:text-primary"
              }`}
            >
              <it.icon className="h-4 w-4" />
              {it.label}
            </Link>
          );
        })}
      </nav>

      <Link
        to="/"
        className="mt-4 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
      >
        <LogOut className="h-4 w-4" />
        Back to site
      </Link>
    </aside>
  );
}
