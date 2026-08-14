import {
  Sparkles,
  TrendingUp,
  Globe,
  ShieldCheck,
  Clock,
  Award,
  Bot,
  MessageCircle,
  CheckCircle2,
  ShoppingBag,
  Layers,
  Palette,
  Send,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { ORDER_MESSAGE, waLink } from "@/lib/caram";

const REASONS = [
  {
    icon: Sparkles,
    badge: "100% Calidad Artesanal",
    title: "Sabor Auténtico y Cremosidad Insuperable",
    description:
      "Nuestra receta propia utiliza fruta e ingredientes seleccionados. Logramos una textura suave, densa y 100% cremosa que se derrite perfectamente en boca, sin cristales de hielo ni saborizantes pesados.",
  },
  {
    icon: TrendingUp,
    badge: "Ahorro & Rendimiento",
    title: "Formatos Diseñados para Rendir al Máximo",
    description:
      "Desde copas de 8 oz hasta Tinas de 4.5 Litros y Combos Especiales. Ofrecemos la mayor cantidad de helado por tu dinero, ideal para compartir en meriendas, reuniones familiares o fiestas.",
  },
  {
    icon: Globe,
    badge: "Pagos Zelle + Remesas",
    title: "Regala Dulzura a Tu Familia en Puerto Padre",
    description:
      "¿Te encuentras fuera de Cuba? Puedes pagar cómodamente vía Zelle u otros medios internacionales. Nosotros nos encargamos de entregar el pedido directo en la puerta de tus seres queridos con atención VIP.",
  },
  {
    icon: ShieldCheck,
    badge: "Cadena de Frío 100%",
    title: "Entrega Rápida con Firmeza Garantizada",
    description:
      "Utilizamos contenedores térmicos especiales para mantener la consistencia e higiene intactas. Tu helado llega bien frío, cremoso y listo para disfrutar de inmediato.",
  },
  {
    icon: Clock,
    badge: "Atención VIP e Inmediata",
    title: "Proceso de Pedido Ágil y Personalizado",
    description:
      "Usa nuestro Asistente de Compra Interactivo o escríbenos directamente a WhatsApp. Te asesoramos en minutos con sugerencias de sabores y combinaciones para eventos o consumo personal.",
  },
];

const METRICS = [
  { value: "+5,000 L", label: "Helado artesanal disfrutado" },
  { value: "100%", label: "Textura cremosa garantizada" },
  { value: "Zelle / MN", label: "Facilidad de pago en Cuba y exterior" },
  { value: "4.9 / 5 ⭐", label: "Satisfacción en Puerto Padre" },
];

const ORDER_STEPS = [
  {
    step: "01",
    icon: ShoppingBag,
    title: "Elegir Producto",
    description:
      "Selecciona tu formato favorito: copas de 8 oz, tinas de 4.5L o combos para eventos.",
  },
  {
    step: "02",
    icon: Layers,
    title: "Elegir Cantidad",
    description: "Indica las unidades que deseas para tu merienda, reunión familiar o fiesta.",
  },
  {
    step: "03",
    icon: Palette,
    title: "Personalizar Pedido",
    description:
      "Elige tus sabores preferidos y agrega detalles como velas o mensajes para regalos.",
  },
  {
    step: "04",
    icon: Send,
    title: "Enviar por WhatsApp",
    description:
      "Haz clic para enviar tu pedido listo. Te confirmamos inmediatamente y agendamos entrega.",
  },
];

export function WhyChooseUs() {
  const openAssistant = () => {
    window.dispatchEvent(new CustomEvent("open-shopping-assistant"));
  };

  return (
    <section id="elegirnos" className="relative overflow-hidden py-20 lg:py-28 bg-[#FAF7F2]">
      {/* Decorative ambient glows */}
      <div
        className="pointer-events-none absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-[#87CBF7]/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 -right-20 h-96 w-96 rounded-full bg-[#F8CD56]/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0C8EEF]/30 bg-[#0C8EEF]/10 px-4 py-1.5 text-xs font-bold tracking-wider text-[#0C8EEF] uppercase">
              <Award className="h-3.5 w-3.5" />
              Ventajas y Garantía Caram
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#072B79] sm:text-4xl lg:text-5xl">
              ¿Por qué elegir <span className="text-[#0C8EEF]">Helados Caram</span>?
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-4 text-base text-[#072B79]/80 font-medium sm:text-lg leading-relaxed">
              No solo vendemos helado; creamos momentos de felicidad. Descubre las razones
              estratégicas por las que somos la opción preferida tanto por familias en{" "}
              <strong>Puerto Padre</strong> como por quienes envían dulzura desde el{" "}
              <strong>exterior</strong>.
            </p>
          </Reveal>
        </div>

        {/* Social Proof & Metrics Bar */}
        <Reveal delay={200} className="mt-12">
          <div className="grid grid-cols-2 gap-4 rounded-3xl border border-[#072B79]/10 bg-white p-6 shadow-md md:grid-cols-4 lg:p-8">
            {METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-3 border-r last:border-r-0 border-[#072B79]/10"
              >
                <span className="text-2xl font-black text-[#0C8EEF] sm:text-3xl lg:text-4xl tracking-tight transition-transform duration-300 hover:scale-105">
                  {metric.value}
                </span>
                <span className="mt-1 text-xs font-bold text-[#072B79]/70 sm:text-sm">
                  {metric.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* 5 Reasons Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason, idx) => {
            const IconComponent = reason.icon;
            return (
              <Reveal key={idx} delay={200 + idx * 80}>
                <div className="group relative flex h-full flex-col justify-between rounded-3xl border border-[#072B79]/10 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[#0C8EEF]/40 hover:shadow-xl">
                  <div>
                    {/* Top Row: Icon with Scale & Initial Rotation Micro-interaction */}
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#0C8EEF]/20 bg-[#0C8EEF]/10 text-[#0C8EEF] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#F9B40E]/40 bg-[#F9B40E]/15 px-3 py-1 text-[11px] font-extrabold text-[#072B79] tracking-wide uppercase">
                        <CheckCircle2 className="h-3 w-3 text-[#0C8EEF]" />
                        {reason.badge}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="mt-5 text-lg font-extrabold text-[#072B79] group-hover:text-[#0C8EEF] transition-colors">
                      {reason.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#072B79]/75 font-medium sm:text-sm">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* SECTION 8: CÓMO PEDIR (Interactive Process Bar) */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto">
            <Reveal>
              <span className="inline-block rounded-full bg-[#F9B40E] px-4 py-1.5 text-xs font-extrabold tracking-wider text-[#072B79] uppercase">
                Proceso Simple y Rápido
              </span>
              <h3 className="mt-3 text-2xl font-black text-[#072B79] sm:text-3xl lg:text-4xl">
                ¿Cómo hacer tu pedido en 4 sencillos pasos?
              </h3>
            </Reveal>
          </div>

          <div className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ORDER_STEPS.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <Reveal key={step.step} delay={idx * 110}>
                  <div className="group relative flex flex-col h-full rounded-3xl border border-[#072B79]/10 bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:border-[#0C8EEF]/40 hover:shadow-lg">
                    {/* Step badge number */}
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-black text-[#F9B40E] tracking-tight group-hover:text-[#0C8EEF] transition-colors">
                        {step.step}
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0C8EEF]/10 border border-[#0C8EEF]/20 text-[#0C8EEF] transition-transform duration-300 group-hover:scale-110">
                        <StepIcon className="h-5 w-5" />
                      </div>
                    </div>

                    <h4 className="mt-4 text-base font-extrabold text-[#072B79] group-hover:text-[#0C8EEF] transition-colors">
                      {step.title}
                    </h4>
                    <p className="mt-2 text-xs leading-relaxed text-[#072B79]/75 font-medium">
                      {step.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Strategic Call to Action Box inside section */}
        <Reveal delay={550} className="mt-16">
          <div className="relative overflow-hidden rounded-4xl border border-[#072B79]/20 bg-[#072B79] p-8 text-white shadow-2xl sm:p-10">
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-[#0C8EEF]/30 blur-3xl animate-pulse"
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col items-center text-center lg:flex-row lg:items-center lg:justify-between lg:text-left gap-6">
              <div className="max-w-2xl">
                <span className="inline-block rounded-full bg-[#F9B40E] px-3.5 py-1 text-xs font-black text-[#072B79] tracking-wider uppercase">
                  Pide en 2 minutos
                </span>
                <h3 className="mt-3 text-2xl font-black tracking-tight text-white sm:text-3xl">
                  ¿Listo para disfrutar la experiencia Helados Caram?
                </h3>
                <p className="mt-2 text-sm text-white/85 font-medium leading-relaxed">
                  Haz tu pedido fácilmente mediante nuestro Asistente Virtual o envíanos un mensaje
                  a WhatsApp. ¡Estamos listos para atenderte!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={openAssistant}
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#0C8EEF] px-6 py-3.5 text-xs font-black text-white shadow-lg transition-all duration-250 hover:bg-[#0a78cb] hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Bot className="h-4 w-4" />
                  Abrir Asistente de Compra
                </button>

                <a
                  href={waLink(ORDER_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#F9B40E] px-6 py-3.5 text-xs font-black text-[#072B79] shadow-lg transition-all duration-250 hover:bg-[#e0a10a] hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4 transition-transform duration-250 group-hover:translate-x-0.5" />
                  Pedir por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
