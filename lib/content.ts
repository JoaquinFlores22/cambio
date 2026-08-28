import type { Bilingual } from "./i18n";

const b = (es: string, en: string): Bilingual => ({ es, en });

// Contenido largo de las páginas, bilingüe. Los componentes lo renderizan con `tr()`.

export const HOME = {
  eyebrow: b("Tipo de cambio real, sin vueltas", "Real exchange rates, no fine print"),
  title: b(
    "Cuánto vale tu dinero en otra moneda.",
    "What your money is worth in another currency.",
  ),
  subtitle: b(
    "Al tipo medio de mercado, con el historial del par y todas las cotizaciones del dólar en Argentina.",
    "At the mid-market rate, with the pair's history and every Argentine dollar quote.",
  ),
  valuesTitle: b("Por qué Cambio", "Why Cambio"),
  values: [
    {
      title: b("Tipo medio de mercado", "Mid-market rate"),
      body: b(
        "El mismo valor de referencia que usan los bancos entre sí, sin el margen de una casa de cambio. El punto de partida honesto.",
        "The same reference banks use between themselves, without an exchange house's margin. The honest starting point.",
      ),
    },
    {
      title: b("El dólar argentino, completo", "The Argentine dollar, in full"),
      body: b(
        "Oficial, blue, MEP, CCL, tarjeta y cripto en una sola vista, con la brecha calculada. Ningún conversor internacional muestra esto.",
        "Official, blue, MEP, CCL, card and crypto in one view, with the gap calculated. No international converter shows this.",
      ),
    },
    {
      title: b("Historial real", "Real history"),
      body: b(
        "Gráfico de 30 días, 90 días y un año para cada par, con la variación del período. Contexto, no la foto de un día.",
        "A 30-day, 90-day and one-year chart for each pair, with the period's change. Context, not a single day's snapshot.",
      ),
    },
  ],
  faqTitle: b("Preguntas frecuentes", "Frequently asked questions"),
  faq: [
    {
      q: b("¿De dónde salen las cotizaciones?", "Where do the rates come from?"),
      a: b(
        "El tipo medio de mercado viene de un agregador internacional que se actualiza una vez por día. Las cotizaciones del dólar en Argentina se refrescan varias veces durante la jornada hábil.",
        "The mid-market rate comes from an international aggregator that updates once a day. Argentine dollar quotes refresh several times during business hours.",
      ),
    },
    {
      q: b("¿Cobran comisión?", "Do you charge a fee?"),
      a: b(
        "No. Cambio es una calculadora: muestra el valor de referencia. No compra ni vende divisas, así que no hay spread ni comisión.",
        "No. Cambio is a calculator: it shows the reference value. It doesn't buy or sell currency, so there's no spread or fee.",
      ),
    },
    {
      q: b("¿Puedo usarlo sin conexión?", "Does it work offline?"),
      a: b(
        "La página carga con la última cotización guardada y funciona igual. Cuando recupera conexión, actualiza los valores y te lo indica.",
        "The page loads with the last saved rate and works the same. When the connection returns, it updates the values and lets you know.",
      ),
    },
    {
      q: b("¿Sirve para operaciones reales?", "Is it good for real transactions?"),
      a: b(
        "Como referencia, sí. El precio final de una compra o venta concreta puede diferir según la entidad, el medio de pago y el momento. No es asesoramiento financiero.",
        "As a reference, yes. The final price of an actual purchase or sale may differ by provider, payment method and timing. It's not financial advice.",
      ),
    },
  ],
  ctaTitle: b("¿Seguís un tipo de cambio en particular?", "Tracking a particular rate?"),
  ctaBody: b(
    "Configurá una alerta y te avisamos cuando llegue al valor que esperás.",
    "Set an alert and we'll notify you when it reaches the value you're waiting for.",
  ),
  ctaButton: b("Crear alerta", "Create alert"),
};

export const NETWORK = {
  eyebrow: b("Cobertura", "Coverage"),
  titleLead: b("Una red", "A network"),
  titleRest: b("de plazas financieras", "of financial centers"),
  body: b(
    "Los tipos de cambio se forman donde se opera la moneda: Nueva York, Londres, Fráncfort, Tokio, San Pablo, Buenos Aires. Cambio toma la referencia de esos mercados y la trae a un solo lugar.",
    "Exchange rates form where the currency trades: New York, London, Frankfurt, Tokyo, São Paulo, Buenos Aires. Cambio pulls the reference from those markets into one place.",
  ),
};

export const CURRENCIES_PAGE = {
  eyebrow: b("Directorio", "Directory"),
  title: b("Todas las monedas", "All currencies"),
  subtitle: b(
    "Tipo de cambio contra el dólar estadounidense, al valor medio de mercado. Tocá cualquiera para abrir el conversor completo.",
    "Exchange rate against the US dollar, at the mid-market value. Tap any of them to open the full converter.",
  ),
  perUsd: b("1 USD", "1 USD"),
};

