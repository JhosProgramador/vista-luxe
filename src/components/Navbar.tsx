import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Menu, X, Globe } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const links = [
  { label: "Home", to: "/" },
  { label: "Properties", to: "/properties" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Admin", to: "/admin" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"ES" | "EN">("ES");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-smooth ${
        scrolled ? "glass-strong py-3" : "py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                to={l.to}
                className="text-sm tracking-wide text-muted-foreground transition-colors hover:text-primary"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <button
            onClick={() => setLang(lang === "ES" ? "EN" : "ES")}
            className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs tracking-widest text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <Globe className="h-3.5 w-3.5" />
            {lang}
          </button>
          <button className="rounded-full bg-gradient-gold px-5 py-2 text-xs font-medium tracking-widest text-primary-foreground shadow-glow transition-smooth hover:scale-[1.03]">
            CONTACT
          </button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="glass-strong mt-3 md:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4">
            {links.map((l) => (
              <li key={l.label}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm text-muted-foreground hover:text-primary"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
