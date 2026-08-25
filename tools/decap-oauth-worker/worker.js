// Proxy de autenticación para Decap CMS (admin/config.yml) — Fase 2/3
// de la auditoría del módulo administrador del MOP (agosto 2026).
//
// QUÉ HACE ESTE ARCHIVO Y POR QUÉ EXISTE
// ---------------------------------------
// GitHub Pages solo sirve archivos estáticos: no puede ejecutar el
// intercambio "código -> token" que exige el inicio de sesión con
// GitHub (OAuth). Ese único paso necesita un lugar donde correr un
// poquito de código de servidor. Este archivo es ese código — es
// deliberadamente pequeño (menos de 100 líneas) y no toca ninguna otra
// parte del sitio. Ver README.md en esta misma carpeta para desplegarlo
// gratis en Cloudflare Workers, sin depender de Google Workspace ni de
// Microsoft 365 (esas plataformas no ofrecen este tipo de función).
//
// Implementa el protocolo que Decap CMS espera de un "OAuth client" de
// GitHub: /auth inicia el inicio de sesión, /callback lo completa y le
// entrega el token al panel de administración mediante postMessage.
// Nunca guarda el token: lo recibe de GitHub y lo reenvía una sola vez
// al navegador de quien inició sesión.

const GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token";

function randomState() {
  return crypto.randomUUID();
}

async function handleAuth(request, env) {
  const url = new URL(request.url);
  const redirectUri = `${url.origin}/callback`;
  const state = randomState();
  const authorizeUrl = new URL(GITHUB_AUTHORIZE_URL);
  authorizeUrl.searchParams.set("client_id", env.OAUTH_CLIENT_ID);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("scope", "repo,user");
  authorizeUrl.searchParams.set("state", state);

  const headers = new Headers({ Location: authorizeUrl.toString() });
  // Estado mínimo de un solo uso, solo para esta ida y vuelta del navegador.
  headers.append("Set-Cookie", `mop_oauth_state=${state}; Max-Age=600; Path=/; HttpOnly; Secure; SameSite=Lax`);
  return new Response(null, { status: 302, headers });
}

function readCookie(request, name) {
  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.match(new RegExp(`${name}=([^;]+)`));
  return match ? match[1] : null;
}

function renderPopupResponse({ success, token, message }) {
  const payload = success
    ? `authorization:github:success:${JSON.stringify({ token, provider: "github" })}`
    : `authorization:github:error:${JSON.stringify({ message })}`;
  const html = `<!doctype html><html><body>
<script>
  function receiveMessage(evt) {
    window.opener.postMessage(${JSON.stringify(payload)}, evt.origin);
    window.removeEventListener("message", receiveMessage, false);
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
</script>
${success ? "Acceso concedido, puedes cerrar esta ventana." : `No fue posible iniciar sesión: ${message}`}
</body></html>`;
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}

async function handleCallback(request, env) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const expectedState = readCookie(request, "mop_oauth_state");

  if (!code || !state || !expectedState || state !== expectedState) {
    return renderPopupResponse({ success: false, message: "Solicitud inválida o expirada. Intenta iniciar sesión de nuevo." });
  }

  const tokenResponse = await fetch(GITHUB_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: env.OAUTH_CLIENT_ID,
      client_secret: env.OAUTH_CLIENT_SECRET,
      code,
      redirect_uri: `${url.origin}/callback`
    })
  });

  const tokenData = await tokenResponse.json();
  if (!tokenResponse.ok || tokenData.error || !tokenData.access_token) {
    return renderPopupResponse({ success: false, message: tokenData.error_description || "GitHub no devolvió un token." });
  }

  return renderPopupResponse({ success: true, token: tokenData.access_token });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/auth") return handleAuth(request, env);
    if (url.pathname === "/callback") return handleCallback(request, env);
    return new Response("Proxy de autenticación del MOP — ver /auth y /callback.", { status: 200 });
  }
};
