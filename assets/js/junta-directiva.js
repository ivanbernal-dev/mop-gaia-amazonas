const boardDashboardData = {
  year: "2025",
  documents: [
    {
      id: "memoria-economica-2025",
      title: "Memoria Económica 2025",
      type: "memoria",
      typeLabel: "Memoria Económica",
      status: "Documento fuente cargado / versión para revisión",
      docx: "",
      pdf: ""
    },
    {
      id: "informe-gestion-2025",
      title: "Informe de Gestión GAIA 2025",
      type: "gestion",
      typeLabel: "Informe de Gestión",
      status: "Documento fuente cargado / versión para revisión",
      docx: "",
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
    { label: "Transferencias territoriales 2025-2026", display: "$6.880 M", fullValue: "$6.879.546.693", source: "Explorador de contabilidad 2025-2026", theme: "territorial", themeLabel: "Transferencias territoriales", document: "memoria", description: "Saldos consolidados por tercero para organizaciones y consejos indígenas." },
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
  ],
  accountingExplorer: {
    source: "2025_2026Explorador de contabilidad.xlsx / Hoja3",
    rows: [
      { code: "838000236", name: "Asociación de Capitanes Indígenas de El Mirití Amazonas", y2025: 957122620, y2026: 362364546, total: 1319487166 },
      { code: "838000242", name: "Asociación de Capitanes Indígenas Yaigojé Apaporis", y2025: 1206316000, y2026: 327152226, total: 1533468226 },
      { code: "901749047", name: "Consejo Indígena del Territorio Indígena del Río Tiquié", y2025: 823689000, y2026: 466102064, total: 1289791064 },
      { code: "901752006", name: "Consejo Indígena del Territorio Indígena Unido de los Ríos I", y2025: 182254600, y2026: 0, total: 182254600 },
      { code: "901821426", name: "Consejo de Autoridades Indígenas Tradicionales de Tarapacá", y2025: 133240000, y2026: 57712000, total: 190952000 },
      { code: "901826366", name: "Consejo Indígena del Territorio Indígena Bajo Río Caquetá", y2025: 208216000, y2026: 54862200, total: 263078200 },
      { code: "901826383", name: "Consejo Indígena del Territorio Pani", y2025: 245250000, y2026: 40166196, total: 285416196 },
      { code: "901826423", name: "Consejo Indígena de Unidad, Pensamiento y Sabiduría de La PA", y2025: 271074500, y2026: 51358000, total: 322432500 },
      { code: "901873742", name: "Consejo Indígena del Territorio Indígena del Río Pirá Paraná", y2025: 774074155, y2026: 336872500, total: 1110946655 },
      { code: "901608798", name: "Consejo Indígena Mayor de Tarapacá-Cimtar TI", y2025: 113586000, y2026: 22076000, total: 135662000 },
      { code: "901876072", name: "Esquema Asociativo de los Territorios Indígenas del Macroterritorio de los Jaguares del Yuruparí", y2025: 0, y2026: 246058086, total: 246058086 }
    ]
  }
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
  metric: "",
  accountingYear: "total",
  etiCode: ""
};

const accountingYearLabels = {
  total: "Total general",
  y2025: "2025",
  y2026: "2026"
};

function formatCOP(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(value);
}

function compactCOP(value) {
  const millions = value / 1000000;
  return `$${new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 }).format(millions)} M`;
}

function accountingValue(row, year = boardState.accountingYear) {
  return row[year] != null ? row[year] : row.total;
}

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
        <label><span>${item.name}</span><strong>${Number(item.percent != null ? item.percent : (item.value != null ? item.value : 0)).toLocaleString("es-CO")} %</strong></label>
        <div class="gaia-board-bar-track"><span class="gaia-board-bar-fill" style="--percent:${Number(item.percent != null ? item.percent : (item.value != null ? item.value : 0))}"></span></div>
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
  const values = items.map((item) => item.percent != null ? item.percent : item.value);
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

function renderAccountingExplorer() {
  const container = document.querySelector("[data-board-accounting-explorer]");
  if (!container) return;
  const rows = [...boardDashboardData.accountingExplorer.rows]
    .sort((a, b) => accountingValue(b) - accountingValue(a));
  const total = rows.reduce((sum, row) => sum + accountingValue(row), 0);
  const total2025 = rows.reduce((sum, row) => sum + row.y2025, 0);
  const total2026 = rows.reduce((sum, row) => sum + row.y2026, 0);
  const top = rows[0];
  const activeLabel = accountingYearLabels[boardState.accountingYear];
  container.innerHTML = `
    <section class="gaia-accounting-explorer" aria-label="Explorador contable territorial">
      <div class="gaia-accounting-head">
        <div>
          <span class="gaia-eyebrow">Explorador contable territorial</span>
          <h3>Saldos por organización o consejo indígena</h3>
          <p>Lectura consolidada de saldos 2025-2026 por tercero, diseñada para revisar concentración, vigencia y trazabilidad sin depender de una tabla dinámica externa.</p>
        </div>
        <div class="gaia-accounting-selector" aria-label="Seleccionar vigencia del explorador">
          ${Object.entries(accountingYearLabels).map(([key, label]) => `
            <button type="button" class="${boardState.accountingYear === key ? "active" : ""}" data-board-accounting-year="${key}" aria-pressed="${boardState.accountingYear === key}">
              ${label}
            </button>
          `).join("")}
        </div>
      </div>
      <div class="gaia-accounting-summary" aria-label="Resumen de saldos territoriales">
        <article><small>${activeLabel}</small><strong>${compactCOP(total)}</strong><span>Saldos consolidados</span></article>
        <article><small>2025</small><strong>${compactCOP(total2025)}</strong><span>Saldo registrado</span></article>
        <article><small>2026</small><strong>${compactCOP(total2026)}</strong><span>Saldo registrado</span></article>
        <article><small>Mayor saldo</small><strong>${compactCOP(accountingValue(top))}</strong><span>${top.name}</span></article>
      </div>
      <div class="gaia-accounting-layout">
        <article class="gaia-board-chart gaia-accounting-chart" data-accounting-chart></article>
        <article class="gaia-accounting-table-card">
          <div class="gaia-board-chart-head">
            <h4>Detalle por tercero</h4>
            <span>${rows.length} registros</span>
          </div>
          <div class="gaia-accounting-table-wrap">
            <table class="gaia-accounting-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Organización / consejo indígena</th>
                  <th>${activeLabel}</th>
                </tr>
              </thead>
              <tbody>
                ${rows.map((row) => `
                  <tr>
                    <td>${row.code}</td>
                    <td>${row.name}</td>
                    <td>${formatCOP(accountingValue(row))}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
          <p class="gaia-board-note">Fuente: ${boardDashboardData.accountingExplorer.source}.</p>
        </article>
      </div>
    </section>
  `;
  renderAccountingChart(rows, activeLabel);
}

function renderAccountingChart(rows, activeLabel) {
  const container = document.querySelector("[data-accounting-chart]");
  if (!container) return;
  const chartRows = rows.slice(0, 11);
  if (!window.Chart) {
    const max = Math.max(...chartRows.map((row) => accountingValue(row)), 1);
    container.innerHTML = `
      <div class="gaia-board-chart-head">
        <h4>Ranking territorial</h4>
        <span>${activeLabel}</span>
      </div>
      ${chartRows.map((row) => `
        <div class="gaia-board-bar">
          <label><span>${row.name}</span><strong>${compactCOP(accountingValue(row))}</strong></label>
          <div class="gaia-board-bar-track"><span class="gaia-board-bar-fill" style="--percent:${(accountingValue(row) / max) * 100}"></span></div>
        </div>
      `).join("")}
    `;
    return;
  }
  if (boardChartRegistry.accounting) boardChartRegistry.accounting.destroy();
  container.innerHTML = `
    <div class="gaia-board-chart-head">
      <h4>Ranking territorial</h4>
      <span>${activeLabel}</span>
    </div>
    <div class="gaia-board-canvas-wrap"><canvas aria-label="Ranking de saldos territoriales" role="img"></canvas></div>
  `;
  const canvas = container.querySelector("canvas");
  boardChartRegistry.accounting = new Chart(canvas, {
    type: "bar",
    data: {
      labels: chartRows.map((row) => row.name),
      datasets: [{
        label: activeLabel,
        data: chartRows.map((row) => accountingValue(row)),
        backgroundColor: chartRows.map((_, index) => index < 3 ? boardColors.gold : boardColors.green),
        borderRadius: 8,
        borderSkipped: false
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: "y",
      animation: { duration: 850, easing: "easeOutQuart" },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => formatCOP(Number(context.raw || 0))
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: { color: "rgba(23, 79, 82, 0.1)" },
          ticks: {
            color: boardColors.teal,
            callback: (value) => compactCOP(Number(value))
          }
        },
        y: {
          grid: { display: false },
          ticks: {
            color: boardColors.teal,
            font: { weight: "700" },
            autoSkip: false,
            callback(value) {
              const label = this.getLabelForValue(value);
              return label.length > 38 ? `${label.slice(0, 38)}...` : label;
            }
          }
        }
      }
    }
  });
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

function escapeBoardHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatArea(value) {
  return new Intl.NumberFormat("es-CO", { maximumFractionDigits: 0 }).format(Number(value || 0));
}

function etiProjectPoint(point, bbox, width, height, padding) {
  const [minX, minY, maxX, maxY] = bbox;
  const [lon, lat] = point;
  const x = padding + ((lon - minX) / Math.max(maxX - minX, 0.00001)) * (width - padding * 2);
  const y = padding + ((maxY - lat) / Math.max(maxY - minY, 0.00001)) * (height - padding * 2);
  return [Number(x.toFixed(2)), Number(y.toFixed(2))];
}

function etiPathFromGeometry(geometry, bbox, width, height, padding) {
  return (geometry || []).map((ring) => ring.map((point, index) => {
    const [x, y] = etiProjectPoint(point, bbox, width, height, padding);
    return `${index === 0 ? "M" : "L"}${x} ${y}`;
  }).join(" ") + " Z").join(" ");
}

function etiFeatureCenter(feature, bbox, width, height, padding) {
  const points = (feature.geometry || []).flat();
  const sum = points.reduce((acc, point) => {
    acc[0] += point[0];
    acc[1] += point[1];
    return acc;
  }, [0, 0]);
  const center = points.length ? [sum[0] / points.length, sum[1] / points.length] : [bbox[0], bbox[1]];
  return etiProjectPoint(center, bbox, width, height, padding);
}

function selectedEtiFeature(features) {
  if (!features.length) return null;
  return features.find((feature) => feature.code === boardState.etiCode) || features[0];
}

function renderEtiTerritoryMap() {
  const data = window.GAIA_ETI_TERRITORIES;
  const containers = document.querySelectorAll("[data-eti-map]");
  if (!containers.length) return;
  const features = data?.features || [];
  if (!features.length) {
    containers.forEach((container) => {
      container.innerHTML = `<p class="gaia-board-note">La capa territorial ETI no está disponible en esta versión local.</p>`;
    });
    return;
  }
  if (!boardState.etiCode) boardState.etiCode = features[0].code;
  const selected = selectedEtiFeature(features);
  const width = 640;
  const height = 520;
  const padding = 28;
  const bbox = data.bbox;
  const totalArea = data.stats?.totalAreaHa || features.reduce((sum, feature) => sum + Number(feature.areaHa || 0), 0);
  const paths = features.map((feature, index) => {
    const active = feature.code === selected.code;
    const [cx, cy] = etiFeatureCenter(feature, bbox, width, height, padding);
    return `
      <path class="gaia-eti-map-shape ${active ? "is-active" : ""}" d="${etiPathFromGeometry(feature.geometry, bbox, width, height, padding)}" data-eti-code="${escapeBoardHtml(feature.code)}" tabindex="0" role="button" aria-pressed="${active}" aria-label="${escapeBoardHtml(feature.name)}"></path>
      <text class="gaia-eti-map-label" x="${cx}" y="${cy}" aria-hidden="true">${index + 1}</text>
    `;
  }).join("");
  const list = features.map((feature, index) => `
    <button type="button" class="${feature.code === selected.code ? "active" : ""}" data-eti-code="${escapeBoardHtml(feature.code)}" aria-pressed="${feature.code === selected.code}">
      <strong>${index + 1}. ${escapeBoardHtml(feature.name.replace(/^Territorio Indígena de?\\s*/i, ""))}</strong>
      <span>${formatArea(feature.areaHa)} ha</span>
    </button>
  `).join("");
  const detail = `
    <article class="gaia-eti-map-detail">
      <span class="gaia-eyebrow">ETI seleccionada</span>
      <h4>${escapeBoardHtml(selected.name)}</h4>
      <p>${escapeBoardHtml(selected.council)}</p>
      <dl>
        <div><dt>Área aproximada</dt><dd>${formatArea(selected.areaHa)} ha</dd></div>
        <div><dt>Código de capa</dt><dd>${escapeBoardHtml(selected.code)}</dd></div>
        <div><dt>Soporte</dt><dd>${escapeBoardHtml(selected.decree || "Decreto 632 de 2018")}</dd></div>
        <div><dt>Acto / acuerdo</dt><dd>${escapeBoardHtml(selected.agreement || "Por validar")}</dd></div>
      </dl>
    </article>
  `;
  containers.forEach((container) => {
    const mode = container.dataset.etiMap || "dashboard";
    container.innerHTML = `
      <section class="gaia-eti-map gaia-eti-map--${escapeBoardHtml(mode)}">
        <div class="gaia-eti-map-visual">
          <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Mapa simplificado de ocho territorios indígenas formalizados">
            <rect class="gaia-eti-map-water" x="0" y="0" width="${width}" height="${height}" rx="18"></rect>
            <g>${paths}</g>
          </svg>
          <div class="gaia-eti-map-total">
            <strong>${features.length}</strong>
            <span>ETI</span>
          </div>
        </div>
        ${detail}
        <div class="gaia-eti-map-list" aria-label="Seleccionar territorio indígena">
          ${list}
        </div>
        <p class="gaia-eti-map-source">Fuente local: ${escapeBoardHtml(data.source || "TerritoriosIndigenas.geojson")}. Geometría simplificada para visualización; área total aproximada: ${formatArea(totalArea)} ha.</p>
      </section>
    `;
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
        <span>Documento reservado</span>
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
    const accountingButton = target?.closest("[data-board-accounting-year]");
    if (accountingButton) {
      boardState.accountingYear = accountingButton.dataset.boardAccountingYear;
      renderAccountingExplorer();
    }
    const etiButton = target?.closest("[data-eti-code]");
    if (etiButton) {
      boardState.etiCode = etiButton.dataset.etiCode;
      renderEtiTerritoryMap();
    }
  });

  board?.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const target = event.target instanceof Element ? event.target : null;
    const etiTarget = target?.closest("[data-eti-code]");
    if (!etiTarget) return;
    event.preventDefault();
    boardState.etiCode = etiTarget.dataset.etiCode;
    renderEtiTerritoryMap();
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
renderAccountingExplorer();
renderHeroChart();
renderEtiTerritoryMap();
renderBoardDocuments();
initBoardFilters();
