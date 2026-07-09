const boardDashboardData = {
  year: "2025",
  documents: [
    {
      id: "memoria-economica-2025",
      title: "Memoria Económica 2025",
      type: "memoria",
      typeLabel: "Memoria Económica",
      status: "Documento fuente cargado / versión para revisión",
      docx: "assets/docs/junta-directiva/memoria-economica-2025.docx",
      pdf: ""
    },
    {
      id: "informe-gestion-2025",
      title: "Informe de Gestión GAIA 2025",
      type: "gestion",
      typeLabel: "Informe de Gestión",
      status: "Documento fuente cargado / versión para revisión",
      docx: "assets/docs/junta-directiva/informe-gestion-gaia-2025.docx",
      pdf: ""
    }
  ],
  kpis: [
    { label: "Año gravable", display: "2025", fullValue: "2025", source: "Memoria Económica 2025", theme: "gobierno", themeLabel: "Gobierno corporativo", document: "memoria", description: "Vigencia del tablero institucional." },
    { label: "Ingresos por subvenciones", display: "$23.340 M", fullValue: "$23.339.824.252", source: "Memoria Económica 2025", theme: "subvenciones", themeLabel: "Subvenciones", document: "memoria", description: "Recursos registrados para la vigencia." },
    { label: "Inversión de impacto", display: "88 %", fullValue: "88 %", source: "Memoria Económica 2025", theme: "subvenciones", themeLabel: "Subvenciones", document: "memoria", description: "Recursos orientados directamente a impacto misional." },
    { label: "Administración y operación", display: "12 %", fullValue: "12 %", source: "Memoria Económica 2025", theme: "subvenciones", themeLabel: "Subvenciones", document: "memoria", description: "Costos para sostener la operación institucional." },
    { label: "Excedentes fiscales aprobados", display: "$1.245 M", fullValue: "$1.245.179.482", source: "Memoria Económica 2025 / Acta No. 60", theme: "excedentes", themeLabel: "Excedentes", document: "memoria", description: "Destinación aprobada por Junta Directiva." },
    { label: "Inversiones vigentes", display: "$13.038 M", fullValue: "$13.038.278.456", source: "Memoria Económica 2025", theme: "finanzas", themeLabel: "Finanzas", document: "memoria", description: "Suma de dos CDT Davivienda." },
    { label: "Patrimonio institucional", display: "$15.868 M", fullValue: "$15.868.350.937", source: "Informe de Gestión 2025", theme: "finanzas", themeLabel: "Finanzas", document: "gestion", description: "Patrimonio reportado para la vigencia." },
    { label: "Convenios 2025", display: "$9.235 M", fullValue: "$9.234.818.510", source: "Informe de Gestión 2025", theme: "finanzas", themeLabel: "Finanzas", document: "gestion", description: "Convenios recibidos durante 2025." },
    { label: "Subvenciones 2025", display: "$22.536 M", fullValue: "$22.535.590.139", source: "Informe de Gestión 2025", theme: "finanzas", themeLabel: "Finanzas", document: "gestion", description: "Subvenciones reportadas en el informe." },
    { label: "Contratación institucional", display: "$20.427 M", fullValue: "$20.426.543.978", source: "Informe de Gestión 2025", theme: "contratacion", themeLabel: "Contratación", document: "gestion", description: "Contratación institucional consolidada." },
    { label: "ETI formalizadas", display: "8", source: "Informe de Gestión 2025", theme: "misional", themeLabel: "Gestión misional", document: "gestion", description: "Entidades Territoriales Indígenas formalizadas o reconocidas." },
    { label: "Acuerdos interculturales", display: "8", source: "Informe de Gestión 2025", theme: "misional", themeLabel: "Gestión misional", document: "gestion", description: "Acuerdos interculturales reportados." },
    { label: "Cumplimiento auditoría", display: "93 %", source: "Informe de Gestión 2025", theme: "control", themeLabel: "Control interno", document: "gestion", description: "Recomendaciones aplicadas o en implementación." }
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
  ],
  governanceMix: [
    { name: "Gestión misional", value: 88 },
    { name: "Administración y operación", value: 12 }
  ]
};

const boardChartRegistry = {};
const boardColors = {
  teal: "#174f52",
  green: "#2f7d62",
  olive: "#8f9c3c",
  gold: "#d8a23a",
  blue: "#5d9bb7",
  coral: "#c45f3c",
  cream: "#fffdf8"
};

const boardState = {
  document: "all",
  theme: "all",
  tab: "resumen",
  metric: ""
};

function boardMatches(item) {
  const itemDocument = item.document || item.type;
  const documentOk = boardState.document === "all" || itemDocument === boardState.document;
  const themeOk = boardState.theme === "all" || item.theme === boardState.theme;
  return documentOk && themeOk;
}

