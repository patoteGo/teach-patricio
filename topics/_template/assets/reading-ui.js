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
