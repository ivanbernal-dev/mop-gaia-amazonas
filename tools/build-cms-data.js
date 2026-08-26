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
    json: "assets/data/junta-compromisos.json",
    js: "assets/data/junta-compromisos.js",
    globalName: "GAIA_JUNTA_COMPROMISOS",
    // El CMS solo edita la matriz cruda de compromisos (una fila por
    // compromiso). Los totales, conteos por estado, por prioridad y por
    // acta que el tablero de Junta Directiva muestra son un resumen
    // CALCULADO a partir de esa matriz — así nadie tiene que mantener
    // esos números sincronizados a mano cada vez que se agrega o cierra
    // un compromiso.
    transform: buildJuntaCompromisos
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
  },
  {
    json: "assets/data/apoyo-panel.json",
    js: "assets/data/apoyo-panel.js",
    globalName: "GAIA_APOYO_PANEL"
  },
  {
    json: "assets/data/aseguramiento-panel.json",
    js: "assets/data/aseguramiento-panel.js",
    globalName: "GAIA_ASEGURAMIENTO_PANEL"
  }
];

// Estados que cuentan como "abierto" (todavía requieren seguimiento).
// "Cumplido" y "Cancelado" son los dos estados de cierre.
const JUNTA_OPEN_STATES = new Set(["Pendiente", "En curso", "Seguimiento recurrente"]);
const JUNTA_STATUS_ORDER = [
  { name: "Cumplido", tone: "done" },
  { name: "En curso", tone: "progress" },
  { name: "Pendiente", tone: "pending" },
  { name: "Seguimiento recurrente", tone: "recurring" },
  { name: "Cancelado", tone: "closed" }
];
const JUNTA_PRIORITY_ORDER = [
  { name: "Crítica", tone: "critical" },
  { name: "Alta", tone: "high" },
  { name: "Media", tone: "medium" },
  { name: "Baja", tone: "low" }
];

function buildJuntaCompromisos(data) {
  const matrix = Array.isArray(data.matrix) ? data.matrix : [];
  const referenceDate = data.updatedAt || "";
  const isOpen = (r) => JUNTA_OPEN_STATES.has(r.estado);

  const completed = matrix.filter((r) => r.estado === "Cumplido").length;
  const canceled = matrix.filter((r) => r.estado === "Cancelado").length;
  const activeFollowUp = matrix.filter(isOpen).length;

  const status = JUNTA_STATUS_ORDER.map((s) => ({
    name: s.name,
    count: matrix.filter((r) => r.estado === s.name).length,
    tone: s.tone
  }));

  const priorityOpen = JUNTA_PRIORITY_ORDER.map((p) => {
    const all = matrix.filter((r) => r.prioridad === p.name);
    return { name: p.name, count: all.filter(isOpen).length, total: all.length, tone: p.tone };
  }).filter((p) => p.total > 0);

  const actaOrder = [...new Set(matrix.map((r) => r.acta))];
  const byActa = actaOrder.map((acta) => {
    const rows = matrix.filter((r) => r.acta === acta);
    return {
      acta,
      total: rows.length,
      open: rows.filter(isOpen).length,
      completed: rows.filter((r) => r.estado === "Cumplido").length,
      canceled: rows.filter((r) => r.estado === "Cancelado").length
    };
  });

  const criticalOpen = (priorityOpen.find((p) => p.name === "Crítica") || {}).count || 0;
  const deadlines = matrix.filter((r) => r.plazo).length;
  const overdueOpen = matrix.filter((r) => isOpen(r) && r.plazo && r.plazo < referenceDate).length;
  const futureOpen = matrix.filter((r) => isOpen(r) && r.plazo && r.plazo >= referenceDate).length;

  return {
    updatedAt: data.updatedAt,
    sourceLabel: data.sourceLabel,
    scopeLabel: data.scopeLabel,
    securityLabel: data.securityLabel,
    totals: {
      records: matrix.length,
      activeFollowUp,
      completed,
      canceled,
      criticalOpen,
      deadlines,
      overdueOpen,
      futureOpen
    },
    status,
    priorityOpen,
    byActa,
    matrix,
    reading: data.reading
  };
}

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
