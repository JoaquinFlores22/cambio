// El export estático de Next 16.3.3 escribe mal (al menos en Windows) los archivos de
// "prefetch por segmento" del App Router: en vez de un archivo plano
// `<ruta>/__next.<ruta>.__PAGE__.txt` (que es lo que el cliente pide al navegar), escribe una
// carpeta `<ruta>/__next.<ruta>/__PAGE__.txt`. El resultado son 404 silenciosos al hacer click
// en un <Link> (el prefetch falla, aunque la navegación en sí funciona igual).
//
// Este script corre después de `next build` (ver "postbuild" en package.json) y aplana esas
// carpetas al nombre de archivo que el navegador realmente pide. Si una futura versión de
// Next.js corrige esto río arriba, este script simplemente no va a encontrar nada que arreglar.
const fs = require("fs");
const path = require("path");

const OUT_DIR = path.join(__dirname, "..", "out");

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (!entry.isDirectory()) continue;

    if (entry.name.startsWith("__next.")) {
      const pageFile = path.join(full, "__PAGE__.txt");
      if (fs.existsSync(pageFile)) {
        const flatTarget = path.join(dir, `${entry.name}.__PAGE__.txt`);
        fs.renameSync(pageFile, flatTarget);
        fs.rmdirSync(full);
        console.log(
          `fix-export-prefetch: ${path.relative(OUT_DIR, full)}/__PAGE__.txt -> ${path.relative(OUT_DIR, flatTarget)}`,
        );
        continue;
      }
    }
    walk(full);
  }
}

if (fs.existsSync(OUT_DIR)) {
  walk(OUT_DIR);
} else {
  console.warn("fix-export-prefetch: no se encontró out/, ¿corriste `next build` con output: 'export'?");
}
