const mapa = document.getElementById("mapa");
const mapSection = document.getElementById("mapSection");
const pageTitle = document.getElementById("pageTitle");
const circles = document.querySelectorAll(".circle");
const tooltip = document.getElementById("tooltip");
const panels = document.querySelectorAll(".panel");
const dependencySite = document.getElementById("dependencySite");
const dependencyTitle = document.getElementById("dependencyTitle");
const dependencySummary = document.getElementById("dependencySummary");
const dependencyResponsible = document.getElementById("dependencyResponsible");
const dependencyTeam = document.getElementById("dependencyTeam");
const dependencyContact = document.getElementById("dependencyContact");
const dependencyRelevant = document.getElementById("dependencyRelevant");
const backToMacroPanel = document.getElementById("backToMacroPanel");
const toggleDark = document.getElementById("toggleDark");
const documentData = window.DOCUMENTOS_MOP_DATA || { documentos: [], resumenTipoDocumental: [] };
const remoteDocumentMatrixBaseUrl = "https://docs.google.com/spreadsheets/d/11RG5MBjFDrfYq5_QtDG8_bb-LEVG0nFEZETuQ954hwI/gviz/tq";
const remoteDocumentMatrixCsvUrl = `${remoteDocumentMatrixBaseUrl}?tqx=out:csv&gid=0`;
const remoteDocumentMatrixJsonUrl = `${remoteDocumentMatrixBaseUrl}?tqx=out:json&gid=0`;
const remoteDocumentMatrixHtmlUrl = `${remoteDocumentMatrixBaseUrl}?tqx=out:html&gid=0`;
const remoteDocumentMatrixJsonpTimeout = 12000;
const documentMatrixStorageKey = "gaia-document-matrix-v2";
const legacyDocumentMatrixStorageKey = "gaia-document-matrix";
let documentRecords = documentData.documentos || [];
let documentSummaryRecords = documentData.resumenTipoDocumental || [];
const documentControls = {
  search: document.getElementById("docSearch"),
  macro: document.getElementById("docMacro"),
  proceso: document.getElementById("docProceso"),
  tipo: document.getElementById("docTipo"),
  estado: document.getElementById("docEstado"),
  reset: document.getElementById("docReset"),
  upload: document.getElementById("docMatrixUpload"),
  remoteSync: document.getElementById("docRemoteSync"),
  restore: document.getElementById("docRestoreBase"),
  uploadStatus: document.getElementById("docUploadStatus"),
  list: document.getElementById("docList"),
  meta: document.getElementById("docResultsMeta"),
  summary: document.getElementById("docSummaryBody")
};
const documentAdmin = {
  gate: document.getElementById("docAdminGate"),
  area: document.getElementById("docAdminArea"),
  key: document.getElementById("docAdminKey"),
  unlock: document.getElementById("docAdminUnlock"),
  logout: document.getElementById("docAdminLogout"),
  status: document.getElementById("docAdminStatus"),
  expectedKey: "GAIA-GPC-2026"
};
const adminControls = {
  visibilitySearch: document.getElementById("adminDocVisibilitySearch"),
  visibilityList: document.getElementById("adminDocVisibilityList"),
  visibilityStatus: document.getElementById("adminVisibilityStatus"),
  showFiltered: document.getElementById("adminShowFilteredDocs"),
  hideFiltered: document.getElementById("adminHideFilteredDocs"),
  contentTarget: document.getElementById("adminContentTarget"),
  contentResponsible: document.getElementById("adminContentResponsible"),
  contentSummary: document.getElementById("adminContentSummary"),
  contentTeam: document.getElementById("adminContentTeam"),
  contentRelevant: document.getElementById("adminContentRelevant"),
  saveContent: document.getElementById("adminSaveContent"),
  resetContent: document.getElementById("adminResetContent"),
  contentStatus: document.getElementById("adminContentStatus"),
  exportConfig: document.getElementById("adminExportConfig"),
  importConfig: document.getElementById("adminImportConfig"),
  configStatus: document.getElementById("adminConfigStatus")
};
const documentKpis = {
  total: document.getElementById("docTotal"),
  vigentes: document.getElementById("docVigentes"),
  actualizacion: document.getElementById("docActualizacion"),
  construccion: document.getElementById("docConstruccion"),
  clasificar: document.getElementById("docClasificar")
};
const documentSuggestion = {
  form: document.getElementById("docSuggestionForm"),
  preview: document.getElementById("docSuggestionPreview"),
  send: document.getElementById("docSuggestionSend"),
  draft: document.getElementById("docSuggestionDraft")
};
const excessData = window.EXCEDENTES_MOP_DATA || { proyectos: [], informes: [] };
const auditData = window.AUDITORIA_MOP_DATA || { auditoriaExterna: [], revisoriaFiscal: [], planesMejoramiento: [] };
const defaultAuditFirms = {
  externalFirm: "CIP. REVISORES FISCALES AUDITORES & CONSULTORES LTDA. - CIP LTDA.",
  fiscalFirm: "SAS AUDITORES & CONSULTORES SAS."
};
const excessAccess = {
  card: document.getElementById("excessAccessCard"),
  profile: document.getElementById("excessProfile"),
  key: document.getElementById("excessAccessKey"),
  button: document.getElementById("excessAccessButton"),
  message: document.getElementById("excessAccessMessage"),
  content: document.getElementById("excessRestrictedContent"),
  expectedHash: "965cebb3a483747b2e5733b0daa1d00e5b20da7407a6b39a0a04c1dd661f5e86",
  fallbackKeyParts: ["GAIA", "EXCEDENTES", "2026"]
};
const defaultPageTitle = "Modelo de Operación por Procesos (MOP) - Fundación Gaia Amazonas";
let activePanelId = "";
let documentVisibility = {};
let dependencyOverrides = {};
let auditOverrides = {};
const sidebarItems = [
  {
    id: "panel-nucleo",
    title: "Gobernanza",
    description: "Gobernanza, propósito, relación con AATI y aliados."
  },
  {
    id: "panel-misional",
    title: "Misional",
    description: "STP: transformación territorial y consolidación de ETI."
  },
  {
    id: "panel-apoyo",
    title: "Apoyo",
    description: "SDE: condiciones habilitantes para la operación institucional."
  },
  {
    id: "panel-estrategico",
    title: "Estratégico",
    description: "Visión amazónica, planeación y alianzas multiactor."
  },
  {
    id: "panel-auditoria",
    title: "Revisoría y auditoría",
    description: "Auditorías externas, revisoría fiscal y planes de mejoramiento."
  },
  {
    id: "panel-documentos",
    title: "Gestión documental",
    description: "Consulta de procesos, procedimientos, manuales y documentos del MOP."
  },
  {
    id: "panel-excedentes",
    title: "Excedentes",
    description: "Programas y proyectos de destinación de excedentes al objeto social."
  }
];
const narrationTexts = {
  nucleo: "El Macroproceso de Gobernanza y Propósito representa la razón de ser de la Fundación Gaia Amazonas. Desde aquí se orienta la gobernanza territorial amazónica, se cuida el Acuerdo Intercultural y se mantiene la relación con las AATI, la Junta Directiva, la Dirección General, los donantes y los socios estratégicos.",
  misional: "El Macroproceso Misional es el corazón operativo de Gaia Amazonas. Aquí la estrategia se convierte en acompañamiento territorial, consolidación de Entidades Territoriales Indígenas, seguimiento a convenios, gestión de proyectos y cooperación alineada con las prioridades de los pueblos.",
  apoyo: "El Macroproceso de Apoyo garantiza que la Fundación tenga las condiciones para trabajar bien: equipos acompañados, recursos administrados con cuidado, logística territorial, tecnología disponible, soporte jurídico y cumplimiento institucional.",
  estrategico: "El Macroproceso Estratégico ayuda a cuidar el rumbo de Gaia Amazonas. Asegura ética, transparencia, planeación, gestión de riesgos y alianzas pertinentes para avanzar hacia la Ruta 2030 con una visión amazónica de largo plazo."
};
const dependencyDetails = {
  "Subdirección Técnica y Política (STP)": {
    responsible: "Julieth Rojas",
    team: "<p>Espacio preparado para equipos territoriales, laboratorio sociojurídico, sistemas de información, gestión pública, ordenamiento territorial y estrategias transversales.</p>",
    contact: "<p>Correos institucionales por completar.</p>",
    relevant: "<p>Ubicación en el MOP: anillo misional. Función articuladora entre la Dirección y la operación territorial para convertir la estrategia en acompañamiento técnico-político a los pueblos indígenas y ETI.</p>"
  },
  "Subdirección de Desarrollo Estratégico (SDE)": {
    responsible: "Nini Cárdenas",
    team: "<p>Integra Coordinación Financiera, CIP, Servicios Logísticos, THB, TIC, GPC y Asesoría Jurídica y Legal como condiciones habilitantes de la operación institucional.</p>",
    contact: "<p>Correos institucionales por completar.</p>",
    relevant: "<p>Ubicación en el MOP: anillo de apoyo, con conexión estratégica. Articula recursos, capacidades internas, planeación financiera y procesos de soporte para que las prioridades misionales puedan ejecutarse.</p>"
  },
  "Dirección General": {
    responsible: "FRANCIS PHILIP VON HILDEBRAND REICHEL",
    team: "<p>Espacio preparado para equipo directivo, fotografía institucional y canales de relacionamiento.</p>",
    contact: "<p>Correo y datos de contacto por completar.</p>",
    relevant: "<p>Orientación estratégica, representación institucional, relación con aliados y conducción política de la Ruta 2030.</p>"
  },
  "Junta Directiva": {
    responsible: "Órgano colegiado",
    team: "<ol><li>Jerónimo Rodríguez Rodríguez</li><li>Luis Donisete Benzi Grupioni</li><li>Brigitte Baptiste</li><li>Biviany Rojas Garzón</li><li>Luisa Fernanda Bacca</li><li>Harold Andrés Ospino</li></ol>",
    contact: "<p>Correos institucionales por completar.</p>",
    relevant: "<p>Órgano de gobierno encargado de lineamientos estratégicos, integridad institucional y orientación de alto nivel.</p>"
  },
  "Donantes y socios estratégicos": {
    responsible: "Aliados de cooperación y socios institucionales",
    team: "<p>Espacio preparado para clasificar donantes, socios estratégicos y aliados de cooperación.</p>",
    contact: "<p>Canales de relacionamiento y responsables por completar.</p>",
    relevant: "<p><a href=\"https://app.powerbi.com/view?r=eyJrIjoiZDBjMGYwMjQtN2JkNS00Yzg5LWFhMTAtMWI5N2QwNDg0NzliIiwidCI6Ijg5ZDZkZGU2LWUyNTctNDNmYS05M2IzLWZmZDU0ZDY4Mzc4YSIsImMiOjR9&pageName=ReportSection\" target=\"_blank\" rel=\"noopener\">Abrir tablero Power BI de donantes y socios estratégicos</a></p>"
  },
  "Coordinación Integral de Proyectos (CIP)": {
    responsible: "Katherine Ramirez",
    team: `
      <div class="org-chart">
        <div class="org-level">
          <div class="org-person"><strong>Katherine Ramirez</strong><span>Coordinadora</span></div>
        </div>
        <div class="org-level">
          <div class="org-person"><strong>Janeth Calderon</strong><span>Líder de Planeación y Seguimiento Financiero</span></div>
          <div class="org-person"><strong>Edwin Copete</strong><span>Líder de Operaciones</span></div>
        </div>
        <div class="org-level">
          <div class="org-person"><strong>Alexander Franco Bernal</strong><span>Profesional de seguimiento financiero</span></div>
          <div class="org-person"><strong>Nury Sánchez</strong><span>Profesional de Operaciones</span></div>
          <div class="org-person"><strong>Lorena López</strong><span>Profesional de Operaciones</span></div>
          <div class="org-person"><strong>Luisa Bonilla</strong><span>Profesional de Operaciones</span></div>
        </div>
      </div>
    `,
    contact: "<p>Correos institucionales por completar.</p>",
    relevant: "<p>Gestión técnica, financiera y programática de proyectos; seguimiento financiero; monitoreo; y soporte operativo a la ejecución institucional.</p>"
  },
  "THB - Talento Humano, Bienestar y Cultura Organizacional": {
    responsible: "Sandra Moreno",
    team: `
      <div class="org-chart">
        <div class="org-level">
          <div class="org-person"><strong>Sandra Moreno</strong><span>Coordinadora THB</span></div>
        </div>
        <div class="org-level">
          <div class="org-person"><strong>Aura Cristina Daza</strong><span>Profesional junior de Seguridad y Salud en el Trabajo</span></div>
          <div class="org-person"><strong>Catherine Gaitán</strong><span>Asesora senior de género y derechos</span></div>
          <div class="org-person"><strong>Asesor Integral de Riesgo</strong><span>Gestión preventiva y cuidado organizacional</span></div>
        </div>
      </div>
    `,
    contact: "<p>Correos institucionales por completar.</p>",
    relevant: "<p>Gestión del talento humano, bienestar, cultura organizacional, seguridad y salud en el trabajo, enfoque de género, derechos y gestión integral del riesgo.</p>"
  },
  "CFI - Coordinación Financiera": {
    responsible: "Humberto Buitrago",
    team: `
      <div class="org-chart">
        <div class="org-level">
          <div class="org-person"><strong>Humberto Buitrago</strong><span>Coordinador Financiero (e)</span></div>
        </div>
        <div class="org-level">
          <div class="org-person"><strong>Por contratar</strong><span>Líder Presupuesto</span></div>
          <div class="org-person"><strong>Jennifer Ríos</strong><span>Líder Contabilidad</span></div>
          <div class="org-person"><strong>Diego Galeano</strong><span>Asesor Financiero</span></div>
          <div class="org-person"><strong>Arley Romero</strong><span>Tesorería</span></div>
        </div>
        <div class="org-level">
          <div class="org-person"><strong>Por contratar</strong><span>Profesional Junior Presupuesto</span></div>
          <div class="org-person"><strong>Por contratar</strong><span>Analista contable</span></div>
          <div class="org-person"><strong>Santiago Chavez</strong><span>Auxiliar Contable</span></div>
          <div class="org-person"><strong>Karen Lamprea</strong><span>Auxiliar Contable</span></div>
          <div class="org-person"><strong>Camilo Meneses</strong><span>Auxiliar de Archivo Contable</span></div>
          <div class="org-person"><strong>Por contratar</strong><span>Auxiliar tesorería</span></div>
        </div>
      </div>
    `,
    contact: "<p>Correos institucionales por completar.</p>",
    relevant: "<p>Contabilidad, tesorería, presupuesto, asesoría financiera, archivo contable, reportes y soporte financiero a programas y proyectos.</p>"
  },
  "SLS - Servicios Logísticos, Sedes y Compras": {
    responsible: "Alexandra Prada",
    team: `
      <div class="org-chart">
        <div class="org-level">
          <div class="org-person"><strong>Alexandra Prada</strong><span>Líder Servicios Logísticos</span></div>
        </div>
        <div class="org-level">
          <div class="org-person"><strong>Henry</strong><span>Conductor Presidencia y Dirección</span></div>
          <div class="org-person"><strong>Por contratar</strong><span>Profesional Compras</span></div>
        </div>
        <div class="org-level">
          <div class="org-person"><strong>Martha Acosta</strong><span>Administración Mitú</span></div>
          <div class="org-person"><strong>Elvis Casallas</strong><span>Administración Cúcuta</span></div>
          <div class="org-person"><strong>Dario Nieves</strong><span>Auxiliar Logística Bogotá</span></div>
          <div class="org-person"><strong>Lisandro</strong><span>Mantenimiento y reparaciones Bogotá</span></div>
        </div>
      </div>
    `,
    contact: "<p>Correos institucionales por completar.</p>",
    relevant: "<p>Gestión logística, sedes, compras, transporte institucional, administración territorial, mantenimiento y soporte operativo para los equipos.</p>"
  }
};
let availableVoices = [];
let selectedVoiceURI = "";

