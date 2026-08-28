import type { Bilingual } from "./i18n";

const b = (es: string, en: string): Bilingual => ({ es, en });

// Contenido largo de las páginas, bilingüe. Los componentes lo renderizan con `tr()`.

export const HOME = {
  eyebrow: b("Datos en vivo · se actualiza solo", "Live data · updates itself"),
  title: b(
    "El valor real de tu plata, sin intermediarios.",
    "What your money is really worth, no middlemen.",
  ),
  subtitle: b(
    "Convertí al tipo medio de mercado —el que mueve a los bancos, no el del cartel de la casa de cambio—. Con gráfico histórico y todas las cotizaciones del dólar en Argentina.",
    "Convert at the mid-market rate — the one banks move on, not the one on the exchange-house sign. With a historical chart and every Argentine dollar quote.",
  ),
  trust: b(
    "Se refresca cada 60 segundos · 30+ monedas · oficial, blue y MEP",
    "Refreshes every 60 seconds · 30+ currencies · official, blue and MEP",
  ),
  valuesTitle: b("Por qué Cambio", "Why Cambio"),
  values: [
    {
      icon: "◎",
      title: b("El precio sin maquillaje", "The price with no makeup"),
      body: b(
        "El tipo medio de mercado es el que usan los bancos entre sí. Sin el margen que te suma la casa de cambio. Es el número honesto para saber cuánto vale tu plata.",
        "The mid-market rate is the one banks use between themselves — without the margin an exchange house adds. It's the honest number for what your money is worth.",
      ),
    },
    {
      icon: "⇅",
      title: b("El dólar argentino, entero", "The Argentine dollar, whole"),
      body: b(
        "Oficial, blue, MEP, CCL, tarjeta y cripto en una sola pantalla, con la brecha ya calculada. Ningún conversor internacional te muestra esto.",
        "Official, blue, MEP, CCL, card and crypto on one screen, with the gap already calculated. No international converter shows you this.",
      ),
    },
    {
      icon: "◔",
      title: b("Contexto, no una foto", "Context, not a snapshot"),
      body: b(
        "Gráfico de 30 días, 90 días y un año para cada par, con la variación del período. Para decidir sabiendo dónde está parado el precio.",
        "A 30-day, 90-day and one-year chart for every pair, with the period's change. To decide knowing where the price stands.",
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
  ctaTitle: b("Poné el precio que estás esperando.", "Name the price you're waiting for."),
  ctaBody: b(
    "Creás una alerta con el par y el valor, y te llega un mail cuando el mercado lo toca. Sin apps, sin revisar la pantalla diez veces por día.",
    "Set an alert with the pair and the value, and you get an email when the market hits it. No apps, no checking the screen ten times a day.",
  ),
  ctaButton: b("Crear una alerta", "Create an alert"),
};

export const NETWORK = {
  eyebrow: b("De dónde sale el número", "Where the number comes from"),
  titleLead: b("Una red", "A network"),
  titleRest: b("de plazas financieras", "of financial centers"),
  body: b(
    "El tipo de cambio se arma donde se opera la moneda: Nueva York, Londres, Fráncfort, Tokio, San Pablo, Buenos Aires. Cambio toma la referencia de esos mercados, la cruza y la deja lista para vos.",
    "The exchange rate is built where the currency trades: New York, London, Frankfurt, Tokyo, São Paulo, Buenos Aires. Cambio pulls the reference from those markets, cross-computes it and hands it to you ready.",
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
