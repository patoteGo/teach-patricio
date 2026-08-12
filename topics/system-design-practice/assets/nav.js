/* =========================================================================
   Pi Learning — shared lesson sidebar (auto-injected)
   Add ONE line to a lesson:  <script src="../assets/nav.js" defer></script>
   It injects a left sidebar listing the topic's lessons (bilingual via PiI18n),
   highlights the current page, links the glossary + hub + other topic, and
   collapses to a slide-in drawer on mobile. No innerHTML. Desktop: body is
   padded so the fixed sidebar never covers content.
   ========================================================================= */
(() => {
	const MANIFEST = {
		pi: {
			name: { pt: "Pi Power-User", en: "Pi Power-User" },
			lessons: [
				{
					f: "0001-the-core-loop.html",
					n: "01",
					t: { pt: "O core loop", en: "The core loop" },
				},
				{
					f: "0002-driving-the-tui.html",
					n: "02",
					t: { pt: "Dirigindo o TUI", en: "Driving the TUI" },
				},
				{
					f: "0003-sessions-branching-compaction.html",
					n: "03",
					t: { pt: "Sessões & compaction", en: "Sessions & compaction" },
				},
				{
					f: "0004-context-files.html",
					n: "04",
					t: { pt: "Arquivos de contexto", en: "Context files" },
				},
				{ f: "0005-skills.html", n: "05", t: { pt: "Skills", en: "Skills" } },
				{
					f: "0006-extensions.html",
					n: "06",
					t: { pt: "Extensões", en: "Extensions" },
				},
				{
					f: "0007-packages.html",
					n: "07",
					t: { pt: "Packages", en: "Packages" },
				},
				{
					f: "0008-o-mapa-dos-agentes.html",
					n: "08",
					t: { pt: "O mapa dos agentes", en: "The agent map" },
				},
				{
					f: "0009-orquestra-de-agentes.html",
					n: "09",
					t: { pt: "Orquestra de agentes", en: "Agent orchestra" },
				},
			],
			extra: [
				{ f: "pi-glossary.html", t: { pt: "📖 Glossário", en: "📖 Glossary" } },
			],
		},
		"behavioral-interview": {
			name: { pt: "Entrevista Behavioral", en: "Behavioral Interview" },
			lessons: [
				{
					f: "0001-bluf-star.html",
					n: "01",
					t: { pt: "BLUF + STAR", en: "BLUF + STAR" },
				},
				{
					f: "0002-the-dojo.html",
					n: "02",
					t: { pt: "O Dojo", en: "The Dojo" },
				},
				{
					f: "0003-the-pitch.html",
					n: "03",
					t: { pt: "O Pitch", en: "The Pitch" },
				},
				{
					f: "0004-follow-ups.html",
					n: "04",
					t: { pt: "Follow-ups", en: "Follow-ups" },
				},
			],
			extra: [],
		},
		"system-design-practice": {
			name: { pt: "System Design Dojo", en: "System Design Dojo" },
			lessons: [
				{
					f: "0001-draw-and-talk.html",
					n: "01",
					t: { pt: "Desenhe e fale", en: "Draw and talk" },
				},
			],
			extra: [
				{
					f: "bidding-concurrency.html",
					t: { pt: "📖 Concorrência em leilões", en: "📖 Auction concurrency" },
				},
			],
		},
		"system-design": {
			name: { pt: "System Design", en: "System Design" },
			lessons: [
				{
					f: "0001-the-design-loop.html",
					n: "01",
					t: { pt: "O loop de design", en: "The design loop" },
				},
				{
					f: "0002-the-four-forces.html",
					n: "02",
					t: { pt: "As quatro forças", en: "The four forces" },
				},
				{
					f: "0003-scale-and-estimation.html",
					n: "03",
					t: { pt: "Escala e estimativa", en: "Scale & estimation" },
				},
				{
					f: "0004-state-and-boundaries.html",
					n: "04",
					t: { pt: "Estado e fronteiras", en: "State & boundaries" },
				},
			],
			extra: [],
		},
		"clearone-interview": {
			name: { pt: "ClearOne (entrevista)", en: "ClearOne (interview)" },
			lessons: [
				{
					f: "0001-clearone-playbook.html",
					n: "01",
					t: { pt: "O playbook", en: "The playbook" },
				},
				{
					f: "0002-stack-cheatsheet.html",
					n: "02",
					t: { pt: "Lembretes do stack", en: "Stack reminders" },
				},
			],
			extra: [
				{
					f: "my-stories.html",
					t: { pt: "📖 Minhas histórias", en: "📖 My stories" },
				},
			],
		},
	};
	const OTHER = {
		pi: "behavioral-interview",
		"behavioral-interview": "pi",
		"system-design-practice": "system-design",
		"system-design": "pi",
		"clearone-interview": "behavioral-interview",
	};

	const path = location.pathname.replace(/\\/g, "/");
	const here = path.split("/").pop();
	const inRef = /\/reference\//.test(path);
	const m = path.match(/\/topics\/([^/]+)\//);
	const topic = m ? m[1] : null;
	if (!topic || !MANIFEST[topic]) return;
	const data = MANIFEST[topic];
	const lesBase = inRef ? "../lessons/" : "";
	const refBase = inRef ? "" : "../reference/";
	const oth = OTHER[topic];
	const othFirst = MANIFEST[oth].lessons[0];
	const othHref = "../../" + oth + "/lessons/" + othFirst.f;
	const hubHref = "../../../index.html";
	const lang = () => (window.PiI18n && PiI18n.lang) || "pt";
	const L = (o) => (o && (o[lang()] || o.pt)) || "";

	const CSS = `
.pi-nav{position:fixed;top:0;left:0;height:100vh;width:250px;z-index:200;background:var(--paper-2);border-right:1px solid var(--line);box-shadow:var(--shadow-lg);transform:translateX(-100%);transition:transform .22s ease;display:flex;flex-direction:column;font-size:.86rem;overflow-y:auto}
.pi-nav.open{transform:translateX(0)}
.pi-nav .pn-head{padding:20px 18px 12px;border-bottom:1px solid var(--line)}
.pi-nav .pn-head .pn-topic{font:700 1.02rem/1.2 "Space Grotesk",sans-serif;color:var(--ink);display:block}
.pi-nav .pn-head .pn-sub{font:700 .6rem "Space Grotesk";letter-spacing:.12em;text-transform:uppercase;color:var(--violet);margin-top:4px;display:block}
.pi-nav .pn-sec{padding:14px 18px 4px;font:700 .58rem "Space Grotesk";letter-spacing:.12em;text-transform:uppercase;color:var(--ink-soft)}
.pi-nav a.pn-link{display:flex;gap:10px;align-items:center;padding:10px 18px;min-height:44px;color:var(--ink-soft);text-decoration:none;border-left:3px solid transparent;transition:background .12s,color .12s}
.pi-nav a.pn-link:hover{color:var(--ink);background:rgba(255,255,255,.04)}
.pi-nav a.pn-link.active{color:var(--violet);border-left-color:var(--violet);background:var(--violet-50);font-weight:700}
.pi-nav a.pn-link .pn-n{font:700 .68rem "JetBrains Mono",monospace;color:var(--ink-soft);min-width:20px;flex:none}
.pi-nav a.pn-link.active .pn-n{color:var(--violet)}
.pi-nav .pn-foot{margin-top:auto;padding:12px 18px 16px;border-top:1px solid var(--line);display:flex;flex-direction:column;gap:8px}
.pi-nav .pn-foot a{color:var(--ink-soft);text-decoration:none;font-size:.82rem;display:flex;gap:8px;align-items:center}
.pi-nav .pn-foot a:hover{color:var(--ink)}
.pi-nav .pn-foot a.pn-other{color:var(--teal);font-weight:600}
.pi-nav .pn-close{position:absolute;top:12px;right:12px;cursor:pointer;border:0;background:transparent;color:var(--ink-soft);font-size:1.3rem;line-height:1;display:none}
.pn-toggle{position:fixed;top:16px;left:16px;z-index:201;width:44px;height:44px;border-radius:11px;border:1px solid var(--line);background:var(--paper-2);color:var(--ink);cursor:pointer;font-size:1.15rem;display:none;align-items:center;justify-content:center;box-shadow:var(--shadow)}
.pn-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:199;opacity:0;pointer-events:none;transition:opacity .2s}
.pn-backdrop.show{opacity:1;pointer-events:auto}
@media (min-width:1024px){
  body.pn-has{padding-left:250px}
  .pi-nav{transform:translateX(0);box-shadow:none}
  .pn-toggle{display:none!important}
  .pi-nav .pn-close{display:none!important}
}
@media (max-width:1023px){
  .pn-toggle{display:flex}
  .pi-nav .pn-close{display:block}
  body.pn-has .hero .eyebrow{padding-left:54px}
}`;
	const style = document.createElement("style");
	style.textContent = CSS;
	document.head.appendChild(style);

	const nav = document.createElement("nav");
	nav.className = "pi-nav";
	nav.setAttribute("aria-label", "Lessons");

	const head = document.createElement("div");
	head.className = "pn-head";
	const topicEl = document.createElement("span");
	topicEl.className = "pn-topic";
	const subEl = document.createElement("span");
	subEl.className = "pn-sub";
	head.append(topicEl, subEl);
	nav.append(head);

	const lesLabel = document.createElement("div");
	lesLabel.className = "pn-sec";
	nav.append(lesLabel);

	const lessonRefs = [];
	data.lessons.forEach((ls) => {
		const a = document.createElement("a");
		a.className = "pn-link";
		a.href = lesBase + ls.f;
		if (here === ls.f) a.classList.add("active");
		const num = document.createElement("span");
		num.className = "pn-n";
		num.textContent = ls.n;
		const lbl = document.createElement("span");
		lbl.className = "pn-l";
		a.append(num, lbl);
		nav.append(a);
		lessonRefs.push({ lbl, t: ls.t });
	});

	let extraRef = null;
	if (data.extra.length) {
		const refLabel = document.createElement("div");
		refLabel.className = "pn-sec";
		nav.append(refLabel);
		data.extra.forEach((ex) => {
			const a = document.createElement("a");
			a.className = "pn-link";
			a.href = refBase + ex.f;
			if (here === ex.f) a.classList.add("active");
			const lbl = document.createElement("span");
			lbl.className = "pn-l";
			a.append(lbl);
			nav.append(a);
			extraRef = { refLabel, lbl, t: ex.t };
		});
	}

	const foot = document.createElement("div");
	foot.className = "pn-foot";
	const hubA = document.createElement("a");
	hubA.href = hubHref;
	hubA.textContent = "⬡ ";
	const hubLbl = document.createElement("span");
	hubA.append(hubLbl);
	const othA = document.createElement("a");
	othA.className = "pn-other";
	othA.href = othHref;
	othA.textContent = "↗ ";
	const othLbl = document.createElement("span");
	othA.append(othLbl);
	foot.append(hubA, othA);
	nav.append(foot);

	const closeBtn = document.createElement("button");
	closeBtn.className = "pn-close";
	closeBtn.setAttribute("aria-label", "Close");
	closeBtn.textContent = "×";
	closeBtn.addEventListener("click", () => {
		nav.classList.remove("open");
		backdrop.classList.remove("show");
	});
	nav.append(closeBtn);

	document.body.append(nav);
	document.body.classList.add("pn-has");

	const toggle = document.createElement("button");
	toggle.className = "pn-toggle";
	toggle.setAttribute("aria-label", "Lessons");
	toggle.textContent = "☰";
	const backdrop = document.createElement("div");
	backdrop.className = "pn-backdrop";
	document.body.append(toggle, backdrop);
	toggle.addEventListener("click", () => {
		nav.classList.add("open");
		backdrop.classList.add("show");
	});
	backdrop.addEventListener("click", () => {
		nav.classList.remove("open");
		backdrop.classList.remove("show");
	});

	const LES_SEC = { pt: "Lições", en: "Lessons" };
	const REF_SEC = { pt: "Referência", en: "Reference" };
	const HUB_LBL = { pt: "Hub · todos os tópicos", en: "Hub · all topics" };
	function render() {
		topicEl.textContent = L(data.name);
		subEl.textContent = lang() === "en" ? "Course" : "Curso";
		lesLabel.textContent = L(LES_SEC);
		lessonRefs.forEach((r) => (r.lbl.textContent = L(r.t)));
		if (extraRef) {
			extraRef.refLabel.textContent = L(REF_SEC);
			extraRef.lbl.textContent = L(extraRef.t);
		}
		hubLbl.textContent = L(HUB_LBL);
		othLbl.textContent = L(MANIFEST[oth].name);
	}
	render();
	if (window.PiI18n) PiI18n.on(render);
})();

(() => {
	function init() {
		const progress = document.createElement("div");
		progress.className = "reading-progress";
		progress.setAttribute("role", "progressbar");
		progress.setAttribute("aria-valuemin", "0");
		progress.setAttribute("aria-valuemax", "100");
		const bar = document.createElement("span");
		progress.append(bar);
		document.body.append(progress);

		const isEnglish = () =>
			window.PiI18n?.lang
				? window.PiI18n.lang === "en"
				: document.documentElement.lang.startsWith("en");
		function renderLabel() {
			progress.setAttribute(
				"aria-label",
				isEnglish() ? "Reading progress" : "Progresso da leitura",
			);
		}
		renderLabel();
		window.PiI18n?.on(renderLabel);

		let frame = 0;
		function updateProgress() {
			frame = 0;
			const max = document.documentElement.scrollHeight - innerHeight;
			const value =
				max > 0 ? Math.min(100, Math.max(0, (scrollY / max) * 100)) : 100;
			bar.style.width = `${value}%`;
			progress.setAttribute("aria-valuenow", String(Math.round(value)));
		}
		function requestUpdate() {
			if (!frame) frame = requestAnimationFrame(updateProgress);
		}
		addEventListener("scroll", requestUpdate, { passive: true });
		addEventListener("resize", requestUpdate);
		updateProgress();

		const nav = document.querySelector(".pi-nav");
		const toggle = document.querySelector(".pn-toggle");
		if (!nav || !toggle) return;

		const key = "pi-learning-sidebar-collapsed";
		const collapse = document.createElement("button");
		collapse.type = "button";
		collapse.className = "pn-collapse";
		collapse.textContent = "‹";
		nav.append(collapse);

		function renderCollapseLabel() {
			const label = isEnglish()
				? "Collapse sidebar"
				: "Recolher barra lateral";
			collapse.setAttribute("aria-label", label);
			collapse.setAttribute("title", label);
		}
		renderCollapseLabel();
		window.PiI18n?.on(renderCollapseLabel);

		try {
			if (localStorage.getItem(key) === "1")
				document.body.classList.add("pn-collapsed");
		} catch {}

		collapse.addEventListener("click", () => {
			document.body.classList.add("pn-collapsed");
			try {
				localStorage.setItem(key, "1");
			} catch {}
		});

		toggle.addEventListener("click", () => {
			if (innerWidth < 1024) return;
			document.body.classList.remove("pn-collapsed");
			nav.classList.remove("open");
			document.querySelector(".pn-backdrop")?.classList.remove("show");
			try {
				localStorage.setItem(key, "0");
			} catch {}
		});
	}

	if (document.readyState === "loading")
		document.addEventListener("DOMContentLoaded", init);
	else init();
})();
