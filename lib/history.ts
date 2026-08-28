// Serie histórica de un par de divisas para el gráfico.
//
// Fuentes:
//  - Frankfurter (api.frankfurter.dev) — tipos de referencia del BCE. Cubre ~30 monedas
//    (EUR, USD, GBP, BRL, MXN, JPY...). NO tiene ARS ni varias de LatAm (CLP, UYU, PEN, COP).
//  - ArgentinaDatos (api.argentinadatos.com) — histórico diario del dólar en Argentina
//    (oficial / blue / MEP). Lo usamos para cualquier tramo que toque ARS.
//
// Se arma una serie "unidades por USD" para cada lado del par y se dividen fecha a fecha.
// Si algún lado no tiene fuente histórica, se devuelve null y el gráfico lo informa.

export type HistoryPoint = { date: string; value: number };

const FRANKFURTER_CODES = new Set([
  "AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "EUR", "GBP", "HKD", "HUF",
  "IDR", "ILS", "INR", "ISK", "JPY", "KRW", "MXN", "MYR", "NOK", "NZD", "PHP", "PLN",
  "RON", "SEK", "SGD", "THB", "TRY", "USD", "ZAR",
]);

// Casa de ArgentinaDatos a usar según el "tipo" de dólar elegido en la UI.
const AR_CASA_BY_KIND: Record<string, string> = {
  blue: "blue",
  oficial: "oficial",
  bolsa: "bolsa",
  mep: "bolsa",
};

function isoDaysAgo(days: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

/** Serie date -> unidades de `code` por 1 USD. `null` si no hay fuente. */
async function usdLegSeries(
  code: string,
  start: string,
  end: string,
  arKind: string,
  signal?: AbortSignal,
): Promise<Map<string, number> | null> {
  if (code === "USD") {
    // Relleno trivial; se intersecta con el otro lado igual.
    return new Map();
  }

  if (code === "ARS") {
    const casa = AR_CASA_BY_KIND[arKind] ?? "blue";
    const res = await fetch(`https://api.argentinadatos.com/v1/cotizaciones/dolares/${casa}`, {
      signal,
      headers: { accept: "application/json" },
    });
    if (!res.ok) throw new Error(`argentinadatos HTTP ${res.status}`);
    const rows: Array<{ fecha: string; venta: number; compra: number }> = await res.json();
    const map = new Map<string, number>();
    for (const row of rows) {
      if (row.fecha >= start && row.fecha <= end && row.venta) map.set(row.fecha, row.venta);
    }
    return map;
  }

  if (FRANKFURTER_CODES.has(code)) {
    const res = await fetch(
      `https://api.frankfurter.dev/v1/${start}..${end}?base=USD&symbols=${code}`,
      { signal, headers: { accept: "application/json" } },
    );
    if (!res.ok) throw new Error(`frankfurter HTTP ${res.status}`);
    const data: { rates: Record<string, Record<string, number>> } = await res.json();
    const map = new Map<string, number>();
    for (const [date, obj] of Object.entries(data.rates ?? {})) {
      if (typeof obj[code] === "number") map.set(date, obj[code]);
    }
    return map;
  }

  return null;
}

export async function fetchHistory(
  from: string,
  to: string,
  days: number,
  arKind = "blue",
  signal?: AbortSignal,
): Promise<HistoryPoint[] | null> {
  if (from === to) return null;
  const start = isoDaysAgo(days);
  const end = isoDaysAgo(0);

  const [fromSeries, toSeries] = await Promise.all([
    usdLegSeries(from, start, end, arKind, signal),
    usdLegSeries(to, start, end, arKind, signal),
  ]);
  if (!fromSeries || !toSeries) return null;

  // Conjunto de fechas: unión de ambas series (o la única no vacía si un lado es USD).
  const dates = new Set<string>([...fromSeries.keys(), ...toSeries.keys()]);
  const points: HistoryPoint[] = [];
  for (const date of [...dates].sort()) {
    const f = from === "USD" ? 1 : fromSeries.get(date);
    const t = to === "USD" ? 1 : toSeries.get(date);
    if (!f || !t) continue;
    points.push({ date, value: t / f });
  }
  return points.length >= 2 ? points : null;
}
