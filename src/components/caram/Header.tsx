import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { WhatsAppButton } from "./WhatsAppButton";
import { ORDER_MESSAGE, waLink } from "@/lib/caram";
import { cn } from "@/lib/utils";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Productos", href: "#productos" },
  { label: "Combos", href: "#combos" },
  { label: "Cumpleaños", href: "#cumpleanos" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#inicio");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      let current = "#inicio";
      for (const link of links) {
        const el = document.querySelector(link.href);
        if (el && el.getBoundingClientRect().top <= 140) current = link.href;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "bg-navy-deep/90 shadow-soft backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:py-4">
        <a href="#inicio" className="flex min-w-0 items-center gap-2" aria-label="Caram Helados">
          <Logo small />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "relative py-1 text-sm font-medium transition-colors",
                active === link.href
                  ? "text-primary after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-primary"
                  : "text-foreground/80 hover:text-primary",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppButton href={waLink(ORDER_MESSAGE)} className="hidden sm:inline-flex">
            Pedir por WhatsApp
          </WhatsAppButton>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-navy-deep/95 backdrop-blur-md lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-2 py-3 text-sm font-medium transition-colors",
                  active === link.href ? "text-primary" : "text-foreground/85 hover:text-primary",
                )}
              >
                {link.label}
              </a>
            ))}
            <WhatsAppButton href={waLink(ORDER_MESSAGE)} className="mt-3 sm:hidden">
              Pedir por WhatsApp
            </WhatsAppButton>
          </nav>
        </div>
      )}
    </header>
  );
}
