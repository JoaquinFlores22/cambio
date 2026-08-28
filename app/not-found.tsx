import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap grid min-h-[60vh] place-items-center py-24 text-center">
      <div>
        <p className="font-mono text-6xl font-semibold text-[var(--color-brand-strong)]">404</p>
        <h1 className="mt-4 text-2xl">Esta página no existe</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          El enlace puede estar mal escrito o la página se movió.
        </p>
        <Link href="/" className="btn btn-primary mt-6">Volver al conversor</Link>
      </div>
    </section>
  );
}
