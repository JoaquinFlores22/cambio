"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

export default function NotFound() {
  const { lang } = useLang();
  const es = lang === "es";
  return (
    <section className="wrap grid min-h-[60vh] place-items-center py-24 text-center">
      <div>
        <p className="font-mono text-6xl font-semibold text-[var(--color-brand-strong)]">404</p>
        <h1 className="mt-4 text-2xl">{es ? "Esta página no existe" : "This page doesn't exist"}</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          {es
            ? "El enlace puede estar mal escrito o la página se movió."
            : "The link may be mistyped or the page has moved."}
        </p>
        <Link href="/" className="btn btn-primary mt-6">
          {es ? "Volver al conversor" : "Back to the converter"}
        </Link>
      </div>
    </section>
  );
}
