import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { HOME } from "@/lib/content";
import { HomeContent } from "@/components/home/home-content";
import { JsonLd } from "@/components/ui/jsonld";

export const metadata: Metadata = {
  alternates: { canonical: SITE.url },
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: SITE.name,
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description: SITE.description,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: HOME.faq.map((f) => ({
            "@type": "Question",
            name: f.q.es,
            acceptedAnswer: { "@type": "Answer", text: f.a.es },
          })),
        }}
      />
      <HomeContent />
    </>
  );
}