function renderBoardKpis() {
  const container = document.querySelector("[data-board-kpis]");
  if (!container) return;
  const items = boardDashboardData.kpis.filter(boardMatches);
  if (!items.length) {
    container.innerHTML = `<p class="gaia-board-note">No hay indicadores para el filtro seleccionado. Ajusta documento o tema para ampliar la consulta.</p>`;
    return;
  }
  const activeMetric = items.find((item) => metricKey(item) === boardState.metric) || items[0];
  boardState.metric = metricKey(activeMetric);
  container.innerHTML = `
    <section class="gaia-board-indicator-module" aria-label="Indicadores clave filtrados">
      <div class="gaia-board-indicator-head">
        <div>
          <span class="gaia-eyebrow">Indicadores clave</span>
          <h3>${items.length} indicadores para la consulta actual</h3>
        </div>
        <p>Selecciona un indicador para ver la lectura ejecutiva sin desplegar todas las tarjetas a la vez.</p>
      </div>
      <div class="gaia-board-indicator-layout">
        <article class="gaia-board-featured-kpi" data-document="${activeMetric.document}" data-theme="${activeMetric.theme}">
          <small>${activeMetric.themeLabel}</small>
          <strong>${activeMetric.display}</strong>
          <span>${activeMetric.label}</span>
          <p>${activeMetric.description}</p>
          <details>
            <summary>Ver fuente</summary>
            <small>Valor completo: ${activeMetric.fullValue || activeMetric.display}. Fuente: ${activeMetric.source}.</small>
          </details>
        </article>
        <div class="gaia-board-indicator-chart" data-board-indicator-chart></div>
      </div>
      <div class="gaia-board-metric-strip" role="list" aria-label="Seleccionar indicador">
        ${items.map((item) => `
          <button type="button" role="listitem" class="${metricKey(item) === boardState.metric ? "active" : ""}" data-board-metric="${metricKey(item)}">
            <strong>${item.display}</strong>
            <span>${item.label}</span>
          </button>
        `).join("")}
      </div>
    </section>
  `;
  renderIndicatorChart(items);
}

function metricKey(item) {
  return `${item.document}-${item.theme}-${item.label}`.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function groupedIndicatorCounts(items) {
  return items.reduce((groups, item) => {
    const found = groups.find((group) => group.name === item.themeLabel);
    if (found) {
      found.value += 1;
    } else {
      groups.push({ name: item.themeLabel, value: 1 });
    }
    return groups;
  }, []);
}

function renderIndicatorChart(items) {
  const container = document.querySelector("[data-board-indicator-chart]");
  if (!container) return;
  const groups = groupedIndicatorCounts(items);
  if (!window.Chart) {
    container.innerHTML = groups.map((group) => `
      <div class="gaia-board-bar">
        <label><span>${group.name}</span><strong>${group.value}</strong></label>
        <div class="gaia-board-bar-track"><span class="gaia-board-bar-fill" style="--percent:${Math.min(group.value * 18, 100)}"></span></div>
      </div>
    `).join("");
    return;
  }
  if (boardChartRegistry.indicators) boardChartRegistry.indicators.destroy();
  container.innerHTML = `
    <div class="gaia-board-chart-head">
      <h4>Indicadores por tema</h4>
      <span>${items.length} visibles</span>
    </div>
    <div class="gaia-board-canvas-wrap"><canvas aria-label="Indicadores por tema" role="img"></canvas></div>
  `;
  const canvas = container.querySelector("canvas");
  boardChartRegistry.indicators = new Chart(canvas, {
    type: "polarArea",
    data: {
      labels: groups.map((group) => group.name),
      datasets: [{
        data: groups.map((group) => group.value),
        backgroundColor: [
          "rgba(47, 125, 98, 0.78)",
          "rgba(216, 162, 58, 0.8)",
          "rgba(93, 155, 183, 0.78)",
          "rgba(143, 156, 60, 0.76)",
          "rgba(196, 95, 60, 0.76)",
          "rgba(23, 79, 82, 0.7)"
        ],
        borderColor: boardColors.cream,
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 850, easing: "easeOutQuart" },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 12,
            color: boardColors.teal,
            font: { weight: "700" }
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => `${context.label}: ${context.raw} indicador(es)`
          }
        }
      },
      scales: {
        r: {
          ticks: { display: false, stepSize: 1 },
          grid: { color: "rgba(23, 79, 82, 0.08)" },
          angleLines: { color: "rgba(23, 79, 82, 0.08)" }
        }
      }
    }
  });
}

