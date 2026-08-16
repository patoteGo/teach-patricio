/* =========================================================================
   Pi Learning — bilingual engine (shared component)
   Auto-injects a PT/EN switch into the hero, swaps language on click, and
   persists the choice. Static content is driven by CSS (data-lang spans);
   SVG text and the <title> are swapped via data-pt/data-en.
   Lessons with dynamic text subscribe: PiI18n.on(lang => rerender()).
   No innerHTML anywhere (security-guard safe). localStorage is wrapped so
   file:// / private mode can't kill the script.
   ========================================================================= */
(() => {
	const store = {
		get: (k) => {
			try {
				return localStorage.getItem(k);
			} catch {
				return null;
			}
		},
		set: (k, v) => {
			try {
				localStorage.setItem(k, v);
			} catch {}
		},
	};
	const root = document.documentElement;
	let LANG = store.get("pi-lang") || "pt";
	const subs = [];

	function applyLang(lang) {
		LANG = lang;
		document.body.classList.remove("lang-pt", "lang-en");
		document.body.classList.add("lang-" + lang);
		root.lang = lang === "en" ? "en" : "pt-BR";
		const title = document.querySelector("title[data-en]");
		if (title)
			title.textContent = lang === "en" ? title.dataset.en : title.dataset.pt;
		document.querySelectorAll("[data-en][data-pt]").forEach((el) => {
			el.textContent = lang === "en" ? el.dataset.en : el.dataset.pt;
		});
		document.querySelectorAll(".langswitch button").forEach((b) => {
			b.setAttribute("aria-pressed", String(b.dataset.go === lang));
		});
		store.set("pi-lang", lang);
		subs.forEach((fn) => {
			try {
				fn(LANG);
			} catch {}
		});
	}

	function injectToggle() {
		if (document.querySelector(".langswitch")) return;
		const host =
			document.querySelector(".hero") ||
			document.querySelector("article") ||
			document.body;
		const sw = document.createElement("div");
		sw.className = "langswitch";
		sw.setAttribute("role", "group");
		sw.setAttribute("aria-label", "Language / Idioma");
		["pt", "en"].forEach((l) => {
			const b = document.createElement("button");
			b.type = "button";
			b.dataset.go = l;
			b.textContent = l.toUpperCase();
			b.setAttribute("aria-pressed", "false");
			b.addEventListener("click", () => applyLang(l));
			sw.appendChild(b);
		});
		host.insertBefore(sw, host.firstChild);
	}

	window.PiI18n = {
		get lang() {
			return LANG;
		},
		applyLang,
		on(fn) {
			subs.push(fn);
		},
		L: (o) => o[LANG],
	};

	function init() {
		injectToggle();
		applyLang(LANG);
	}
	if (document.readyState !== "loading") init();
	else document.addEventListener("DOMContentLoaded", init);
})();
