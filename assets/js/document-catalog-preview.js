(function enableDocumentCatalogPreview() {
  "use strict";

  const stats = documentData.catalogStats || {};
  const previewMessage = "Archivo protegido — versión de prueba. La descarga se habilitará con el lanzamiento de la versión final.";
  const draftMessage = "Documento de prueba; no constituye una versión vigente para uso institucional.";

  ["gaia-document-matrix-v3", "gaia-document-matrix-v2", "gaia-document-matrix"].forEach((key) => {
    localStorage.removeItem(key);
  });

  documentRecords = documentData.documentos || [];
  documentSummaryRecords = documentData.resumenTipoDocumental || [];

  isDocumentPublishable = function isDocumentPublishableInPreview(record) {
    const access = normalizeText(record.accessClass || record.clasificacion);
    return ["publico", "publica", "interno", "interna"].includes(access);
  };

  getVisibleDocumentRecords = function getPreviewCatalogRecords() {
    return documentRecords.filter((record) => isDocumentVisible(record) && isDocumentPublishable(record));
  };

  updateDocumentKpis = function updatePreviewDocumentKpis() {
    if (!documentKpis.total) return;
    const statusCounts = stats.visibleStatusCounts || {};
    documentKpis.total.textContent = stats.recordsTotal ?? documentRecords.length;
    documentKpis.vigentes.textContent = statusCounts.vigentes ?? documentStatusCount("vigente");
    documentKpis.actualizacion.textContent = statusCounts.enActualizacion ?? documentStatusCount("actualizacion");
    documentKpis.construccion.textContent = statusCounts.enConstruccion ?? documentStatusCount("construccion");
    documentKpis.clasificar.textContent = stats.catalogHidden ?? 0;
  };

  renderDocumentCard = function renderProtectedDocumentCard(record) {
    const tipo = cleanDocValue(record.tipoDocumental);
    const estado = cleanDocValue(record.estado, "Sin estado");
    const isDraft = ["construccion", "actualizacion"].some((term) => normalizeText(estado).includes(term));
    const description = record.descripcionTematica ? `<p>${escapeHtml(record.descripcionTematica)}</p>` : "";

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
        <div class="document-file">
          <strong>${escapeHtml(previewMessage)}</strong>
          ${isDraft ? `<p>${escapeHtml(draftMessage)}</p>` : ""}
        </div>
      </article>
    `;
  };

  renderDocumentList = function renderPreviewDocumentList() {
    if (!documentControls.list || !documentControls.meta) return;
    const visibleRecords = getVisibleDocumentRecords();
    const total = stats.recordsTotal ?? visibleRecords.length;

    if (!hasActiveDocumentFilter()) {
      documentControls.meta.textContent = `${visibleRecords.length} documentos visibles de ${total} registrados. Todas las descargas están protegidas en esta versión de prueba.`;
      documentControls.list.innerHTML = `
        <article class="document-card document-empty-state">
          <h3>Selecciona un filtro para iniciar la consulta</h3>
          <p>Busca por código, nombre, palabra clave, macroproceso, proceso, tipo documental o estado.</p>
        </article>
      `;
      return;
    }

    const filtered = visibleRecords.filter(matchesDocumentFilters);
    documentControls.meta.textContent = `${filtered.length} de ${visibleRecords.length} documentos visibles encontrados. Descargas protegidas.`;
    documentControls.list.innerHTML = filtered.length
      ? filtered.map(renderDocumentCard).join("")
      : `<article class="document-card"><h3>No se encontraron documentos</h3><p>Ajusta los filtros o borra la búsqueda para ver más registros.</p></article>`;
  };

  resetDocumentFilters();
  refreshDocumentModule();
  setDocumentSourceStatus(
    `Listado Maestro local sanitizado: ${stats.recordsTotal ?? documentRecords.length} documentos registrados; ${getVisibleDocumentRecords().length} visibles en el catálogo; descargas protegidas.`,
    "ok"
  );
})();