export const ALERTS_PAGE = {
  eyebrow: b("Alertas", "Alerts"),
  title: b("Te avisamos cuando el cambio llegue a tu número.", "We'll ping you when the rate hits your number."),
  subtitle: b(
    "Elegí el par, la condición y el valor. Cuando se cumpla, recibís un email. Sin apps, sin crear cuenta.",
    "Pick the pair, the condition and the value. When it's met, you get an email. No apps, no account.",
  ),
  base: b("Moneda base", "Base currency"),
  target: b("Moneda objetivo", "Target currency"),
  condition: b("Condición", "Condition"),
  above: b("Sube por encima de", "Rises above"),
  below: b("Baja por debajo de", "Falls below"),
  targetValue: b("Valor objetivo ({to} por 1 {from})", "Target value ({to} per 1 {from})"),
  today: b("Hoy: 1 {from} = {rate} {to}", "Today: 1 {from} = {rate} {to}"),
  email: b("Email para el aviso", "Email for the notification"),
  submit: b("Crear alerta", "Create alert"),
  demoNote: b(
    "Demo: al enviar se abre WhatsApp con el detalle. La versión instalada guarda la alerta y manda el email automáticamente.",
    "Demo: submitting opens WhatsApp with the details. The installed version stores the alert and sends the email automatically.",
  ),
  doneTitle: b("Alerta registrada", "Alert registered"),
  doneBody: b(
    "Se abrió WhatsApp con el detalle de tu alerta. En una instalación productiva, este paso lo hace el backend: guarda la alerta y envía el aviso por email en cuanto se cumple la condición.",
    "WhatsApp opened with your alert details. In a production install, the backend handles this step: it stores the alert and sends the email as soon as the condition is met.",
  ),
  another: b("Crear otra", "Create another"),
  sellTitle: b("¿Querés esta calculadora en tu sitio?", "Want this calculator on your site?"),
  sellBody: b(
    "Cambio es un producto white-label: se adapta a los colores y el dominio de tu empresa, con o sin el módulo de alertas por email. Escribinos y lo vemos.",
    "Cambio is a white-label product: it adapts to your company's colors and domain, with or without the email alerts module. Get in touch and let's talk.",
  ),
  sellButton: b("Consultar por WhatsApp", "Ask on WhatsApp"),
  summaryLines: {
    header: b("Alerta de tipo de cambio", "Exchange rate alert"),
    pair: b("Par", "Pair"),
    notify: b("Avisar cuando 1 {from} {dir} {value} {to}", "Notify when 1 {from} {dir} {value} {to}"),
    now: b("Hoy", "Today"),
    email: b("Email", "Email"),
  },
};

export const HOW_PAGE = {
  eyebrow: b("Cómo funciona", "How it works"),
  title: b("Números claros, sin letra chica.", "Clear numbers, no fine print."),
  steps: [
    {
      n: "01",
      title: b("El tipo medio de mercado", "The mid-market rate"),
      body: b(
        "Es el punto medio entre el precio de compra y el de venta de una divisa en el mercado mayorista: la referencia que usan los bancos entre sí. No incluye comisiones ni el margen de una casa de cambio, así que es el número más neutral para comparar.",
        "It's the midpoint between the buy and sell price of a currency on the wholesale market: the reference banks use between themselves. It doesn't include fees or an exchange house's margin, so it's the most neutral number for comparison.",
      ),
    },
    {
      n: "02",
      title: b("Las cotizaciones del dólar en Argentina", "The Argentine dollar quotes"),
      body: b(
        "Cuando el par toca el peso argentino, mostramos también el dólar oficial, blue, MEP, CCL, tarjeta y cripto, con la brecha contra el oficial. Estos valores vienen de fuentes públicas del mercado local y se actualizan varias veces al día.",
        "When the pair involves the Argentine peso, we also show the official, blue, MEP, CCL, card and crypto dollar, with the gap against the official rate. These come from public local-market sources and update several times a day.",
      ),
    },
    {
      n: "03",
      title: b("El gráfico histórico", "The historical chart"),
      body: b(
        "La línea muestra cómo se movió el par en los últimos 30, 90 o 365 días, con la variación del período. Sirve para ubicar el valor de hoy dentro de un rango, en vez de mirar un solo día suelto.",
        "The line shows how the pair moved over the last 30, 90 or 365 days, with the period's change. It helps place today's value within a range instead of looking at a single day.",
      ),
    },
    {
      n: "04",
      title: b("Actualización y modo sin conexión", "Updates and offline mode"),
      body: b(
        "La página carga al instante con la última cotización guardada y, apenas hay red, la reemplaza por el valor en vivo. Si la fuente no responde, seguís viendo el último dato disponible, señalizado como tal.",
        "The page loads instantly with the last saved rate and, as soon as there's a connection, replaces it with the live value. If the source doesn't respond, you keep seeing the last available figure, marked as such.",
      ),
    },
  ],
};
