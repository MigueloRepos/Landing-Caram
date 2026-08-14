import { IceCream, Users } from "lucide-react";
import { Reveal } from "./Reveal";
import heroImage from "@/assets/hero-penguin.jpg";

export function AboutUs() {
  return (
    <Reveal
      as="section"
      id="nosotros"
      className="relative overflow-hidden bg-[#FAF7F2] py-16 lg:py-24 border-t border-[#072B79]/5"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <Reveal className="relative mx-auto max-w-lg lg:mx-0">
            <div
              className="absolute -inset-4 rounded-4xl bg-[#0C8EEF]/15 blur-2xl"
              aria-hidden="true"
            />
            <img
              src={heroImage}
              alt="Sobre Helados Caram"
              width={800}
              height={800}
              className="relative rounded-4xl shadow-xl border-4 border-white object-cover h-[400px] w-full"
            />
          </Reveal>

          <Reveal delay={150}>
            <span className="inline-block rounded-full bg-[#F9B40E] px-4 py-1.5 text-xs font-bold tracking-wider text-[#072B79] uppercase">
              Tradición & Pasión
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight uppercase text-[#072B79] sm:text-4xl">
              Nuestra <span className="text-[#0C8EEF]">Historia</span>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-[#072B79]/80 font-medium sm:text-lg">
              <p>
                En el corazón de <strong>Puerto Padre</strong>, nace <strong>Helados Caram</strong>,
                un sueño familiar convertido en la opción preferida para refrescar y endulzar tus
                días. Desde nuestros inicios, nos hemos dedicado a perfeccionar el arte del helado
                artesanal.
              </p>
              <p>
                Combinamos ingredientes frescos y cuidadosamente seleccionados para crear una
                textura excepcionalmente cremosa. Cada porción está elaborada sin colorantes
                artificiales, pensando siempre en brindar felicidad pura a nuestras familias
                cubanas.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6">
              <Reveal delay={250} className="flex flex-col gap-2">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0C8EEF]/10 border border-[#0C8EEF]/20 text-[#0C8EEF]">
                  <IceCream size={22} />
                </span>
                <h4 className="font-extrabold text-[#072B79]">100% Artesanal</h4>
                <p className="text-sm text-[#072B79]/75 font-medium">
                  Textura y sabor inigualables en cada cucharada.
                </p>
              </Reveal>
              <Reveal delay={350} className="flex flex-col gap-2">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0C8EEF]/10 border border-[#0C8EEF]/20 text-[#0C8EEF]">
                  <Users size={22} />
                </span>
                <h4 className="font-extrabold text-[#072B79]">Para Compartir</h4>
                <p className="text-sm text-[#072B79]/75 font-medium">
                  Formatos ideales para familias y celebraciones.
                </p>
              </Reveal>
            </div>
          </Reveal>
        </div>
      </div>
    </Reveal>
  );
}
