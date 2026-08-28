// Hornea un snapshot de cotizaciones en build time -> lib/rates-snapshot.json
//
// Por qué: el sitio es 100% estático (output: 'export'). El cliente refresca los valores por
// fetch en runtime, pero el HTML servido necesita mostrar un número real de entrada (SEO +
// primer render sin parpadeo). Este script corre en `predev` y `prebuild`.
//
// Es deliberadamente tolerante a fallos: si una fuente no responde, se conserva el snapshot
// anterior y el build continúa. Nunca rompe la compilación por un problema de red.

import { readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "lib", "rates-snapshot.json");

// Mantener en sync con lib/currencies.ts
const CODES = [
  "USD", "EUR", "ARS", "BRL", "CLP", "UYU", "PYG", "BOB", "PEN", "COP", "MXN", "VES",
  "GBP", "JPY", "CNY", "CHF", "CAD", "AUD", "NZD", "SEK", "NOK", "DKK", "ZAR", "INR",
  "KRW", "SGD", "HKD", "TRY", "PLN", "CZK", "ILS", "AED",
];

const TIMEOUT_MS = 12_000;

async function getJSON(url) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { accept: "application/json" },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} en ${url}`);
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

async function readExisting() {
  if (!existsSync(OUT)) return null;
  try {
    return JSON.parse(await readFile(OUT, "utf8"));
  } catch {
    return null;
  }
}

async function fetchGlobalRates() {
  const data = await getJSON("https://open.er-api.com/v6/latest/USD");
  if (data.result !== "success" || !data.rates) throw new Error("respuesta inesperada de er-api");
  const rates = {};
  for (const code of CODES) {
    if (typeof data.rates[code] === "number") rates[code] = data.rates[code];
  }
  rates.USD = 1;
  return { rates, updated: data.time_last_update_unix ?? Math.floor(Date.now() / 1000) };
}

async function fetchArRates() {
  const data = await getJSON("https://dolarapi.com/v1/dolares");
  if (!Array.isArray(data)) throw new Error("respuesta inesperada de dolarapi");
  const keep = new Set(["oficial", "blue", "bolsa", "contadoconliqui", "tarjeta", "mayorista", "cripto"]);
  const dolares = data
    .filter((d) => keep.has(d.casa))
    .map((d) => ({
      casa: d.casa,
      nombre: d.nombre,
      compra: d.compra ?? null,
      venta: d.venta ?? null,
      fecha: d.fechaActualizacion ?? null,
    }));
  return { dolares, updated: dolares[0]?.fecha ?? new Date().toISOString() };
}

async function main() {
  const existing = await readExisting();
  const snapshot = existing ?? { base: "USD", updated: 0, source: "seed", rates: {}, ar: null };

  try {
    const global = await fetchGlobalRates();
    snapshot.base = "USD";
    snapshot.rates = global.rates;
    snapshot.updated = global.updated;
    snapshot.source = "open.er-api.com";
    console.log(`fetch-rates: tipos globales OK (${Object.keys(global.rates).length} monedas)`);
  } catch (err) {
    console.warn(`fetch-rates: fallo tipos globales, conservo snapshot previo -> ${err.message}`);
  }

  try {
    snapshot.ar = await fetchArRates();
    console.log(`fetch-rates: dólar Argentina OK (${snapshot.ar.dolares.length} casas)`);
  } catch (err) {
    console.warn(`fetch-rates: fallo dólar Argentina, conservo snapshot previo -> ${err.message}`);
  }

  snapshot.generatedAt = new Date().toISOString();
  await writeFile(OUT, JSON.stringify(snapshot, null, 2) + "\n", "utf8");
  console.log(`fetch-rates: escrito ${OUT}`);
}

main().catch((err) => {
  console.warn(`fetch-rates: error no fatal -> ${err.message}`);
  process.exit(0);
});
