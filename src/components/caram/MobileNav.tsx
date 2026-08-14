import { Home, IceCream, Gift, PartyPopper, Phone } from "lucide-react";
import { waLink, ORDER_MESSAGE } from "@/lib/caram";

const navItems = [
  { icon: Home, label: "Inicio", href: "#inicio" },
  { icon: IceCream, label: "Productos", href: "#productos" },
  { icon: Gift, label: "Combos", href: "#combos" },
  { icon: PartyPopper, label: "Cumpleaños", href: "#cumpleanos" },
  { icon: Phone, label: "Pedir", href: waLink(ORDER_MESSAGE), external: true },
];

export function MobileNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 block lg:hidden" aria-label="Navegación móvil">
      <div className="flex h-16 items-center justify-around border-t border-[#072B79]/15 bg-[#FAF7F2]/95 px-2 shadow-lg backdrop-blur-md">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noopener noreferrer" : undefined}
            className={`flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-1 transition-colors ${
              item.external
                ? "bg-[#F9B40E] text-[#072B79] font-black px-3 py-1.5 shadow-sm"
                : "text-[#072B79]/80 font-bold hover:text-[#0C8EEF]"
            }`}
          >
            <item.icon size={19} strokeWidth={2.25} />
            <span className="text-[9px] font-extrabold tracking-wider uppercase whitespace-nowrap">
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </nav>
  );
}
