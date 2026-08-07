// Password gate — runs ONLY on Vercel's edge (and `vercel dev`).
// Local preview via `python3 -m http.server` never executes this file, so local stays open.
//
// Set two environment variables in Vercel (Project → Settings → Environment Variables):
//   APP_PASSWORD : the password visitors type
//   AUTH_TOKEN   : a long random string (the cookie value granted after a correct login)
const COOKIE = "tp_auth";
const LOGIN_PATH = "/__auth";

export default async function middleware(request) {
	const password = process.env.APP_PASSWORD;
	const token = process.env.AUTH_TOKEN;
	// Fail closed: a misconfiguration must never expose the site.
	if (!password || !token) {
		return new Response("Auth not configured (APP_PASSWORD / AUTH_TOKEN).", {
			status: 500,
		});
	}

	if (hasAuthCookie(request, token)) return; // pass through to the static file

	// pi-lens-ignore: ast-grep:unchecked-throwing-call-js
	const url = new URL(request.url);

	if (url.pathname === LOGIN_PATH && request.method === "POST") {
		const form = await request.formData();
		const next = safeNext(form.get("next"));
		if ((form.get("password") || "") === password) return redirect(next, token);
		return loginPage(next, true);
	}

	return loginPage(safeNext(url.pathname), false);
}

function hasAuthCookie(request, token) {
	return (request.headers.get("cookie") || "")
		.split(";")
		.map((c) => c.trim())
		.some((c) => c === `${COOKIE}=${token}`);
}

// Only same-origin absolute paths; blocks protocol-relative "//evil" and backslash tricks.
function safeNext(raw) {
	const n = typeof raw === "string" ? raw : "/";
	return /^\/[^/\\]/.test(n) || n === "/" ? n : "/";
}

function redirect(next, token) {
	return new Response(null, {
		status: 302,
		headers: {
			Location: next,
			"Set-Cookie": `${COOKIE}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=2592000`,
		},
	});
}

function loginPage(next, wrong) {
	return new Response(html(next, wrong), {
		status: 401,
		headers: {
			"Content-Type": "text/html; charset=utf-8",
			"Cache-Control": "no-store",
		},
	});
}

function esc(s) {
	return String(s).replace(
		/[&<>"']/g,
		(c) =>
			({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
				c
			],
	);
}

function html(next, wrong) {
	return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>⬡ Acesso</title>
<style>
  :root { color-scheme: dark; }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: Inter, system-ui, -apple-system, sans-serif;
    background: radial-gradient(120% 80% at 50% -10%, rgba(108,75,240,.18), transparent 60%), #0e0f17;
    color: #eceef6; min-height: 100vh; display: grid; place-items: center; padding: 24px;
  }
  .card {
    width: 100%; max-width: 360px;
    background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08);
    border-radius: 20px; padding: 40px 32px;
  }
  .logo { font-size: 30px; text-align: center; margin-bottom: 4px; }
  h1 { font-size: 17px; font-weight: 600; text-align: center; color: #cdd0e0; margin-bottom: 26px; }
  label { display: block; font-size: 13px; color: #9ea2bd; margin-bottom: 8px; }
  input[type=password] {
    width: 100%; padding: 13px 14px; border-radius: 11px; border: 1px solid rgba(255,255,255,.1);
    background: #15161f; color: #eceef6; font-size: 15px; outline: none;
  }
  input[type=password]:focus { border-color: #6c4bf0; box-shadow: 0 0 0 3px rgba(108,75,240,.25); }
  button {
    width: 100%; margin-top: 18px; padding: 13px; border: 0; border-radius: 11px; cursor: pointer;
    background: linear-gradient(135deg, #6c4bf0, #8b5cf6); color: #fff; font-size: 15px; font-weight: 600;
  }
  .err { color: #ff6b81; font-size: 13px; text-align: center; margin-top: 14px; min-height: 18px; }
</style>
</head>
<body>
  <form class="card" method="POST" action="/__auth">
    <div class="logo">⬡</div>
    <h1>Central de Aprendizado</h1>
    <label for="p">Senha</label>
    <input id="p" name="password" type="password" autocomplete="current-password" autofocus required>
    <input type="hidden" name="next" value="${esc(next)}">
    <button type="submit">Entrar</button>
    <div class="err">${wrong ? "Senha incorreta." : ""}</div>
  </form>
</body>
</html>`;
}
