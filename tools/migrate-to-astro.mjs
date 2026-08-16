#!/usr/bin/env node
// One-shot migration: public/**/*.html → src/pages/**/*.astro
// - head <link>/<script src> lines → `assets` prop (verbatim, order preserved)
// - head <style> block → `pageStyle` prop
// - <title data-pt data-en>fallback</title> → title props
// - body inner → <Fragment is:raw> (verbatim: braces, inline scripts, JSON blocks)
// - deletes the public/ HTML after emitting the .astro twin (URLs unchanged:
//   build.format:"file" emits foo.astro → foo.html)
//
// Idempotent re-run: public files already migrated are simply gone; nothing
// else changes. topics/_template/ is scaffold, not a real page — skipped.

import {
	readFileSync,
	writeFileSync,
	unlinkSync,
	readdirSync,
	statSync,
	mkdirSync,
} from "node:fs";
import { join, relative, dirname } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const PUBLIC = join(ROOT, "public");
const PAGES = join(ROOT, "src", "pages");
const SKIP = [(p) => p.startsWith("topics/_template/")];

const walk = (dir) =>
	readdirSync(dir).flatMap((e) => {
		const p = join(dir, e);
		return statSync(p).isDirectory() ? walk(p) : [p];
	});

const htmlFiles = walk(PUBLIC)
	.filter((p) => p.endsWith(".html"))
	.map((p) => relative(PUBLIC, p))
	.filter((p) => !SKIP.some((fn) => fn(p)))
	.sort();

const J = (s) => JSON.stringify(s);

// decode HTML entities in extracted attr/text values so Astro re-escapes them
// correctly (raw "&amp;" would double-escape to "&amp;amp;" on render)
const NAMED = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const unescape = (s = "") =>
	s
		.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
		.replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
		.replace(/&([a-z]+);/gi, (m, n) => NAMED[n.toLowerCase()] ?? m);

let migrated = 0;
const problems = [];

for (const rel of htmlFiles) {
	const src = readFileSync(join(PUBLIC, rel), "utf8");
	const astroPath = join(PAGES, rel.replace(/\.html$/, ".astro"));

	// head
	const head = src.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? "";
	const titleTag = head.match(/<title([^>]*)>([\s\S]*?)<\/title>/);
	if (!titleTag) {
		problems.push(`${rel}: no <title>`);
		continue;
	}
	const titlePt = unescape(titleTag[1].match(/data-pt="([^"]*)"/)?.[1]);
	const titleEn = unescape(titleTag[1].match(/data-en="([^"]*)"/)?.[1]);
	const fallback = unescape(titleTag[2].trim());

	// assets: every <link> and external <script src> in head, in order
	const assets = [];
	const assetRe = /<link\b[^>]*\/?>|<script\b[^>]*\bsrc=[^>]*>\s*<\/script>/g;
	for (const m of head.matchAll(assetRe)) assets.push(m[0]);

	// page <style> block(s) in head
	const styles = [...head.matchAll(/<style>([\s\S]*?)<\/style>/g)].map(
		(m) => m[1],
	);
	const pageStyle = styles.join("\n").trim();

	// head must contain nothing besides meta/title/comments/assets/style
	const leftovers = head
		.replace(/<title[\s\S]*?<\/title>/, "")
		.replace(assetRe, "")
		.replace(/<style>[\s\S]*?<\/style>/g, "")
		.replace(/<meta\b[^>]*\/?>/g, "")
		.replace(/<!--[\s\S]*?-->/g, "")
		.replace(/\s/g, "");
	if (leftovers) {
		problems.push(`${rel}: unexpected head content: ${leftovers.slice(0, 80)}`);
		continue;
	}

	// body
	const bodyMatch = src.match(/<body([^>]*)>([\s\S]*)<\/body>/);
	if (!bodyMatch) {
		problems.push(`${rel}: no <body>`);
		continue;
	}
	const bodyAttrs = bodyMatch[1].trim();
	const bodyClass = bodyAttrs.match(/class="([^"]*)"/)?.[1] ?? "";
	if (bodyAttrs && !bodyAttrs.startsWith("class=")) {
		problems.push(`${rel}: extra body attrs: ${bodyAttrs}`);
		continue;
	}

	const viewport = head.match(/<meta name="viewport" content="([^"]*)"/)?.[1];
	const htmlLang = src.match(/<html lang="([^"]*)"/)?.[1] ?? "pt-BR";

	const importPath = relative(
		dirname(astroPath),
		join(ROOT, "src/layouts/Lesson.astro"),
	).replace(/\\/g, "/");

	const out = `---
// Migrated verbatim from public/${rel} (URL unchanged: builds to ${rel.split("/").pop()}).
// Body is is:raw: braces/inline scripts/JSON blocks pass through untouched.
import Lesson from "${importPath}";
const titlePt = ${J(titlePt)};
const titleEn = ${J(titleEn)};
const titleFallback = ${J(fallback)};
const bodyClass = ${J(bodyClass)};${htmlLang === "pt-BR" ? "" : `\nconst htmlLang = ${J(htmlLang)};`}${viewport && viewport !== "width=device-width,initial-scale=1" ? `\nconst viewport = ${J(viewport)};` : ""}
const assets = [
${assets.map((a) => "\t" + J(a) + ",").join("\n")}
];
${pageStyle ? `const pageStyle = ${J(pageStyle)};\n` : ""}
---
<Lesson
	titlePt={titlePt}
	titleEn={titleEn}
	titleFallback={titleFallback}
	bodyClass={bodyClass}${htmlLang === "pt-BR" ? "" : "\n\thtmlLang={htmlLang}"}${viewport && viewport !== "width=device-width,initial-scale=1" ? "\n\tviewport={viewport}" : ""}
	assets={assets}
${pageStyle ? "\tpageStyle={pageStyle}\n" : ""}>
	<Fragment is:raw>${bodyMatch[2]}</Fragment>
</Lesson>
`;

	mkdirSync(dirname(astroPath), { recursive: true });
	writeFileSync(astroPath, out);
	unlinkSync(join(PUBLIC, rel));
	migrated++;
	console.log(`✓ ${rel} → ${relative(ROOT, astroPath)}`);
}

console.log(`\n${migrated} migrated, ${problems.length} problems`);
problems.forEach((p) => console.log("  ✗ " + p));
process.exit(problems.length ? 1 : 0);
