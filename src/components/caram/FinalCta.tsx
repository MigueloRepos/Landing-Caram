import { MapPin, Heart, Instagram, Sparkles } from "lucide-react";
import cups from "@/assets/cups-8oz.jpg";
import { Logo } from "./Logo";
import { WhatsAppButton } from "./WhatsAppButton";
import { Reveal } from "./Reveal";
import { INSTAGRAM_URL, ORDER_MESSAGE, waLink } from "@/lib/caram";

export function FinalCta() {
  return (
    <footer
      id="contacto"
      className="relative overflow-hidden bg-[#072B79] text-white pt-16 pb-8 lg:pt-24 border-t border-white/10"
    >
      <div
        className="sparkle-field pointer-events-none absolute inset-0 opacity-20"
        aria-hidden="true"
      />

      {/* Dynamic ambient glows */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#0C8EEF]/20 blur-3xl"
        aria-hidden="true"
      />

      <img
        src={cups}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1024}
        height={768}
        className="pointer-events-none absolute bottom-0 left-[-6%] w-40 rotate-[-8deg] rounded-3xl opacity-15 sm:w-56 animate-float-subtle"
      />
      <img
        src={cups}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1024}
        height={768}
        className="pointer-events-none absolute right-[-6%] bottom-0 w-40 rotate-[8deg] rounded-3xl opacity-15 sm:w-56 animate-float-subtle"
      />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F9B40E]/20 border border-[#F9B40E]/40 px-4 py-1.5 text-xs font-black tracking-wider text-[#F9B40E] uppercase shadow-xs">
            <Sparkles className="h-3.5 w-3.5" />
            Atención Inmediata
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            ¿Listo para <span className="text-[#F9B40E]">endulzar tu día?</span>
          </h2>
          <p className="mt-3 text-white/85 font-medium text-base sm:text-lg">
            Haz tu pedido ahora y disfruta el auténtico sabor artesanal de Helados Caram.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <WhatsAppButton
              href={waLink(ORDER_MESSAGE)}
              size="lg"
              className="bg-[#F9B40E] text-[#072B79] hover:bg-[#e0a10a] font-black shadow-xl hover:shadow-2xl transition-all duration-250 hover:scale-105 active:scale-95"
            >
              Pedir ahora por WhatsApp
            </WhatsAppButton>
          </div>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-16 max-w-7xl border-t border-white/10 px-4 pt-8 sm:px-6">
        <Reveal
          delay={150}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-white/80 sm:justify-between font-medium"
        >
          <span className="inline-flex items-center gap-2 transition-transform duration-250 hover:scale-105">
            <MapPin size={16} className="shrink-0 text-[#F9B40E]" />
            Puerto Padre, Las Tunas
          </span>
          <span className="inline-flex items-center gap-2 transition-transform duration-250 hover:scale-105">
            <Heart size={16} className="shrink-0 fill-[#F9B40E] text-[#F9B40E]" />
            Hecho con amor
          </span>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 transition-all duration-250 hover:text-[#F9B40E] hover:scale-105"
          >
            <Instagram
              size={16}
              className="shrink-0 text-[#F9B40E] transition-transform duration-250 group-hover:rotate-12"
            />
            @heladoscaram
          </a>
          <Logo small />
        </Reveal>
      </div>
    </footer>
  );
}
