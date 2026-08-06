import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, X } from "lucide-react";
import { generateGreetingFn } from "@/server-functions/greeting";

export function LocationGreeting() {
  const [greeting, setGreeting] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  const greetingMutation = useMutation({
    mutationFn: async (location: { city: string; country: string }) => {
      const res = await generateGreetingFn({ data: location });
      return res.message;
    },
    onSuccess: (message) => {
      setGreeting(message);
    },
  });

  useEffect(() => {
    async function checkLocation() {
      try {
        const res = await fetch("https://ipinfo.io/json");
        const data = await res.json();

        // Check if outside Puerto Padre (for simplicity, we trigger if country is not CU or city is not Puerto Padre)
        if (data.country !== "CU" || (data.city && !data.city.includes("Puerto Padre"))) {
          greetingMutation.mutate({
            city: data.city || "tu ciudad",
            country: data.country || "tu país",
          });
        }
      } catch (e) {
        console.error("Could not fetch location", e);
      }
    }
    checkLocation();
  }, []);

  if (!greeting) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsVisible(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-[2.5rem] bg-white/60 p-6 text-slate-900 shadow-[0_8px_40px_rgba(0,0,0,0.12)] backdrop-blur-3xl backdrop-saturate-200 border border-white/50 dark:border-white/10 dark:bg-zinc-900/60 dark:text-zinc-50 md:p-8"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent opacity-50 dark:from-white/5" />
            <div className="relative flex items-start justify-between gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary backdrop-blur-md shadow-inner">
                <MapPin className="h-6 w-6" aria-hidden="true" />
              </div>
              <button
                type="button"
                className="rounded-full p-2 text-slate-600 transition-colors hover:bg-black/5 hover:text-slate-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-100"
                onClick={() => setIsVisible(false)}
              >
                <span className="sr-only">Cerrar</span>
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="relative mt-4">
              <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
                ¡Bienvenido a Caram Helados!
              </h3>
              <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-zinc-300">
                {greeting}
              </p>
            </div>

            <div className="relative mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => {
                  setIsVisible(false);
                  const elem = document.getElementById("productos");
                  if (elem) {
                    elem.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto cursor-pointer"
              >
                Ver catálogo
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
