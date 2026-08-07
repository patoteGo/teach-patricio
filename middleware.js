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
  .field { position: relative; }
  .field input {
    width: 100%; padding: 13px 44px 13px 14px; border-radius: 11px; border: 1px solid rgba(255,255,255,.1);
    background: #15161f; color: #eceef6; font-size: 15px; outline: none;
  }
  .field input:focus { border-color: #6c4bf0; box-shadow: 0 0 0 3px rgba(108,75,240,.25); }
  .eye {
    position: absolute; right: 6px; top: 50%; transform: translateY(-50%);
    width: 36px; height: 36px; display: grid; place-items: center;
    border: 0; border-radius: 8px; background: transparent; cursor: pointer; color: #9ea2bd;
  }
  .eye:hover { color: #eceef6; background: rgba(255,255,255,.05); }
  .eye svg { width: 20px; height: 20px; }
  .eye .off { display: none; }
  .field.show .eye .on { display: none; }
  .field.show .eye .off { display: inline; }
  .submit {
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
    <div class="field">
      <input id="p" name="password" type="password" autocomplete="current-password" autofocus required>
      <button type="button" class="eye" id="eye" aria-label="Mostrar senha" aria-pressed="false">
        <svg class="on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        <svg class="off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
      </button>
    </div>
    <input type="hidden" name="next" value="${esc(next)}">
    <button type="submit" class="submit">Entrar</button>
    <div class="err">${wrong ? "Senha incorreta." : ""}</div>
  </form>
  <script>
    (function () {
      var f = document.querySelector('.field'), i = document.getElementById('p'), b = document.getElementById('eye');
      b.addEventListener('click', function () {
        var show = i.type === 'password';
        i.type = show ? 'text' : 'password';
        f.classList.toggle('show', show);
        b.setAttribute('aria-pressed', String(show));
        i.focus();
      });
    })();
  </script>
</body>
</html>`;
}