function refreshVoices() {
  if (!("speechSynthesis" in window)) return;
  availableVoices = window.speechSynthesis.getVoices();
  populateVoiceSelectors();
}

function loadVoices() {
  return new Promise((resolve) => {
    refreshVoices();
    if (availableVoices.length) {
      resolve(availableVoices);
      return;
    }

    const timeout = window.setTimeout(() => {
      refreshVoices();
      resolve(availableVoices);
    }, 1200);

    window.speechSynthesis.onvoiceschanged = () => {
      window.clearTimeout(timeout);
      refreshVoices();
      resolve(availableVoices);
    };
  });
}

function getSpanishColombiaVoice() {
  const normalizedVoices = availableVoices
    .filter((voice) => voice.lang.toLowerCase().startsWith("es"))
    .map((voice) => ({
    voice,
    lang: voice.lang.toLowerCase(),
    name: voice.name.toLowerCase()
  }));

  if (selectedVoiceURI) {
    const selected = normalizedVoices.find(({ voice }) => voice.voiceURI === selectedVoiceURI);
    if (selected) return selected.voice;
  }

  return (
    normalizedVoices.find(({ lang }) => lang === "es-co") ||
    normalizedVoices.find(({ name }) => name.includes("colombia")) ||
    normalizedVoices.find(({ lang }) => ["es-419", "es-mx", "es-us", "es-pe", "es-cl", "es-ar", "es-es"].includes(lang)) ||
    normalizedVoices.find(({ lang, name }) => lang.startsWith("es") && (name.includes("latino") || name.includes("español") || name.includes("spanish"))) ||
    normalizedVoices.find(({ lang }) => lang.startsWith("es")) ||
    null
  )?.voice || null;
}

function populateVoiceSelectors() {
  const spanishVoices = availableVoices.filter((voice) => voice.lang.toLowerCase().startsWith("es"));
  document.querySelectorAll("[data-voice-select]").forEach((select) => {
    const current = select.value || selectedVoiceURI;
    select.innerHTML = "";

    spanishVoices.forEach((voice) => {
      const option = document.createElement("option");
      option.value = voice.voiceURI;
      option.textContent = `${voice.name} (${voice.lang})`;
      select.appendChild(option);
    });

    const preferred = getSpanishColombiaVoice();
    select.value = current || preferred?.voiceURI || spanishVoices[0]?.voiceURI || "";
    select.closest("[data-voice-panel]").classList.toggle("is-visible", spanishVoices.length > 1);
  });
}

if ("speechSynthesis" in window) {
  refreshVoices();
  window.speechSynthesis.addEventListener?.("voiceschanged", refreshVoices);
}

document.querySelectorAll("[data-voice-select]").forEach((select) => {
  select.addEventListener("change", () => {
    selectedVoiceURI = select.value;
    document.querySelectorAll("[data-voice-select]").forEach((otherSelect) => {
      otherSelect.value = selectedVoiceURI;
    });
  });
});

document.querySelectorAll(".sidebar").forEach((sidebar) => {
  sidebar.innerHTML = `
    <h3>Menú</h3>
    ${sidebarItems.map((item) => `
      <details>
        <summary>${item.title}</summary>
        <p>${item.description}</p>
        <button type="button" data-nav="${item.id}">Ver sección</button>
      </details>
    `).join("")}
  `;
});

