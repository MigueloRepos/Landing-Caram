import { PartyPopper, Trophy, Gift, ClipboardList, Sparkles } from "lucide-react";
import birthday from "@/assets/birthday.jpg";
import { WhatsAppButton } from "./WhatsAppButton";
import { Reveal } from "./Reveal";
import { BIRTHDAY_MESSAGE, waLink } from "@/lib/caram";

const items = [
  {
    icon: PartyPopper,
    title: "Helados para fiestas",
    text: "Sabores que encantan a grandes y chicos.",
  },
  {
    icon: Trophy,
    title: "Tinas para eventos",
    text: "La mejor opción para compartir en grande.",
  },
  {
    icon: Gift,
    title: "Packs personalizados",
    text: "Creamos el combo ideal para tu celebración.",
  },
  {
    icon: ClipboardList,
    title: "Cotiza fácil y rápido",
    text: "Escríbenos por WhatsApp y te ayudamos.",
  },
];

export function Birthday() {
  return (
    <Reveal as="section" id="cumpleanos" className="bg-[#F8CD56] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="group overflow-hidden rounded-4xl bg-white text-[#072B79] shadow-2xl border border-[#072B79]/10 transition-all duration-300 hover:shadow-2xl">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="p-7 sm:p-10 lg:p-12 flex flex-col justify-between">
              <div>
                <Reveal>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0C8EEF]/10 border border-[#0C8EEF]/30 px-4 py-1.5 text-xs font-black text-[#0C8EEF] uppercase tracking-wider">
                    <Sparkles className="h-3.5 w-3.5" />
                    Fiestas & Eventos
                  </span>
                  <h2 className="mt-3 text-3xl font-black tracking-tight uppercase text-[#072B79] sm:text-4xl lg:text-5xl">
                    Pedidos para <span className="text-[#0C8EEF]">cumpleaños y cakes</span>
                  </h2>
                  <p className="mt-2 text-[#072B79]/80 font-medium sm:text-lg">
                    Hacemos de tu celebración algo dulce e inolvidable
                  </p>
                </Reveal>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {items.map((item, idx) => (
                    <Reveal
                      key={item.title}
                      delay={150 + idx * 80}
                      className="flex min-w-0 gap-3 group/item"
                    >
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[#072B79]/20 bg-[#F8CD56]/30 text-[#072B79] transition-transform duration-300 group-hover/item:scale-110 group-hover/item:rotate-6">
                        <item.icon size={20} strokeWidth={2} />
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-sm font-extrabold text-[#072B79] group-hover/item:text-[#0C8EEF] transition-colors">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs sm:text-sm text-[#072B79]/75 font-medium">
                          {item.text}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>

              <Reveal delay={450}>
                <WhatsAppButton
                  href={waLink(BIRTHDAY_MESSAGE)}
                  size="lg"
                  className="mt-9 bg-[#072B79] text-white hover:bg-[#051f58] font-black shadow-lg transition-all duration-250 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Cotizar cumpleaños por WhatsApp
                </WhatsAppButton>
              </Reveal>
            </div>

            <Reveal delay={200} className="relative min-h-72 lg:min-h-full overflow-hidden">
              <img
                src={birthday}
                alt="Niños celebrando un cumpleaños con pastel, gorros de fiesta, globos y copas de helado"
                width={1024}
                height={1024}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#072B79]/20 via-transparent to-transparent opacity-60" />
            </Reveal>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
