import { Star } from "lucide-react";
import { Reveal } from "./Reveal";

const testimonials = [
  {
    name: "Yadira M.",
    initials: "YM",
    quote:
      "Los helados de Caram son los mejores, cremosos y con sabores increíbles. A mi familia le encantan.",
  },
  {
    name: "Carlos R.",
    initials: "CR",
    quote:
      "Siempre compro las tinas para nuestros encuentros. Rinden mucho y el sabor es espectacular.",
  },
  {
    name: "Lisandra G.",
    initials: "LG",
    quote: "Hicimos el pedido para el cumple de mi hija y fue todo un éxito. ¡Super recomendados!",
  },
];

export function Testimonials() {
  return (
    <Reveal as="section" className="bg-navy-deep/60 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="text-center">
          <h2 className="text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">
            Lo que dicen <span className="text-primary">nuestros clientes</span>
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              as="article"
              delay={i * 110}
              className="flex flex-col items-center rounded-3xl border border-border bg-card/95 p-7 text-center text-card-foreground shadow-card transition-transform duration-300 hover:-translate-y-1.5"
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-navy text-base font-bold text-gold">
                {t.initials}
              </span>
              <div className="mt-4 flex gap-1" aria-label="5 de 5 estrellas">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={16} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="mt-4 text-sm italic text-card-foreground/80">“{t.quote}”</p>
              <p className="mt-4 text-sm font-bold text-primary">{t.name}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
