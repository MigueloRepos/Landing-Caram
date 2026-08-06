import { Home, IceCream, Gift, Phone } from "lucide-react";
import { waLink, ORDER_MESSAGE } from "@/lib/caram";

const navItems = [
  { icon: Home, label: "Inicio", href: "#inicio" },
  { icon: IceCream, label: "Productos", href: "#productos" },
  { icon: Gift, label: "Combos", href: "#combos" },
  { icon: Phone, label: "Pedir", href: waLink(ORDER_MESSAGE), external: true },
];

export function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 block lg:hidden" aria-label="Navegación móvil">
      <div className="flex h-16 items-center justify-around border-t border-border bg-navy-deep/95 px-2 shadow-[0_-4px_24px_-8px_oklch(0.12_0.05_268/0.3)] backdrop-blur-md">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className="flex flex-col items-center justify-center gap-1.5 rounded-xl p-2 text-foreground/80 transition-colors hover:text-primary active:bg-primary/10"
          >
            <item.icon size={20} strokeWidth={2.5} />
            <span className="text-[9px] font-bold tracking-widest uppercase">{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
