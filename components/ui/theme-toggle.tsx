"use client";

import { useEffect, useState } from "react";
import { storage } from "@/lib/storage";

type Theme = "light" | "dark";

const KEY = "cambio:theme";

function systemTheme(): Theme {
  return typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = storage.get(KEY) as Theme | null;
    setTheme(saved ?? systemTheme());
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    storage.set(KEY, next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
      className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-line)] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
    >
      {/* Evita el mismatch de hidratación: no pinta icono hasta montar */}
      <span aria-hidden className="text-base">
        {!mounted ? "" : theme === "dark" ? "☀" : "☾"}
      </span>
    </button>
  );
}
