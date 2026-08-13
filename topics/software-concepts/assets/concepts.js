(() => {
	const L = (pt, en) => (window.PiI18n?.lang === "en" ? en : pt);

	document.querySelectorAll("[data-sql-quiz]").forEach((quiz) => {
		const select = quiz.querySelector("select");
		const result = quiz.querySelector(".result");
		quiz.querySelector("button").addEventListener("click", () => {
			const ok = select.value === quiz.dataset.answer;
			result.className = `result ${ok ? "good" : "bad"}`;
			result.textContent = ok
				? L(
						"✓ Correto — WHERE filtra linhas antes do agrupamento.",
						"✓ Correct — WHERE filters rows before grouping.",
					)
				: L(
						"Tente novamente: filtre linhas, depois agrupe, depois filtre grupos.",
						"Try again: filter rows, then group, then filter groups.",
					);
		});
	});

	const normalizeSql = (sql) =>
		sql
			.toLowerCase()
			.replace(/--.*$/gm, " ")
			.replace(/\s+/g, " ")
			.replace(/\s*([,;=()])\s*/g, "$1")
			.trim()
			.replace(/;$/, "");

	document.querySelectorAll("[data-sql-sandbox]").forEach((sandbox) => {
		let questions;
		try {
			questions = JSON.parse(
				sandbox.querySelector("[data-questions]").textContent,
			);
		} catch {
			return;
		}
		const title = sandbox.querySelector("[data-question-title]");
		const prompt = sandbox.querySelector("[data-question-prompt]");
		const schema = sandbox.querySelector("[data-schema]");
		const editor = sandbox.querySelector("textarea");
		const feedback = sandbox.querySelector("[data-feedback]");
		const count = sandbox.querySelector("[data-count]");
		let current = 0;
		let solved = new Set();
		try {
			solved = new Set(
				JSON.parse(
					localStorage.getItem("software-concepts-sql-solved") || "[]",
				),
			);
		} catch {}
		const save = () => {
			try {
				localStorage.setItem(
					"software-concepts-sql-solved",
					JSON.stringify([...solved]),
				);
			} catch {}
		};
		const render = () => {
			const q = questions[current];
			title.textContent = L(q.ptTitle, q.enTitle);
			prompt.textContent = L(q.ptPrompt, q.enPrompt);
			schema.textContent = "";
			q.schema.forEach((item) => {
				const code = document.createElement("code");
				code.textContent = item;
				schema.append(code);
			});
			count.textContent = `${current + 1}/${questions.length} · ${solved.size} ✓`;
			editor.value = "";
			feedback.className = "sandbox-feedback";
			feedback.textContent = L(
				"Escreva a consulta sem copiar. Aceitamos variações equivalentes básicas.",
				"Write the query without copying. Basic equivalent variations are accepted.",
			);
			editor.focus();
		};
		sandbox.querySelector("[data-check-sql]").addEventListener("click", () => {
			const q = questions[current];
			const answer = normalizeSql(editor.value);
			const ok = q.answers.some(
				(candidate) => normalizeSql(candidate) === answer,
			);
			feedback.className = `sandbox-feedback ${ok ? "good" : "bad"}`;
			if (ok) {
				solved.add(q.id);
				save();
				feedback.textContent = L(
					"✓ Correto. Reescreva amanhã sem olhar para criar memória muscular.",
					"✓ Correct. Rewrite it tomorrow without looking to build muscle memory.",
				);
			} else
				feedback.textContent = answer
					? L(q.ptHint, q.enHint)
					: L("Digite uma consulta primeiro.", "Type a query first.");
			count.textContent = `${current + 1}/${questions.length} · ${solved.size} ✓`;
		});
		sandbox.querySelector("[data-hint-sql]").addEventListener("click", () => {
			const q = questions[current];
			feedback.className = "sandbox-feedback";
			feedback.textContent = L(q.ptHint, q.enHint);
		});
		sandbox
			.querySelector("[data-solution-sql]")
			.addEventListener("click", () => {
				editor.value = questions[current].answers[0];
				feedback.className = "sandbox-feedback";
				feedback.textContent = L(
					"Agora apague e escreva novamente de memória.",
					"Now erase it and write it again from memory.",
				);
			});
		sandbox.querySelector("[data-next-sql]").addEventListener("click", () => {
			current = (current + 1) % questions.length;
			render();
		});
		editor.addEventListener("keydown", (event) => {
			if (event.key === "Tab") {
				event.preventDefault();
				const start = editor.selectionStart;
				editor.setRangeText("  ", start, editor.selectionEnd, "end");
			}
			if ((event.metaKey || event.ctrlKey) && event.key === "Enter")
				sandbox.querySelector("[data-check-sql]").click();
		});
		render();
	});

	document.querySelectorAll("[data-mcq]").forEach((mcq) => {
		const fb = mcq.querySelector("[data-fb]");
		mcq.querySelectorAll(".mcq-opt").forEach((opt) => {
			opt.addEventListener("click", () => {
				mcq
					.querySelectorAll(".mcq-opt")
					.forEach((o) => o.classList.remove("right", "wrong"));
				const ok = opt.dataset.correct === "true";
				opt.classList.add(ok ? "right" : "wrong");
				const text = opt.getAttribute(
					window.PiI18n?.lang === "en" ? "data-fb-en" : "data-fb-pt",
				);
				fb.className = `mcq-fb ${ok ? "good" : "bad"}`;
				fb.textContent = `${ok ? "✓ " : "✗ "}${text}`;
			});
		});
	});

	document.querySelectorAll("[data-estimator]").forEach((est) => {
		const out = est.querySelector("[data-out]");
		const num = (sel) => Number(est.querySelector(sel).value) || 0;
		const fmt = (n) =>
			n >= 1e9
				? (n / 1e9).toFixed(1) + "B"
				: n >= 1e6
					? (n / 1e6).toFixed(1) + "M"
					: n >= 1e3
						? (n / 1e3).toFixed(1) + "k"
						: String(Math.round(n));
		const run = () => {
			const dau = num("[data-dau]");
			const actions = num("[data-actions]");
			const readMult = num("[data-readmult]");
			const bytes = num("[data-bytes]");
			const writesDay = dau * actions;
			const avgWps = writesDay / 86400;
			const peakWps = avgWps * 10;
			const avgRps = avgWps * readMult;
			const storageDay = (writesDay * bytes) / 1e9;
			let verdict, cls;
			if (avgWps < 1) {
				verdict = L(
					"Um Postgres/SQLite único sobe. Sem cache, sem shard.",
					"A single Postgres/SQLite handles it. No cache, no shard.",
				);
				cls = "";
			} else if (avgWps < 100) {
				verdict = L(
					"Um nó de banco aguenta; considere cache só se as leituras pesarem.",
					"One DB node is fine; consider a cache only if reads are heavy.",
				);
				cls = "";
			} else if (avgWps < 1000) {
				verdict = L(
					"Coloque cache nas leituras; o banco ainda leva as escritas.",
					"Cache the reads; the DB still absorbs the writes.",
				);
				cls = "warn";
			} else {
				verdict = L(
					"Escritas pesadas: fila assíncrona e/ou shard. Cache obrigatória.",
					"Heavy writes: async queue and/or shard. Cache mandatory.",
				);
				cls = "hot";
			}
			out.replaceChildren();
			const row = (k, v) => {
				const d = document.createElement("div");
				const b = document.createElement("b");
				b.textContent = v;
				d.append(`${k}: `, b);
				out.append(d);
			};
			row(L("Escritas/dia", "Writes/day"), fmt(writesDay));
			row(L("Escritas/s (média)", "Writes/s (avg)"), fmt(avgWps));
			row(L("Escritas/s (pico ~10×)", "Writes/s (peak ~10×)"), fmt(peakWps));
			row(L("Leituras/s (média)", "Reads/s (avg)"), fmt(avgRps));
			row(L("Armazenamento/dia", "Storage/day"), fmt(storageDay) + " GB");
			const vd = document.createElement("div");
			vd.className = `est-verdict ${cls}`;
			vd.textContent = verdict;
			out.append(vd);
		};
		est.querySelector("[data-estimate]").addEventListener("click", run);
		run();
	});

	document.querySelectorAll("[data-flow]").forEach((board) => {
		const rows = [...board.querySelectorAll(".flow-row")];
		const status = board.querySelector("[data-flow-status]");
		let current = 0;
		const render = () => {
			rows.forEach((row, index) => {
				row.classList.toggle("active", index === current);
				row.classList.toggle("done", index < current);
			});
			status.textContent = `${current + 1}/${rows.length}`;
		};
		board.querySelector("[data-next]").addEventListener("click", () => {
			current = (current + 1) % rows.length;
			render();
		});
		board.querySelector("[data-reset]").addEventListener("click", () => {
			current = 0;
			render();
		});
		render();
	});
})();
