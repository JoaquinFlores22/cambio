import snapshot from "./rates-snapshot.json";

// --- Tipos compartidos ---------------------------------------------------------

export type RateSet = {
  base: "USD";
  /** unix seconds del último update de la fuente */
  updated: number;
  source: string;
  /** code -> unidades de esa moneda por 1 USD */
  rates: Record<string, number>;
};

export type ArHouse = {
  casa: string;
  nombre: string;
  compra: number | null;
  venta: number | null;
  fecha: string | null;
};

export type ArRates = {
  updated: string;
  dolares: ArHouse[];
};

// --- Snapshot horneado en build ----------------------------------------------

export const SNAPSHOT: RateSet = {
  base: "USD",
  updated: snapshot.updated,
  source: snapshot.source,
  rates: snapshot.rates as Record<string, number>,
};

export const SNAPSHOT_AR: ArRates | null = (snapshot.ar as ArRates | null) ?? null;

// --- Conversión --------------------------------------------------------------

/**
 * Convierte `amount` de `from` a `to` usando USD como puente.
 * `rates` mapea code -> unidades por 1 USD (base USD).
 */
export function convert(amount: number, from: string, to: string, rates: Record<string, number>): number {
  if (from === to) return amount;
  const fromRate = from === "USD" ? 1 : rates[from];
  const toRate = to === "USD" ? 1 : rates[to];
  if (!fromRate || !toRate) return NaN;
  return (amount / fromRate) * toRate;
}

/** Tipo de cambio: cuántas unidades de `to` equivalen a 1 unidad de `from`. */
export function pairRate(from: string, to: string, rates: Record<string, number>): number {
  return convert(1, from, to, rates);
}

// --- Fetch en runtime (cliente) ---------------------------------------------

const ER_API = "https://open.er-api.com/v6/latest/USD";
const DOLAR_API = "https://dolarapi.com/v1/dolares";

export async function fetchLiveRates(signal?: AbortSignal): Promise<RateSet> {
  const res = await fetch(ER_API, { signal, headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`er-api HTTP ${res.status}`);
  const data = await res.json();
  if (data.result !== "success" || !data.rates) throw new Error("er-api: respuesta inesperada");
  const rates: Record<string, number> = { USD: 1 };
  for (const code of Object.keys(SNAPSHOT.rates)) {
    if (typeof data.rates[code] === "number") rates[code] = data.rates[code];
  }
  return {
    base: "USD",
    updated: data.time_last_update_unix ?? Math.floor(Date.now() / 1000),
    source: "open.er-api.com",
    rates,
  };
}

const AR_HOUSES = new Set([
  "oficial",
  "blue",
  "bolsa",
  "contadoconliqui",
  "tarjeta",
  "mayorista",
  "cripto",
]);

export async function fetchLiveArRates(signal?: AbortSignal): Promise<ArRates> {
  const res = await fetch(DOLAR_API, { signal, headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`dolarapi HTTP ${res.status}`);
  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("dolarapi: respuesta inesperada");
  const dolares: ArHouse[] = data
    .filter((d) => AR_HOUSES.has(d.casa))
    .map((d) => ({
      casa: d.casa,
      nombre: d.nombre,
      compra: d.compra ?? null,
      venta: d.venta ?? null,
      fecha: d.fechaActualizacion ?? null,
    }));
  return { updated: dolares[0]?.fecha ?? new Date().toISOString(), dolares };
}

// Orden de presentación de las casas de cambio argentinas.
export const AR_HOUSE_ORDER = ["oficial", "blue", "bolsa", "contadoconliqui", "tarjeta", "cripto", "mayorista"];

export function sortArHouses(houses: ArHouse[]): ArHouse[] {
  return [...houses].sort(
    (a, b) => AR_HOUSE_ORDER.indexOf(a.casa) - AR_HOUSE_ORDER.indexOf(b.casa),
  );
}
