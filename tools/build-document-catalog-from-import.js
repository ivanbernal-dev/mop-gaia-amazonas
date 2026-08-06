#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const INPUT = path.resolve(ROOT, process.argv[2] || "import/Listado_Maestro_MOP.csv");
const DATA_OUTPUT = path.join(ROOT, "assets/documentos-mop.js");
const REPORT_OUTPUT = path.join(ROOT, "assets/data/mop-document-catalog-report.js");
const GENERATED_AT = "2026-08-06";
const EXPECTED_HEADERS = [
  "macroproceso",
  "proceso",
  "subproceso",
  "tipoDocumental",
  "descripcionTematica",
  "codigo",
  "nombre",
  "fechaAprobacion",
  "anio",
  "version",
  "estado",
  "dependencia",
  "soporte",
  "clasificacion"
];

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];
    const next = text[index + 1];

    if (character === '"' && quoted && next === '"') {
      field += '"';
      index += 1;
    } else if (character === '"') {
      quoted = !quoted;
    } else if (character === "," && !quoted) {
      row.push(field);
      field = "";
    } else if ((character === "\n" || character === "\r") && !quoted) {
      if (character === "\r" && next === "\n") index += 1;
      row.push(field);
      if (row.some((value) => value !== "")) rows.push(row);
      row = [];
      field = "";
    } else {
      field += character;
    }
  }

  if (field || row.length) {
    row.push(field);
    if (row.some((value) => value !== "")) rows.push(row);
  }

  if (quoted) throw new Error("El CSV contiene una comilla sin cerrar.");
  return rows;
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function cleanValue(value) {
  return String(value == null ? "" : value)
    .replace(/\u0000/g, "")
    .replace(/\r\n?/g, "\n")
    .trim();
}

function isCatalogVisible(classification) {
  return ["publico", "publica", "interno", "interna"].includes(normalizeText(classification));
}

function buildSummary(records) {
  return Array.from(new Set(records.map((record) => record.tipoDocumental || "Por clasificar")))
    .sort((left, right) => left.localeCompare(right, "es"))
    .map((tipoDocumental) => {
      const subset = records.filter((record) => (record.tipoDocumental || "Por clasificar") === tipoDocumental);
      return {
        tipoDocumental,
        vigentes: subset.filter((record) => normalizeText(record.estado).includes("vigente")).length,
        obsoletos: subset.filter((record) => normalizeText(record.estado).includes("obsoleto")).length,
        enActualizacion: subset.filter((record) => normalizeText(record.estado).includes("actualizacion")).length,
        enConstruccion: subset.filter((record) => normalizeText(record.estado).includes("construccion")).length
      };
    });
}

function findDuplicates(records) {
  const counts = new Map();
  records.forEach((record) => {
    const code = record.codigo.trim();
    if (code) counts.set(code, (counts.get(code) || 0) + 1);
  });
  return Array.from(counts.entries())
    .filter(([, count]) => count > 1)
    .map(([codigo, cantidad]) => ({ codigo, cantidad }))
    .sort((left, right) => left.codigo.localeCompare(right.codigo, "es"));
}

function findSensitiveValues(records) {
  const unsafePattern = /(?:https?:\/\/|www\.|[\w.+-]+@[\w.-]+\.[a-z]{2,}|\b[a-z]:\\|(?:^|\s)\/(?:users|home|workspace|root)\/)/i;
  const findings = [];
  records.forEach((record, recordIndex) => {
    EXPECTED_HEADERS.forEach((field) => {
      if (unsafePattern.test(record[field])) {
        findings.push({ fila: recordIndex + 2, campo: field, codigo: record.codigo || "Sin código" });
      }
    });
  });
  return findings;
}

