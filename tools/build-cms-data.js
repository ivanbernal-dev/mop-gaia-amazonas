#!/usr/bin/env node
// Fase 2 de la auditoría del módulo administrador (agosto 2026).
//
// El sitio carga sus datos narrativos como variables globales de
// JavaScript (window.GAIA_MOP_UPDATES, etc.) por medio de etiquetas
// <script> cargadas en orden — así lo hace hoy todo el sitio, sin
// bundler ni módulos. El gestor de contenido (Decap CMS, en /admin)
// no puede escribir esas variables directamente: edita archivos JSON
// simples, que son los que aparecen como formularios en su interfaz.
//
// Este script es el puente entre ambos mundos: toma cada archivo JSON
// fuente y genera el .js correspondiente con el mismo formato que ya
// usa el resto del sitio. Se ejecuta automáticamente en
// .github/workflows/generar-datos-cms.yml cada vez que alguien guarda
// un cambio desde el CMS — nadie necesita correrlo a mano.
//
// Para agregar un nuevo archivo administrable desde el CMS:
//   1. Agrega una entrada a MAPEOS abajo.
//   2. Agrega la colección correspondiente en admin/config.yml.
//   3. Corre este script una vez para generar el .js inicial.

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");

const MAPEOS = [
  {
    json: "assets/data/mop-updates.json",
    js: "assets/data/mop-updates.js",
    globalName: "GAIA_MOP_UPDATES"
  },
  {
    json: "assets/data/gobernanza-panel.json",
    js: "assets/data/gobernanza-panel.js",
    globalName: "GAIA_GOBERNANZA_PANEL"
  },
  {
    json: "assets/data/misional-panel.json",
    js: "assets/data/misional-panel.js",
    globalName: "GAIA_MISIONAL_PANEL"
  }
];

function build({ json, js, globalName, transform }) {
  const jsonPath = path.join(ROOT, json);
  const jsPath = path.join(ROOT, js);
  if (!fs.existsSync(jsonPath)) {
    throw new Error(`No se encontró ${json}`);
  }
  const raw = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  const data = typeof transform === "function" ? transform(raw) : raw;
  const contents = `// Generado automáticamente por tools/build-cms-data.js a partir de ${json}.\n` +
    `// Para editar este contenido usa el gestor de contenido en /admin, no este archivo.\n` +
    `window.${globalName} = ${JSON.stringify(data, null, 2)};\n`;
  fs.writeFileSync(jsPath, contents, "utf8");
  console.log(`${js} generado desde ${json}.`);
}

function main() {
  MAPEOS.forEach(build);
}

main();
