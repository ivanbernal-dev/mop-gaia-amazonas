#!/usr/bin/env node

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { spawnSync } = require("node:child_process");

const ROOT = path.resolve(__dirname, "..");
const failures = [];

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function checkSyntax(relativePath) {
  const result = spawnSync(process.execPath, ["--check", path.join(ROOT, relativePath)], {
    encoding: "utf8"
  });
  assert(result.status === 0, `${relativePath}: sintaxis inválida${result.stderr ? ` — ${result.stderr.trim()}` : ""}`);
}

function evaluateWindowData(relativePath, property) {
  const source = read(relativePath).replace(/\(function loadDocumentCatalogPreview[\s\S]*$/, "");
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox, { filename: relativePath });
  return sandbox.window[property];
}

const index = read("index.html");
const mirror = read("mapa-circular-gaia-amazonas.html");
const css = read("assets/css/mop.css");
const app = read("assets/js/app.js");
const documents = evaluateWindowData("assets/documentos-mop.js", "DOCUMENTOS_MOP_DATA");
const processes = evaluateWindowData("assets/data/mop-process-catalog.js", "MOP_PROCESS_CATALOG");

assert(index === mirror, "index.html y mapa-circular-gaia-amazonas.html no son idénticos");
assert(index.includes("Aseguramiento Independiente"), "falta la denominación Aseguramiento Independiente");
assert(!index.includes("Macroproceso de Revisoría y Auditoría"), "permanece la denominación anterior del anillo de auditorías");

["ciclo-gobernanza", "ciclo-misional", "ciclo-apoyo", "ciclo-estrategico", "titulo-ciclo-ain"].forEach((id) => {
  assert(index.includes(`id="${id}"`), `falta el ciclo explicativo ${id}`);
});

["FGA-AIN-CR-01", "FGA-AIN-PR-01", "FGA-AIN-MT-01", "SDE-THB-PR-02", "FGA-TIC-FT-01"].forEach((code) => {
  assert(index.includes(code), `falta el metadato protegido ${code}`);
});

[
  "Responsable: por confirmar",
  "Rol institucional correspondiente",
  "Macroproceso de Revisoría y Auditoría",
  "Documento pendiente de carga por el administrador del MOP"
].forEach((placeholder) => {
  assert(!index.includes(placeholder), `permanece texto provisional en HTML: ${placeholder}`);
});

assert(/\.circle\s*\{[\s\S]*?pointer-events:\s*none;/m.test(css), "los círculos superpuestos todavía pueden interceptar clics");
assert(/\.circle-mark\s*\{[\s\S]*?pointer-events:\s*auto;/m.test(css), "los rótulos de los anillos no están habilitados para interacción");
assert((app.match(/function initAuditModule\s*\(/g) || []).length === 1, "initAuditModule está duplicada");

assert(documents?.catalogStats?.catalogVisible === 22, "el catálogo autorizado no reporta 22 metadatos visibles");
assert(documents?.documentos?.length === 22, "el catálogo no contiene exactamente los 22 metadatos autorizados");
assert(documents?.documentos?.every((item) => item.downloadAuthorized === false), "algún documento habilita descarga");
assert(documents?.documentos?.every((item) => !item.linkDocumento && !item.canonicalUrl), "algún metadato expone un enlace documental");

const strategicRecords = processes?.estrategico || [];
assert(strategicRecords.length === 5, "el catálogo estratégico no contiene cinco procesos o funciones");
assert(strategicRecords.every((item) => item.documentCode && item.status === "En construcción"), "alguna ficha estratégica carece de código o estado controlado");

[
  "assets/js/app.js",
  "assets/js/document-catalog-preview.js",
  "assets/data/mop-process-catalog.js",
  "assets/data/mop-updates.js",
  "assets/documentos-mop.js",
  "tools/build-document-catalog-from-import.js"
].forEach(checkSyntax);

if (failures.length) {
  console.error(`Validación fallida (${failures.length}):`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Validación MOP superada: navegación, cinco ciclos, metadatos protegidos, catálogo de 22 registros y sintaxis JavaScript correctos.");