const navButtons = document.querySelectorAll("[data-nav]");
const gaiaViewButtons = document.querySelectorAll("[data-gaia-target]");
const gaiaViews = document.querySelectorAll(".gaia-view");
const gaiaViewTitles = {
  "conoce-gaia": "Esto es GAIA Amazonas",
  "ruta-2030": "GAIA Amazonas y su Modelo de Operación",
  "arquitectura-gaia": "Arquitectura organizacional y equipos de GAIA",
  "junta-directiva": "Junta Directiva",
  "mop-anillos": defaultPageTitle
};

function setActiveNav(panelId) {
  navButtons.forEach((button) => {
    const isActive = button.dataset.nav === panelId;
    button.classList.toggle("active", isActive);
  });
}

function setActiveGaiaView(targetId) {
  gaiaViewButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.gaiaTarget === targetId);
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function cleanDocValue(value, fallback = "Por clasificar") {
  const cleaned = String(value || "").trim();
  return cleaned || fallback;
}

function decodeHtmlEntities(value) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = String(value || "");
  return textarea.value;
}

function extractHref(value) {
  const text = String(value || "");
  const hrefMatch = text.match(/href=["']([^"']+)["']/i);
  if (hrefMatch) return decodeHtmlEntities(hrefMatch[1]);
  const urlMatch = text.match(/https?:\/\/[^\s"'<>]+/i);
  return urlMatch ? urlMatch[0] : "";
}

function normalizeDocumentLink(value) {
  return cleanDocValue(extractHref(value) || value, "");
}

function getDocumentKey(record) {
  return normalizeText(`${record.codigo || "sin-codigo"}|${record.nombre || ""}|${record.proceso || ""}`);
}

function loadJsonSetting(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    localStorage.removeItem(key);
    return fallback;
  }
}

function saveAdminSettings() {
  localStorage.setItem("gaia-document-visibility", JSON.stringify(documentVisibility));
  localStorage.setItem("gaia-dependency-overrides", JSON.stringify(dependencyOverrides));
  localStorage.setItem("gaia-audit-overrides", JSON.stringify(auditOverrides));
}

function loadAdminSettings() {
  documentVisibility = loadJsonSetting("gaia-document-visibility", {});
  dependencyOverrides = loadJsonSetting("gaia-dependency-overrides", {});
  auditOverrides = loadJsonSetting("gaia-audit-overrides", {});
}

function isDocumentVisible(record) {
  return documentVisibility[getDocumentKey(record)] !== false;
}

function getVisibleDocumentRecords() {
  return documentRecords.filter(isDocumentVisible);
}

function hasActiveDocumentFilter() {
  return Boolean(
    normalizeText(documentControls.search?.value || "") ||
    documentControls.macro?.value ||
    documentControls.proceso?.value ||
    documentControls.tipo?.value ||
    documentControls.estado?.value
  );
}

function textToHtml(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("<")) return trimmed;
  return trimmed
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");
}

function htmlToEditorText(value) {
  return String(value || "")
    .replace(/<\/p>\s*<p>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?p>/gi, "")
    .trim();
}

function getMergedDependencyDetail(title) {
  return {
    ...(dependencyDetails[title] || {}),
    ...(dependencyOverrides[title] || {})
  };
}

function getFieldFromRow(row, aliases) {
  const entries = Object.entries(row);
  for (const alias of aliases) {
    const normalizedAlias = normalizeText(alias);
    const found = entries.find(([key]) => normalizeText(key).replace(/\s+/g, " ") === normalizedAlias);
    if (found) return found[1];
  }
  return "";
}

function parseCsv(text) {
  const delimiter = (text.match(/;/g) || []).length > (text.match(/,/g) || []).length ? ";" : ",";
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (char === '"' && inQuotes && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === delimiter && !inQuotes) {
      row.push(cell.trim());
      cell = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  row.push(cell.trim());
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function googleVisualizationToRows(text) {
  let payload = text;
  if (typeof text === "string") {
    const match = String(text || "").match(/(?:google\.visualization\.Query\.setResponse|[\w.]+)\(([\s\S]*)\);?/);
    if (!match) return [];
    payload = JSON.parse(match[1]);
  }
  const table = payload.table || {};
  const headers = (table.cols || []).map((column) => cleanDocValue(column.label || column.id, ""));
  const rows = (table.rows || []).map((row) => (row.c || []).map((cell) => {
    if (!cell) return "";
    return extractHref(cell.f) || cleanDocValue(cell.v, "") || cleanDocValue(cell.f, "");
  }));
  return [headers, ...rows].filter((row) => row.some(Boolean));
}

function googleHtmlToRows(text) {
  if (!window.DOMParser) return [];
  const parsed = new DOMParser().parseFromString(String(text || ""), "text/html");
  return Array.from(parsed.querySelectorAll("tr")).map((row) => (
    Array.from(row.querySelectorAll("th, td")).map((cell) => {
      const anchor = cell.querySelector("a[href]");
      return anchor ? anchor.href : cell.textContent.trim();
    })
  )).filter((row) => row.some(Boolean));
}

function loadGoogleVisualizationJsonp() {
  return new Promise((resolve, reject) => {
    const callbackName = `gaiaDocumentMatrixCallback_${Date.now()}_${Math.random().toString(36).slice(2)}`;
    const script = document.createElement("script");
    const timeout = window.setTimeout(() => {
      cleanup();
      reject(new Error("Tiempo de espera agotado al consultar Google Sheets"));
    }, remoteDocumentMatrixJsonpTimeout);

    function cleanup() {
      window.clearTimeout(timeout);
      delete window[callbackName];
      script.remove();
    }

    window[callbackName] = (payload) => {
      cleanup();
      resolve(payload);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("No fue posible cargar Google Sheets por JSONP"));
    };
    script.src = `${remoteDocumentMatrixBaseUrl}?gid=0&tqx=${encodeURIComponent(`out:json;responseHandler:${callbackName}`)}&cacheBust=${Date.now()}`;
    document.head.appendChild(script);
  });
}

function mapMatrixRows(rows) {
  const headerIndex = rows.findIndex((row) => normalizeText(row[0]) === "macroproceso" || row.some((cell) => normalizeText(cell) === "codigo del documento"));
  if (headerIndex < 0) return [];
  const headers = rows[headerIndex].map((header) => header.replace(/\n/g, " ").trim());
  return rows.slice(headerIndex + 1).map((values) => {
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] || "";
    });

    return {
      macroproceso: getFieldFromRow(row, ["MACROPROCESO"]),
      proceso: getFieldFromRow(row, ["PROCESO"]),
      subproceso: getFieldFromRow(row, ["SUBPROCESO"]),
      tipoDocumental: getFieldFromRow(row, ["TIPO DOCUMENTAL"]),
      descripcionTematica: getFieldFromRow(row, ["DESCRIPCIÓN TEMÁTICA (Palabras Clave para Búsqueda)", "DESCRIPCIÓN TEMÁTICA", "DESCRIPCION TEMATICA"]),
      codigo: getFieldFromRow(row, ["CÓDIGO DEL DOCUMENTO", "CODIGO DEL DOCUMENTO"]),
      nombre: getFieldFromRow(row, ["NOMBRE DEL DOCUMENTO"]),
      fechaAprobacion: getFieldFromRow(row, ["FECHA DE APROBACIÓN", "FECHA DE APROBACION"]),
      anio: getFieldFromRow(row, ["AÑO", "ANO"]),
      version: getFieldFromRow(row, ["VERSIÓN", "VERSION"]),
      estado: getFieldFromRow(row, ["ESTADO"]),
      dependencia: getFieldFromRow(row, ["DEPENDENCIA"]),
      soporte: getFieldFromRow(row, ["SOPORTE"]),
      linkDocumento: normalizeDocumentLink(getFieldFromRow(row, [
        "LINK DEL DOCUMENTO",
        "LINK DOCUMENTO",
        "ENLACE DEL DOCUMENTO",
        "ENLACE DOCUMENTO",
        "ENLACE",
        "URL",
        "URL DEL DOCUMENTO",
        "REFERENCIA DOCUMENTAL",
        "HIPERVINCULO",
        "HIPERVÃNCULO"
      ])),
      observaciones: getFieldFromRow(row, ["OBSERVACIONES"])
    };
  }).filter((record) => record.nombre || record.codigo || record.proceso);
}

async function loadRemoteDocumentMatrix(manual = false) {
  if (!remoteDocumentMatrixCsvUrl || !window.fetch) return false;
  if (documentControls.uploadStatus) {
    documentControls.uploadStatus.textContent = manual
      ? "Consultando el listado maestro en Google Sheets..."
      : "Consultando listado maestro actualizado en Google Sheets...";
  }
  try {
    let parsedRecords = [];
    try {
      parsedRecords = mapMatrixRows(googleVisualizationToRows(await loadGoogleVisualizationJsonp()));
    } catch {
      parsedRecords = [];
    }

    const loaders = [
      { url: remoteDocumentMatrixJsonUrl, parser: googleVisualizationToRows },
      { url: remoteDocumentMatrixHtmlUrl, parser: googleHtmlToRows },
      { url: remoteDocumentMatrixCsvUrl, parser: parseCsv }
    ];

    for (const loader of parsedRecords.length ? [] : loaders) {
      try {
        const response = await fetch(loader.url, { cache: "no-store" });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        parsedRecords = mapMatrixRows(loader.parser(await response.text()));
        if (parsedRecords.length) break;
      } catch {
        parsedRecords = [];
      }
    }
    if (!parsedRecords.length) throw new Error("Estructura no reconocida");
    documentRecords = parsedRecords;
    documentSummaryRecords = buildDocumentSummary(documentRecords);
    localStorage.setItem(documentMatrixStorageKey, JSON.stringify(documentRecords));
    localStorage.removeItem(legacyDocumentMatrixStorageKey);
    resetDocumentFilters();
    refreshDocumentModule();
    if (documentControls.uploadStatus) {
      documentControls.uploadStatus.textContent = `Listado maestro actualizado desde Google Sheets: ${documentRecords.length} documentos cargados.`;
    }
    return true;
  } catch {
    if (documentControls.uploadStatus) {
      documentControls.uploadStatus.textContent = "No fue posible leer Google Sheets. Verifica que el archivo esté compartido como lector o carga la pestaña en CSV.";
    }
    return false;
  }
}

