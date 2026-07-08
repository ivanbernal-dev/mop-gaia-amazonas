const boardDashboardData = {
  year: "2025",
  documents: [
    {
      id: "memoria-economica-2025",
      title: "Memoria Económica 2025",
      type: "Memoria Económica",
      status: "Pendiente de aprobación/publicación final",
      docx: "",
      pdf: ""
    },
    {
      id: "informe-gestion-2025",
      title: "Informe de Gestión 2025",
      type: "Informe de Gestión",
      status: "Pendiente de aprobación/publicación final",
      docx: "",
      pdf: ""
    }
  ],
  kpis: [
    { label: "Año gravable", display: "2025", source: "Memoria Económica 2025", theme: "Gobierno corporativo", document: "Memoria Económica", description: "Vigencia del tablero institucional." },
    { label: "Ingresos por subvenciones", display: "$23.339.824.252", source: "Memoria Económica 2025", theme: "Subvenciones", document: "Memoria Económica", description: "Recursos registrados para la vigencia." },
    { label: "Inversión de impacto", display: "88 %", source: "Memoria Económica 2025", theme: "Subvenciones", document: "Memoria Económica", description: "Recursos orientados directamente a impacto misional." },
    { label: "Administración y operación", display: "12 %", source: "Memoria Económica 2025", theme: "Subvenciones", document: "Memoria Económica", description: "Costos para sostener la operación institucional." },
    { label: "Excedentes fiscales aprobados", display: "$1.245.179.482", source: "Memoria Económica 2025 / Acta No. 60", theme: "Excedentes", document: "Memoria Económica", description: "Destinación aprobada por Junta Directiva." },
    { label: "Inversiones vigentes", display: "$13.038.278.456", source: "Memoria Económica 2025", theme: "Finanzas", document: "Memoria Económica", description: "Suma de dos CDT Davivienda." },
    { label: "Patrimonio institucional", display: "$15.868.350.937", source: "Informe de Gestión 2025", theme: "Finanzas", document: "Informe de Gestión", description: "Patrimonio reportado para la vigencia." },
    { label: "Convenios 2025", display: "$9.234.818.510", source: "Informe de Gestión 2025", theme: "Finanzas", document: "Informe de Gestión", description: "Convenios recibidos durante 2025." },
    { label: "Subvenciones 2025", display: "$22.535.590.139", source: "Informe de Gestión 2025", theme: "Finanzas", document: "Informe de Gestión", description: "Subvenciones reportadas en el informe." },
    { label: "Contratación institucional", display: "$20.426.543.978", source: "Informe de Gestión 2025", theme: "Contratación", document: "Informe de Gestión", description: "Contratación institucional consolidada." },
    { label: "ETI formalizadas", display: "8", source: "Informe de Gestión 2025", theme: "Gestión misional", document: "Informe de Gestión", description: "Entidades Territoriales Indígenas formalizadas o reconocidas." },
    { label: "Acuerdos interculturales", display: "8", source: "Informe de Gestión 2025", theme: "Gestión misional", document: "Informe de Gestión", description: "Acuerdos interculturales reportados." },
    { label: "Cumplimiento auditoría", display: "93 %", source: "Informe de Gestión 2025", theme: "Control interno", document: "Informe de Gestión", description: "Recomendaciones aplicadas o en implementación." }
  ],
  fundingSources: [
    { name: "Moore", percent: 38.14 },
    { name: "The Norwegian Ministry of Foreign Affairs / NICFI", percent: 26.76 },
    { name: "Nia Tero", percent: 15.62 },
    { name: "Avina Americas Inc", percent: 7.08 },
    { name: "New Venture Fund", percent: 4.11 },
    { name: "Fundación Mulago", percent: 3.17 },
    { name: "Re Wild", percent: 2.07 },
    { name: "Fundación Amigos de la Naturaleza", percent: 1.52 },
    { name: "Climate and Land Use Alliance", percent: 1.17 },
    { name: "Natura International", percent: 0.35 },
    { name: "Fidelity Charitable", percent: 0.01 },
    { name: "Tides Foundation", percent: 0 }
  ],
  allocation: [
    { name: "Estrategia de consolidación ETI", percent: 57 },
    { name: "Estrategia regional para la protección de la Amazonía", percent: 27 },
    { name: "Fortalecimiento gestión e innovación institucional", percent: 4 },
    { name: "Costos de administración y operación", percent: 12 }
  ],
  contracting: [
    { name: "Prestación de servicios", value: "$13.138.697.420", percent: 64 },
    { name: "Órdenes de servicio y compra", value: "$5.113.528.077", percent: 25 },
    { name: "Contratos laborales", value: "$2.174.318.481", percent: 11 }
  ]
};

