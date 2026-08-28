// Publica el sitio en la rama `gh-pages` (GitHub Pages, project page en /cambio/).
//
//   npm run deploy
//
// Hace el build con basePath y fuerza el contenido de out/ a la rama gh-pages. No usa GitHub
// Actions porque el token de `gh` local no tiene scope `workflow`; cuando se pueda, migrar a
// un workflow y borrar este script.

import { execSync } from "node:child_process";
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const run = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", ...opts });
const cap = (cmd) => execSync(cmd, { encoding: "utf8" }).trim();

const root = cap("git rev-parse --show-toplevel");
const remote = cap("git remote get-url origin");
const sha = cap("git rev-parse --short HEAD");
const out = join(root, "out");

console.log("→ build (NEXT_PUBLIC_BASE_PATH=/cambio)");
run("npm run build", { cwd: root, env: { ...process.env, NEXT_PUBLIC_BASE_PATH: "/cambio" } });
writeFileSync(join(out, ".nojekyll"), "");

console.log("→ publicando en gh-pages");
const git = (cmd) => run(`git ${cmd}`, { cwd: out });
git("init -q");
git("checkout -q -B gh-pages");
git("add -A");
git(
  `-c user.email=joaquinflores2207@gmail.com -c user.name="Joaquin Flores" commit -q -m "Deploy ${sha}"`,
);
git(`push -q --force "${remote}" gh-pages`);
run(`rm -rf "${join(out, ".git")}"`);
console.log("✓ https://joaquinflores22.github.io/cambio/");