function buildDocumentSummary(records) {
  const types = Array.from(new Set(records.map((record) => cleanDocValue(record.tipoDocumental)))).sort((a, b) => a.localeCompare(b, "es"));
  return types.map((tipoDocumental) => {
    const subset = records.filter((record) => cleanDocValue(record.tipoDocumental) === tipoDocumental);
    return {
      tipoDocumental,
      vigentes: subset.filter((record) => normalizeText(record.estado).includes("vigente")).length,
      obsoletos: subset.filter((record) => normalizeText(record.estado).includes("obsoleto")).length,
      enActualizacion: subset.filter((record) => normalizeText(record.estado).includes("actualizacion")).length,
      enConstruccion: subset.filter((record) => normalizeText(record.estado).includes("construccion")).length
    };
  });
}

function resetDocumentFilters() {
  [documentControls.search, documentControls.macro, documentControls.proceso, documentControls.tipo, documentControls.estado].forEach((control) => {
    if (control) control.value = "";
  });
}

function refreshDocumentModule() {
  const visibleRecords = getVisibleDocumentRecords();
  fillDocumentSelect(documentControls.macro, visibleRecords, "macroproceso", "Todos los macroprocesos");
  fillDocumentSelect(documentControls.proceso, visibleRecords, "proceso", "Todos los procesos");
  fillDocumentSelect(documentControls.tipo, visibleRecords, "tipoDocumental", "Todos los tipos");
  fillDocumentSelect(documentControls.estado, visibleRecords, "estado", "Todos los estados");
  updateDocumentKpis();
  renderDocumentSummary();
  renderDocumentList();
  renderAdminVisibilityList();
}

function fillDocumentSelect(select, records, field, label) {
  if (!select) return;
  const values = Array.from(new Set(records.map((record) => cleanDocValue(record[field]))))
    .sort((a, b) => a.localeCompare(b, "es"));
  select.innerHTML = `<option value="">${label}</option>${values.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`).join("")}`;
}

function matchesDocumentFilters(record) {
  const search = normalizeText(documentControls.search?.value || "");
  const searchable = normalizeText([
    record.macroproceso,
    record.proceso,
    record.subproceso,
    record.tipoDocumental,
    record.descripcionTematica,
    record.codigo,
    record.nombre,
    record.estado,
    record.dependencia,
    record.linkDocumento
  ].join(" "));

  const selectedMacro = documentControls.macro?.value || "";
  const selectedProceso = documentControls.proceso?.value || "";
  const selectedTipo = documentControls.tipo?.value || "";
  const selectedEstado = documentControls.estado?.value || "";

  return (
    (!search || searchable.includes(search)) &&
    (!selectedMacro || cleanDocValue(record.macroproceso) === selectedMacro) &&
    (!selectedProceso || cleanDocValue(record.proceso) === selectedProceso) &&
    (!selectedTipo || cleanDocValue(record.tipoDocumental) === selectedTipo) &&
    (!selectedEstado || cleanDocValue(record.estado) === selectedEstado)
  );
}

function documentStatusCount(term) {
  const normalizedTerm = normalizeText(term);
  return getVisibleDocumentRecords().filter((record) => normalizeText(record.estado).includes(normalizedTerm)).length;
}

function updateDocumentKpis() {
  if (!documentKpis.total) return;
  const visibleRecords = getVisibleDocumentRecords();
  const pending = visibleRecords.filter((record) => !record.macroproceso || !record.tipoDocumental || !record.codigo).length;
  documentKpis.total.textContent = visibleRecords.length;
  documentKpis.vigentes.textContent = documentStatusCount("vigente");
  documentKpis.actualizacion.textContent = documentStatusCount("actualizacion");
  documentKpis.construccion.textContent = documentStatusCount("construccion");
  documentKpis.clasificar.textContent = pending;
}

function renderDocumentSummary() {
  if (!documentControls.summary) return;
  const summaryRecords = buildDocumentSummary(getVisibleDocumentRecords());
  documentControls.summary.innerHTML = (summaryRecords || []).map((item) => `
    <tr>
      <td>${escapeHtml(item.tipoDocumental)}</td>
      <td>${escapeHtml(item.vigentes)}</td>
      <td>${escapeHtml(item.obsoletos)}</td>
      <td>${escapeHtml(item.enActualizacion)}</td>
      <td>${escapeHtml(item.enConstruccion)}</td>
    </tr>
  `).join("");
}

function getDocumentTypeIcon(type) {
  const key = normalizeText(type);
  if (key.includes("manual") || key.includes("politica") || key.includes("reglamento") || key.includes("estatuto")) {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h8l4 4v14H6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path><path d="M14 3v5h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path><path d="M8 15h8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path><text x="8" y="12" font-size="4.5" font-weight="800" fill="currentColor">PDF</text></svg>`;
  }
  if (key.includes("matriz")) {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4zM4 10h16M4 15h16M10 5v14M16 5v14" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path></svg>`;
  }
  if (key.includes("formato") || key.includes("acta")) {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h8l4 4v14H6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path><path d="M14 3v5h5M8 13h8M8 17h6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>`;
  }
  if (key.includes("procedimiento")) {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 7h12M6 12h12M6 17h12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path><circle cx="4" cy="7" r="1.2" fill="currentColor"></circle><circle cx="4" cy="12" r="1.2" fill="currentColor"></circle><circle cx="4" cy="17" r="1.2" fill="currentColor"></circle></svg>`;
  }
  if (key.includes("guia") || key.includes("plan")) {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 0-4-4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path><path d="M9 8h6M9 12h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>`;
  }
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h8l4 4v14H6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path><path d="M14 3v5h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"></path><path d="M8 12h8M8 16h8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg>`;
}

function getDocumentStatusClass(status) {
  const key = normalizeText(status);
  if (key.includes("vigente")) return "status-vigente";
  if (key.includes("construccion")) return "status-construccion";
  if (key.includes("actualizacion")) return "status-actualizacion";
  if (key.includes("obsoleto")) return "status-obsoleto";
  return "status-clasificar";
}

function getDocumentReference(record) {
  const sheetLink = normalizeDocumentLink(record.linkDocumento);
  if (/^https?:\/\//i.test(sheetLink)) return sheetLink;
  const name = normalizeText(record.nombre);
  if (name.includes("manual") && name.includes("contratacion")) {
    return "https://docs.google.com/document/d/1mCP1r6sSxIPcVAjB_qRtfEUAgmedBnpX/edit?usp=drive_link&ouid=116206044109975997527&rtpof=true&sd=true";
  }
  return sheetLink;
}

function renderDocumentCard(record) {
  const link = getDocumentReference(record);
  const isExternalLink = /^https?:\/\//i.test(link);
  const tipo = cleanDocValue(record.tipoDocumental);
  const estado = cleanDocValue(record.estado, "Sin estado");
  const fileMarkup = link
    ? `<div class="document-file"><strong>Referencia documental:</strong> ${isExternalLink ? `<a href="${escapeHtml(link)}" target="_blank" rel="noopener">Abrir documento</a>` : escapeHtml(link)}</div>`
    : "";
  const description = record.descripcionTematica ? `<p>${escapeHtml(record.descripcionTematica)}</p>` : "";
  const observations = record.observaciones ? `<p><strong>Observaciones:</strong> ${escapeHtml(record.observaciones)}</p>` : "";

  return `
    <article class="document-card">
      <header>
        <div>
          <span class="document-type">${getDocumentTypeIcon(tipo)}${escapeHtml(tipo)}</span>
          <h3>${escapeHtml(cleanDocValue(record.nombre, "Documento sin nombre"))}</h3>
        </div>
        <span class="document-status ${getDocumentStatusClass(estado)}">${escapeHtml(estado)}</span>
      </header>
      <div class="document-meta">
        <span><strong>Código del documento:</strong> ${escapeHtml(cleanDocValue(record.codigo, "Pendiente de codificación"))}</span>
        <span><strong>Macroproceso:</strong> ${escapeHtml(cleanDocValue(record.macroproceso))}</span>
        <span><strong>Proceso:</strong> ${escapeHtml(cleanDocValue(record.proceso))}</span>
        <span><strong>Subproceso:</strong> ${escapeHtml(cleanDocValue(record.subproceso))}</span>
        <span><strong>Dependencia:</strong> ${escapeHtml(cleanDocValue(record.dependencia))}</span>
        <span><strong>Versión:</strong> ${escapeHtml(cleanDocValue(record.version, "Sin versión"))}</span>
      </div>
      ${description}
      ${observations}
      ${fileMarkup}
    </article>
  `;
}

function renderDocumentList() {
  if (!documentControls.list || !documentControls.meta) return;
  const visibleRecords = getVisibleDocumentRecords();
  if (!hasActiveDocumentFilter()) {
    documentControls.meta.textContent = `${visibleRecords.length} documentos visibles. Usa los filtros para consultar el listado.`;
    documentControls.list.innerHTML = `
      <article class="document-card document-empty-state">
        <h3>Selecciona un filtro para iniciar la consulta</h3>
        <p>Busca por código, nombre, palabra clave, macroproceso, proceso, tipo documental o estado. Así el MOP muestra solo los documentos relacionados con la necesidad de consulta.</p>
      </article>
    `;
    return;
  }
  const filtered = visibleRecords.filter(matchesDocumentFilters);
  documentControls.meta.textContent = `${filtered.length} de ${visibleRecords.length} documentos visibles encontrados`;
  documentControls.list.innerHTML = filtered.length
    ? filtered.map(renderDocumentCard).join("")
    : `<article class="document-card"><h3>No se encontraron documentos</h3><p>Ajusta los filtros o borra la búsqueda para ver más registros.</p></article>`;
}

function initDocumentModule() {
  if (!documentControls.list) return;
  localStorage.removeItem(legacyDocumentMatrixStorageKey);
  const storedMatrix = localStorage.getItem(documentMatrixStorageKey);
  if (storedMatrix) {
    try {
      documentRecords = JSON.parse(storedMatrix);
      documentSummaryRecords = buildDocumentSummary(documentRecords);
      if (documentControls.uploadStatus) documentControls.uploadStatus.textContent = "Matriz actualizada cargada desde este navegador.";
    } catch {
      localStorage.removeItem(documentMatrixStorageKey);
    }
  }
  refreshDocumentModule();

  [documentControls.search, documentControls.macro, documentControls.proceso, documentControls.tipo, documentControls.estado].forEach((control) => {
    control?.addEventListener("input", renderDocumentList);
    control?.addEventListener("change", renderDocumentList);
  });

  documentControls.reset?.addEventListener("click", () => {
    resetDocumentFilters();
    renderDocumentList();
  });

  documentControls.upload?.addEventListener("change", async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    const parsedRecords = mapMatrixRows(parseCsv(text));
    if (!parsedRecords.length) {
      if (documentControls.uploadStatus) documentControls.uploadStatus.textContent = "No pude reconocer la estructura de la matriz. Verifica que sea CSV UTF-8 y conserve los encabezados del listado maestro.";
      return;
    }
    documentRecords = parsedRecords;
    documentSummaryRecords = buildDocumentSummary(documentRecords);
    localStorage.setItem(documentMatrixStorageKey, JSON.stringify(documentRecords));
    resetDocumentFilters();
    refreshDocumentModule();
    if (documentControls.uploadStatus) documentControls.uploadStatus.textContent = `Matriz actualizada cargada: ${documentRecords.length} documentos. Esta versión quedó guardada en este navegador.`;
  });

  documentControls.remoteSync?.addEventListener("click", () => {
    loadRemoteDocumentMatrix(true);
  });

  documentControls.restore?.addEventListener("click", () => {
    documentRecords = documentData.documentos || [];
    documentSummaryRecords = documentData.resumenTipoDocumental || [];
    localStorage.removeItem(documentMatrixStorageKey);
    localStorage.removeItem(legacyDocumentMatrixStorageKey);
    resetDocumentFilters();
    refreshDocumentModule();
    if (documentControls.uploadStatus) documentControls.uploadStatus.textContent = "Matriz base restaurada.";
    if (documentControls.upload) documentControls.upload.value = "";
  });

  loadRemoteDocumentMatrix(false);
}

