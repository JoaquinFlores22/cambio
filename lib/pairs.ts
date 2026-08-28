import { CURRENCIES, getCurrency } from "./currencies";
import type { Bilingual } from "./i18n";

export type Pair = {
  from: string;
  to: string;
  /** slug tipo Wise: "usd-to-ars" */
  slug: string;
  /** primer párrafo de la página, orientado a búsqueda */
  intro: Bilingual;
  faq: { q: Bilingual; a: Bilingual }[];
};

const b = (es: string, en: string): Bilingual => ({ es, en });

export const PAIRS: Pair[] = [
  {
    from: "USD",
    to: "ARS",
    slug: "usd-to-ars",
    intro: b(
      "Convertí dólares estadounidenses a pesos argentinos con el tipo medio de mercado. Más abajo vas a ver también el dólar oficial, el blue y el MEP, porque en Argentina no hay una sola cotización.",
      "Convert US dollars to Argentine pesos at the mid-market rate. Below you'll also find the official, blue and MEP dollar, because Argentina doesn't have a single exchange rate.",
    ),
    faq: [
      {
        q: b("¿Qué tipo de cambio usa esta calculadora?", "Which exchange rate does this calculator use?"),
        a: b(
          "El conversor de arriba usa el tipo medio de mercado (el promedio entre compra y venta que se toma como referencia internacional). El panel del dólar muestra por separado el oficial, el blue, el MEP y otros.",
          "The converter above uses the mid-market rate (the midpoint between buy and sell that serves as the international reference). The dollar panel shows the official, blue, MEP and other rates separately.",
        ),
      },
      {
        q: b("¿Cuál es la diferencia entre dólar oficial y blue?", "What's the difference between the official and blue dollar?"),
        a: b(
          "El oficial es el tipo de cambio regulado por el Banco Central para operaciones formales. El blue es el precio en el mercado informal. Suele haber una brecha de varios puntos porcentuales.",
          "The official rate is set by the Central Bank for formal transactions. The blue rate is the price on the informal market. There's usually a gap of several percentage points between them.",
        ),
      },
      {
        q: b("¿Cada cuánto se actualiza?", "How often is it updated?"),
        a: b(
          "Los tipos globales se actualizan una vez por día. Las cotizaciones del dólar argentino se refrescan varias veces durante la jornada hábil.",
          "Global rates update once a day. Argentine dollar quotes refresh several times during business hours.",
        ),
      },
    ],
  },
  {
    from: "EUR",
    to: "ARS",
    slug: "eur-to-ars",
    intro: b(
      "Convertí euros a pesos argentinos al tipo medio de mercado. Para el euro no existe un 'euro blue' oficial: la referencia informal suele calcularse como dólar blue por el cruce EUR/USD.",
      "Convert euros to Argentine pesos at the mid-market rate. There's no official 'blue euro': the informal reference is usually derived from the blue dollar times the EUR/USD cross rate.",
    ),
    faq: [
      {
        q: b("¿Hay un euro blue?", "Is there a blue euro?"),
        a: b(
          "No de forma directa. En la práctica se estima multiplicando el dólar blue por la paridad euro-dólar del día.",
          "Not directly. In practice it's estimated by multiplying the blue dollar by the day's euro-dollar parity.",
        ),
      },
      {
        q: b("¿Qué cotización conviene mirar para viajar?", "Which rate should I look at for travel?"),
        a: b(
          "Para gastos con tarjeta en Europa aplica el dólar tarjeta más la conversión de la marca. Para efectivo, la referencia es el mercado informal.",
          "For card spending in Europe, the 'tarjeta' dollar plus the card network's conversion applies. For cash, the informal market is the reference.",
        ),
      },
    ],
  },
  {
    from: "USD",
    to: "BRL",
    slug: "usd-to-brl",
    intro: b(
      "Convertí dólares estadounidenses a reales brasileños con el tipo medio de mercado, más el gráfico de la evolución reciente del par USD/BRL.",
      "Convert US dollars to Brazilian reais at the mid-market rate, plus a chart of the recent USD/BRL trend.",
    ),
    faq: [
      {
        q: b("¿El real es una moneda estable?", "Is the real a stable currency?"),
        a: b(
          "El real flota libremente y su valor frente al dólar varía a diario según el mercado. El gráfico de esta página muestra el movimiento de los últimos meses.",
          "The real floats freely and its value against the dollar changes daily with the market. The chart on this page shows the last few months.",
        ),
      },
    ],
  },
  {
    from: "BRL",
    to: "ARS",
    slug: "brl-to-ars",
    intro: b(
      "Convertí reales brasileños a pesos argentinos. Útil si viajás a Brasil o comprás desde Argentina: el cruce se calcula pasando por el dólar.",
      "Convert Brazilian reais to Argentine pesos. Useful for travel to Brazil or buying from Argentina: the cross rate is computed through the dollar.",
    ),
    faq: [
      {
        q: b("¿Conviene llevar reales o dólares a Brasil?", "Should I take reais or dollars to Brazil?"),
        a: b(
          "Depende de la brecha del día. Muchas veces conviene llevar dólares y cambiarlos allá, pero verificá las dos rutas con esta calculadora antes de viajar.",
          "It depends on the day's gap. Taking dollars and exchanging them there is often better, but check both routes with this calculator before you travel.",
        ),
      },
    ],
  },
  {
    from: "EUR",
    to: "USD",
    slug: "eur-to-usd",
    intro: b(
      "Convertí euros a dólares estadounidenses con el tipo medio de mercado. EUR/USD es el par de divisas más operado del mundo.",
      "Convert euros to US dollars at the mid-market rate. EUR/USD is the most traded currency pair in the world.",
    ),
    faq: [
      {
        q: b("¿Qué significa que EUR/USD esté en 1,08?", "What does an EUR/USD rate of 1.08 mean?"),
        a: b(
          "Que 1 euro equivale a 1,08 dólares. Cuando el número sube, el euro se fortalece frente al dólar.",
          "That 1 euro equals 1.08 dollars. When the number rises, the euro is strengthening against the dollar.",
        ),
      },
    ],
  },
  {
    from: "USD",
    to: "CLP",
    slug: "usd-to-clp",
    intro: b(
      "Convertí dólares estadounidenses a pesos chilenos al tipo medio de mercado. El peso chileno se cotiza en cientos, así que los montos suelen tener varias cifras.",
      "Convert US dollars to Chilean pesos at the mid-market rate. The Chilean peso trades in the hundreds, so amounts tend to have several digits.",
    ),
    faq: [
      {
        q: b("¿Por qué el peso chileno tiene números tan grandes?", "Why are Chilean peso numbers so large?"),
        a: b(
          "Por la escala histórica de la moneda: 1 dólar equivale a cientos de pesos chilenos. No refleja inestabilidad reciente.",
          "It's the currency's historical scale: 1 dollar equals hundreds of Chilean pesos. It doesn't reflect recent instability.",
        ),
      },
    ],
  },
  {
    from: "USD",
    to: "UYU",
    slug: "usd-to-uyu",
    intro: b(
      "Convertí dólares estadounidenses a pesos uruguayos con el tipo medio de mercado. En Uruguay el dólar se usa de forma habitual para operaciones grandes como inmuebles.",
      "Convert US dollars to Uruguayan pesos at the mid-market rate. In Uruguay the dollar is commonly used for large transactions such as real estate.",
    ),
    faq: [
      {
        q: b("¿En Uruguay puedo pagar en dólares?", "Can I pay in dollars in Uruguay?"),
        a: b(
          "En muchos comercios y en el mercado inmobiliario, sí. Para gastos cotidianos se usa el peso uruguayo.",
          "In many shops and in real estate, yes. For everyday spending the Uruguayan peso is used.",
        ),
      },
    ],
  },
  {
    from: "USD",
    to: "MXN",
    slug: "usd-to-mxn",
    intro: b(
      "Convertí dólares estadounidenses a pesos mexicanos al tipo medio de mercado, con el gráfico de la evolución reciente del par USD/MXN.",
      "Convert US dollars to Mexican pesos at the mid-market rate, with a chart of the recent USD/MXN trend.",
    ),
    faq: [
      {
        q: b("¿El peso mexicano es de libre flotación?", "Is the Mexican peso free-floating?"),
        a: b(
          "Sí. Es una de las monedas emergentes más líquidas y su tipo de cambio se mueve a diario con el mercado.",
          "Yes. It's one of the most liquid emerging-market currencies and its rate moves daily with the market.",
        ),
      },
    ],
  },
  {
    from: "GBP",
    to: "USD",
    slug: "gbp-to-usd",
    intro: b(
      "Convertí libras esterlinas a dólares estadounidenses con el tipo medio de mercado. GBP/USD se conoce en los mercados como 'cable'.",
      "Convert British pounds to US dollars at the mid-market rate. GBP/USD is known in the markets as 'cable'.",
    ),
    faq: [
      {
        q: b("¿Por qué se llama 'cable'?", "Why is it called 'cable'?"),
        a: b(
          "Por el cable telegráfico transatlántico que a fines del siglo XIX transmitía la cotización entre Londres y Nueva York.",
          "After the transatlantic telegraph cable that carried the quote between London and New York in the late 19th century.",
        ),
      },
    ],
  },
  {
    from: "USD",
    to: "EUR",
    slug: "usd-to-eur",
    intro: b(
      "Convertí dólares estadounidenses a euros con el tipo medio de mercado, más el gráfico del par USD/EUR de los últimos meses.",
      "Convert US dollars to euros at the mid-market rate, plus a chart of the USD/EUR pair over the last few months.",
    ),
    faq: [
      {
        q: b("¿Cuándo conviene pasar dólares a euros?", "When is it worth moving dollars into euros?"),
        a: b(
          "Cuando el euro está relativamente débil frente al dólar. Usá el gráfico de esta página para ver dónde está el par respecto de su rango reciente.",
          "When the euro is relatively weak against the dollar. Use the chart on this page to see where the pair sits within its recent range.",
        ),
      },
    ],
  },
];

