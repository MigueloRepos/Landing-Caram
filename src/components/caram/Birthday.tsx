import { PartyPopper, Trophy, Gift, ClipboardList } from "lucide-react";
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
    <Reveal as="section" id="cumpleanos" className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="overflow-hidden rounded-4xl bg-card text-card-foreground shadow-card">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="p-7 sm:p-10 lg:p-12">
              <h2 className="text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">
                Pedidos para <span className="text-primary">cumpleaños</span>
              </h2>
              <p className="mt-3 text-card-foreground/75">
                Hacemos de tu celebración algo inolvidable
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                {items.map((item) => (
                  <div key={item.title} className="flex min-w-0 gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                      <item.icon size={20} strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold">{item.title}</h3>
                      <p className="mt-1 text-sm text-card-foreground/70">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <WhatsAppButton href={waLink(BIRTHDAY_MESSAGE)} size="lg" className="mt-9">
                Cotizar por WhatsApp
              </WhatsAppButton>
            </div>

            <div className="min-h-64 lg:min-h-full">
              <img
                src={birthday}
                alt="Niños celebrando un cumpleaños con pastel, gorros de fiesta, globos y copas de helado"
                width={1024}
                height={1024}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </Reveal>
  );
}
