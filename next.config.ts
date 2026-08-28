import type { NextConfig } from "next";

// Cambio se sirve como archivos estáticos (`output: 'export'`) — funciona igual en Vercel,
// Netlify, Cloudflare Pages o GitHub Pages. No hay Node en runtime: sin headers() custom, sin
// API routes, sin optimización de imágenes en servidor. Las cotizaciones se piden por fetch
// desde el cliente y se hornea un snapshot en build time (ver scripts/fetch-rates.mjs).
//
// Si el cliente lo aloja en un subdirectorio (ej. GitHub Pages project pages), descomentar
// `basePath` con la ruta correspondiente — Next antepone ese prefijo a cada link y asset.
const nextConfig: NextConfig = {
  output: "export",
  // basePath: "/cambio",
  turbopack: { root: __dirname },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
