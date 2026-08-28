"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { HOW_PAGE } from "@/lib/content";

export function HowContent() {
  const { t, tr } = useLang();

  return (
    <>
      <section className="wrap pt-10 pb-2">
        <p className="eyebrow">{tr(HOW_PAGE.eyebrow)}</p>
        <h1 className="mt-3 max-w-2xl text-3xl sm:text-4xl">{tr(HOW_PAGE.title)}</h1>
      </section>

      <div className="wrap mt-8 max-w-3xl">
        <ol className="divide-line">
          {HOW_PAGE.steps.map((s) => (
            <li key={s.n} className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1 py-6">
              <span className="font-mono text-sm text-[var(--color-brand-strong)]">{s.n}</span>
              <h2 className="text-lg font-semibold">{tr(s.title)}</h2>
              <span aria-hidden />
              <p className="text-sm text-[var(--color-muted)]">{tr(s.body)}</p>
            </li>
          ))}
        </ol>

        <div className="card mt-10 p-6">
          <p className="text-sm text-[var(--color-muted)]">{SITE.description}</p>
          <Link href="/" className="btn btn-primary mt-4">{t("common.goToConverter")}</Link>
        </div>
      </div>
    </>
  );
}
