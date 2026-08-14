import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.79-1.67-2.09-.17-.3-.02-.47.13-.62.15-.15.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.06 2.88 1.21 3.08.15.2 2.09 3.33 5.09 4.54.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.79-.73 2.04-1.44.25-.71.25-1.32.17-1.44-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.37 9.37 0 0 1-1.44-5A9.42 9.42 0 0 1 18.7 5.45a9.32 9.32 0 0 1 2.76 6.65 9.42 9.42 0 0 1-9.42 9.4zM20.13 4.02A11.31 11.31 0 0 0 12.04.68C5.81.68.75 5.74.75 11.96c0 1.99.52 3.94 1.51 5.65L.6 23.32l5.85-1.53a11.3 11.3 0 0 0 5.59 1.46h.01c6.22 0 11.28-5.06 11.29-11.28a11.2 11.2 0 0 0-3.3-7.95z" />
    </svg>
  );
}

export function WhatsAppButton({
  href,
  children,
  className,
  size = "md",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "px-4 py-2 text-sm gap-2",
    md: "px-5 py-3 text-sm gap-2.5",
    lg: "px-7 py-4 text-base gap-3",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex shrink-0 items-center justify-center rounded-full bg-whatsapp font-bold text-whatsapp-foreground shadow-md transition-all duration-250 hover:scale-[1.03] active:scale-[0.97] hover:shadow-lg focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none cursor-pointer",
        sizes[size],
        className,
      )}
    >
      <WhatsAppIcon className="h-[1.15em] w-[1.15em] transition-transform duration-250 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-110" />
      <span>{children}</span>
    </a>
  );
}

export { WhatsAppIcon };
