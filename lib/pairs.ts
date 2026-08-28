import { CURRENCIES, getCurrency } from "./currencies";

export type Pair = {
  from: string;
  to: string;
  /** slug tipo Wise: "usd-to-ars" */
  slug: string;
  /** primer párrafo de la página, orientado a búsqueda */
  intro: string;
  faq: { q: string; a: string }[];
};

export const PAIRS: Pair[] = [
  {
    from: "USD",
    to: "ARS",
    slug: "usd-to-ars",
    intro:
      "Convertí dólares estadounidenses a pesos argentinos con el tipo medio de mercado. Abajo también vas a ver el dólar oficial, el blue y el MEP, porque en Argentina no hay una sola cotización.",
    faq: [
      {
        q: "¿Qué tipo de cambio usa esta calculadora?",
        a: "El conversor de arriba usa el tipo medio de mercado (el promedio entre compra y venta que se usa como referencia internacional). El panel de cotizaciones del dólar muestra por separado el oficial, el blue, el MEP y otros.",
      },
      {
        q: "¿Cuál es la diferencia entre dólar oficial y blue?",
        a: "El oficial es el tipo de cambio regulado por el Banco Central para operaciones formales. El blue es el precio en el mercado informal. Suelen tener una brecha de varios puntos porcentuales.",
      },
      {
        q: "¿Cada cuánto se actualiza?",
        a: "Los tipos globales se actualizan una vez por día. Las cotizaciones del dólar argentino se refrescan varias veces durante la jornada hábil.",
      },
    ],
  },
  {
    from: "EUR",
    to: "ARS",
    slug: "eur-to-ars",
    intro:
      "Convertí euros a pesos argentinos al tipo medio de mercado. Para el euro no existe un 'euro blue' oficial: la referencia informal suele calcularse como dólar blue por el cruce EUR/USD.",
    faq: [
      {
        q: "¿Hay un euro blue?",
        a: "No de forma directa. En la práctica se estima multiplicando el dólar blue por la paridad euro-dólar del día.",
      },
      {
        q: "¿Qué cotización conviene mirar para viajar?",
        a: "Para gastos con tarjeta en Europa aplica el dólar tarjeta más la conversión de la marca. Para efectivo, la referencia es el mercado informal.",
      },
    ],
  },
  {
    from: "USD",
    to: "BRL",
    slug: "usd-to-brl",
    intro:
      "Convertí dólares estadounidenses a reales brasileños con el tipo medio de mercado, más el gráfico de la evolución reciente del par USD/BRL.",
    faq: [
      {
        q: "¿El real es una moneda estable?",
        a: "El real flota libremente y su valor frente al dólar varía a diario según el mercado. El gráfico de esta página muestra el movimiento de los últimos meses.",
      },
    ],
  },
  {
    from: "BRL",
    to: "ARS",
    slug: "brl-to-ars",
    intro:
      "Convertí reales brasileños a pesos argentinos. Útil si viajás a Brasil o comprás desde Argentina: el cruce se calcula pasando por el dólar.",
    faq: [
      {
        q: "¿Conviene llevar reales o dólares a Brasil?",
        a: "Depende de la brecha del día. Muchas veces conviene llevar dólares y cambiarlos allá, pero verificá las dos rutas con esta calculadora antes de viajar.",
      },
    ],
  },
  {
    from: "EUR",
    to: "USD",
    slug: "eur-to-usd",
    intro:
      "Convertí euros a dólares estadounidenses con el tipo medio de mercado. EUR/USD es el par de divisas más operado del mundo.",
    faq: [
      {
        q: "¿Qué significa que EUR/USD esté en 1,08?",
        a: "Que 1 euro equivale a 1,08 dólares. Cuando el número sube, el euro se fortalece frente al dólar.",
      },
    ],
  },
  {
    from: "USD",
    to: "CLP",
    slug: "usd-to-clp",
    intro:
      "Convertí dólares estadounidenses a pesos chilenos al tipo medio de mercado. El peso chileno se cotiza en miles, así que los montos suelen tener varias cifras.",
    faq: [
      {
        q: "¿Por qué el peso chileno tiene números tan grandes?",
        a: "Simplemente por la escala histórica de la moneda: 1 dólar equivale a cientos de pesos chilenos. No refleta inestabilidad reciente.",
      },
    ],
  },
  {
    from: "USD",
    to: "UYU",
    slug: "usd-to-uyu",
    intro:
      "Convertí dólares estadounidenses a pesos uruguayos con el tipo medio de mercado. En Uruguay el dólar se usa de forma habitual para operaciones grandes como inmuebles.",
    faq: [
      {
        q: "¿En Uruguay puedo pagar en dólares?",
        a: "En muchos comercios y en el mercado inmobiliario, sí. Para gastos cotidianos se usa el peso uruguayo.",
      },
    ],
  },
  {
    from: "USD",
    to: "MXN",
    slug: "usd-to-mxn",
    intro:
      "Convertí dólares estadounidenses a pesos mexicanos al tipo medio de mercado, con el gráfico de la evolución reciente del par USD/MXN.",
    faq: [
      {
        q: "¿El peso mexicano es de libre flotación?",
        a: "Sí. Es una de las monedas emergentes más líquidas y su tipo de cambio se mueve a diario con el mercado.",
      },
    ],
  },
  {
    from: "GBP",
    to: "USD",
    slug: "gbp-to-usd",
    intro:
      "Convertí libras esterlinas a dólares estadounidenses con el tipo medio de mercado. GBP/USD se conoce en los mercados como 'cable'.",
    faq: [
      {
        q: "¿Por qué se llama 'cable'?",
        a: "Por el cable telegráfico transatlántico que a fines del siglo XIX transmitía la cotización entre Londres y Nueva York.",
      },
    ],
  },
  {
    from: "USD",
    to: "EUR",
    slug: "usd-to-eur",
    intro:
      "Convertí dólares estadounidenses a euros con el tipo medio de mercado, más el gráfico del par USD/EUR de los últimos meses.",
    faq: [
      {
        q: "¿Cuándo conviene pasar dólares a euros?",
        a: "Cuando el euro está relativamente débil frente al dólar. Usá el gráfico de esta página para ver dónde está el par respecto de su rango reciente.",
      },
    ],
  },
];

