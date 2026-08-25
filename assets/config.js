// Configuración pública del MOP — Fase 1 de la auditoría del módulo
// administrador (agosto 2026).
//
// Este es el ÚNICO archivo que el equipo de TI de la Fundación necesita
// tocar para conectar el catálogo documental del MOP con la hoja de
// cálculo (Google Sheets) que usa GPC. No requiere programar nada más:
// ni el sitio (assets/js/app.js) ni la automatización programada
// (.github/workflows/sincronizar-catalogo.yml) necesitan otro cambio.
//
// Pasos para TI:
//   1. Abrir la hoja de cálculo del Listado Maestro MOP en Google Sheets.
//   2. Compartir > Acceso general > "Cualquier persona con el enlace" > Lector.
//      (No hace falta "Publicar en la Web": basta con acceso de lectura por enlace.)
//   3. Copiar el ID de la hoja desde su URL:
//      https://docs.google.com/spreadsheets/d/ESTE-ES-EL-ID/edit
//   4. Pegar ese ID abajo, entre las comillas de "sheetId".
//   5. Si el listado maestro vive en una pestaña distinta de la primera,
//      ajustar "sheetGid" con el número que aparece en la URL después de
//      "gid=" al abrir esa pestaña.
//
// Alternativa sin editar código: definir el mismo valor como variable de
// repositorio "MOP_SHEET_ID" en GitHub (Settings > Secrets and variables >
// Actions > Variables). El flujo programado de sincronización actualiza
// este archivo automáticamente con ese valor en cada ejecución, así que
// TI puede dejarlo siempre así y administrar solo esa variable.
window.MOP_REMOTE_CONFIG = {
  sheetId: "",
  sheetGid: "0"
};
