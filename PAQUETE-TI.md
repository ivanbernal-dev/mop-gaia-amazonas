# Paquete de despliegue para TI — módulo administrador del MOP

Este documento es lo único que el equipo de TI de la Fundación necesita leer para activar la administración del MOP. Cada fase fue implementada en el código de este repositorio; lo que falta por hacer es configuración puntual, no programación.

Contexto: esta rama (`feature/automatizacion-admin-mop`) implementa las cuatro fases de la hoja de ruta de la auditoría del 25 de agosto de 2026 (`claude/auditoria-modulo-administrador-mop.md` en el proyecto de Claude, y el Word entregado a Ivan Bernal). Resumen de qué hace cada una y qué le toca a TI:

| Fase | Qué resuelve | Ya está hecho | Qué falta (TI) |
|---|---|---|---|
| 0 — Validación automática | Nada revisaba el sitio antes de publicarlo | `.github/workflows/validate.yml` | Nada. Ya corre solo. |
| 1 — Catálogo documental desde Google Sheets | El listado maestro se editaba a mano en código | `assets/config.js`, `.github/workflows/sincronizar-catalogo.yml` | Pegar el ID de una hoja de cálculo (5 minutos). |
| 2 — Editor de contenidos (CMS) | No había forma de editar novedades/fichas sin programar | `/admin` (Decap CMS), `tools/build-cms-data.js`, `.github/workflows/generar-datos-cms.yml` | Desplegar un proxy de login gratuito (10-15 minutos, una sola vez). |
| 3 — Autenticación institucional | El código pedía "una intranet autenticada" que nunca se construyó | Decisión documentada abajo | Elegir una opción y, si aplica, ejecutarla. |

No se necesita ningún servidor propio, base de datos, ni presupuesto de hosting: el sitio sigue viviendo gratis en GitHub Pages.

---

## Fase 1 — Conectar el catálogo documental (5 minutos)

1. Abrir la hoja de cálculo de Google Sheets del Listado Maestro MOP.
2. **Compartir** → Acceso general → **Cualquier persona con el enlace: Lector**.
3. Copiar el ID de la hoja desde su URL (la parte entre `/d/` y `/edit`).
4. En GitHub: `Settings` → `Secrets and variables` → `Actions` → pestaña **Variables** → **New repository variable**.
   - Nombre: `MOP_SHEET_ID` — valor: el ID copiado.
   - Si el listado no está en la primera pestaña, agregar también `MOP_SHEET_GID` con el número que aparece después de `gid=` en la URL de esa pestaña.
5. Listo. Esa misma noche (o al ejecutar manualmente el flujo "Sincronizar catálogo documental MOP" desde la pestaña Actions), el sitio abrirá un Pull Request automático cada vez que el listado cambie. Alguien de GPC solo tiene que revisarlo y aprobarlo.

No hace falta editar ningún archivo de código para esta fase.

## Fase 2 — Activar el panel de administración (10-15 minutos, una sola vez)

El panel (`/admin`) ya existe y ya sabe qué contenidos editar. Le falta un componente de login, porque GitHub Pages no puede ejecutarlo por sí solo.

Seguir exactamente los pasos de [`tools/decap-oauth-worker/README.md`](tools/decap-oauth-worker/README.md): crear una aplicación OAuth gratuita en GitHub, desplegar un archivo de menos de 100 líneas en Cloudflare Workers (gratis, no depende de Google Workspace ni de Microsoft 365), y pegar la URL resultante en `admin/config.yml`.

Después de esto, cualquier persona con permiso de escritura sobre el repositorio de GitHub puede entrar a `https://ivanbernal-dev.github.io/mop-gaia-amazonas/admin/` y editar contenidos sin tocar código. Cada cambio queda como borrador hasta que alguien lo aprueba (`publish_mode: editorial_workflow` en `admin/config.yml`).

**Quién tiene acceso se controla como cualquier repositorio de GitHub**: `Settings` → `Collaborators` → agregar a la persona con permiso de escritura. No hace falta que sepa programar ni usar git — solo entra a `/admin` y usa los formularios.

## Fase 3 — Autenticación institucional: qué elegir

El código heredado prometía "una intranet autenticada" sin decir cuál. Estas son las tres opciones reales, de menor a mayor esfuerzo. **La recomendación es la Opción A**, salvo que la Fundación tenga un requisito explícito de iniciar sesión con `@gaiaamazonas.org`.

### Opción A — Usar el control de acceso de GitHub (recomendada, sin trabajo adicional)

Con la Fase 2 activa, el acceso ya está restringido a quien TI decida agregar como colaborador del repositorio. Esto **ya es** control de acceso institucional: TI decide exactamente quién entra y quién no, con permisos que se pueden revocar en cualquier momento desde GitHub. No depende de la cuenta de correo de la persona ni de Google Workspace.

Mejora opcional sin costo: mover este repositorio a una organización de GitHub propia de la Fundación (si no existe, se crea gratis) y usar Equipos (`Teams`) de GitHub para agrupar a GPC, Comunicaciones, etc. Esto no cambia nada del código de esta rama.

### Opción B — Agregar una pantalla de inicio de sesión con Google Workspace, encima de la Opción A

Si la Fundación necesita, por imagen o por política interna, que las personas inicien sesión con su correo `@gaiaamazonas.org` en vez de con GitHub: se puede agregar una pantalla previa en `/admin` que use Google Identity Services (el botón "Continuar con Google", como en el mockup del panel: <https://claude.ai/code/artifact/9fd054c5-d3e2-4a6b-958c-625619812a65>) y verifique que el dominio del correo sea `gaiaamazonas.org`.

**Importante:** esa pantalla sería una capa de UX institucional, no el control de seguridad real — cualquier página estática puede evadirse editando el HTML en el navegador. El control de seguridad real sigue siendo GitHub (Opción A): esta capa solo decide qué tan “oficial” se ve el acceso, no quién puede publicar de verdad.

Para implementarla, la Fundación necesita crear un proyecto en Google Cloud Console (gratis) y un ID de cliente OAuth restringido al dominio `gaiaamazonas.org` — algo que solo puede hacer un administrador de su Google Workspace. Cuando ese administrador esté disponible, se puede completar este paso en una sesión de trabajo corta.

### Opción C — Backend propio con roles y bitácora de auditoría

Necesaria solo si en el futuro hay contenido que no debe ser público en ningún momento (a diferencia de hoy, donde el sitio completo es público y lo que cambia es cuánto detalle documental se expone). Esto sí requiere una decisión de infraestructura real: ¿Google Cloud (Apps Script + Sheets como base de datos, o Cloud Run), Azure (App Service, si la Fundación ya paga Microsoft 365 con Azure AD), o un servidor propio? No se implementó nada de esto en esta rama porque depende de una cuenta de nube que la Fundación debe elegir y proveer — se puede retomar como un siguiente proyecto, con este documento como punto de partida.

---

## Preguntas frecuentes

**¿Esto tiene algún costo?** No. GitHub Pages, GitHub Actions (en un repositorio público), Decap CMS y el nivel gratuito de Cloudflare Workers no tienen costo para el volumen de uso del MOP.

**¿Qué pasa si nadie hace la Fase 2?** El sitio sigue funcionando exactamente igual que hoy. Las Fases 0 y 1 no dependen de ella.

**¿Dónde quedó registrado todo esto?** En los mensajes de commit de esta rama (`git log`), en este archivo, y en el proyecto "MOP GAIA AMAZONAS" de Claude, para que cualquier persona — de TI o no — pueda retomarlo sin perder contexto.