function main() {
  if (!fs.existsSync(INPUT)) throw new Error(`No se encontró el CSV de entrada: ${INPUT}`);
  const rows = parseCsv(fs.readFileSync(INPUT, "utf8").replace(/^\uFEFF/, ""));
  if (!rows.length) throw new Error("El CSV está vacío.");

  const headers = rows[0].map(cleanValue);
  if (JSON.stringify(headers) !== JSON.stringify(EXPECTED_HEADERS)) {
    throw new Error(`Encabezados inválidos. Se esperaban: ${EXPECTED_HEADERS.join(", ")}`);
  }

  const records = rows.slice(1).map((values, index) => {
    if (values.length !== EXPECTED_HEADERS.length) {
      throw new Error(`La fila ${index + 2} contiene ${values.length} columnas; se esperaban ${EXPECTED_HEADERS.length}.`);
    }
    const record = {};
    EXPECTED_HEADERS.forEach((header, fieldIndex) => {
      record[header] = cleanValue(values[fieldIndex]);
    });
    return {
      ...record,
      accessClass: record.clasificacion,
      catalogVisible: isCatalogVisible(record.clasificacion),
      downloadAuthorized: false,
      linkDocumento: "",
      canonicalUrl: "",
      observaciones: ""
    };
  });

  const emptyCodes = records
    .map((record, index) => ({ fila: index + 2, nombre: record.nombre }))
    .filter((item, index) => !records[index].codigo);
  const duplicates = findDuplicates(records);
  const sensitiveValues = findSensitiveValues(records);
  if (emptyCodes.length) throw new Error(`Hay ${emptyCodes.length} registros sin código.`);
  if (sensitiveValues.length) throw new Error(`Se detectaron ${sensitiveValues.length} valores sensibles o enlaces en el CSV.`);

  const visible = records.filter((record) => record.catalogVisible).length;
  const hidden = records.length - visible;
  const visibleRecords = records.filter((record) => record.catalogVisible);
  const visibleStatusCounts = {
    vigentes: visibleRecords.filter((record) => normalizeText(record.estado).includes("vigente")).length,
    enActualizacion: visibleRecords.filter((record) => normalizeText(record.estado).includes("actualizacion")).length,
    enConstruccion: visibleRecords.filter((record) => normalizeText(record.estado).includes("construccion")).length
  };
  const data = {
    fuente: "Listado Maestro MOP sanitizado",
    hojaListado: "Catálogo documental",
    hojaResumen: "Resumen calculado desde los registros",
    fechaExtraccion: GENERATED_AT,
    catalogStats: {
      recordsTotal: records.length,
      catalogVisible: visible,
      catalogHidden: hidden,
      downloadsAuthorized: 0,
      visibleStatusCounts
    },
    documentos: visibleRecords,
    resumenTipoDocumental: buildSummary(visibleRecords)
  };
  const report = {
    generatedAt: GENERATED_AT,
    recordsTotal: records.length,
    catalogVisible: visible,
    catalogHidden: hidden,
    downloadsAuthorized: 0,
    previewModeExpected: true,
    classificationCounts: records.reduce((counts, record) => {
      const key = record.clasificacion || "Sin clasificación";
      counts[key] = (counts[key] || 0) + 1;
      return counts;
    }, {}),
    emptyCodeCount: emptyCodes.length,
    duplicateCodeGroupCount: duplicates.length,
    visibleDuplicateCodes: findDuplicates(visibleRecords),
    sensitiveValueCount: sensitiveValues.length
  };

  fs.mkdirSync(path.dirname(DATA_OUTPUT), { recursive: true });
  fs.mkdirSync(path.dirname(REPORT_OUTPUT), { recursive: true });
  fs.writeFileSync(
    DATA_OUTPUT,
    `window.DOCUMENTOS_MOP_DATA = ${JSON.stringify(data, null, 2)};\n` +
      `(function loadDocumentCatalogPreview() {\n` +
      `  const load = () => {\n` +
      `    const script = document.createElement("script");\n` +
      `    script.src = "assets/js/document-catalog-preview.js?v=20260806";\n` +
      `    document.body.appendChild(script);\n` +
      `  };\n` +
      `  if (document.readyState === "loading") {\n` +
      `    window.addEventListener("DOMContentLoaded", load, { once: true });\n` +
      `  } else {\n` +
      `    load();\n` +
      `  }\n` +
      `})();\n`,
    "utf8"
  );
  fs.writeFileSync(REPORT_OUTPUT, `window.MOP_DOCUMENT_CATALOG_REPORT = ${JSON.stringify(report, null, 2)};\n`, "utf8");

  console.log(`Catálogo generado: ${records.length} registros; ${visible} visibles; ${hidden} ocultos; 0 descargas autorizadas.`);
  console.log(`Códigos duplicados: ${duplicates.map((item) => `${item.codigo} (${item.cantidad})`).join(", ") || "ninguno"}.`);
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
