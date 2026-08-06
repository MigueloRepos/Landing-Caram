import { useRef } from "react";
import { Heart, Leaf, Snowflake, Ban, Truck } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImage from "@/assets/hero-penguin.jpg";
import { WhatsAppButton } from "./WhatsAppButton";
import { Reveal } from "./Reveal";
import { ORDER_MESSAGE, waLink } from "@/lib/caram";

const features = [
  { icon: Leaf, label: "Ingredientes seleccionados" },
  { icon: Snowflake, label: "Textura cremosa" },
  { icon: Ban, label: "Sin colorantes artificiales" },
  { icon: Truck, label: "Entrega rápida y segura" },
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={containerRef}
      id="inicio"
      className="relative overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24"
    >
      <div
        className="sparkle-field pointer-events-none absolute inset-0 opacity-70 z-0"
        aria-hidden="true"
      />

      {/* Mobile Parallax Background */}
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
        className="absolute inset-x-0 -top-[20%] -bottom-[20%] z-0 lg:hidden"
        aria-hidden="true"
      >
        <img src={heroImage} alt="" className="h-full w-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/80 to-background" />
      </motion.div>

      <div
        className="pointer-events-none absolute top-[-10%] right-[-5%] h-[520px] w-[520px] rounded-full opacity-40 blur-3xl z-0"
        style={{ background: "radial-gradient(circle, var(--brand), transparent 65%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8">
        <motion.div style={{ y: textY, opacity: textOpacity }} className="min-w-0">
          <Reveal>
            <span className="inline-block rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-[0.7rem] font-semibold tracking-[0.25em] text-primary uppercase">
              Helados Caram
            </span>
            <h1 className="mt-6 text-4xl leading-[1.08] font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              El sabor
              <br />
              <span className="text-primary">que enamora</span>
              <Heart
                className="ml-3 inline-block h-7 w-7 fill-primary text-primary sm:h-9 sm:w-9"
                aria-hidden="true"
              />
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Helados artesanales de alta calidad, cremosos y deliciosos. Hechos con ingredientes
              seleccionados para endulzar tus mejores momentos.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {features.map(({ icon: Icon, label }) => (
                <li key={label} className="flex min-w-0 flex-col items-start gap-2">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary/35 bg-primary/10 text-primary">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <span className="text-xs leading-snug text-foreground/85">{label}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <WhatsAppButton href={waLink(ORDER_MESSAGE)} size="lg">
                Pedir por WhatsApp
              </WhatsAppButton>
            </div>
          </Reveal>
        </motion.div>
        <motion.div style={{ y: imageY }} className="hidden min-w-0 lg:block">
          <Reveal delay={150}>
            <div className="relative mx-auto max-w-lg">
              <div
                className="absolute inset-6 rounded-full bg-primary/25 blur-3xl"
                aria-hidden="true"
              />
              <img
                src={heroImage}
                alt="Mascota pingüino de Caram Helados con un cono de varias bolas y potes de helado de fresa, dulce de leche y chocolate"
                width={1024}
                height={1024}
                className="animate-float relative w-full rounded-4xl shadow-card"
              />
            </div>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
}
