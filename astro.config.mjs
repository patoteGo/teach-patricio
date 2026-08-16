import { defineConfig } from "astro/config";

// format:"file" → src/pages/**/foo.astro builds to foo.html,
// keeping every pre-Astro URL (and all hrefs between pages) intact.

export default defineConfig({
	build: {
		format: "file",
	},
});
