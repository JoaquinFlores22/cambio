"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { SITE } from "@/lib/site";
import { useLang } from "@/lib/i18n";
import { ThemeToggle } from "./theme-toggle";
import { LangToggle } from "./lang-toggle";

export function SiteHeader() {
  const pathname = usePathname();
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: t("nav.converter") },
    { href: "/monedas", label: t("nav.currencies") },
    { href: "/alertas", label: t("nav.alerts") },
    { href: "/como-funciona", label: t("nav.how") },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-line)] bg-[color-mix(in_oklab,var(--color-bg)_82%,transparent)] backdrop-blur-xl">
      <div className="wrap flex h-16 items-center gap-4">
        <Link
          href="/"
          className="group flex items-center gap-2 font-semibold tracking-tight"
          aria-label={`${SITE.name}, inicio`}
        >
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--gradient-brand)] text-[var(--color-brand-contrast)] text-sm transition-transform duration-300 group-hover:rotate-[-12deg] group-hover:scale-105"
            style={{ background: "var(--gradient-brand)" }}
          >
            {SITE.glyph}
          </span>
          <span className="text-lg">{SITE.name}</span>
        </Link>

        <nav className="ml-8 hidden items-center gap-7 text-sm md:flex" aria-label="Principal">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-active={pathname === link.href}
              className={clsx(
                "nav-link font-medium",
                pathname === link.href ? "text-[var(--color-ink)]" : "text-[var(--color-muted)] hover:text-[var(--color-ink)]",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden sm:block">
            <LangToggle />
          </div>
          <ThemeToggle />
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full border border-[var(--color-line)] text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)] md:hidden"
            aria-label={t("nav.menu")}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="wrap flex flex-col gap-1 pb-4 md:hidden"
          aria-label="Principal"
          onClick={() => setOpen(false)}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-[var(--color-brand-tint)] text-[var(--color-ink)]"
                  : "text-[var(--color-muted)] hover:bg-[var(--color-brand-tint)]",
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="px-3 pt-2 sm:hidden">
            <LangToggle />
          </div>
        </nav>
      )}
    </header>
  );
}
