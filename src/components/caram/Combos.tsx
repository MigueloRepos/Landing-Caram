import { Users, PartyPopper, Backpack, CalendarDays } from "lucide-react";
import cups from "@/assets/cups-8oz.jpg";
import tub from "@/assets/tub-4l.jpg";
import { Reveal } from "./Reveal";

const combos = [
  {
    icon: Users,
    name: "Combo familiar",
    details: ["2 Tinas 4.5L", "+ 4 vasos 8oz", "Sabores a elegir"],
    price: "$18.00",
    image: tub,
  },
  {
    icon: PartyPopper,
    name: "Combo fiesta",
    details: ["3 Tinas 4.5L", "+ 6 vasos 8oz", "Sabores a elegir"],
    price: "$26.00",
    image: tub,
  },
  {
    icon: Backpack,
    name: "Combo escolar",
    details: ["10 vasos 8oz", "(sabores surtidos)", "Ideal para compartir"],
    price: "$15.00",
    image: cups,
  },
  {
    icon: CalendarDays,
    name: "Combo fin de semana",
    details: ["1 Tina 4.5L", "+ 2 vasos 8oz", "El plan perfecto"],
    price: "$11.00",
    image: cups,
  },
];

export function Combos() {
  return (
    <section id="combos" className="bg-navy-deep/60 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">
            Combos para cada <span className="text-primary">ocasión</span>
          </h2>
          <p className="mt-3 text-muted-foreground">Ahorra más al compartir</p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {combos.map((combo, i) => (
            <Reveal
              key={combo.name}
              as="article"
              delay={i * 100}
              className="group flex flex-col overflow-hidden rounded-3xl bg-card text-card-foreground shadow-card transition-transform duration-300 hover:-translate-y-2"
            >
              <img
                src={combo.image}
                alt={combo.name}
                width={1024}
                height={768}
                loading="lazy"
                className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="flex flex-1 flex-col items-center p-6 text-center">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary">
                  <combo.icon size={22} strokeWidth={1.75} />
                </span>
                <h3 className="mt-4 text-base font-extrabold tracking-tight uppercase">
                  {combo.name}
                </h3>
                <ul className="mt-3 space-y-1 text-sm text-card-foreground/75">
                  {combo.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex rounded-full bg-primary px-5 py-2 text-base font-extrabold text-primary-foreground shadow-soft">
                  {combo.price}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
