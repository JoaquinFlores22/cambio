"use client";

import Link from "next/link";
import { PAIRS, pairTitle } from "@/lib/pairs";
import { useLang } from "@/lib/i18n";
import { Flag } from "@/components/ui/flag";

export function PairQuickPicks() {
  const { t } = useLang();
  return (
    <section aria-label={t("footer.popularPairs")}>
      <div className="flex flex-wrap gap-2">
        {PAIRS.map((p) => (
          <Link
            key={p.slug}
            href={`/convertir/${p.slug}`}
            className="chip transition-colors hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
            title={pairTitle(p)}
          >
            <Flag code={p.from} size="sm" />
            {p.from}
            <span aria-hidden>→</span>
            <Flag code={p.to} size="sm" />
            {p.to}
          </Link>
        ))}
      </div>
    </section>
  );
}
