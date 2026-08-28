"use client";

import Link from "next/link";
import { getCurrency } from "@/lib/currencies";
import { useLang } from "@/lib/i18n";
import { PAIRS, getPairContent, pairTitle, reverseSlug, type Pair } from "@/lib/pairs";
import { SNAPSHOT, pairRate } from "@/lib/rates";
import { formatRate } from "@/lib/format";
import { ConverterSection } from "@/components/converter/converter-section";
import { Flag } from "@/components/ui/flag";

export function PairContent({ pair, slug }: { pair: Pair; slug: string }) {
  const { t, tr, lang } = useLang();
  const f = getCurrency(pair.from);
  const tt = getCurrency(pair.to);
  const snapshotRate = pairRate(pair.from, pair.to, SNAPSHOT.rates);
  const rev = reverseSlug(pair);
  const revPair = getPairContent(rev);
  const title = pairTitle(pair, lang);

  return (
    <>
      <section className="wrap pt-10 pb-4">
        <nav className="text-sm text-[var(--color-muted)]" aria-label="Ruta de navegación">
          <Link href="/" className="hover:text-[var(--color-ink)]">{t("pair.breadcrumb")}</Link>
          <span className="mx-1.5" aria-hidden>/</span>
          <span className="text-[var(--color-ink)]">{title}</span>
        </nav>

        <h1 className="mt-4 text-3xl sm:text-[2.75rem] sm:leading-[1.08]">
          {t("pair.convert", { from: tr(f.name), to: tr(tt.name) })}
        </h1>
        <p className="tnum mt-4 flex flex-wrap items-center gap-2.5 text-lg">
          <Flag code={pair.from} size="lg" />
          <span className="text-[var(--color-muted)]">1 {pair.from} ≈</span>
          <span className="text-xl font-bold text-[var(--color-brand-strong)]">{formatRate(snapshotRate)}</span>
          <span className="text-[var(--color-muted)]">{pair.to}</span>
          <Flag code={pair.to} size="lg" />
        </p>
        <p className="mt-4 max-w-2xl text-[var(--color-muted)]">{tr(pair.intro)}</p>
      </section>

      <div className="wrap">
        <ConverterSection
          initialFrom={pair.from}
          initialTo={pair.to}
          initialAmount={1000}
          readQuery
          variant="pair"
        />
      </div>

      {revPair && (
        <section className="wrap mt-8">
          <Link href={`/convertir/${rev}`} className="link-arrow text-sm">
            <span className="arrow" aria-hidden>⇄</span>{" "}
            {t("pair.reverse", { title: pairTitle(revPair, lang), from: pair.to, to: pair.from })}
          </Link>
        </section>
      )}

      <section className="wrap mt-16">
        <h2 className="text-2xl">{t("faq.pairTitle", { pair: `${pair.from} / ${pair.to}` })}</h2>
        <div className="divide-line mt-4 max-w-2xl">
          {pair.faq.map((x, i) => (
            <details key={i} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                {tr(x.q)}
                <span className="text-[var(--color-brand-strong)] transition-transform group-open:rotate-45" aria-hidden>+</span>
              </summary>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{tr(x.a)}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="wrap mt-16">
        <p className="mb-3 text-sm font-medium text-[var(--color-muted)]">{t("pair.others")}</p>
        <div className="flex flex-wrap gap-2">
          {PAIRS.filter((p) => p.slug !== slug).map((p) => (
            <Link
              key={p.slug}
              href={`/convertir/${p.slug}`}
              className="chip hover:border-[var(--color-ink)] hover:text-[var(--color-ink)]"
            >
              {p.from} → {p.to}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
