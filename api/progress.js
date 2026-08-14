// Progress persistence — tiny Upstash Redis REST proxy (no SDK, plain fetch).
//
// Why not SQLite/a file: Vercel serverless functions have an ephemeral,
// read-only-ish filesystem — anything written is gone after the invocation.
// Upstash's free tier speaks plain HTTP, so two env vars are the whole setup.
//
// Setup (Vercel → Project → Settings → Environment Variables):
//   UPSTASH_REDIS_REST_URL   e.g. https://your-db.upstash.io
//   UPSTASH_REDIS_REST_TOKEN  from the database's REST API section
//
// API (behind the site's password middleware, like every other route):
//   GET  /api/progress?k=grill-cencosud  → the stored JSON object (or {})
//   POST /api/progress?k=grill-cencosud  body: the JSON object to store

const KEY_RE = /^[a-z0-9-]{1,64}$/;
const MAX_BODY = 64 * 1024;

export default async function handler(request) {
	try {
		return await route(request);
	} catch {
		return json({ error: "Bad request." }, 400);
	}
}

async function route(request) {
	let searchParams;
	try {
		({ searchParams } = new URL(request.url));
	} catch {
		return json({ error: "Bad URL." }, 400);
	}
	const key = searchParams.get("k");
	const url = process.env.UPSTASH_REDIS_REST_URL;
	const token = process.env.UPSTASH_REDIS_REST_TOKEN;

	if (!url || !token)
		return json(
			{ error: "Progress store not configured (Upstash env vars missing)." },
			500,
		);
	if (!KEY_RE.test(key || "")) return json({ error: "Bad key." }, 400);

	const auth = { Authorization: `Bearer ${token}` };

	if (request.method === "GET") {
		const res = await fetch(`${url}/get/${key}`, { headers: auth });
		const { result } = await res.json();
		// Values are stored as JSON strings; result null (or the string "null") = absent.
		if (!result || result === "null") return json({});
		try {
			return json(JSON.parse(result));
		} catch {
			return json({});
		}
	}

	if (request.method === "POST") {
		const body = await request.text();
		if (!body || body.length > MAX_BODY)
			return json({ error: "Bad body." }, 400);
		// Validate it's JSON before storing.
		try {
			JSON.parse(body);
		} catch {
			return json({ error: "Body must be JSON." }, 400);
		}
		const res = await fetch(`${url}/set/${key}`, {
			method: "POST",
			headers: { ...auth, "Content-Type": "text/plain" },
			body,
		});
		const { result } = await res.json();
		return json({ ok: result === "OK" });
	}

	return json({ error: "Method not allowed." }, 405);
}

const json = (body, status = 200) =>
	new Response(body, {
		status,
		headers: { "Content-Type": "application/json" },
	});
