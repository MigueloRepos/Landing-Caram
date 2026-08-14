import { useRef } from "react";
import { Heart, Leaf, Snowflake, Ban, Truck, Bot, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImage from "@/assets/images/regenerated_image_1786328359400.png";
import { WhatsAppButton } from "./WhatsAppButton";
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

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const decorY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);

  const openAssistant = () => {
    window.dispatchEvent(new CustomEvent("open-shopping-assistant"));
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const scaleItemVariants = {
    hidden: { opacity: 0, scale: 0.93, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={containerRef}
      id="inicio"
      className="relative overflow-hidden bg-[#87CBF7] text-[#072B79] pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24"
    >
      <div
        className="sparkle-field pointer-events-none absolute inset-0 opacity-40 z-0"
        aria-hidden="true"
      />

      {/* Parallax Background Glows */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute top-[-10%] right-[-5%] h-[520px] w-[520px] rounded-full opacity-35 blur-3xl z-0 bg-white"
        aria-hidden="true"
      />

      {/* Floating Decorative Elements */}
      <motion.div
        style={{ y: decorY }}
        className="pointer-events-none absolute left-[5%] top-[20%] hidden z-0 lg:block opacity-70"
      >
        <span className="animate-float-decor-slow flex h-12 w-12 items-center justify-center rounded-2xl bg-white/40 border border-white/60 shadow-sm text-[#072B79]">
          <Sparkles size={22} />
        </span>
      </motion.div>

      <motion.div
        style={{ y: decorY }}
        className="pointer-events-none absolute right-[8%] bottom-[15%] hidden z-0 lg:block opacity-70"
      >
        <span className="animate-float-decor-alt flex h-10 w-10 items-center justify-center rounded-2xl bg-white/40 border border-white/60 shadow-sm text-[#072B79]">
          <Heart size={20} className="fill-[#072B79]" />
        </span>
      </motion.div>

      {/* Mobile Parallax Background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-x-0 -top-[20%] -bottom-[20%] z-0 lg:hidden"
        aria-hidden="true"
      >
        <img src={heroImage} alt="" className="h-full w-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#87CBF7]/20 via-[#87CBF7]/70 to-[#87CBF7]" />
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8">
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="min-w-0"
        >
          {/* 1. Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-block rounded-full border border-[#072B79]/30 bg-white/50 px-4 py-1.5 text-[0.72rem] font-extrabold tracking-[0.2em] text-[#072B79] uppercase backdrop-blur-xs shadow-xs">
              Bienvenido a Helados Caram
            </span>
          </motion.div>

          {/* 2. Title */}
          <motion.h1
            variants={itemVariants}
            className="mt-6 text-4xl leading-[1.08] font-black tracking-tight text-[#072B79] sm:text-5xl lg:text-6xl"
          >
            El sabor
            <br />
            <span className="text-[#072B79]">que enamora</span>
            <Heart
              className="ml-3 inline-block h-7 w-7 fill-[#072B79] text-[#072B79] sm:h-9 sm:w-9 animate-pulse"
              aria-hidden="true"
            />
          </motion.h1>

          {/* 3. Subtitle */}
          <motion.p
            variants={itemVariants}
            className="mt-5 max-w-xl text-base leading-relaxed text-[#072B79]/90 font-medium sm:text-lg"
          >
            Le damos la bienvenida a Helados Caram. Nos complace ofrecerle helados artesanales
            elaborados con ingredientes seleccionados de la más alta calidad, garantizando una
            textura cremosa e inigualable en cada ocasión.
          </motion.p>

          {/* 4. Features */}
          <motion.ul variants={itemVariants} className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {features.map(({ icon: Icon, label }) => (
              <li key={label} className="group flex min-w-0 flex-col items-start gap-2">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#072B79]/20 bg-white/70 text-[#072B79] transition-transform duration-250 group-hover:scale-110 group-hover:bg-white shadow-xs">
                  <Icon size={20} strokeWidth={2} />
                </span>
                <span className="text-xs font-bold leading-snug text-[#072B79]">{label}</span>
              </li>
            ))}
          </motion.ul>

          {/* 5. CTAs */}
          <motion.div
            variants={scaleItemVariants}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <WhatsAppButton
              href={waLink(ORDER_MESSAGE)}
              size="lg"
              className="bg-[#F9B40E] text-[#072B79] hover:bg-[#e0a10a] font-black shadow-lg hover:shadow-xl transition-all duration-250"
            >
              Pedir ahora
            </WhatsAppButton>

            <button
              type="button"
              onClick={openAssistant}
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0C8EEF] px-6 text-sm font-bold text-white shadow-md transition-all duration-250 hover:bg-[#0a78cb] hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
            >
              <Bot className="h-4 w-4 transition-transform duration-250 group-hover:rotate-12" />
              Asistente de Compra
            </button>

            <button
              type="button"
              onClick={() => scrollTo("productos")}
              className="inline-flex h-12 items-center justify-center rounded-full border border-[#072B79]/30 bg-white/80 px-6 text-sm font-bold text-[#072B79] transition-all duration-250 hover:bg-white hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Ver Catálogo
            </button>
          </motion.div>
        </motion.div>

        {/* Main Product Image with Continuous Floating & Parallax */}
        <motion.div
          style={{ y: imageY }}
          initial={{ opacity: 0, scale: 0.88, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="hidden min-w-0 lg:block"
        >
          <div className="relative mx-auto max-w-lg">
            <div
              className="absolute inset-6 rounded-full bg-white/40 blur-3xl animate-pulse"
              aria-hidden="true"
            />
            <motion.img
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              src={heroImage}
              alt="Mascota pingüino de Caram Helados con un cono de varias bolas y potes de helado de fresa, dulce de leche y chocolate"
              width={1024}
              height={1024}
              className="relative w-full rounded-4xl shadow-2xl border-4 border-white/60 object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
