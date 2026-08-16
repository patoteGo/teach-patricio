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
				target.addEventListener("click", () =>
					target.classList.toggle("revealed"),
				);
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
			tools?.setAttribute(
				"aria-label",
				L("Ferramentas de estudo", "Study tools"),
			);
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
					L(
						"Clique para revelar a frase-chave",
						"Click to reveal the key phrase",
					),
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
