import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE } from "@/lib/site";
import { getCurrency } from "@/lib/currencies";
import { ALL_SLUGS, getPairContent, pairTitle } from "@/lib/pairs";
import { PairContent } from "@/components/pair/pair-content";
import { JsonLd } from "@/components/ui/jsonld";

export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pair = getPairContent(slug);
  if (!pair) return {};
  const f = getCurrency(pair.from);
  const t = getCurrency(pair.to);
  const title = `Convertir ${f.name.es} a ${t.name.es} (${pair.from} a ${pair.to})`;
  const description = `Cambio de ${f.name.es} a ${t.name.es} al tipo medio de mercado, con gráfico histórico${
    pair.from === "ARS" || pair.to === "ARS" ? " y las cotizaciones del dólar oficial, blue y MEP" : ""
  }. Actualizado a diario.`;
  const url = `${SITE.url}/convertir/${slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, type: "website", siteName: SITE.name },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function PairPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pair = getPairContent(slug);
  if (!pair) notFound();

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Conversor", item: SITE.url },
              {
                "@type": "ListItem",
                position: 2,
                name: pairTitle(pair, "es"),
                item: `${SITE.url}/convertir/${slug}`,
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: pair.faq.map((x) => ({
              "@type": "Question",
              name: x.q.es,
              acceptedAnswer: { "@type": "Answer", text: x.a.es },
            })),
          },
        ]}
      />
      <PairContent pair={pair} slug={slug} />
    </>
  );
}
