# Cambio — conversor de divisas white-label

Conversor de divisas con el **tipo medio de mercado**, gráfico histórico y las cotizaciones
del **dólar en Argentina** (oficial, blue, MEP, CCL, tarjeta, cripto). Pensado como producto
para vender a clientes: la marca y los colores salen de tokens, no del código.

Referencia de diseño: el conversor de Wise, llevado a algo más corporativo y con el
diferencial local (Wise muestra una sola cotización de ARS; esto muestra todas).

## Stack

- **Next.js 16** con `output: 'export'` — se sirve como archivos estáticos en Vercel,
  Netlify, Cloudflare Pages o GitHub Pages. Sin Node en runtime.
- **Tailwind v4** (tokens en `@theme`, dark mode por `data-theme`).
- **motion** para las transiciones de entrada.
- TypeScript, sin dependencias de gráficos (el chart es SVG a mano).

## Datos

| Qué | Fuente | Frecuencia |
|---|---|---|
| Tipo medio de mercado (160+ monedas) | `open.er-api.com` | diaria |
| Dólar Argentina (oficial/blue/MEP/…) | `dolarapi.com` | intradía |
| Histórico de pares no-ARS | `api.frankfurter.dev` (BCE) | diaria |
| Histórico de pares con ARS | `api.argentinadatos.com` | diaria |

`scripts/fetch-rates.mjs` hornea un **snapshot** en `lib/rates-snapshot.json` en cada
`predev` / `prebuild`, para que el HTML servido tenga un número real (SEO + primer render sin
parpadeo). El cliente refresca a valores en vivo y, si la red falla, se queda en el snapshot
marcándolo como tal.

## Comandos

```bash
npm install
npm run dev            # http://localhost:3000 (corre fetch-rates antes)
npm run build          # genera out/ (corre fetch-rates + fix-export-prefetch)
npm run fetch-rates    # solo refresca el snapshot
```

`scripts/fix-export-prefetch.js` (postbuild) corrige el nombre de los archivos de prefetch del
App Router que Next 16 escribe mal en export sobre Windows.

## Rebrandear para un cliente

1. `lib/site.ts` — nombre, tagline, dominio, WhatsApp, crédito del estudio.
2. `app/globals.css` — el bloque `@theme` (colores) y su contraparte `[data-theme="dark"]`.
3. `app/layout.tsx` — el `FAVICON` (data URI) y el `themeColor`.
4. Opcional: `lib/pairs.ts` para elegir qué pares llevan página con texto propio.

Todo lo demás (componentes, tablas, gráfico) toma los tokens automáticamente.

## Estructura

```
app/
  page.tsx                     home: hero + conversor + valor + FAQ
  convertir/[slug]/page.tsx    páginas por par (usd-to-ars, …) — SSG, JSON-LD, canonical
  monedas/page.tsx             directorio de monedas
  alertas/page.tsx             alta de alerta de tipo de cambio (demo por WhatsApp)
  como-funciona/page.tsx       explicación del tipo medio de mercado y las fuentes
  robots.ts · sitemap.ts
components/
  converter/                   converter-card, currency-combobox, rate-chart,
                               conversion-table, ar-rates-panel, converter-section
  ui/                          header, footer, theme-toggle, lang-toggle, reveal, jsonld
lib/
  currencies.ts · rates.ts · history.ts · pairs.ts · format.ts · i18n.tsx
  use-rates.ts · storage.ts · site.ts · rates-snapshot.json
scripts/
  fetch-rates.mjs · fix-export-prefetch.js
```

## Estado / pendientes

- **i18n**: el chrome de la interfaz está en ES/EN (`lib/i18n.tsx`); el contenido largo de las
  páginas de pares está solo en ES. Pasar a bilingüe = traducir `lib/pairs.ts`.
- **Alertas**: hoy la demo abre WhatsApp con el detalle. Para envío real de email hace falta
  un backend (Vercel function + cron, o un servicio de alertas).
- El OG image es texto plano; falta una imagen social real por par.
