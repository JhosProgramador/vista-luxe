import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Menu, X, Globe } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useI18n } from "@/i18n/I18nProvider";

const links = [
  { key: "Home", to: "/" },
  { key: "Properties", to: "/properties" },
  { key: "About", to: "/about" },
  { key: "Contact", to: "/contact" },
  { key: "Admin", to: "/admin" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkBase = scrolled
    ? "nav-link text-sm tracking-wide text-foreground/80 transition-colors hover:text-primary"
    : "nav-link text-sm tracking-wide text-white/85 transition-colors hover:text-white";

  const iconBtn = scrolled
    ? "flex h-9 items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs tracking-widest text-foreground/80 transition-colors hover:border-primary hover:text-primary"
    : "flex h-9 items-center gap-2 rounded-full border border-white/25 px-3 py-1.5 text-xs tracking-widest text-white/85 transition-colors hover:border-white hover:text-white";

  const toggleLang = () => setLang(lang === "en" ? "es" : "en");

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
            <li key={l.key}>
              <Link to={l.to} className={linkBase}>
                {t(l.key)}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle
            className={
              scrolled
                ? ""
                : "border-white/25 text-white/85 hover:border-white hover:text-white"
            }
          />
          <button
            onClick={toggleLang}
            className={iconBtn}
            aria-label="Toggle language"
            title={lang === "en" ? "Cambiar a español" : "Switch to English"}
          >
            <Globe className="h-3.5 w-3.5" />
            {lang.toUpperCase()}
          </button>
          <Link
            to="/contact"
            className="rounded-full bg-gradient-gold px-5 py-2 text-xs font-medium tracking-widest text-primary-foreground shadow-glow transition-smooth hover:scale-[1.04] hover:shadow-glow"
          >
            {t("CONTACT")}
          </Link>
        </div>

        <button
          className={`md:hidden ${scrolled ? "text-foreground" : "text-white"}`}
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
              <li key={l.key}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-sm text-foreground/80 hover:text-primary"
                >
                  {t(l.key)}
                </Link>
              </li>
            ))}
            <li className="mt-2 flex items-center gap-2 border-t border-border pt-3">
              <button onClick={toggleLang} className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary">
                <Globe className="h-3.5 w-3.5" /> {lang.toUpperCase()}
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