function renderBoardBars(selector, title, items) {
  const container = document.querySelector(`[data-board-chart="${selector}"]`);
  if (!container) return;
  if (window.Chart) {
    renderBoardChart(selector, title, items);
    return;
  }
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

function renderBoardChart(selector, title, items) {
  const container = document.querySelector(`[data-board-chart="${selector}"]`);
  if (!container || !window.Chart) return;
  if (boardChartRegistry[selector]) boardChartRegistry[selector].destroy();
  container.innerHTML = `
    <div class="gaia-board-chart-head">
      <h4>${title}</h4>
      <span>${selector === "funding" ? "Participación %" : "Distribución %"}</span>
    </div>
    <div class="gaia-board-canvas-wrap"><canvas aria-label="${title}" role="img"></canvas></div>
  `;
  const canvas = container.querySelector("canvas");
  const isMany = items.length > 5;
  const type = selector === "funding" ? "bar" : "doughnut";
  const labels = items.map((item) => item.name);
  const values = items.map((item) => item.percent ?? item.value);
  boardChartRegistry[selector] = new Chart(canvas, {
    type,
    data: {
      labels,
      datasets: [{
        label: title,
        data: values,
        backgroundColor: [
          boardColors.green,
          boardColors.gold,
          boardColors.blue,
          boardColors.olive,
          boardColors.coral,
          "#9fb8a6",
          "#6b8f7c",
          "#b9a868",
          "#4e7a90",
          "#a7c6b0",
          "#d0b978",
          "#7d6f58"
        ],
        borderColor: boardColors.cream,
        borderWidth: type === "doughnut" ? 3 : 0,
        borderRadius: type === "bar" ? 7 : 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: type === "bar" ? "y" : "x",
      cutout: type === "doughnut" ? "62%" : undefined,
      animation: {
        duration: 900,
        easing: "easeOutQuart"
      },
      plugins: {
        legend: {
          display: type === "doughnut",
          position: "bottom",
          labels: {
            boxWidth: 12,
            color: boardColors.teal,
            font: { weight: "700" }
          }
        },
        tooltip: {
          callbacks: {
            label: (context) => `${context.label}: ${Number(context.raw).toLocaleString("es-CO")} %`
          }
        }
      },
      scales: type === "bar" ? {
        x: {
          beginAtZero: true,
          grid: { color: "rgba(23, 79, 82, 0.1)" },
          ticks: {
            color: boardColors.teal,
            callback: (value) => `${value} %`
          }
        },
        y: {
          grid: { display: false },
          ticks: {
            color: boardColors.teal,
            font: { weight: "700" },
            autoSkip: false
          }
        }
      } : {}
    }
  });
  container.classList.toggle("gaia-board-chart--many", isMany);
}

function renderHeroChart() {
  const canvas = document.querySelector("[data-board-hero-chart]");
  if (!canvas || !window.Chart) return;
  if (boardChartRegistry.hero) boardChartRegistry.hero.destroy();
  boardChartRegistry.hero = new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: boardDashboardData.governanceMix.map((item) => item.name),
      datasets: [{
        data: boardDashboardData.governanceMix.map((item) => item.value),
        backgroundColor: [boardColors.gold, boardColors.blue],
        borderColor: "rgba(255, 253, 248, 0.92)",
        borderWidth: 3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "68%",
      animation: { duration: 1000, easing: "easeOutQuart" },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => `${context.label}: ${context.raw} %`
          }
        }
      }
    }
  });
}

function renderBoardDocuments() {
  const container = document.querySelector("[data-board-documents]");
  if (!container) return;
  const documents = boardDashboardData.documents.filter((doc) => boardState.document === "all" || doc.type === boardState.document);
  container.innerHTML = documents.map((doc) => `
    <article class="gaia-board-document-card" data-document="${doc.type}">
      <span class="gaia-status-badge">${doc.status}</span>
      <h3>${doc.title}</h3>
      <p>${doc.type === "memoria"
        ? "Certificación del Representante Legal y Revisor Fiscal sobre información económica, subvenciones, excedentes e inversiones de la vigencia 2025."
        : "Informe institucional con resultados misionales, gobierno corporativo, gestión financiera, contratación, control interno y transparencia."}</p>
      <p class="gaia-board-doc-meta">${doc.typeLabel} disponible como documento fuente para consulta interna y revisión.</p>
      <div class="gaia-board-doc-actions">
        <button type="button" data-board-tab="${doc.type}">Ver resumen visual</button>
        ${doc.docx ? `<a href="${doc.docx}" download>Descargar DOCX</a>` : "<span>DOCX pendiente</span>"}
        ${doc.pdf ? `<a href="${doc.pdf}" download>Descargar PDF</a>` : "<span>PDF pendiente</span>"}
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
    const target = event.target instanceof Element ? event.target : event.target.parentElement;
    const metricButton = target?.closest("[data-board-metric]");
    if (metricButton) {
      boardState.metric = metricButton.dataset.boardMetric;
      renderBoardKpis();
      return;
    }
    const tabButton = target?.closest("[data-board-tab]");
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
      boardState.metric = "";
      renderBoardKpis();
      renderBoardDocuments();
    });
  });

  setBoardTab(boardState.tab);
}

renderBoardKpis();
renderBoardBars("impact", "Destino de subvenciones", boardDashboardData.governanceMix);
renderBoardBars("impactOverview", "Destino general de recursos", boardDashboardData.governanceMix);
renderBoardBars("allocation", "Distribución por línea estratégica", boardDashboardData.allocation);
renderBoardBars("funding", "Fuentes de financiación por participación", boardDashboardData.fundingSources);
renderBoardBars("contracting", "Contratación institucional 2025", boardDashboardData.contracting);
renderHeroChart();
renderBoardDocuments();
initBoardFilters();
