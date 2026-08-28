"use client";

import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

/**
 * Tema actual, leído del atributo `data-theme` de <html> (lo setea el script anti-parpadeo del
 * layout y lo cambia el ThemeToggle). Se re-renderiza cuando el atributo cambia.
 */
export function useTheme(): Theme {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const root = document.documentElement;
    const read = () => setTheme(root.dataset.theme === "dark" ? "dark" : "light");
    read();
    const observer = new MutationObserver(read);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  return theme;
}
