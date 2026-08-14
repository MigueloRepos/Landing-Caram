import { Users, PartyPopper, Sparkles } from "lucide-react";
import tub from "@/assets/tub-4l.jpg";
import { Reveal } from "./Reveal";
import { WhatsAppButton } from "./WhatsAppButton";
import { waLink, ORDER_MESSAGE } from "@/lib/caram";

const combos = [
  {
    icon: Users,
    name: "Combo familiar",
    details: ["2 Tinas 4.5L", "+ 4 vasos 8oz", "Sabores a elegir"],
    price: "$18.00",
    image: tub,
    isFeatured: false,
  },
  {
    icon: PartyPopper,
    name: "Combo fiesta",
    details: ["3 Tinas 4.5L", "+ 6 vasos 8oz", "Sabores a elegir"],
    price: "$26.00",
    image: tub,
    isFeatured: true,
    badge: "Más Vendido 🔥",
  },
];

export function Combos() {
  return (
    <Reveal as="section" id="combos" className="bg-[#0C8EEF] text-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="inline-block rounded-full bg-white/20 border border-white/40 px-4 py-1.5 text-xs font-black tracking-wider text-white uppercase shadow-xs">
            Ahorro Especial
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight uppercase text-white sm:text-4xl lg:text-5xl">
            Combos para cada <span className="text-[#F9B40E]">ocasión</span>
          </h2>
          <p className="mt-2 text-white/90 font-medium">
            Ahorra más al compartir con familia y amigos
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
          {combos.map((combo, i) => (
            <Reveal
              key={combo.name}
              as="article"
              delay={i * 120}
              className={`group flex flex-col overflow-hidden rounded-4xl bg-white text-[#072B79] shadow-2xl transition-all duration-300 hover:-translate-y-2.5 ${
                combo.isFeatured
                  ? "ring-4 ring-[#F9B40E] animate-soft-glow relative"
                  : "border border-white/20"
              }`}
            >
              <div className="relative overflow-hidden bg-[#FAF7F2]">
                {combo.badge && (
                  <span className="absolute top-4 left-4 z-10 rounded-full bg-[#F9B40E] px-3.5 py-1 text-xs font-black text-[#072B79] shadow-md uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5" />
                    {combo.badge}
                  </span>
                )}
                <img
                  src={combo.image}
                  alt={combo.name}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="h-52 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                />
                <span className="absolute top-4 right-4 rounded-full bg-[#0C8EEF] px-4 py-1.5 text-base font-black text-white shadow-md transition-transform duration-250 group-hover:scale-105">
                  {combo.price}
                </span>
              </div>
              <div className="flex flex-1 flex-col items-center p-8 text-center justify-between">
                <div>
                  <span className="inline-grid h-14 w-14 place-items-center rounded-2xl border border-[#0C8EEF]/20 bg-[#0C8EEF]/10 text-[#0C8EEF] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <combo.icon size={26} strokeWidth={2} />
                  </span>
                  <h3 className="mt-4 text-xl font-black tracking-tight uppercase text-[#072B79] group-hover:text-[#0C8EEF] transition-colors">
                    {combo.name}
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm font-semibold text-[#072B79]/80">
                    {combo.details.map((d) => (
                      <li key={d} className="flex items-center justify-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#0C8EEF]" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6 w-full pt-4 border-t border-[#072B79]/10">
                  <WhatsAppButton
                    href={waLink(`${ORDER_MESSAGE} - Me interesa el ${combo.name}`)}
                    className="w-full bg-[#F9B40E] text-[#072B79] hover:bg-[#e0a10a] font-black shadow-md py-3 text-sm transition-all duration-250 hover:scale-[1.02]"
                  >
                    Pedir combo
                  </WhatsAppButton>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
