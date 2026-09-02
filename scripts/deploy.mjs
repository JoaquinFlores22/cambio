// Publica el sitio dentro del portfolio (repo JF-Desarrollo-Web), que Vercel deploya
// en https://desarrollodigital.vercel.app/cambio/ al pushear a main.
//
//   npm run deploy
//
// Hace el build con basePath=/cambio (el prebuild hornea el snapshot de cotizaciones),
// sincroniza out/ dentro de web/public/cambio/ del portfolio, y commitea + pushea ese repo.
// Ruta del portfolio: env PORTFOLIO_WEB o, por defecto, ../JF-Desarrollo-Web/web

import { execSync } from "node:child_process";
import { cpSync, rmSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

const SLUG = "cambio";

const run = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", ...opts });
const cap = (cmd) => execSync(cmd, { encoding: "utf8" }).trim();

const root = cap("git rev-parse --show-toplevel");
const sha = cap("git rev-parse --short HEAD");
const out = join(root, "out");

const portfolioWeb = resolve(
  process.env.PORTFOLIO_WEB || join(root, "..", "JF-Desarrollo-Web", "web"),
);
const target = join(portfolioWeb, "public", SLUG);

if (!existsSync(join(portfolioWeb, "vercel.json"))) {
  console.error(`✗ No encuentro el portfolio en ${portfolioWeb} (definí PORTFOLIO_WEB).`);
  process.exit(1);
}

console.log(`→ build (NEXT_PUBLIC_BASE_PATH=/${SLUG})`);
run("npm run build", {
  cwd: root,
  env: { ...process.env, NEXT_PUBLIC_BASE_PATH: `/${SLUG}` },
});

console.log(`→ sincronizando out/ → ${target}`);
rmSync(target, { recursive: true, force: true });
cpSync(out, target, { recursive: true });

console.log("→ commit + push del portfolio");
const git = (cmd) => run(`git ${cmd}`, { cwd: portfolioWeb });
git(`add public/${SLUG}`);
git(
  `-c user.email=joaquinflores2207@gmail.com -c user.name="Joaquin Flores" ` +
    `commit -q -m "Portfolio: actualiza el demo /${SLUG}/ (cambio ${sha})"`,
);
git("push -q origin HEAD");
console.log(`✓ https://desarrollodigital.vercel.app/${SLUG}/ (Vercel deploya el push)`);
