import { cn } from "@/lib/utils";
import { waLink, ORDER_MESSAGE } from "@/lib/caram";
import { WhatsAppIcon } from "./WhatsAppButton";
import { useEffect, useState } from "react";

export function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href={waLink(ORDER_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Pedir por WhatsApp"
      className={cn(
        "fixed right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-card transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-whatsapp focus:ring-offset-2 md:right-8 lg:right-10",
        "bottom-24 lg:bottom-8", // Make space for mobile nav which is shown until lg
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-8 opacity-0",
      )}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
