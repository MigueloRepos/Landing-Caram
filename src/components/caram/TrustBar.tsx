import { Leaf, Snowflake, Ban, Truck, Heart } from "lucide-react";
import { Reveal } from "./Reveal";

const items = [
  { icon: Leaf, text: "Ingredientes de la mejor calidad" },
  { icon: Snowflake, text: "Textura suave y cremosa" },
  { icon: Ban, text: "Sin colorantes artificiales" },
  { icon: Truck, text: "Entrega rápida en Puerto Padre" },
  { icon: Heart, text: "Hecho con amor para ti y tu familia" },
];

export function TrustBar() {
  return (
    <section id="nosotros" className="bg-cream py-14 text-cream-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 md:grid-cols-3 lg:grid-cols-5">
        {items.map((item, i) => (
          <Reveal
            key={item.text}
            delay={i * 80}
            className="flex flex-col items-center gap-3 text-center"
          >
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-primary/40 bg-primary/10 text-primary">
              <item.icon size={24} strokeWidth={1.75} />
            </span>
            <p className="text-sm font-medium text-cream-foreground/80">{item.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
