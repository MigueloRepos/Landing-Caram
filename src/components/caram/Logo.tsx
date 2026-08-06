import { cn } from "@/lib/utils";

export function Logo({ className, small = false }: { className?: string; small?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex flex-col items-center justify-center rounded-[50%] border border-gold/70 bg-navy-deep leading-none shadow-soft",
        small ? "px-4 py-2" : "px-5 py-2.5",
        className,
      )}
    >
      <span
        className={cn("font-script text-gold", small ? "text-lg" : "text-2xl sm:text-[1.7rem]")}
      >
        Caram
      </span>
      <span
        className={cn(
          "font-semibold tracking-[0.35em] text-gold/80 uppercase",
          small ? "text-[0.5rem]" : "text-[0.55rem]",
        )}
      >
        Helados
      </span>
    </span>
  );
}
