import { Logo } from "./Logo";
import { Instagram, Facebook, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-5 max-w-sm text-sm text-muted-foreground">
              VC Estates — a private real estate agency curating premium
              properties across Colombia for local and international clients.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="rounded-full border border-border p-2.5 text-muted-foreground transition-smooth hover:border-primary hover:text-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
          <FooterCol title="Explore" items={["Home", "Properties", "Premium", "About"]} />
          <FooterCol title="Contact" items={["Bogotá, Colombia", "+57 320 000 0000", "hello@vcestates.co"]} />
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} VC Estates. All rights reserved.</p>
          <p className="tracking-widest">PRIVATE · LUXURY · TRUST</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-[0.25em] text-primary">{title}</h4>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i} className="cursor-pointer transition-colors hover:text-foreground">
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
