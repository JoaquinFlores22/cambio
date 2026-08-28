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
      {/* Hero + conversor sobre una grilla tenue */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] grid-fade" aria-hidden />

        <section className="wrap pt-16 pb-8 sm:pt-24">
          <p className="eyebrow">
            <span className="live-dot" aria-hidden />
            {tr(HOME.eyebrow)}
          </p>
          <h1 className="mt-5 max-w-3xl text-[2.6rem] leading-[1.05] sm:text-6xl">
            {tr({
              es: (
                <>
                  El valor real de tu plata,{" "}
                  <span className="text-gradient">sin intermediarios.</span>
                </>
              ),
              en: (
                <>
                  What your money is really worth,{" "}
                  <span className="text-gradient">no middlemen.</span>
                </>
              ),
            })}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-[var(--color-muted)]">{tr(HOME.subtitle)}</p>
          <p className="mt-4 font-mono text-xs uppercase tracking-wide text-[var(--color-muted)]">
            {tr(HOME.trust)}
          </p>
        </section>

        <div className="wrap pb-2">
          <ConverterSection
            initialFrom="USD"
            initialTo="ARS"
            initialAmount={1000}
            readQuery
            variant="home"
          />
        </div>
      </div>

      <section className="wrap mt-12">
        <PairQuickPicks />
      </section>

      <NetworkSection />

      <section className="wrap mt-28">
        <Reveal>
          <p className="eyebrow">{tr({ es: "La diferencia", en: "The difference" })}</p>
          <h2 className="mt-3 text-3xl sm:text-4xl">{tr(HOME.valuesTitle)}</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {HOME.values.map((v, i) => (
            <Reveal as="article" key={i} delay={i * 0.07} className="card card-hover p-7">
              <span
                aria-hidden
                className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--color-brand-tint)] text-xl text-[var(--color-brand-strong)]"
              >
                {v.icon}
              </span>
              <h3 className="mt-5 text-lg font-semibold">{tr(v.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{tr(v.body)}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="wrap mt-28">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl sm:text-4xl">{tr(HOME.faqTitle)}</h2>
          <div className="divide-line mt-6">
            {HOME.faq.map((f, i) => (
              <details key={i} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium transition-colors hover:text-[var(--color-brand-strong)]">
                  {tr(f.q)}
                  <span
                    className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-[var(--color-line-strong)] text-[var(--color-brand-strong)] transition-transform duration-300 group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{tr(f.a)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap mt-20">
        <Reveal className="card card-feature overflow-hidden p-8 sm:p-12">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-md">
              <h2 className="text-2xl sm:text-3xl">{tr(HOME.ctaTitle)}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{tr(HOME.ctaBody)}</p>
            </div>
            <Link href="/alertas" className="btn btn-primary shrink-0">
              {tr(HOME.ctaButton)}
              <span className="arrow" aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
