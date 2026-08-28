import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { ALL_SLUGS, PAIRS } from "@/lib/pairs";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = ["", "/monedas", "/alertas", "/como-funciona"];
  const curated = new Set(PAIRS.map((p) => p.slug));

  return [
    ...staticPages.map((path) => ({
      url: `${SITE.url}${path}`,
      lastModified: now,
      priority: path === "" ? 1 : 0.6,
    })),
    ...ALL_SLUGS.map((slug) => ({
      url: `${SITE.url}/convertir/${slug}`,
      lastModified: now,
      priority: curated.has(slug) ? 0.8 : 0.5,
    })),
  ];
}