export const PAIR_BY_SLUG: Record<string, Pair> = Object.fromEntries(
  PAIRS.map((p) => [p.slug, p]),
);

/** Nombre del par en el idioma pedido, p. ej. "Dólar estadounidense a Peso argentino". */
export function pairTitle(pair: Pick<Pair, "from" | "to">, lang: "es" | "en" = "es"): string {
  const f = getCurrency(pair.from);
  const t = getCurrency(pair.to);
  return lang === "en" ? `${f.name.en} to ${t.name.en}` : `${f.name.es} a ${t.name.es}`;
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

// Además de los pares con texto propio, se generan páginas para cada cruce de USD contra las
// demás monedas (superficie SEO tipo Wise). Ese contenido se sintetiza en ambos idiomas.
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
    intro: b(
      `Convertí ${f.name.es.toLowerCase()} a ${t.name.es.toLowerCase()} con el tipo medio de mercado${
        touchesArs ? ", junto con las cotizaciones del dólar oficial, blue y MEP en Argentina" : ""
      }. Abajo tenés el gráfico de la evolución reciente y una tabla de montos frecuentes.`,
      `Convert ${f.name.en.toLowerCase()} to ${t.name.en.toLowerCase()} at the mid-market rate${
        touchesArs ? ", along with the official, blue and MEP dollar quotes in Argentina" : ""
      }. Below you'll find a chart of the recent trend and a table of common amounts.`,
    ),
    faq: [
      {
        q: b(
          `¿Qué tipo de cambio usa esta calculadora de ${from} a ${to}?`,
          `Which exchange rate does this ${from} to ${to} calculator use?`,
        ),
        a: b(
          "El tipo medio de mercado: el valor de referencia internacional, sin el margen que agrega cada casa de cambio. El precio final de una operación real puede variar según la entidad y el medio de pago.",
          "The mid-market rate: the international reference value, without the margin each exchange house adds. The final price of an actual transaction may vary by provider and payment method.",
        ),
      },
      {
        q: b("¿Con qué frecuencia se actualiza?", "How often is it updated?"),
        a: touchesArs
          ? b(
              "Los tipos globales, una vez por día. Las cotizaciones del dólar argentino, varias veces durante la jornada hábil.",
              "Global rates once a day. Argentine dollar quotes several times during business hours.",
            )
          : b(
              "Una vez por día, con la referencia de cierre del mercado.",
              "Once a day, using the market's closing reference.",
            ),
      },
    ],
  };
}

/** Contenido del par: curado si existe, sintetizado si es un cruce generado. */
export function getPairContent(slug: string): Pair | null {
  if (PAIR_BY_SLUG[slug]) return PAIR_BY_SLUG[slug];
  const parsed = slugToPair(slug);
  if (!parsed) return null;
  const known = new Set(CURRENCIES.map((c) => c.code));
  if (!known.has(parsed.from) || !known.has(parsed.to) || parsed.from === parsed.to) return null;
  return synthesize(parsed.from, parsed.to);
}
