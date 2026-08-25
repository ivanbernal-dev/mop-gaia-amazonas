# Activar el inicio de sesión del panel de administración (`/admin`)

Esto es lo único que falta para que el gestor de contenido en `/admin`
funcione de verdad. GitHub Pages no puede ejecutar este paso por sí
solo — necesita un lugar gratuito donde correr una función muy pequeña
(el archivo `worker.js` de esta carpeta, menos de 100 líneas). Se
recomienda Cloudflare Workers porque su nivel gratuito alcanza de sobra
para este uso y no depende de Google Workspace ni de Microsoft 365 (esas
plataformas no ofrecen este tipo de función).

Tiempo estimado: 10-15 minutos. No requiere saber programar, solo copiar
y pegar los comandos indicados.

## 1. Crear la aplicación OAuth en GitHub

1. Ir a <https://github.com/settings/developers> → **OAuth Apps** → **New OAuth App**.
2. **Application name**: `MOP Gaia Amazonas — Admin`.
3. **Homepage URL**: `https://ivanbernal-dev.github.io/mop-gaia-amazonas/`.
4. **Authorization callback URL**: `https://mop-gaia-oauth.<tu-subdominio>.workers.dev/callback`
   (el subdominio exacto lo verás en el paso 3 — puedes volver a editar
   esta URL después de desplegar).
5. Guardar y copiar el **Client ID**. Generar y copiar también un
   **Client secret** — GitHub solo lo muestra una vez.

## 2. Instalar la herramienta de Cloudflare (una sola vez)

```bash
npm install -g wrangler
wrangler login
```

Esto abre el navegador para crear o iniciar sesión en una cuenta gratuita
de Cloudflare.

## 3. Desplegar el proxy

Desde esta carpeta (`tools/decap-oauth-worker/`):

```bash
wrangler secret put OAUTH_CLIENT_ID
# pega el Client ID del paso 1 cuando lo pida

wrangler secret put OAUTH_CLIENT_SECRET
# pega el Client secret del paso 1 cuando lo pida

wrangler deploy
```

El último comando muestra una URL como
`https://mop-gaia-oauth.<tu-subdominio>.workers.dev`. Esa es la URL del
proxy.

Si la URL final no coincide con la que pusiste en el paso 1.4, vuelve a
la aplicación OAuth en GitHub y corrige la **Authorization callback URL**
a `<esa URL>/callback`.

## 4. Conectar el proxy con el panel de administración

Editar `admin/config.yml` en el repositorio y reemplazar la línea:

```yaml
base_url: "" # TI: pega aquí la URL del proxy de autenticación (admin/README.md)
```

por:

```yaml
base_url: "https://mop-gaia-oauth.<tu-subdominio>.workers.dev"
```

Hacer commit de ese cambio en `main`. Con eso, entrar a
`https://ivanbernal-dev.github.io/mop-gaia-amazonas/admin/` debería
mostrar un botón "Login with GitHub" que ya funciona para cualquier
cuenta con permiso de escritura sobre este repositorio.

## Nota sobre quién puede publicar

El acceso lo controla GitHub, no este proxy: cualquier persona con
permiso de **escritura** (write/admin) sobre el repositorio
`ivanbernal-dev/mop-gaia-amazonas` puede iniciar sesión en `/admin`. Para
dar acceso a alguien de GPC sin darle permisos de código, agrégala como
colaboradora del repositorio desde GitHub (Settings → Collaborators) —
Decap CMS no distingue "solo contenido" de "todo el repositorio".
