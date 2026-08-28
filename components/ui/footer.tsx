"use client";

import Link from "next/link";
import { SITE } from "@/lib/site";
import { useLang } from "@/lib/i18n";
import { PAIRS, pairTitle } from "@/lib/pairs";

export function SiteFooter() {
  const { t, lang } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-28 border-t border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <span
              aria-hidden
              className="grid h-7 w-7 place-items-center rounded-lg bg-[var(--color-brand)] text-[var(--color-brand-contrast)] text-xs"
            >
              {SITE.glyph}
            </span>
            {SITE.name}
          </div>
          <p className="mt-3 max-w-xs text-sm text-[var(--color-muted)]">{t("footer.dataNote")}</p>
        </div>

        <div>
          <h2 className="field-label mb-3">{t("footer.popularPairs")}</h2>
          <ul className="space-y-2 text-sm">
            {PAIRS.slice(0, 5).map((p) => (
              <li key={p.slug}>
                <Link href={`/convertir/${p.slug}`} className="text-[var(--color-muted)] hover:text-[var(--color-ink)]">
                  {pairTitle(p, lang)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="field-label mb-3">{t("footer.product")}</h2>
          <ul className="space-y-2 text-sm">
            <li><Link href="/monedas" className="text-[var(--color-muted)] hover:text-[var(--color-ink)]">{t("nav.currencies")}</Link></li>
            <li><Link href="/alertas" className="text-[var(--color-muted)] hover:text-[var(--color-ink)]">{t("nav.alerts")}</Link></li>
            <li><Link href="/como-funciona" className="text-[var(--color-muted)] hover:text-[var(--color-ink)]">{t("nav.how")}</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="field-label mb-3">{t("footer.madeBy")}</h2>
          {SITE.madeBy.label && (
            <a
              href={SITE.madeBy.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)]"
            >
              {SITE.madeBy.label} ↗
            </a>
          )}
        </div>
      </div>

      <div className="wrap flex flex-col gap-3 border-t border-[var(--color-line)] py-6 text-xs text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} {SITE.name}. {t("footer.rights")}</p>
        <p className="max-w-lg">{t("footer.disclaimer")}</p>
      </div>
    </footer>
  );
}
