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
    color: "from-amber-500/10 to-amber-500/5 text-amber-500 border-amber-500/20",
    pillBg: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  {
    icon: TrendingUp,
    badge: "Ahorro & Rendimiento",
    title: "Formatos Diseñados para Rendir al Máximo",
    description:
      "Desde copas de 8 oz hasta Tinas de 4.5 Litros y Combos Especiales. Ofrecemos la mayor cantidad de helado por tu dinero, ideal para compartir en meriendas, reuniones familiares o fiestas.",
    color: "from-purple-500/10 to-purple-500/5 text-purple-500 border-purple-500/20",
    pillBg: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20",
  },
  {
    icon: Globe,
    badge: "Pagos Zelle + Remesas",
    title: "Regala Dulzura a Tu Familia en Puerto Padre",
    description:
      "¿Te encuentras fuera de Cuba? Puedes pagar cómodamente vía Zelle u otros medios internacionales. Nosotros nos encargamos de entregar el pedido directo en la puerta de tus seres queridos con atención VIP.",
    color: "from-emerald-500/10 to-emerald-500/5 text-emerald-500 border-emerald-500/20",
    pillBg: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  {
    icon: ShieldCheck,
    badge: "Cadena de Frío 100%",
    title: "Entrega Rápida con Firmeza Garantizada",
    description:
      "Utilizamos contenedores térmicos especiales para mantener la consistencia e higiene intactas. Tu helado llega bien frío, cremoso y listo para disfrutar de inmediato.",
    color: "from-blue-500/10 to-blue-500/5 text-blue-500 border-blue-500/20",
    pillBg: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  {
    icon: Clock,
    badge: "Atención VIP e Inmediata",
    title: "Proceso de Pedido Ágil y Personalizado",
    description:
      "Usa nuestro Asistente de Compra Interactivo o escríbenos directamente a WhatsApp. Te asesoramos en minutos con sugerencias de sabores y combinaciones para eventos o consumo personal.",
    color: "from-pink-500/10 to-pink-500/5 text-pink-500 border-pink-500/20",
    pillBg: "bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20",
  },
];

const METRICS = [
  { value: "+5,000 L", label: "Helado artesanal disfrutado" },
  { value: "100%", label: "Textura cremosa garantizada" },
  { value: "Zelle / MN", label: "Facilidad de pago en Cuba y exterior" },
  { value: "4.9 / 5 ⭐", label: "Satisfacción en Puerto Padre" },
];

export function WhyChooseUs() {
  const openAssistant = () => {
    window.dispatchEvent(new CustomEvent("open-shopping-assistant"));
  };

  return (
    <section id="elegirnos" className="relative overflow-hidden py-20 lg:py-28 bg-background">
      {/* Decorative ambient glows */}
      <div
        className="pointer-events-none absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-10 -right-20 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold tracking-wider text-primary uppercase">
              <Award className="h-3.5 w-3.5" />
              Ventajas y Garantía Caram
            </span>
          </Reveal>

          <Reveal delay={100}>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              ¿Por qué elegir <span className="text-primary">Helados Caram</span>?
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg leading-relaxed">
              No solo vendemos helado; creamos momentos de felicidad. Descubre las razones
              estratégicas por las que somos la opción preferida tanto por familias en{" "}
              <strong>Puerto Padre</strong> como por quienes envían dulzura desde el{" "}
              <strong>exterior</strong>.
            </p>
          </Reveal>
        </div>

        {/* Social Proof & Metrics Bar */}
        <Reveal delay={200} className="mt-12">
          <div className="grid grid-cols-2 gap-4 rounded-3xl border border-border bg-card/60 p-6 shadow-sm backdrop-blur-md md:grid-cols-4 lg:p-8">
            {METRICS.map((metric, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-3 border-r last:border-r-0 border-border/60"
              >
                <span className="text-2xl font-black text-primary sm:text-3xl lg:text-4xl tracking-tight">
                  {metric.value}
                </span>
                <span className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">
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
              <Reveal key={idx} delay={200 + idx * 75}>
                <div className="group relative flex h-full flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
                  <div>
                    {/* Top Row: Icon & Badge */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl border bg-gradient-to-br ${reason.color}`}
                      >
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <span
                        className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-bold tracking-wide uppercase ${reason.pillBg}`}
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        {reason.badge}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="mt-5 text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {reason.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                      {reason.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Strategic Call to Action Box inside section */}
        <Reveal delay={550} className="mt-14">
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-r from-navy-deep via-navy-deep/95 to-navy-deep p-8 text-white shadow-2xl sm:p-10">
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col items-center text-center lg:flex-row lg:items-center lg:justify-between lg:text-left gap-6">
              <div className="max-w-2xl">
                <span className="inline-block rounded-full bg-primary/20 px-3.5 py-1 text-xs font-bold text-primary tracking-wider uppercase">
                  Pide en 2 minutos
                </span>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  ¿Listo para disfrutar la experiencia Helados Caram?
                </h3>
                <p className="mt-2 text-sm text-white/80 leading-relaxed">
                  Haz tu pedido fácilmente mediante nuestro Asistente Virtual o envíanos un mensaje
                  a WhatsApp. ¡Estamos listos para atenderte!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={openAssistant}
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-xs font-extrabold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:scale-105 cursor-pointer"
                >
                  <Bot className="h-4 w-4" />
                  Abrir Asistente de Compra
                </button>

                <a
                  href={waLink(ORDER_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 text-xs font-bold text-white transition-all hover:bg-white/20 hover:border-white cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4" />
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
