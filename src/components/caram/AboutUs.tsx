import { IceCream, Users } from "lucide-react";
import { Reveal } from "./Reveal";
import heroImage from "@/assets/hero-penguin.jpg";

export function AboutUs() {
  return (
    <Reveal
      as="section"
      id="nosotros"
      className="relative overflow-hidden bg-navy-deep/40 py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <Reveal className="relative mx-auto max-w-lg lg:mx-0">
            <div
              className="absolute -inset-4 rounded-3xl bg-primary/20 blur-2xl"
              aria-hidden="true"
            />
            <img
              src={heroImage}
              alt="Sobre Helados Caram"
              width={800}
              height={800}
              className="relative rounded-3xl shadow-card object-cover h-[400px] w-full"
            />
          </Reveal>

          <Reveal delay={150}>
            <h2 className="text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">
              Nuestra <span className="text-primary">Historia</span>
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
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
              <div className="flex flex-col gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <IceCream size={20} />
                </span>
                <h4 className="font-bold text-foreground">100% Artesanal</h4>
                <p className="text-sm text-muted-foreground">
                  Textura y sabor inigualables en cada cucharada.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Users size={20} />
                </span>
                <h4 className="font-bold text-foreground">Para Compartir</h4>
                <p className="text-sm text-muted-foreground">
                  Formatos ideales para familias y celebraciones.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Reveal>
  );
}
