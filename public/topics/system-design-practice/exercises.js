/* =========================================================================
   System Design — classify-exercise engine (shared component)
   Wires every .ex.classify block: click an option, instant right/wrong
   feedback, locks the item, keeps a running score. Bilingual verdicts/score
   via PiI18n; re-renders labels on language switch WITHOUT losing progress.
   No innerHTML. (Calculators are bespoke inline scripts per lesson.)
   ========================================================================= */
(() => {
	const en = () => !!(window.PiI18n && PiI18n.lang === "en");
	const okMsg = () => (en() ? "✓ Correct" : "✓ Correto");
	const noMsg = (c) => (en() ? "✗ Answer was: " + c : "✗ Resposta: " + c);
	const scoreLbl = (r, a) =>
		en() ? `Score: ${r} / ${a}` : `Acertos: ${r} / ${a}`;

	function verdictFor(item) {
		const picked = item.dataset.picked;
		const correct = item.dataset.correct;
		const ok = picked === correct;
		return { ok, text: ok ? okMsg() : noMsg(correct) };
	}
	function renderVerdict(item) {
		const fb = item.querySelector(".ex-fb");
		if (!fb || !item.dataset.picked) return;
		const v = verdictFor(item);
		fb.textContent = v.text;
		fb.className = "ex-fb " + (v.ok ? "ok" : "no");
	}
	function renderScore(ex) {
		const s = ex.querySelector(".ex-score");
		if (!s) return;
		s.textContent = scoreLbl(
			Number(ex.dataset.right || 0),
			Number(ex.dataset.answered || 0),
		);
	}

	function wire() {
		document.querySelectorAll(".ex.classify").forEach((ex) => {
			if (ex.dataset.wired) return;
			ex.dataset.wired = "1";
			ex.dataset.right = "0";
			ex.dataset.answered = "0";
			ex.querySelectorAll(".ex-item").forEach((item) => {
				item.querySelectorAll(".ex-opt").forEach((b) => {
					b.setAttribute("aria-pressed", "false");
					b.addEventListener("click", () => {
						if (item.dataset.done) return;
						item.dataset.done = "1";
						item.dataset.picked = b.dataset.pick;
						item
							.querySelectorAll(".ex-opt")
							.forEach((o) => (o.disabled = true));
						const v = verdictFor(item);
						b.classList.add(v.ok ? "right" : "wrong");
						b.setAttribute("aria-pressed", "true");
						if (!v.ok) {
							const c = item.querySelector(
								`.ex-opt[data-pick="${item.dataset.correct}"]`,
							);
							if (c) c.classList.add("right");
						}
						renderVerdict(item);
						ex.dataset.answered = Number(ex.dataset.answered) + 1;
						if (v.ok) ex.dataset.right = Number(ex.dataset.right) + 1;
						renderScore(ex);
					});
				});
			});
			renderScore(ex);
			// re-render verdicts + score in the new language (keep progress)
			if (window.PiI18n)
				PiI18n.on(() => {
					ex.querySelectorAll(".ex-item[data-done]").forEach(renderVerdict);
					renderScore(ex);
				});
		});
	}

	function init() {
		wire();
	}
	if (document.readyState !== "loading") init();
	else document.addEventListener("DOMContentLoaded", init);
})();
