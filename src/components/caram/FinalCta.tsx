import { MapPin, Heart, Instagram } from "lucide-react";
import cups from "@/assets/cups-8oz.jpg";
import { Logo } from "./Logo";
import { WhatsAppButton } from "./WhatsAppButton";
import { Reveal } from "./Reveal";
import { INSTAGRAM_URL, ORDER_MESSAGE, waLink } from "@/lib/caram";

export function FinalCta() {
  return (
    <Reveal as="footer" id="contacto" className="relative overflow-hidden pt-16 pb-8 lg:pt-24">
      <div
        className="sparkle-field pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      />
      <img
        src={cups}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1024}
        height={768}
        className="pointer-events-none absolute bottom-0 left-[-6%] w-40 rotate-[-8deg] rounded-3xl opacity-25 sm:w-56"
      />
      <img
        src={cups}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1024}
        height={768}
        className="pointer-events-none absolute right-[-6%] bottom-0 w-40 rotate-[8deg] rounded-3xl opacity-25 sm:w-56"
      />

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            ¿Listo para <span className="text-primary">endulzar tu día?</span>
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <WhatsAppButton href={waLink(ORDER_MESSAGE)} size="lg">
              Pedir por WhatsApp
            </WhatsAppButton>
          </div>
        </Reveal>
      </div>

      <div className="relative mx-auto mt-14 max-w-7xl border-t border-border px-4 pt-6 sm:px-6">
        <Reveal
          delay={150}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-sm text-muted-foreground sm:justify-between"
        >
          <span className="inline-flex items-center gap-2">
            <MapPin size={16} className="shrink-0 text-primary" />
            Puerto Padre, Las Tunas
          </span>
          <span className="inline-flex items-center gap-2">
            <Heart size={16} className="shrink-0 fill-primary text-primary" />
            Hecho con amor
          </span>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition-colors hover:text-primary"
          >
            <Instagram size={16} className="shrink-0 text-primary" />
            @heladoscaram
          </a>
          <Logo small />
        </Reveal>
      </div>
    </Reveal>
  );
}
