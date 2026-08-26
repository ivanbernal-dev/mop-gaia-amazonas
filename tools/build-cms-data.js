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
    json: "assets/data/documentos-mop.json",
    js: "assets/documentos-mop.js",
    globalName: "DOCUMENTOS_MOP_DATA",
    // El CMS solo edita la matriz cruda del Listado Maestro (una fila
    // por documento: proceso, código, nombre, versión, estado,
    // dependencia...). Los indicadores (total, vigentes, en
    // construcción...) y el resumen por tipo documental que muestra
    // "Gestión Documental del MOP" son un resumen CALCULADO a partir de
    // esa matriz. El link real de cada documento NUNCA se guarda aquí
    // -- este archivo se publica en un repositorio público de GitHub, y
    // el catálogo público solo expone metadatos, nunca el documento ni
    // su enlace.
    transform: buildDocumentCatalog,
    // Este archivo, a diferencia de los demás generados aquí, también
    // debe cargar el módulo de vista previa del catálogo (ver
    // assets/js/document-catalog-preview.js) -- así lo hacía el script
    // de importación anterior (tools/build-document-catalog-from-import.js,
    // ahora reemplazado por este flujo del CMS).
    extraFooter: `(function loadDocumentCatalogPreview() {\n` +
      `  const load = () => {\n` +
      `    const script = document.createElement("script");\n` +
      `    script.src = "assets/js/document-catalog-preview.js?v=20260826";\n` +
      `    document.body.appendChild(script);\n` +
      `  };\n` +
      `  if (document.readyState === "loading") {\n` +
      `    window.addEventListener("DOMContentLoaded", load, { once: true });\n` +
      `  } else {\n` +
      `    load();\n` +
      `  }\n` +
      `})();\n`
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

// Normaliza texto para comparaciones sin tildes/mayúsculas (igual que
// normalizeText() en assets/js/app.js -- se duplica aquí porque este
// script corre en Node, fuera del navegador).
function normalizeDocText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

function buildDocumentSummary(records) {
  return Array.from(new Set(records.map((record) => record.tipoDocumental || "Por clasificar")))
    .sort((left, right) => left.localeCompare(right, "es"))
    .map((tipoDocumental) => {
      const subset = records.filter((record) => (record.tipoDocumental || "Por clasificar") === tipoDocumental);
      return {
        tipoDocumental,
        vigentes: subset.filter((record) => normalizeDocText(record.estado).includes("vigente")).length,
        obsoletos: subset.filter((record) => normalizeDocText(record.estado).includes("obsoleto")).length,
        enActualizacion: subset.filter((record) => normalizeDocText(record.estado).includes("actualizacion")).length,
        // "En revisión" es un estado intermedio nuevo (borrador ya escrito,
        // pendiente de aprobación) que no existía en el listado anterior.
        // Para el resumen agregado se cuenta junto con "en construcción"
        // -- ambos significan "todavía no es la versión vigente" -- pero
        // cada ficha de documento sigue mostrando el estado real y exacto.
        enConstruccion: subset.filter((record) => {
          const estado = normalizeDocText(record.estado);
          return estado.includes("construccion") || estado.includes("revision");
        }).length
      };
    });
}

function buildDocumentCatalog(data) {
  const documentos = Array.isArray(data.documentos) ? data.documentos : [];

  // El catálogo público expone la metadata de todos los documentos del
  // Listado Maestro; lo que NUNCA se expone es el link real ni la
  // descarga -- por diseño, porque este archivo se publica en un
  // repositorio público de GitHub. clasificacion/accessClass se
  // mantiene por compatibilidad con la lógica ya existente en
  // assets/js/document-catalog-preview.js (que decide qué se muestra
  // según ese campo), pero aquí siempre queda en un valor visible.
  const enrichedDocumentos = documentos.map((record) => ({
    ...record,
    accessClass: record.clasificacion || "Interna",
    catalogVisible: true,
    downloadAuthorized: false,
    linkDocumento: "",
    canonicalUrl: ""
  }));

  const visibleStatusCounts = {
    vigentes: enrichedDocumentos.filter((record) => normalizeDocText(record.estado).includes("vigente")).length,
    enActualizacion: enrichedDocumentos.filter((record) => normalizeDocText(record.estado).includes("actualizacion")).length,
    enConstruccion: enrichedDocumentos.filter((record) => {
      const estado = normalizeDocText(record.estado);
      return estado.includes("construccion") || estado.includes("revision");
    }).length
  };

  return {
    fuente: data.fuente,
    hojaListado: data.hojaListado,
    hojaResumen: data.hojaResumen,
    fechaExtraccion: data.fechaExtraccion,
    catalogStats: {
      recordsTotal: enrichedDocumentos.length,
      catalogVisible: enrichedDocumentos.length,
      catalogHidden: 0,
      downloadsAuthorized: 0,
      visibleStatusCounts
    },
    documentos: enrichedDocumentos,
    resumenTipoDocumental: buildDocumentSummary(enrichedDocumentos)
  };
}

function build({ json, js, globalName, transform, extraFooter }) {
  const jsonPath = path.join(ROOT, json);
  const jsPath = path.join(ROOT, js);
  if (!fs.existsSync(jsonPath)) {
    throw new Error(`No se encontró ${json}`);
  }
  const raw = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
  const data = typeof transform === "function" ? transform(raw) : raw;
  const contents = `// Generado automáticamente por tools/build-cms-data.js a partir de ${json}.\n` +
    `// Para editar este contenido usa el gestor de contenido en /admin, no este archivo.\n` +
    `window.${globalName} = ${JSON.stringify(data, null, 2)};\n` +
    (extraFooter || "");
  fs.writeFileSync(jsPath, contents, "utf8");
  console.log(`${js} generado desde ${json}.`);
}

function main() {
  MAPEOS.forEach(build);
}

main();