function getAdminVisibilityRecords() {
  const query = normalizeText(adminControls.visibilitySearch?.value || "");
  if (!query) return documentRecords;
  return documentRecords.filter((record) => normalizeText([
    record.codigo,
    record.nombre,
    record.macroproceso,
    record.proceso,
    record.tipoDocumental,
    record.estado,
    record.dependencia
  ].join(" ")).includes(query));
}

function updateAdminVisibilityStatus() {
  if (!adminControls.visibilityStatus) return;
  const hidden = documentRecords.filter((record) => !isDocumentVisible(record)).length;
  const visible = documentRecords.length - hidden;
  adminControls.visibilityStatus.textContent = `${visible} visibles y ${hidden} ocultos de ${documentRecords.length} documentos registrados.`;
}

function renderAdminVisibilityList() {
  if (!adminControls.visibilityList) return;
  const records = getAdminVisibilityRecords();
  updateAdminVisibilityStatus();
  adminControls.visibilityList.innerHTML = records.length
    ? records.map((record) => {
      const key = getDocumentKey(record);
      const checked = isDocumentVisible(record) ? "checked" : "";
      return `
        <label class="admin-document-item">
          <input type="checkbox" data-admin-doc-key="${escapeHtml(key)}" ${checked}>
          <span>
            <strong>${escapeHtml(cleanDocValue(record.codigo, "Sin código"))} - ${escapeHtml(cleanDocValue(record.nombre, "Documento sin nombre"))}</strong>
            <small>${escapeHtml(cleanDocValue(record.macroproceso))} / ${escapeHtml(cleanDocValue(record.proceso))} / ${escapeHtml(cleanDocValue(record.estado, "Sin estado"))}</small>
          </span>
        </label>
      `;
    }).join("")
    : `<p>No hay documentos para ese filtro administrativo.</p>`;
}

function setVisibilityForAdminFiltered(isVisible) {
  getAdminVisibilityRecords().forEach((record) => {
    const key = getDocumentKey(record);
    if (isVisible) {
      delete documentVisibility[key];
    } else {
      documentVisibility[key] = false;
    }
  });
  saveAdminSettings();
  refreshDocumentModule();
}

function collectAdminContentTargets() {
  const titles = new Set([
    "Auditoría externa de proyectos",
    "Revisoría fiscal",
    ...Object.keys(dependencyDetails),
    ...Object.keys(dependencyOverrides)
  ]);
  document.querySelectorAll(".dependency-grid li strong").forEach((strong) => {
    if (strong.textContent.trim()) titles.add(strong.textContent.trim());
  });
  return Array.from(titles).sort((a, b) => a.localeCompare(b, "es"));
}

function getAdminContentData(title) {
  if (title === "Auditoría externa de proyectos") {
    return { responsible: auditOverrides.externalFirm || document.getElementById("auditExternalFirm")?.textContent || "", summary: "", team: "", relevant: "" };
  }
  if (title === "Revisoría fiscal") {
    return { responsible: auditOverrides.fiscalFirm || document.getElementById("auditFiscalFirm")?.textContent || "", summary: "", team: "", relevant: "" };
  }
  return getMergedDependencyDetail(title);
}

function populateAdminContentTargets() {
  if (!adminControls.contentTarget) return;
  const current = adminControls.contentTarget.value;
  adminControls.contentTarget.innerHTML = collectAdminContentTargets()
    .map((title) => `<option value="${escapeHtml(title)}">${escapeHtml(title)}</option>`)
    .join("");
  if (current) adminControls.contentTarget.value = current;
  loadAdminContentEditor();
}

function loadAdminContentEditor() {
  if (!adminControls.contentTarget) return;
  const title = adminControls.contentTarget.value;
  const data = getAdminContentData(title);
  if (adminControls.contentResponsible) adminControls.contentResponsible.value = data.responsible || "";
  if (adminControls.contentSummary) adminControls.contentSummary.value = data.summary || "";
  if (adminControls.contentTeam) adminControls.contentTeam.value = htmlToEditorText(data.team || "");
  if (adminControls.contentRelevant) adminControls.contentRelevant.value = htmlToEditorText(data.relevant || "");
  if (adminControls.contentStatus) adminControls.contentStatus.textContent = title ? `Editando: ${title}` : "Selecciona una dependencia para editar.";
}

function applyAuditOverrides() {
  const external = document.getElementById("auditExternalFirm");
  const fiscal = document.getElementById("auditFiscalFirm");
  if (external) external.textContent = auditOverrides.externalFirm || defaultAuditFirms.externalFirm;
  if (fiscal) fiscal.textContent = auditOverrides.fiscalFirm || defaultAuditFirms.fiscalFirm;
}

function saveAdminContent() {
  const title = adminControls.contentTarget?.value || "";
  if (!title) return;
  const responsible = adminControls.contentResponsible?.value.trim() || "";
  if (title === "Auditoría externa de proyectos") {
    auditOverrides.externalFirm = responsible;
    applyAuditOverrides();
  } else if (title === "Revisoría fiscal") {
    auditOverrides.fiscalFirm = responsible;
    applyAuditOverrides();
  } else {
    dependencyOverrides[title] = {
      ...(dependencyOverrides[title] || {}),
      responsible,
      summary: adminControls.contentSummary?.value.trim() || "",
      team: textToHtml(adminControls.contentTeam?.value || ""),
      contact: getMergedDependencyDetail(title).contact || "<p>Correos institucionales por completar.</p>",
      relevant: textToHtml(adminControls.contentRelevant?.value || "")
    };
  }
  saveAdminSettings();
  populateAdminContentTargets();
  if (adminControls.contentStatus) adminControls.contentStatus.textContent = `Cambio guardado en este navegador para ${title}. Exporta la configuración para publicarlo después.`;
}

function resetAdminContent() {
  const title = adminControls.contentTarget?.value || "";
  if (!title) return;
  if (title === "Auditoría externa de proyectos") {
    delete auditOverrides.externalFirm;
  } else if (title === "Revisoría fiscal") {
    delete auditOverrides.fiscalFirm;
  } else {
    delete dependencyOverrides[title];
  }
  saveAdminSettings();
  applyAuditOverrides();
  loadAdminContentEditor();
  if (adminControls.contentStatus) adminControls.contentStatus.textContent = `Se restableció la información base de ${title}.`;
}

