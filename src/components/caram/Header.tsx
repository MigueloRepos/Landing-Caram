import { useEffect, useState } from "react";
import { Menu, X, Bot } from "lucide-react";
import { motion } from "framer-motion";
import { Logo } from "./Logo";
import { WhatsAppButton } from "./WhatsAppButton";
import { ORDER_MESSAGE, waLink } from "@/lib/caram";
import { cn } from "@/lib/utils";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "¿Por qué Caram?", href: "#elegirnos" },
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

  const openAssistant = () => {
    window.dispatchEvent(new CustomEvent("open-shopping-assistant"));
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);

      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollPosition + windowHeight >= fullHeight - 80) {
        setActive("#contacto");
        return;
      }

      let current = "#inicio";
      for (const link of links) {
        const el = document.querySelector(link.href);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            current = link.href;
          }
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#FAF7F2]/90 shadow-sm backdrop-blur-md border-b border-[#072B79]/10 py-2.5 sm:py-3"
          : "bg-[#FAF7F2]/95 border-b border-[#072B79]/5 py-3.5 sm:py-4",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <a
          href="#inicio"
          className="flex min-w-0 items-center gap-2 transition-transform duration-250 hover:scale-[1.02]"
          aria-label="Caram Helados"
        >
          <Logo small />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setActive(link.href)}
              className={cn(
                "nav-link-underline py-1 text-sm font-semibold transition-colors cursor-pointer",
                active === link.href
                  ? "text-[#0C8EEF] font-bold active"
                  : "text-[#072B79]/80 hover:text-[#0C8EEF]",
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={openAssistant}
            className="group inline-flex items-center gap-1.5 rounded-full border border-[#0C8EEF]/40 bg-[#0C8EEF]/10 px-3.5 py-2 text-xs font-bold text-[#0C8EEF] transition-all duration-250 hover:bg-[#0C8EEF] hover:text-white hover:scale-[1.03] active:scale-[0.97] shadow-xs cursor-pointer"
          >
            <Bot size={16} className="transition-transform duration-250 group-hover:rotate-12" />
            <span className="hidden md:inline">Asistente de Compra</span>
          </button>

          <WhatsAppButton
            href={waLink(ORDER_MESSAGE)}
            className="hidden sm:inline-flex bg-[#F9B40E] text-[#072B79] hover:bg-[#e0a10a] shadow-sm font-bold"
          >
            Pedir ahora
          </WhatsAppButton>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#072B79]/20 text-[#072B79] transition-all duration-250 hover:border-[#0C8EEF] hover:text-[#0C8EEF] hover:scale-105 active:scale-95 lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="border-t border-[#072B79]/10 bg-[#FAF7F2]/98 backdrop-blur-md lg:hidden"
        >
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3 sm:px-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => {
                  setActive(link.href);
                  setOpen(false);
                }}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active === link.href
                    ? "text-[#0C8EEF] font-bold bg-[#0C8EEF]/10"
                    : "text-[#072B79] hover:text-[#0C8EEF]",
                )}
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openAssistant();
              }}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#0C8EEF]/10 border border-[#0C8EEF]/30 py-2.5 text-xs font-bold text-[#0C8EEF] transition-all active:scale-95"
            >
              <Bot size={16} />
              <span>Abrir Asistente de Compra</span>
            </button>
            <WhatsAppButton
              href={waLink(ORDER_MESSAGE)}
              className="mt-2 sm:hidden bg-[#F9B40E] text-[#072B79] hover:bg-[#e0a10a] font-bold"
            >
              Pedir ahora
            </WhatsAppButton>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
