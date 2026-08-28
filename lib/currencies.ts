// Metadata de cada moneda soportada. `iso` es el código de país ISO-3166 alfa-2 que usa el
// componente <Flag> (se renderiza como badge, no como emoji: los emoji de bandera no existen
// en Windows). `decimals` define cuántos decimales mostrar: las monedas sin subunidad de uso
// corriente (JPY, CLP, COP grande, etc.) van con 0.

export type Currency = {
  code: string;
  name: string;
  iso: string;
  symbol: string;
  decimals: number;
};

export const CURRENCIES: Currency[] = [
  { code: "USD", name: "Dólar estadounidense", iso: "US", symbol: "US$", decimals: 2 },
  { code: "EUR", name: "Euro", iso: "EU", symbol: "€", decimals: 2 },
  { code: "ARS", name: "Peso argentino", iso: "AR", symbol: "$", decimals: 2 },
  { code: "BRL", name: "Real brasileño", iso: "BR", symbol: "R$", decimals: 2 },
  { code: "CLP", name: "Peso chileno", iso: "CL", symbol: "$", decimals: 0 },
  { code: "UYU", name: "Peso uruguayo", iso: "UY", symbol: "$U", decimals: 2 },
  { code: "PYG", name: "Guaraní paraguayo", iso: "PY", symbol: "₲", decimals: 0 },
  { code: "BOB", name: "Boliviano", iso: "BO", symbol: "Bs", decimals: 2 },
  { code: "PEN", name: "Sol peruano", iso: "PE", symbol: "S/", decimals: 2 },
  { code: "COP", name: "Peso colombiano", iso: "CO", symbol: "$", decimals: 0 },
  { code: "MXN", name: "Peso mexicano", iso: "MX", symbol: "$", decimals: 2 },
  { code: "VES", name: "Bolívar venezolano", iso: "VE", symbol: "Bs.", decimals: 2 },
  { code: "GBP", name: "Libra esterlina", iso: "GB", symbol: "£", decimals: 2 },
  { code: "JPY", name: "Yen japonés", iso: "JP", symbol: "¥", decimals: 0 },
  { code: "CNY", name: "Yuan chino", iso: "CN", symbol: "¥", decimals: 2 },
  { code: "CHF", name: "Franco suizo", iso: "CH", symbol: "CHF", decimals: 2 },
  { code: "CAD", name: "Dólar canadiense", iso: "CA", symbol: "C$", decimals: 2 },
  { code: "AUD", name: "Dólar australiano", iso: "AU", symbol: "A$", decimals: 2 },
  { code: "NZD", name: "Dólar neozelandés", iso: "NZ", symbol: "NZ$", decimals: 2 },
  { code: "SEK", name: "Corona sueca", iso: "SE", symbol: "kr", decimals: 2 },
  { code: "NOK", name: "Corona noruega", iso: "NO", symbol: "kr", decimals: 2 },
  { code: "DKK", name: "Corona danesa", iso: "DK", symbol: "kr", decimals: 2 },
  { code: "ZAR", name: "Rand sudafricano", iso: "ZA", symbol: "R", decimals: 2 },
  { code: "INR", name: "Rupia india", iso: "IN", symbol: "₹", decimals: 2 },
  { code: "KRW", name: "Won surcoreano", iso: "KR", symbol: "₩", decimals: 0 },
  { code: "SGD", name: "Dólar de Singapur", iso: "SG", symbol: "S$", decimals: 2 },
  { code: "HKD", name: "Dólar de Hong Kong", iso: "HK", symbol: "HK$", decimals: 2 },
  { code: "TRY", name: "Lira turca", iso: "TR", symbol: "₺", decimals: 2 },
  { code: "PLN", name: "Esloti polaco", iso: "PL", symbol: "zł", decimals: 2 },
  { code: "CZK", name: "Corona checa", iso: "CZ", symbol: "Kč", decimals: 2 },
  { code: "ILS", name: "Séquel israelí", iso: "IL", symbol: "₪", decimals: 2 },
  { code: "AED", name: "Dírham de EAU", iso: "AE", symbol: "د.إ", decimals: 2 },
];

export const CURRENCY_BY_CODE: Record<string, Currency> = Object.fromEntries(
  CURRENCIES.map((c) => [c.code, c]),
);

export const CURRENCY_CODES = CURRENCIES.map((c) => c.code);

export function getCurrency(code: string): Currency {
  return (
    CURRENCY_BY_CODE[code] ?? { code, name: code, iso: code.slice(0, 2), symbol: code, decimals: 2 }
  );
}