export const PAIR_BY_SLUG: Record<string, Pair> = Object.fromEntries(
  PAIRS.map((p) => [p.slug, p]),
);

export function pairTitle(pair: Pick<Pair, "from" | "to">): string {
  const f = getCurrency(pair.from);
  const t = getCurrency(pair.to);
  return `${f.name} a ${t.name}`;
}

export function reverseSlug(pair: Pick<Pair, "from" | "to">): string {
  return `${pair.to.toLowerCase()}-to-${pair.from.toLowerCase()}`;
}

export function makeSlug(from: string, to: string): string {
  return `${from.toLowerCase()}-to-${to.toLowerCase()}`;
}

/** Parsea "usd-to-ars" -> { from: "USD", to: "ARS" }. `null` si el formato no calza. */
export function slugToPair(slug: string): { from: string; to: string } | null {
  const m = /^([a-z]{3})-to-([a-z]{3})$/.exec(slug);
  if (!m) return null;
  return { from: m[1].toUpperCase(), to: m[2].toUpperCase() };
}

// Además de los pares con contenido escrito a mano, se generan páginas para cada cruce
// de USD contra las demás monedas (superficie SEO tipo Wise). El contenido de esos pares
// se sintetiza con un texto genérico.
export const GENERATED_SLUGS: string[] = (() => {
  const set = new Set(PAIRS.map((p) => p.slug));
  const out: string[] = [];
  for (const c of CURRENCIES) {
    if (c.code === "USD") continue;
    for (const slug of [makeSlug("USD", c.code), makeSlug(c.code, "USD")]) {
      if (!set.has(slug)) {
        out.push(slug);
        set.add(slug);
      }
    }
  }
  return out;
})();

export const ALL_SLUGS: string[] = [...PAIRS.map((p) => p.slug), ...GENERATED_SLUGS];

function synthesize(from: string, to: string): Pair {
  const f = getCurrency(from);
  const t = getCurrency(to);
  const touchesArs = from === "ARS" || to === "ARS";
  return {
    from,
    to,
    slug: makeSlug(from, to),
    intro: `Convertí ${f.name.toLowerCase()} a ${t.name.toLowerCase()} con el tipo medio de mercado${
      touchesArs ? ", junto con las cotizaciones del dólar oficial, blue y MEP en Argentina" : ""
    }. Abajo tenés el gráfico de la evolución reciente y una tabla de montos frecuentes.`,
    faq: [
      {
        q: `¿Qué tipo de cambio usa esta calculadora de ${from} a ${to}?`,
        a: "El tipo medio de mercado: el valor de referencia internacional, sin el margen que agrega cada casa de cambio. El precio final de una operación real puede variar según la entidad y el medio de pago.",
      },
      {
        q: "¿Con qué frecuencia se actualiza?",
        a: touchesArs
          ? "Los tipos globales, una vez por día. Las cotizaciones del dólar argentino, varias veces durante la jornada hábil."
          : "Una vez por día, con la referencia de cierre del mercado.",
      },
    ],
  };
}

/** Devuelve el contenido del par: curado si existe, sintetizado si es un cruce generado. */
export function getPairContent(slug: string): Pair | null {
  if (PAIR_BY_SLUG[slug]) return PAIR_BY_SLUG[slug];
  const parsed = slugToPair(slug);
  if (!parsed) return null;
  const known = new Set(CURRENCIES.map((c) => c.code));
  if (!known.has(parsed.from) || !known.has(parsed.to) || parsed.from === parsed.to) return null;
  return synthesize(parsed.from, parsed.to);
}
