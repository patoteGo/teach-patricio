// Smallest check that the gate logic holds. Run: node test-middleware.mjs
import assert from "node:assert/strict";

process.env.APP_PASSWORD = "hunter2";
process.env.AUTH_TOKEN = "secret-token-xyz";

const { default: mw } = await import("./middleware.js");

const base = "https://teach.example";

function req(path, { method = "GET", cookie = "", form = null } = {}) {
	const headers = new Headers();
	if (cookie) headers.set("cookie", cookie);
	let body = null;
	if (form) {
		body = new URLSearchParams(form);
		headers.set("content-type", "application/x-www-form-urlencoded");
	}
	return new Request(new URL(path, base), { method, headers, body });
}

// 1. No cookie -> gate page (with password reveal toggle)
let r = await mw(req("/topics/pi/lessons/0001-the-core-loop.html"));
assert.equal(r.status, 401);
const body1 = await r.text();
assert.match(body1, /Senha/);
assert.match(body1, /id="eye"/);

// 2. Correct password -> redirect + auth cookie
r = await mw(
	req("/__auth", {
		method: "POST",
		form: { password: "hunter2", next: "/lessons/x" },
	}),
);
assert.equal(r.status, 302);
assert.equal(r.headers.get("location"), "/lessons/x");
assert.match(r.headers.get("set-cookie"), /tp_auth=secret-token-xyz/);
assert.match(r.headers.get("set-cookie"), /HttpOnly/);

// 3. Wrong password -> gate with error
r = await mw(req("/__auth", { method: "POST", form: { password: "nope" } }));
assert.equal(r.status, 401);
assert.match(await r.text(), /incorreta/);

// 4. Valid cookie -> pass-through (undefined)
r = await mw(req("/", { cookie: "tp_auth=secret-token-xyz; other=1" }));
assert.equal(r, undefined);

// 5. Open-redirect blocked: next="//evil.com" falls back to "/"
r = await mw(
	req("/__auth", {
		method: "POST",
		form: { password: "hunter2", next: "//evil.com" },
	}),
);
assert.equal(r.headers.get("location"), "/");

// 6. Misconfigured -> fail closed (500)
delete process.env.APP_PASSWORD;
r = await mw(req("/"));
assert.equal(r.status, 500);

console.log("✓ middleware gate checks passed");
