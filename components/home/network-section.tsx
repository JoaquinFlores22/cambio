"use client";

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

export function NetworkSection() {
  const { tr } = useLang();
  return (
    <section className="wrap mt-28">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow">{tr(NETWORK.eyebrow)}</p>
        <h2 className="mt-3 text-2xl sm:text-3xl">
          {tr(NETWORK.titleLead)}{" "}
          <span className="text-[var(--color-muted)]">{tr(NETWORK.titleRest)}</span>
        </h2>
        <p className="mt-3 text-[var(--color-muted)]">{tr(NETWORK.body)}</p>
      </div>
      <div className="mt-8">
        <WorldMap dots={ROUTES} />
      </div>
    </section>
  );
}
