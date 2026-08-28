import clsx from "clsx";
import { getCurrency } from "@/lib/currencies";

// Badge de país en vez de emoji de bandera: los emoji de bandera no se renderizan en Windows
// (Chrome/Edge los muestran como dos letras sueltas). Este badge se ve igual en todos lados.
export function Flag({
  code,
  className,
  size = "md",
}: {
  code: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const iso = getCurrency(code).iso;
  return (
    <span
      aria-hidden
      className={clsx(
        "inline-grid shrink-0 place-items-center rounded-[5px] border border-[var(--color-line)] bg-[var(--color-brand-tint)] font-mono font-semibold uppercase leading-none tracking-wide text-[var(--color-brand-strong)]",
        size === "sm" && "h-4 min-w-[1.35rem] text-[0.6rem]",
        size === "md" && "h-5 min-w-[1.6rem] text-[0.68rem]",
        size === "lg" && "h-7 min-w-[2.1rem] text-[0.8rem]",
        className,
      )}
    >
      {iso}
    </span>
  );
}