function exportAdminConfig() {
  const payload = {
    version: "MOP-GAIA-ADMIN-1",
    exportedAt: new Date().toISOString(),
    documentVisibility,
    dependencyOverrides,
    auditOverrides
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `configuracion-mop-gaia-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  if (adminControls.configStatus) adminControls.configStatus.textContent = "Configuración exportada.";
}

async function importAdminConfig(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const parsed = JSON.parse(await file.text());
    documentVisibility = parsed.documentVisibility || {};
    dependencyOverrides = parsed.dependencyOverrides || {};
    auditOverrides = parsed.auditOverrides || {};
    saveAdminSettings();
    applyAuditOverrides();
    refreshDocumentModule();
    populateAdminContentTargets();
    if (adminControls.configStatus) adminControls.configStatus.textContent = `Configuración importada desde ${file.name}.`;
  } catch {
    if (adminControls.configStatus) adminControls.configStatus.textContent = "No pude leer la configuración. Verifica que sea un archivo JSON exportado desde el MOP.";
  }
}

function unlockDocumentAdmin() {
  if (!documentAdmin.area) return;
  documentAdmin.area.hidden = false;
  if (documentAdmin.gate) documentAdmin.gate.open = false;
  document.body.classList.add("admin-mode");
  if (documentAdmin.status) documentAdmin.status.textContent = "Modo administrador activo.";
  sessionStorage.setItem("gaia-document-admin", "true");
  populateAdminContentTargets();
  renderAdminVisibilityList();
}

function logoutDocumentAdmin() {
  if (documentAdmin.area) documentAdmin.area.hidden = true;
  if (documentAdmin.gate) documentAdmin.gate.open = false;
  if (documentAdmin.key) documentAdmin.key.value = "";
  document.body.classList.remove("admin-mode");
  sessionStorage.removeItem("gaia-document-admin");
  if (documentAdmin.status) documentAdmin.status.textContent = "Sesión de administrador cerrada. La administración vuelve a quedar oculta.";
}

function initDocumentAdmin() {
  if (!documentAdmin.unlock) return;
  if (sessionStorage.getItem("gaia-document-admin") === "true") {
    unlockDocumentAdmin();
  }
  documentAdmin.unlock.addEventListener("click", () => {
    const key = documentAdmin.key?.value?.trim() || "";
    if (key === documentAdmin.expectedKey) {
      unlockDocumentAdmin();
      return;
    }
    if (documentAdmin.status) documentAdmin.status.textContent = "Clave no válida. La administración sigue oculta.";
  });
  adminControls.visibilitySearch?.addEventListener("input", renderAdminVisibilityList);
  adminControls.visibilityList?.addEventListener("change", (event) => {
    const input = event.target.closest("[data-admin-doc-key]");
    if (!input) return;
    if (input.checked) {
      delete documentVisibility[input.dataset.adminDocKey];
    } else {
      documentVisibility[input.dataset.adminDocKey] = false;
    }
    saveAdminSettings();
    refreshDocumentModule();
  });
  adminControls.showFiltered?.addEventListener("click", () => setVisibilityForAdminFiltered(true));
  adminControls.hideFiltered?.addEventListener("click", () => setVisibilityForAdminFiltered(false));
  adminControls.contentTarget?.addEventListener("change", loadAdminContentEditor);
  adminControls.saveContent?.addEventListener("click", saveAdminContent);
  adminControls.resetContent?.addEventListener("click", resetAdminContent);
  adminControls.exportConfig?.addEventListener("click", exportAdminConfig);
  adminControls.importConfig?.addEventListener("change", importAdminConfig);
  documentAdmin.logout?.addEventListener("click", logoutDocumentAdmin);
}

function getSuggestionValue(formData, name, fallback = "Por completar") {
  const value = String(formData.get(name) || "").trim();
  return value || fallback;
}

function inferMacroprocess(dependency) {
  const normalized = normalizeText(dependency);
  if (["direccion", "junta", "autoridades", "aati"].some((term) => normalized.includes(term))) {
    return "Gobernanza y Propósito";
  }
  if (["cip", "territorial", "convenios", "monitoreo", "cooperacion", "gobiernos indigenas"].some((term) => normalized.includes(term))) {
    return "Misional";
  }
  if (["thb", "cfi", "financiera", "sls", "logisticos", "tic", "juridica", "legal", "gpc"].some((term) => normalized.includes(term))) {
    return "Apoyo";
  }
  if (["auditoria", "revisoria"].some((term) => normalized.includes(term))) {
    return "Revisoría y Auditoría";
  }
  return "Por validar con GPC";
}

function inferDocumentType(fields) {
  const need = fields.necesidadPrincipal;
  const formal = fields.formalidad;
  const risk = fields.riesgoNivel;
  if (need === "lineamiento" || formal === "alta") return "Política";
  if (need === "paso-a-paso") return "Procedimiento";
  if (need === "orientacion") return risk === "alto" ? "Procedimiento" : "Guía";
  if (need === "operacion-integral") return "Manual";
  if (need === "registro") return "Formato";
  if (need === "control-datos") return "Matriz";
  if (need === "tarea-tecnica") return "Instructivo";
  if (need === "decision-formal") return "Acta";
  if (need === "informe") return "Informe";
  if (formal === "registro") return "Formato";
  if (formal === "media") return "Procedimiento";
  if (formal === "baja") return "Guía";
  return "Documento por clasificar";
}

function getRecommendationReason(fields, type, macroprocess) {
  const reasons = [];
  if (type === "Política") reasons.push("la necesidad plantea criterios institucionales o una posición que debe orientar decisiones.");
  if (type === "Procedimiento") reasons.push("la necesidad requiere un paso a paso claro, responsables y trazabilidad.");
  if (type === "Guía") reasons.push("la necesidad busca orientar la práctica sin convertirla necesariamente en una regla rígida.");
  if (type === "Manual") reasons.push("la necesidad integra varias reglas, roles, pasos y anexos de un tema amplio.");
  if (type === "Formato") reasons.push("la necesidad principal es capturar información o dejar evidencia de forma estándar.");
  if (type === "Matriz") reasons.push("la necesidad se centra en seguimiento, control o cruce de información.");
  if (type === "Instructivo") reasons.push("la necesidad corresponde a una tarea técnica puntual.");
  if (type === "Acta") reasons.push("la necesidad es dejar constancia formal de una decisión, reunión o aprobación.");
  if (type === "Informe") reasons.push("la necesidad es presentar análisis, avances, resultados o conclusiones.");
  if (fields.riesgoNivel === "alto") reasons.push("además, el riesgo reportado es alto y conviene dejar controles visibles.");
  reasons.push(`El macroproceso se sugiere como ${macroprocess} por el área desde donde nace la solicitud.`);
  return reasons.join(" ");
}

function buildDocumentSuggestion() {
  if (!documentSuggestion.form || !documentSuggestion.draft || !documentSuggestion.send) return;
  const formData = new FormData(documentSuggestion.form);
  const fields = {
    dependencia: getSuggestionValue(formData, "dependencia"),
    nombre: getSuggestionValue(formData, "nombre", "Necesidad documental por nombrar"),
    necesidadPrincipal: getSuggestionValue(formData, "necesidadPrincipal"),
    formalidad: getSuggestionValue(formData, "formalidad"),
    frecuencia: getSuggestionValue(formData, "frecuencia"),
    riesgoNivel: getSuggestionValue(formData, "riesgoNivel"),
    descripcion: getSuggestionValue(formData, "descripcion"),
    resultadoEsperado: getSuggestionValue(formData, "resultadoEsperado"),
    alcance: getSuggestionValue(formData, "alcance"),
    pasos: getSuggestionValue(formData, "pasos"),
    controles: getSuggestionValue(formData, "controles"),
    normativo: getSuggestionValue(formData, "normativo"),
    solicitante: getSuggestionValue(formData, "solicitante"),
    correo: getSuggestionValue(formData, "correo")
  };
  const suggestedType = inferDocumentType(fields);
  const suggestedMacroprocess = inferMacroprocess(fields.dependencia);
  const recommendationReason = getRecommendationReason(fields, suggestedType, suggestedMacroprocess);

  const subject = `Sugerencia de nuevo documento MOP - ${fields.nombre}`;
  const body = [
    "Hola Ivan,",
    "",
    "Comparto una sugerencia de nuevo documento para revisión de GPC - Gestión de Procesos y Cumplimiento Institucional.",
    "",
    `Tipo documental sugerido por el asistente: ${suggestedType}`,
    `Macroproceso sugerido por el asistente: ${suggestedMacroprocess}`,
    `Razón de la recomendación: ${recommendationReason}`,
    "",
    `Nombre tentativo de la necesidad: ${fields.nombre}`,
    `Dependencia solicitante: ${fields.dependencia}`,
    `Situación seleccionada: ${fields.necesidadPrincipal}`,
    `Nivel de formalidad: ${fields.formalidad}`,
    `Frecuencia: ${fields.frecuencia}`,
    `Riesgo si no se documenta: ${fields.riesgoNivel}`,
    "",
    `Descripción detallada de la necesidad: ${fields.descripcion}`,
    "",
    `Resultado esperado: ${fields.resultadoEsperado}`,
    "",
    `Alcance propuesto: ${fields.alcance}`,
    "",
    `Pasos, criterios o decisiones por aclarar: ${fields.pasos}`,
    "",
    `Evidencias, controles o datos por registrar: ${fields.controles}`,
    "",
    `Normas, contratos, auditorías o riesgos relacionados: ${fields.normativo}`,
    "",
    `Solicitante: ${fields.solicitante}`,
    `Correo institucional: ${fields.correo}`,
    "",
    "Quedo atento/a a la revisión para definir si debe iniciar construcción, ajuste documental o incorporación al listado maestro."
  ].join("\n");

  documentSuggestion.draft.innerHTML = `
    <h4>Fase inicial propuesta</h4>
    <dl>
      <dt>Tipo sugerido</dt><dd>${escapeHtml(suggestedType)}</dd>
      <dt>Macroproceso sugerido</dt><dd>${escapeHtml(suggestedMacroprocess)}</dd>
      <dt>Razón</dt><dd>${escapeHtml(recommendationReason)}</dd>
      <dt>Nombre tentativo</dt><dd>${escapeHtml(fields.nombre)}</dd>
      <dt>Dependencia</dt><dd>${escapeHtml(fields.dependencia)}</dd>
      <dt>Necesidad</dt><dd>${escapeHtml(fields.descripcion)}</dd>
      <dt>Resultado esperado</dt><dd>${escapeHtml(fields.resultadoEsperado)}</dd>
      <dt>Alcance</dt><dd>${escapeHtml(fields.alcance)}</dd>
      <dt>Contenido inicial</dt><dd>${escapeHtml(fields.pasos)}</dd>
      <dt>Controles</dt><dd>${escapeHtml(fields.controles)}</dd>
      <dt>Soporte o riesgo</dt><dd>${escapeHtml(fields.normativo)}</dd>
      <dt>Solicitante</dt><dd>${escapeHtml(fields.solicitante)} - ${escapeHtml(fields.correo)}</dd>
    </dl>
  `;
  documentSuggestion.draft.hidden = false;
  documentSuggestion.send.href = `mailto:ivan.bernal@gaiaamazonas.org?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  documentSuggestion.send.hidden = false;
}

function initDocumentSuggestion() {
  if (!documentSuggestion.preview || !documentSuggestion.form) return;
  documentSuggestion.preview.addEventListener("click", buildDocumentSuggestion);
  documentSuggestion.form.addEventListener("input", () => {
    if (documentSuggestion.send) documentSuggestion.send.hidden = true;
    if (documentSuggestion.draft) documentSuggestion.draft.hidden = true;
  });
}

function findExcessValue(item, names) {
  const entries = Object.entries(item || {});
  for (const name of names) {
    const found = entries.find(([key]) => normalizeText(key) === normalizeText(name));
    if (found) return found[1];
  }
  return "";
}

function renderProjectDestination(project) {
  const rows = project.filas || [];
  const totalValue = findExcessValue(project.total, ["Valor Asignado", "Valor asignado"]);
  const totalMission = findExcessValue(project.total, ["Vinculación misional", "Vinculacion misional"]);
  const totalTerm = findExcessValue(project.total, ["Plazo de ejecución", "Plazo de ejecucion"]);
  const programs = rows.map((row) => {
    const name = findExcessValue(row, ["Programa / Proyecto"]);
    const value = findExcessValue(row, ["Valor Asignado", "Valor asignado"]);
    const pct = findExcessValue(row, ["%"]);
    const mission = findExcessValue(row, ["Vinculación misional", "Vinculacion misional"]);
    const term = findExcessValue(row, ["Plazo de ejecución", "Plazo de ejecucion"]);
    return `
      <article class="excess-program">
        <h4>${escapeHtml(name)}</h4>
        <div class="excess-mini-grid">
          <div class="excess-mini"><strong>Valor asignado</strong><span>${escapeHtml(value || "Por completar")}</span></div>
          ${pct ? `<div class="excess-mini"><strong>Participación</strong><span>${escapeHtml(pct)}</span></div>` : ""}
          <div class="excess-mini"><strong>Plazo</strong><span>${escapeHtml(term || "Por completar")}</span></div>
        </div>
        ${mission ? `<p>${escapeHtml(mission)}</p>` : ""}
      </article>
    `;
  }).join("");

  return `
    <details class="excess-year-card" ${project.vigencia === "2024" ? "open" : ""}>
      <summary>Vigencia ${escapeHtml(project.vigencia)} <span>${escapeHtml(totalValue || project.acta || "")}</span></summary>
      <div class="excess-card-body">
        <div class="excess-mini-grid">
          <div class="excess-mini"><strong>Acta</strong><span>${escapeHtml(project.acta || "Por completar")}</span></div>
          <div class="excess-mini"><strong>Total aprobado</strong><span>${escapeHtml(totalValue || "Por completar")}</span></div>
          <div class="excess-mini"><strong>Plazo</strong><span>${escapeHtml(totalTerm || "Por completar")}</span></div>
        </div>
        <div class="excess-program-list">${programs}</div>
        <div class="excess-total">${escapeHtml(totalMission || "100 % destinado al objeto social")}</div>
      </div>
    </details>
  `;
}

function renderExecutionReport(report) {
  const description = (report.descripcion || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
  return `
    <details class="excess-year-card" ${report.vigencia === "2024" ? "open" : ""}>
      <summary>Vigencia ${escapeHtml(report.vigencia)} <span>${escapeHtml(report.valorEjecutado || report.valorAsignado || "")}</span></summary>
      <div class="excess-card-body">
        <div class="excess-mini-grid">
          <div class="excess-mini"><strong>Acta</strong><span>${escapeHtml(report.acta || "Por completar")}</span></div>
          <div class="excess-mini"><strong>Valor asignado</strong><span>${escapeHtml(report.valorAsignado || "Por completar")}</span></div>
          <div class="excess-mini"><strong>Valor ejecutado</strong><span>${escapeHtml(report.valorEjecutado || "Por completar")}</span></div>
          <div class="excess-mini"><strong>Saldo</strong><span>${escapeHtml(report.saldo || "Por completar")}</span></div>
          <div class="excess-mini"><strong>Plazo aprobado</strong><span>${escapeHtml(report.plazo || "Por completar")}</span></div>
          <div class="excess-mini"><strong>Año de ejecución</strong><span>${escapeHtml(report.anioEjecucion || "Por completar")}</span></div>
        </div>
        <div class="excess-description">${description}</div>
      </div>
    </details>
  `;
}

async function sha256(text) {
  if (!window.crypto?.subtle) return "";
  const encoded = new TextEncoder().encode(text);
  const hashBuffer = await window.crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(hashBuffer)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function unlockExcessContent(profile) {
  if (!excessAccess.content || !excessAccess.card) return;
  excessAccess.content.hidden = false;
  excessAccess.card.style.display = "none";
  sessionStorage.setItem("gaia-excess-access", profile || "perfil autorizado");
}

function initExcessAccess() {
  if (!excessAccess.button) return;
  const storedProfile = sessionStorage.getItem("gaia-excess-access");
  if (storedProfile) {
    unlockExcessContent(storedProfile);
    return;
  }

  excessAccess.button.addEventListener("click", async () => {
    const profile = excessAccess.profile?.value || "";
    const key = excessAccess.key?.value || "";
    if (!profile || !key) {
      if (excessAccess.message) excessAccess.message.textContent = "Selecciona un perfil y escribe la clave de visualización.";
      return;
    }
    const hash = await sha256(key.trim());
    const fallbackKey = excessAccess.fallbackKeyParts.join("-");
    if ((hash && hash === excessAccess.expectedHash) || key.trim() === fallbackKey) {
      unlockExcessContent(profile);
      return;
    }
    if (excessAccess.message) excessAccess.message.textContent = "Clave no válida para visualizar esta sección.";
  });
}

function initExcessModule() {
  const projectList = document.getElementById("excessProjectList");
  const reportList = document.getElementById("excessReportList");
  if (!projectList || !reportList) return;

  projectList.innerHTML = (excessData.proyectos || []).map(renderProjectDestination).join("");
  reportList.innerHTML = (excessData.informes || []).map(renderExecutionReport).join("");

  document.querySelectorAll("[data-excess-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.excessTab;
      document.querySelectorAll("[data-excess-tab]").forEach((tab) => tab.classList.toggle("active", tab === button));
      document.getElementById("excessProjects")?.classList.toggle("is-visible", target === "projects");
      document.getElementById("excessReports")?.classList.toggle("is-visible", target === "reports");
    });
  });

  initExcessAccess();
}

