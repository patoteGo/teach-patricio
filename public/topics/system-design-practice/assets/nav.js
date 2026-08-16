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
					t: {
						pt: "Desenhe e fale (leilão L4)",
						en: "Draw and talk (auction L4)",
					},
				},
				{
					f: "0002-the-difficulty-ladder.html",
					n: "02",
					t: { pt: "A escada de dificuldade", en: "The difficulty ladder" },
				},
				{
					f: "0003-starter-url-shortener.html",
					n: "03",
					t: { pt: "L1 · Encurtador de URL", en: "L1 · URL shortener" },
				},
				{
					f: "0004-starter-onboarding-email.html",
					n: "04",
					t: {
						pt: "L1–2 · Onboarding + email",
						en: "L1–2 · Onboarding + email",
					},
				},
				{
					f: "0005-starter-webhook-delivery.html",
					n: "05",
					t: { pt: "L2 · Webhook (Lob)", en: "L2 · Webhook (Lob)" },
				},
				{
					f: "0006-warmup-copy-recall.html",
					n: "06",
					t: {
						pt: "Warmup copiar-redesenhar",
						en: "Copy-recall warmup",
					},
				},
			],
			extra: [
				{
					f: "repertoire.html",
					t: {
						pt: "Repertório: 15 plantas",
						en: "Repertoire: 15 blueprints",
					},
					children: [
						{
							f: "p1.html",
							n: "P1",
							t: {
								pt: "O esqueleto base: API CRUD",
								en: "The base skeleton: CRUD API",
							},
						},
						{
							f: "p2.html",
							n: "P2",
							t: { pt: "Leitura pesada: cache-aside", en: "Read-heavy: cache-aside" },
						},
						{
							f: "p3.html",
							n: "P3",
							t: {
								pt: "Trabalho lento: fila + worker",
								en: "Slow work: queue + worker",
							},
						},
						{
							f: "p4.html",
							n: "P4",
							t: {
								pt: "Arquivos grandes: upload + CDN",
								en: "Large files: upload + CDN",
							},
						},
						{
							f: "p5.html",
							n: "P5",
							t: {
								pt: "Rate limiter: contador atômico",
								en: "Rate limiter: atomic counter",
							},
						},
						{
							f: "p6.html",
							n: "P6",
							t: {
								pt: "Pipeline de mídia: evento do S3",
								en: "Media pipeline: S3 event",
							},
						},
						{
							f: "p7.html",
							n: "P7",
							t: {
								pt: "Ranking / top-K: sorted set",
								en: "Ranking / top-K: sorted set",
							},
						},
						{
							f: "p8.html",
							n: "P8",
							t: { pt: "Feed: fan-out na escrita", en: "Feed: fan-out on write" },
						},
						{
							f: "p9.html",
							n: "P9",
							t: {
								pt: "Tempo real: gateway WebSocket",
								en: "Real-time: WebSocket gateway",
							},
						},
						{
							f: "p10.html",
							n: "P10",
							t: { pt: "Propagação: CDC via Kafka", en: "Propagation: CDC via Kafka" },
						},
						{
							f: "p11.html",
							n: "P11",
							t: {
								pt: "Analytics: clickstream → S3",
								en: "Analytics: clickstream → S3",
							},
						},
						{
							f: "p12.html",
							n: "P12",
							t: {
								pt: "Webhooks de saída: fila por destino",
								en: "Outgoing webhooks: queue per target",
							},
						},
						{
							f: "p13.html",
							n: "P13",
							t: {
								pt: "Chave quente: leilão / hot key",
								en: "Hot key: auction / hot item",
							},
						},
						{
							f: "p14.html",
							n: "P14",
							t: { pt: "Escalar escrita: sharding", en: "Scaling writes: sharding" },
						},
						{
							f: "p15.html",
							n: "P15",
							t: { pt: "Global: multi-região", en: "Global: multi-region" },
						},
					],
				},
				{
					f: "bidding-concurrency.html",
					t: {
						pt: "Leilão (referência L4)",
						en: "Auction (L4 reference)",
					},
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
.pi-nav a.pn-link .pn-ico{font-size:1.05rem;flex:none;line-height:1}
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
}
.pi-nav .pn-group{display:flex;flex-direction:column}
.pi-nav .pn-row{display:flex;align-items:stretch}
.pi-nav .pn-row a.pn-link{flex:1}
.pi-nav .pn-tw{flex:none;width:40px;border:0;background:transparent;color:var(--ink-soft);cursor:pointer;display:flex;align-items:center;justify-content:center}
.pi-nav .pn-tw:hover{color:var(--ink)}
.pi-nav .pn-tw .ph{transition:transform .15s;font-size:.8rem}
.pi-nav .pn-group.open .pn-tw .ph{transform:rotate(90deg)}
.pi-nav .pn-kids{display:none;flex-direction:column}
.pi-nav .pn-group.open .pn-kids{display:flex}
.pi-nav .pn-kids a.pn-link{min-height:36px;padding:6px 18px 6px 40px;font-size:.8rem}
.pn-pager{position:absolute;top:20px;right:128px;z-index:6;display:inline-flex;gap:2px;padding:3px;border-radius:999px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.3);backdrop-filter:blur(6px)}
.pn-pager a{display:inline-flex;align-items:center;justify-content:center;min-width:32px;height:26px;padding:0 8px;border-radius:999px;color:rgba(255,255,255,.85);text-decoration:none;font-size:.95rem}
.pn-pager a:hover{background:#fff;color:#14132b}
/* pages without a .hero (pattern pages): pills would hug the raw document top — lower them */
body.pn-nohero :is(.pn-pager,.langswitch){top:56px}
@media (max-width:520px){
  .pn-pager{top:14px;right:116px}
  body.pn-nohero :is(.pn-pager,.langswitch){top:48px}
}
@media print{.pn-pager{display:none}}`;
	const style = document.createElement("style");
	style.textContent = CSS;
	document.head.appendChild(style);

	/* Phosphor icons for reference links (Astro layouts load it; plain HTML pages don't). */
	if (
		!document.querySelector('script[src*="phosphor"],link[href*="phosphor"]')
	) {
		const ph = document.createElement("script");
		ph.src = "https://unpkg.com/@phosphor-icons/web@2.1.1";
		document.head.append(ph);
	}

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

	const extraRefs = [];
	if (data.extra.length) {
		const refLabel = document.createElement("div");
		refLabel.className = "pn-sec";
		nav.append(refLabel);
		data.extra.forEach((ex) => {
			const a = document.createElement("a");
			a.className = "pn-link";
			a.href = refBase + ex.f;
			if (here === ex.f) a.classList.add("active");
			const ico = document.createElement("i");
			ico.className = "pn-ico ph ph-book-open-text";
			const lbl = document.createElement("span");
			lbl.className = "pn-l";
			a.append(ico, lbl);
			const entry = { refLabel, lbl, t: ex.t, kids: [], tw: null, group: null };
			if (ex.children) {
				const group = document.createElement("div");
				group.className = "pn-group";
				const row = document.createElement("div");
				row.className = "pn-row";
				const tw = document.createElement("button");
				tw.type = "button";
				tw.className = "pn-tw";
				const twIco = document.createElement("i");
				twIco.className = "ph ph-caret-right";
				tw.append(twIco);
				tw.addEventListener("click", () => group.classList.toggle("open"));
				row.append(a, tw);
				const kids = document.createElement("div");
				kids.className = "pn-kids";
				ex.children.forEach((ch) => {
					const ka = document.createElement("a");
					ka.className = "pn-link";
					ka.href = refBase + ch.f;
					if (here === ch.f) ka.classList.add("active");
					const num = document.createElement("span");
					num.className = "pn-n";
					num.textContent = ch.n;
					const klbl = document.createElement("span");
					klbl.className = "pn-l";
					ka.append(num, klbl);
					kids.append(ka);
					entry.kids.push({ lbl: klbl, t: ch.t });
					if (here === ch.f) group.classList.add("open");
				});
				group.append(row, kids);
				nav.append(group);
				entry.tw = tw;
				entry.group = group;
			} else {
				nav.append(a);
			}
			extraRefs.push(entry);
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

	/* Pages without a .hero (pattern pages): the lang pill + pager would hug the
	   raw document top (no positioned anchor). Flag for CSS to lower them. */
	if (!document.querySelector(".hero")) document.body.classList.add("pn-nohero");

	/* Prev/next pager on reference pages, next to the lang switch.
	   Sequence: extra entries with children flattened (repertoire → p1..p15 → auction). */
	let pager = null;
	if (inRef) {
		const seq = [];
		data.extra.forEach((ex) => {
			seq.push({ f: ex.f, t: ex.t });
			(ex.children || []).forEach((ch) => seq.push({ f: ch.f, n: ch.n, t: ch.t }));
		});
		const idx = seq.findIndex((s) => s.f === here);
		if (idx >= 0 && seq.length > 1) {
			const host =
				document.querySelector(".hero") ||
				document.querySelector("article") ||
				document.body;
			pager = document.createElement("nav");
			pager.className = "pn-pager";
			pager.setAttribute("aria-label", "Reference / Referência");
			const mk = (s, dir) => {
				const a = document.createElement("a");
				a.href = refBase + s.f;
				const i = document.createElement("i");
				i.className = "ph ph-caret-" + dir;
				a.append(i);
				a._s = s;
				a._dir = dir;
				return a;
			};
			if (seq[idx - 1]) pager.append(mk(seq[idx - 1], "left"));
			if (seq[idx + 1]) pager.append(mk(seq[idx + 1], "right"));
			host.insertBefore(pager, host.firstChild);
		}
	}

	const LES_SEC = { pt: "Lições", en: "Lessons" };
	const REF_SEC = { pt: "Referência", en: "Reference" };
	const HUB_LBL = { pt: "Hub · todos os tópicos", en: "Hub · all topics" };
	function render() {
		topicEl.textContent = L(data.name);
		subEl.textContent = lang() === "en" ? "Course" : "Curso";
		lesLabel.textContent = L(LES_SEC);
		lessonRefs.forEach((r) => (r.lbl.textContent = L(r.t)));
		if (extraRefs.length) {
			extraRefs.forEach((r) => {
				r.refLabel.textContent = L(REF_SEC);
				r.lbl.textContent = L(r.t);
				r.kids.forEach((k) => (k.lbl.textContent = L(k.t)));
				if (r.tw && r.group) {
					const open = r.group.classList.contains("open");
					r.tw.setAttribute("aria-expanded", String(open));
					r.tw.setAttribute(
						"aria-label",
						L(
							open
								? { pt: "Recolher plantas", en: "Collapse blueprints" }
								: { pt: "Expandir plantas", en: "Expand blueprints" },
						),
					);
				}
			});
		}
		if (pager) {
			pager.querySelectorAll("a").forEach((a) => {
				const name = (a._s.n ? a._s.n + " · " : "") + L(a._s.t);
				a.title =
					(a._dir === "left"
						? L({ pt: "Anterior", en: "Previous" })
						: L({ pt: "Próximo", en: "Next" })) +
					": " +
					name;
				a.setAttribute("aria-label", a.title);
			});
		}
		hubLbl.textContent = L(HUB_LBL);
		othLbl.textContent = L(MANIFEST[oth].name);
	}
	render();
	if (window.PiI18n) PiI18n.on(render);
})();

(() => {
	function init() {
		const root = document.querySelector("article.lesson");
		const isEnglish = () =>
			window.PiI18n?.lang
				? window.PiI18n.lang === "en"
				: document.documentElement.lang.startsWith("en");
		const L = (pt, en) => (isEnglish() ? en : pt);

		/* Reading progress */
		const progress = document.createElement("div");
		progress.className = "reading-progress";
		progress.setAttribute("role", "progressbar");
		progress.setAttribute("aria-valuemin", "0");
		progress.setAttribute("aria-valuemax", "100");
		const bar = document.createElement("span");
		progress.append(bar);
		document.body.append(progress);

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

		/* Collapsible desktop sidebar */
		const nav = document.querySelector(".pi-nav");
		const navToggle = document.querySelector(".pn-toggle");
		let collapse = null;
		if (nav && navToggle) {
			const navKey = "pi-learning-sidebar-collapsed";
			collapse = document.createElement("button");
			collapse.type = "button";
			collapse.className = "pn-collapse";
			collapse.textContent = "‹";
			nav.append(collapse);
			try {
				if (localStorage.getItem(navKey) === "1")
					document.body.classList.add("pn-collapsed");
			} catch {}
			collapse.addEventListener("click", () => {
				document.body.classList.add("pn-collapsed");
				try {
					localStorage.setItem(navKey, "1");
				} catch {}
			});
			navToggle.addEventListener("click", () => {
				if (innerWidth < 1024) return;
				document.body.classList.remove("pn-collapsed");
				nav.classList.remove("open");
				document.querySelector(".pn-backdrop")?.classList.remove("show");
				try {
					localStorage.setItem(navKey, "0");
				} catch {}
			});
		}

		if (!root) {
			const renderChromeLabels = () => {
				progress.setAttribute(
					"aria-label",
					L("Progresso da leitura", "Reading progress"),
				);
				if (collapse) {
					const text = L("Recolher barra lateral", "Collapse sidebar");
					collapse.setAttribute("aria-label", text);
					collapse.setAttribute("title", text);
				}
			};
			renderChromeLabels();
			window.PiI18n?.on(renderChromeLabels);
			return;
		}

		/* Active recall targets: lesson emphasis + reference-page prompts. */
		const targets = [];
		function enhanceTargets(scope = root) {
			const candidates = scope.querySelectorAll(
				[
					"p strong",
					"p mark.skim",
					"p em:not(.plain)",
					"li strong",
					"li b:first-child",
					"p > b:first-child",
					".term h3",
					".term .test",
					"#md-content h2",
					"#md-content h3",
					"#md-content strong",
				].join(", "),
			);
			let added = 0;
			candidates.forEach((target) => {
				if (
					target.dataset.recallReady ||
					target.closest(".hero, .quiz, .ex, .study-tools")
				)
					return;
				target.dataset.recallReady = "1";
				target.classList.add("recall-target");
				target.dataset.recallIndex = String(targets.length);
				target.tabIndex = 0;
				target.setAttribute("role", "button");
				target.addEventListener("click", () => target.classList.toggle("revealed"));
				target.addEventListener("keydown", (event) => {
					if (event.key !== "Enter" && event.key !== " ") return;
					event.preventDefault();
					target.classList.toggle("revealed");
				});
				targets.push(target);
				added++;
			});
			return added;
		}
		enhanceTargets();

		/* Persisted section checkpoints. */
		const pageKey = `pi-study:${location.pathname}`;
		const load = () => {
			try {
				return JSON.parse(localStorage.getItem(pageKey) || "{}");
			} catch {
				return {};
			}
		};
		const state = load();
		const save = () => {
			try {
				localStorage.setItem(pageKey, JSON.stringify(state));
			} catch {}
		};
		const sections = [...root.querySelectorAll("h2.section")];
		const checks = sections.map((heading, index) => {
			const button = document.createElement("button");
			button.type = "button";
			button.className = "section-check";
			button.dataset.section = String(index);
			button.setAttribute("aria-pressed", String(!!state[index]));
			if (state[index]) heading.classList.add("is-learned");
			button.addEventListener("click", () => {
				state[index] = !state[index];
				heading.classList.toggle("is-learned", !!state[index]);
				button.setAttribute("aria-pressed", String(!!state[index]));
				save();
				renderStatus();
				renderLabels();
			});
			heading.append(button);
			return button;
		});

		/* Reusable study toolbar. */
		const tools = document.createElement("aside");
		tools.className = "study-tools";
		tools.setAttribute("aria-label", "Study tools");
		const status = document.createElement("span");
		status.className = "study-status";
		const recall = document.createElement("button");
		recall.type = "button";
		recall.className = "study-recall";
		recall.setAttribute("aria-pressed", "false");
		const test = document.createElement("button");
		test.type = "button";
		test.className = "study-test";
		const reset = document.createElement("button");
		reset.type = "button";
		reset.className = "study-reset";
		tools.append(status, recall, test, reset);
		document.body.append(tools);

		function setRecall(on) {
			document.body.classList.toggle("study-recall-mode", on);
			recall.setAttribute("aria-pressed", String(on));
			if (!on) targets.forEach((target) => target.classList.remove("revealed"));
			renderLabels();
		}
		recall.addEventListener("click", () =>
			setRecall(!document.body.classList.contains("study-recall-mode")),
		);
		test.addEventListener("click", () => {
			const visible = targets.filter((target) => target.offsetParent !== null);
			const pool = visible.length ? visible : targets;
			if (!pool.length) return;
			setRecall(true);
			targets.forEach((target) => target.classList.remove("revealed"));
			const target = pool[Math.floor(Math.random() * pool.length)];
			target.scrollIntoView({ behavior: "smooth", block: "center" });
			target.focus({ preventScroll: true });
			target.classList.add("recall-focus");
			setTimeout(() => target.classList.remove("recall-focus"), 1400);
		});
		reset.addEventListener("click", () => {
			for (const key of Object.keys(state)) delete state[key];
			save();
			sections.forEach((heading) => heading.classList.remove("is-learned"));
			checks.forEach((button) => button.setAttribute("aria-pressed", "false"));
			setRecall(false);
			renderStatus();
			renderLabels();
		});

		function renderStatus() {
			const completed = sections.filter((_, index) => state[index]).length;
			status.textContent = sections.length
				? `${completed}/${sections.length}`
				: `${targets.length}`;
		}

		function renderLabels() {
			progress.setAttribute(
				"aria-label",
				L("Progresso da leitura", "Reading progress"),
			);
			if (collapse) {
				const text = L("Recolher barra lateral", "Collapse sidebar");
				collapse.setAttribute("aria-label", text);
				collapse.setAttribute("title", text);
			}
			tools?.setAttribute("aria-label", L("Ferramentas de estudo", "Study tools"));
			status?.setAttribute(
				"title",
				sections.length
					? L("Seções concluídas", "Completed sections")
					: L("Conceitos para recordar", "Concepts to recall"),
			);
			if (recall) {
				const on = document.body.classList.contains("study-recall-mode");
				recall.textContent = on
					? L("Mostrar pistas", "Show clues")
					: L("Recordar", "Recall");
				recall.setAttribute(
					"title",
					L(
						"Oculte frases-chave e tente lembrar",
						"Hide key phrases and recall them",
					),
				);
			}
			if (test) {
				test.textContent = L("Teste-me", "Test me");
				test.disabled = targets.length === 0;
			}
			if (reset) reset.textContent = L("Reiniciar", "Reset");
			checks.forEach((button, index) => {
				const done = !!state[index];
				button.textContent = done ? "✓" : "○";
				button.setAttribute(
					"aria-label",
					done
						? L("Marcar seção como não concluída", "Mark section incomplete")
						: L("Marcar seção como concluída", "Mark section complete"),
				);
			});
			targets.forEach((target) =>
				target.setAttribute(
					"aria-label",
					L("Clique para revelar a frase-chave", "Click to reveal the key phrase"),
				),
			);
		}

		const observer = new MutationObserver((mutations) => {
			if (!mutations.some((mutation) => mutation.addedNodes.length)) return;
			if (enhanceTargets()) {
				renderStatus();
				renderLabels();
			}
			requestUpdate();
		});
		observer.observe(root, { childList: true, subtree: true });

		renderStatus();
		renderLabels();
		window.PiI18n?.on(renderLabels);
	}

	if (document.readyState === "loading")
		document.addEventListener("DOMContentLoaded", init);
	else init();
})();
