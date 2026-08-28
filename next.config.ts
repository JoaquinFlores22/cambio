import type { NextConfig } from "next";

// Cambio se sirve como archivos estáticos (`output: 'export'`) — funciona igual en Vercel,
// Netlify, Cloudflare Pages o GitHub Pages. No hay Node en runtime: sin headers() custom, sin
// API routes, sin optimización de imágenes en servidor. Las cotizaciones se piden por fetch
// desde el cliente y se hornea un snapshot en build time (ver scripts/fetch-rates.mjs).
//
// Si se aloja en un subdirectorio (GitHub Pages project pages), setear NEXT_PUBLIC_BASE_PATH
// (ej. "/cambio") — Next antepone ese prefijo a cada link y asset. En dev / deploy a la raíz
// queda vacío. El workflow de Pages (.github/workflows/deploy.yml) lo define.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  turbopack: { root: __dirname },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