function renderAuditDocumentItem(documentItem, emptyText) {
  if (!documentItem?.url) {
    return `
      <article class="audit-document-item">
        <h4>${escapeHtml(documentItem?.titulo || emptyText)}</h4>
        <p>${escapeHtml(documentItem?.descripcion || "Documento pendiente de carga por el administrador del MOP.")}</p>
      </article>
    `;
  }
  return `
    <article class="audit-document-item">
      <h4>${escapeHtml(documentItem.titulo || "Documento de auditoría")}</h4>
      <p>${escapeHtml(documentItem.descripcion || `Vigencia ${documentItem.anio || "por clasificar"}`)}</p>
      <a href="${escapeHtml(documentItem.url)}" target="_blank" rel="noopener">Abrir o descargar documento</a>
    </article>
  `;
}

function renderAuditProjectYear(year) {
  const target = document.getElementById("auditProjectDocs");
  if (!target) return;
  const record = (auditData.auditoriaExterna || []).find((item) => String(item.anio) === String(year));
  const docs = record?.documentos || [];
  target.innerHTML = docs.length
    ? docs.map((item) => renderAuditDocumentItem(item, `Auditoría externa ${year}`)).join("")
    : renderAuditDocumentItem({ titulo: `Auditoría externa de proyectos ${year}` }, `Auditoría externa de proyectos ${year}`);
}

function renderAuditStaticList(targetId, records, emptyText) {
  const target = document.getElementById(targetId);
  if (!target) return;
  target.innerHTML = records?.length
    ? records.map((item) => renderAuditDocumentItem(item, emptyText)).join("")
    : renderAuditDocumentItem({ titulo: emptyText }, emptyText);
}

function initAuditModule() {
  const yearActions = document.getElementById("auditYearActions");
  if (!yearActions) return;
  const years = ["2021", "2022", "2023", "2024", "2025", "2026"];
  yearActions.innerHTML = years.map((year, index) => `<button type="button" data-audit-year="${year}" class="${index === years.length - 1 ? "active" : ""}">${year}</button>`).join("");
  yearActions.querySelectorAll("[data-audit-year]").forEach((button) => {
    button.addEventListener("click", () => {
      yearActions.querySelectorAll("[data-audit-year]").forEach((item) => item.classList.toggle("active", item === button));
      renderAuditProjectYear(button.dataset.auditYear);
    });
  });
  renderAuditProjectYear("2026");
  renderAuditStaticList("auditFiscalDocs", auditData.revisoriaFiscal || [], "Informe de revisoría fiscal pendiente de carga");
  renderAuditStaticList("auditImprovementDocs", auditData.planesMejoramiento || [], "Plan de mejoramiento pendiente de carga");
}

