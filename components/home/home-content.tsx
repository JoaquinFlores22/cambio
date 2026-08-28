"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { HOME } from "@/lib/content";
import { ConverterSection } from "@/components/converter/converter-section";
import { PairQuickPicks } from "@/components/home/pair-quick-picks";
import { NetworkSection } from "@/components/home/network-section";
import { Reveal } from "@/components/ui/reveal";

export function HomeContent() {
  const { tr } = useLang();

  return (
    <>
      <section className="wrap pt-14 pb-6 sm:pt-20">
        <p className="eyebrow">{tr(HOME.eyebrow)}</p>
        <h1 className="mt-4 max-w-2xl text-4xl sm:text-5xl">{tr(HOME.title)}</h1>
        <p className="mt-4 max-w-xl text-lg text-[var(--color-muted)]">{tr(HOME.subtitle)}</p>
      </section>

      <div className="wrap">
        <ConverterSection
          initialFrom="USD"
          initialTo="ARS"
          initialAmount={1000}
          readQuery
          variant="home"
        />
      </div>

      <section className="wrap mt-10">
        <PairQuickPicks />
      </section>

      <NetworkSection />

      <section className="wrap mt-28">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl">{tr(HOME.valuesTitle)}</h2>
        </Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {HOME.values.map((v, i) => (
            <Reveal as="article" key={i} delay={i * 0.05} className="card p-6">
              <h3 className="text-lg font-semibold">{tr(v.title)}</h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">{tr(v.body)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap mt-28">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-2xl sm:text-3xl">{tr(HOME.faqTitle)}</h2>
          <div className="divide-line mt-6">
            {HOME.faq.map((f, i) => (
              <details key={i} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                  {tr(f.q)}
                  <span
                    className="text-[var(--color-brand-strong)] transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="mt-2 text-sm text-[var(--color-muted)]">{tr(f.a)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap mt-16">
        <div className="card flex flex-col items-start gap-4 bg-[var(--color-brand-tint)] p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-semibold">{tr(HOME.ctaTitle)}</h2>
            <p className="mt-1 text-sm text-[var(--color-muted)]">{tr(HOME.ctaBody)}</p>
          </div>
          <Link href="/alertas" className="btn btn-primary shrink-0">
            {tr(HOME.ctaButton)}
          </Link>
        </div>
      </section>
    </>
  );
}
