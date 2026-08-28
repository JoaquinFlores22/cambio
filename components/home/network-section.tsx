"use client";

import { motion } from "motion/react";
import { useLang } from "@/lib/i18n";
import { NETWORK } from "@/lib/content";
import { WorldMap } from "@/components/ui/world-map";

const NY = { lat: 40.7128, lng: -74.006 };
const LONDON = { lat: 51.5074, lng: -0.1278 };
const FRANKFURT = { lat: 50.1109, lng: 8.6821 };
const TOKYO = { lat: 35.6762, lng: 139.6503 };
const SAO_PAULO = { lat: -23.5558, lng: -46.6396 };
const BUENOS_AIRES = { lat: -34.6037, lng: -58.3816 };
const SINGAPORE = { lat: 1.3521, lng: 103.8198 };

const ROUTES = [
  { start: NY, end: LONDON },
  { start: LONDON, end: FRANKFURT },
  { start: NY, end: SAO_PAULO },
  { start: SAO_PAULO, end: BUENOS_AIRES },
  { start: LONDON, end: TOKYO },
  { start: FRANKFURT, end: SINGAPORE },
  { start: NY, end: BUENOS_AIRES },
];

function StaggeredWords({ text }: { text: string }) {
  return (
    <span className="text-[var(--color-muted)]">
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: i * 0.018 }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </span>
  );
}

export function NetworkSection() {
  const { tr } = useLang();
  return (
    <section className="wrap mt-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow mx-auto w-fit">{tr(NETWORK.eyebrow)}</p>
        <h2 className="mt-4 text-2xl sm:text-4xl">
          {tr(NETWORK.titleLead)} <StaggeredWords text={tr(NETWORK.titleRest)} />
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[var(--color-muted)]">{tr(NETWORK.body)}</p>
      </div>
      <div className="mt-6">
        <WorldMap dots={ROUTES} />
      </div>
      <div className="mx-auto mt-2 flex flex-wrap justify-center gap-x-6 gap-y-1 font-mono text-[0.7rem] uppercase tracking-wide text-[var(--color-muted)]">
        <span>New York</span>
        <span>London</span>
        <span>Frankfurt</span>
        <span>Tokyo</span>
        <span>São Paulo</span>
        <span>Buenos Aires</span>
      </div>
    </section>
  );
}