function getAuditDocumentsByYear(records, year) {
  const directRecords = (records || []).filter((item) => String(item.anio) === String(year));
  if (directRecords.length && directRecords.some((item) => Array.isArray(item.documentos))) {
    return directRecords.flatMap((item) => item.documentos || []);
  }
  return directRecords;
}

function renderAuditYearList(targetId, records, year, emptyTitle) {
  const target = document.getElementById(targetId);
  if (!target) return;
  const docs = getAuditDocumentsByYear(records, year);
  target.innerHTML = docs.length
    ? docs.map((item) => renderAuditDocumentItem(item, `${emptyTitle} ${year}`)).join("")
    : renderAuditDocumentItem({ titulo: `${emptyTitle} ${year}` }, `${emptyTitle} ${year}`);
}

function initAuditYearSelector(actionsId, targetId, records, emptyTitle) {
  const yearActions = document.getElementById(actionsId);
  if (!yearActions) return;
  const years = ["2021", "2022", "2023", "2024", "2025", "2026"];
  yearActions.innerHTML = years.map((year, index) => `<button type="button" data-audit-year="${year}" class="${index === years.length - 1 ? "active" : ""}">${year}</button>`).join("");
  yearActions.querySelectorAll("[data-audit-year]").forEach((button) => {
    button.addEventListener("click", () => {
      yearActions.querySelectorAll("[data-audit-year]").forEach((item) => item.classList.toggle("active", item === button));
      renderAuditYearList(targetId, records, button.dataset.auditYear, emptyTitle);
    });
  });
  renderAuditYearList(targetId, records, "2026", emptyTitle);
}

function initAuditModule() {
  initAuditYearSelector("auditYearActions", "auditProjectDocs", auditData.auditoriaExterna || [], "Auditoría externa de proyectos");
  initAuditYearSelector("auditFiscalYearActions", "auditFiscalDocs", auditData.revisoriaFiscal || [], "Informe de revisoría fiscal");
  initAuditYearSelector("auditImprovementYearActions", "auditImprovementDocs", auditData.planesMejoramiento || [], "Plan de mejoramiento");
}

function showGaiaView(targetId, shouldScroll = true) {
  document.body.classList.remove("panel-view");
  panels.forEach((panel) => panel.classList.remove("is-visible"));
  dependencySite.classList.remove("is-visible");
  document.querySelectorAll(".sidebar details").forEach((details) => {
    details.open = false;
  });
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  gaiaViews.forEach((view) => {
    const isActive = view.id === targetId || view.dataset.gaiaExtra === targetId;
    view.classList.toggle("is-active", isActive);
  });

  mapSection.style.display = targetId === "mop-anillos" ? "grid" : "none";
  pageTitle.textContent = gaiaViewTitles[targetId] || defaultPageTitle;
  activePanelId = "";
  setActiveNav("");
  setActiveGaiaView(targetId);

  if (shouldScroll) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function showPanel(panelId) {
  document.body.classList.add("panel-view");
  mapSection.style.display = "none";
  dependencySite.classList.remove("is-visible");
  document.querySelectorAll(".sidebar details").forEach((details) => {
    details.open = false;
  });
  panels.forEach((panel) => {
    panel.classList.toggle("is-visible", panel.id === panelId);
  });
  const panelTitle = document.querySelector(`#${panelId} h2`);
  pageTitle.textContent = panelTitle ? panelTitle.textContent : defaultPageTitle;
  activePanelId = panelId;
  setActiveNav(panelId);
  setActiveGaiaView("");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function volver() {
  panels.forEach((panel) => panel.classList.remove("is-visible"));
  dependencySite.classList.remove("is-visible");
  document.querySelectorAll(".sidebar details").forEach((details) => {
    details.open = false;
  });
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  showGaiaView("mop-anillos");
}

function getDependencyData(card) {
  const title = card.querySelector("strong")?.textContent?.trim() || "Dependencia";
  const detail = getMergedDependencyDetail(title);
  const lines = card.innerText.split("\n").map((line) => line.trim()).filter(Boolean);
  const responsibleLine = lines.find((line) => /^Responsables?:|^Responsable técnico:/i.test(line)) || "Responsable: por completar";
  const summary = lines
    .filter((line) => line !== title && line !== responsibleLine && !line.includes("Abrir micrositio"))
    .join(" ");

  return {
    title,
    responsible: detail.responsible || responsibleLine.replace(/^Responsables?:\s*/i, "").replace(/^Responsable técnico:\s*/i, ""),
    summary: detail.summary || summary || "Espacio preparado para ampliar la función, alcance, equipo y datos relevantes de esta dependencia.",
    team: detail.team || "<p>Espacio preparado para nombres, cargos y fotografías.</p>",
    contact: detail.contact || "<p>Espacio preparado para correos institucionales y canales de contacto.</p>",
    relevant: detail.relevant || "<p>Espacio preparado para indicadores, documentos, procesos y enlaces clave.</p>"
  };
}

function addTeamContactPlaceholders() {
  dependencyTeam.querySelectorAll(".org-person").forEach((person) => {
    if (!person.querySelector(".org-email")) {
      const email = document.createElement("span");
      email.className = "org-email";
      email.textContent = "Correo por completar";
      person.appendChild(email);
    }
  });
}

function openDependencySite(card) {
  const data = getDependencyData(card);
  document.body.classList.add("panel-view");
  panels.forEach((panel) => panel.classList.remove("is-visible"));
  mapSection.style.display = "none";
  dependencyTitle.textContent = data.title;
  dependencyResponsible.textContent = data.responsible;
  dependencySummary.textContent = data.summary;
  dependencyTeam.innerHTML = data.team;
  addTeamContactPlaceholders();
  dependencyContact.innerHTML = data.contact;
  dependencyRelevant.innerHTML = data.relevant;
  dependencySite.classList.add("is-visible");
  pageTitle.textContent = data.title;
  setActiveNav("");
  setActiveGaiaView("");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

circles.forEach((circle) => {
  circle.addEventListener("mouseenter", () => {
    tooltip.innerHTML = circle.dataset.tooltip;
    tooltip.style.opacity = "1";
  });

  circle.addEventListener("focus", () => {
    const rect = circle.getBoundingClientRect();
    tooltip.innerHTML = circle.dataset.tooltip;
    tooltip.style.left = Math.max(16, Math.min(rect.right + 12, window.innerWidth - 340)) + "px";
    tooltip.style.top = Math.max(rect.top, 16) + "px";
    tooltip.style.opacity = "1";
  });

  circle.addEventListener("mousemove", (event) => {
    tooltip.style.left = event.clientX + 15 + "px";
    tooltip.style.top = event.clientY - 10 + "px";
  });

  circle.addEventListener("mouseleave", () => {
    tooltip.style.opacity = "0";
  });

  circle.addEventListener("blur", () => {
    tooltip.style.opacity = "0";
  });

  circle.addEventListener("click", () => {
    tooltip.style.opacity = "0";
    showPanel(circle.dataset.target);
  });
});

navButtons.forEach((button) => {
  button.addEventListener("click", () => showPanel(button.dataset.nav));
});

gaiaViewButtons.forEach((button) => {
  button.addEventListener("click", () => showGaiaView(button.dataset.gaiaTarget));
});

document.querySelectorAll(".dependency-grid li").forEach((card) => {
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.addEventListener("click", (event) => {
    if (event.target.closest("a")) return;
    openDependencySite(card);
  });
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDependencySite(card);
    }
  });
});

backToMacroPanel.addEventListener("click", () => {
  if (activePanelId) {
    showPanel(activePanelId);
  } else {
    volver();
  }
});

document.querySelectorAll("[data-back]").forEach((button) => {
  button.addEventListener("click", volver);
});

document.querySelectorAll("[data-scroll-suggestion]").forEach((button) => {
  button.addEventListener("click", () => {
    const suggestion = document.querySelector(".suggestion-builder");
    if (suggestion) suggestion.open = true;
    document.getElementById("titulo-sugerencia-documento")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

function setDarkMode(isDark) {
  document.body.classList.toggle("dark", isDark);
  toggleDark.setAttribute("aria-pressed", isDark ? "true" : "false");
  localStorage.setItem("gaia-map-dark-mode", isDark ? "true" : "false");
}

toggleDark.addEventListener("click", () => {
  setDarkMode(!document.body.classList.contains("dark"));
});

setDarkMode(localStorage.getItem("gaia-map-dark-mode") === "true");
loadAdminSettings();
applyAuditOverrides();
initDocumentModule();
initDocumentAdmin();
initDocumentSuggestion();
initExcessModule();
initAuditModule();
const initialGaiaView = gaiaViewTitles[window.location.hash.slice(1)] ? window.location.hash.slice(1) : "conoce-gaia";
showGaiaView(initialGaiaView, false);

document.querySelectorAll("[data-audio]").forEach((button) => {
  button.addEventListener("click", async () => {
    const text = narrationTexts[button.dataset.audio];
    if (!text || !("speechSynthesis" in window)) return;

    const note = button.closest(".content").querySelector("[data-audio-note]");
    if (note) note.style.display = "none";

    await loadVoices();
    const spanishVoice = getSpanishColombiaVoice();
    if (!spanishVoice) {
      if (note) note.style.display = "block";
      window.speechSynthesis.cancel();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = spanishVoice.lang || "es-CO";
    utterance.voice = spanishVoice;
    utterance.rate = 0.92;
    utterance.pitch = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  });
});