const boardState = {
  document: "Todos",
  theme: "Todos",
  tab: "resumen"
};

function boardMatches(item) {
  const documentOk = boardState.document === "Todos" || item.document === boardState.document || item.type === boardState.document;
  const themeOk = boardState.theme === "Todos" || item.theme === boardState.theme;
  return documentOk && themeOk;
}

function renderBoardKpis() {
  const container = document.querySelector("[data-board-kpis]");
  if (!container) return;
  const items = boardDashboardData.kpis.filter(boardMatches);
  container.innerHTML = items.map((item) => `
    <article class="gaia-board-kpi" data-document="${item.document}" data-theme="${item.theme}">
      <strong>${item.display}</strong>
      <span>${item.label}</span>
      <p>${item.description}</p>
      <details>
        <summary>Ver más</summary>
        <small>Fuente: ${item.source}. Tema: ${item.theme}.</small>
      </details>
    </article>
  `).join("") || `<p class="gaia-board-note">No hay indicadores para el filtro seleccionado.</p>`;
}

function renderBoardBars(selector, title, items) {
  const container = document.querySelector(`[data-board-chart="${selector}"]`);
  if (!container) return;
  container.innerHTML = `
    <h4>${title}</h4>
    ${items.map((item) => `
      <div class="gaia-board-bar">
        <label><span>${item.name}</span><strong>${item.percent.toLocaleString("es-CO")} %</strong></label>
        <div class="gaia-board-bar-track"><span class="gaia-board-bar-fill" style="--percent:${item.percent}"></span></div>
        ${item.value ? `<small>${item.value}</small>` : ""}
      </div>
    `).join("")}
  `;
}

function renderBoardDocuments() {
  const container = document.querySelector("[data-board-documents]");
  if (!container) return;
  const documents = boardDashboardData.documents.filter(boardMatches);
  container.innerHTML = documents.map((doc) => `
    <article class="gaia-board-document-card" data-document="${doc.type}">
      <span class="gaia-status-badge">${doc.status}</span>
      <h3>${doc.title}</h3>
      <p>${doc.type === "Memoria Económica"
        ? "Certificación del Representante Legal y Revisor Fiscal sobre información económica, subvenciones, excedentes e inversiones de la vigencia 2025."
        : "Informe institucional con resultados misionales, gobierno corporativo, gestión financiera, contratación, control interno y transparencia."}</p>
      <p class="gaia-board-doc-meta">Documento fuente pendiente de publicación en assets/docs/junta-directiva/.</p>
      <div class="gaia-board-doc-actions">
        <button type="button" data-board-tab="${doc.type === "Memoria Económica" ? "memoria" : "gestion"}">Ver resumen visual</button>
        <span>DOCX pendiente</span>
        <span>PDF pendiente</span>
      </div>
    </article>
  `).join("");
}

function setBoardTab(tab) {
  boardState.tab = tab;
  document.querySelectorAll("[data-board-tab]").forEach((button) => {
    const isActive = button.dataset.boardTab === tab;
    if (button.getAttribute("role") === "tab") {
      button.setAttribute("aria-selected", String(isActive));
    }
  });
  document.querySelectorAll("[data-board-panel]").forEach((panel) => {
    const isActive = panel.dataset.boardPanel === tab;
    panel.classList.toggle("active", isActive);
    panel.hidden = !isActive;
  });
}

function initBoardFilters() {
  const board = document.querySelector("#junta-directiva");
  board?.addEventListener("click", (event) => {
    const tabButton = event.target.closest("[data-board-tab]");
    if (tabButton) setBoardTab(tabButton.dataset.boardTab);
  });

  document.querySelectorAll(".gaia-board-filter").forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.dataset.boardFilter;
      const value = button.dataset.value;
      if (!group || !value) return;
      document.querySelectorAll(`.gaia-board-filter[data-board-filter="${group}"]`).forEach((peer) => {
        const active = peer === button;
        peer.classList.toggle("active", active);
        peer.setAttribute("aria-pressed", String(active));
      });
      if (group === "document") boardState.document = value;
      if (group === "theme") boardState.theme = value;
      renderBoardKpis();
      renderBoardDocuments();
    });
  });

  setBoardTab(boardState.tab);
}

renderBoardKpis();
renderBoardBars("allocation", "Distribución por línea estratégica", boardDashboardData.allocation);
renderBoardBars("funding", "Fuentes de financiación por participación", boardDashboardData.fundingSources);
renderBoardBars("contracting", "Contratación institucional 2025", boardDashboardData.contracting);
renderBoardDocuments();
initBoardFilters();
