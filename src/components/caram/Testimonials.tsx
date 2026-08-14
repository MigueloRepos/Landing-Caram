import { Star, Quote } from "lucide-react";
import { Reveal } from "./Reveal";

const testimonials = [
  {
    name: "Yadira M.",
    initials: "YM",
    location: "Puerto Padre",
    quote:
      "Los helados de Caram son los mejores, cremosos y con sabores increíbles. A mi familia le encantan.",
  },
  {
    name: "Carlos R.",
    initials: "CR",
    location: "Pago Zelle / Exterior",
    quote:
      "Siempre compro las tinas para nuestros encuentros. Rinden mucho y el sabor es espectacular.",
  },
  {
    name: "Lisandra G.",
    initials: "LG",
    location: "Puerto Padre",
    quote: "Hicimos el pedido para el cumple de mi hija y fue todo un éxito. ¡Super recomendados!",
  },
];

export function Testimonials() {
  return (
    <Reveal as="section" className="bg-[#FAF7F2] py-16 lg:py-24 border-t border-[#072B79]/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <Reveal className="text-center max-w-2xl mx-auto">
          <span className="inline-block rounded-full bg-[#F9B40E] px-4 py-1.5 text-xs font-black tracking-wider text-[#072B79] uppercase shadow-xs">
            Opiniones Reales
          </span>
          <h2 className="mt-3 text-3xl font-black tracking-tight uppercase text-[#072B79] sm:text-4xl lg:text-5xl">
            Lo que dicen <span className="text-[#0C8EEF]">nuestros clientes</span>
          </h2>
          <p className="mt-2 text-[#072B79]/80 font-medium">
            Experiencias reales compartidas por familias satisfechas
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              as="article"
              delay={i * 120}
              className="group relative flex flex-col items-center rounded-3xl border border-[#072B79]/10 bg-white p-8 text-center text-[#072B79] shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#0C8EEF]/40 hover:shadow-xl"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-[#0C8EEF]/10 transition-colors group-hover:text-[#0C8EEF]/25" />

              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-[#072B79] text-lg font-black text-[#F9B40E] shadow-sm transition-transform duration-300 group-hover:scale-110">
                {t.initials}
              </span>

              <div className="mt-4 flex gap-1" aria-label="5 de 5 estrellas">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    size={18}
                    className="fill-[#F9B40E] text-[#F9B40E] transition-transform duration-250 hover:scale-125"
                  />
                ))}
              </div>

              <p className="mt-5 text-sm font-medium italic leading-relaxed text-[#072B79]/85">
                “{t.quote}”
              </p>

              <div className="mt-6 pt-4 border-t border-[#072B79]/10 w-full flex flex-col items-center">
                <p className="text-base font-extrabold text-[#072B79] group-hover:text-[#0C8EEF] transition-colors">
                  {t.name}
                </p>
                <span className="text-xs font-semibold text-[#072B79]/60">{t.location}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
