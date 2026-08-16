import { defineConfig } from "astro/config";

// format:"file" → src/pages/.../repertoire.astro builds to repertoire.html,
// keeping every existing URL (and all hrefs from unconverted public/ pages) intact.

// Dev-only: astro dev has no directory-index fallback for public/ files, so "/"
// 404s (static hosts like Vercel serve index.html at "/" fine in production).
const devRootRedirect = () => ({
	name: "dev-root-redirect",
	hooks: {
		"astro:server:setup": ({ server }) => {
			server.middlewares.use((req, res, next) => {
				if ((req.url || "").split("?")[0] === "/") {
					res.statusCode = 302;
					res.setHeader("Location", "/index.html");
					res.end();
					return;
				}
				next();
			});
		},
	},
});

export default defineConfig({
	build: {
		format: "file",
	},
	integrations: [devRootRedirect()],
});
