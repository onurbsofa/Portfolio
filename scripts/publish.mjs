// Copia el export estático de Next (web/out) a la raíz del repo,
// que es lo que GitHub Pages publica desde la rama main.
import { cpSync, existsSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const out = path.join(root, "web", "out");
const manifest = path.join(root, ".published");

if (!existsSync(out)) {
  console.error("No existe web/out. Ejecutá primero: npm run build");
  process.exit(1);
}

// Borrar lo publicado en el deploy anterior (sólo lo que figura en el manifiesto).
if (existsSync(manifest)) {
  for (const entry of readFileSync(manifest, "utf8").split("\n").filter(Boolean)) {
    rmSync(path.join(root, entry), { recursive: true, force: true });
  }
}

const entries = readdirSync(out);
for (const entry of entries) {
  cpSync(path.join(out, entry), path.join(root, entry), { recursive: true });
}

// Sin esto, Jekyll ignora la carpeta _next y el sitio queda sin JS/CSS.
writeFileSync(path.join(root, ".nojekyll"), "");
writeFileSync(manifest, entries.join("\n") + "\n");

console.log(`Publicado en la raíz: ${entries.join(", ")}`);
console.log("Ahora: git add -A && git commit -m \"deploy\" && git push");
