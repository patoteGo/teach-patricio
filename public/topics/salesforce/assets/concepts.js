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
					localStorage.getItem(sandbox.dataset.key || "sf-soql-solved") || "[]",
				),
			);
		} catch {}
		const save = () => {
			try {
				localStorage.setItem(
					sandbox.dataset.key || "sf-soql-solved",
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
			const ok = q.answers.some((candidate) => normalizeSql(candidate) === answer);
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
		sandbox.querySelector("[data-solution-sql]").addEventListener("click", () => {
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

	// Kafka-style append-only log simulator: producer appends, readers advance at their own pace
	document.querySelectorAll("[data-log]").forEach((sim) => {
		const stage = sim.querySelector("[data-log-stage]");
		const status = sim.querySelector("[data-log-status]");
		const readers = [
			{
				name: "Grupo A · pagamentos",
				en: "Group A · payments",
				offset: 0,
				chance: 0.9,
			},
			{
				name: "Grupo B · auditoria",
				en: "Group B · audit",
				offset: 0,
				chance: 0.45,
			},
		];
		const CAP = 8;
		let next = 0;
		let timer;
		const mk = (cls, txt) => {
			const d = document.createElement("span");
			if (cls) d.className = cls;
			d.textContent = txt ?? "";
			return d;
		};
		const render = () => {
			readers.forEach((r) => (r.offset = Math.min(r.offset, next)));
			stage.replaceChildren();
			const strip = document.createElement("div");
			strip.className = "log-track";
			for (let o = Math.max(0, next - CAP); o < next; o++) {
				const c = mk("log-cell", o);
				if (o === next - 1) c.classList.add("newest");
				strip.append(c);
			}
			for (let i = next; i < CAP; i++) strip.append(mk("log-cell ghost"));
			stage.append(strip);
			readers.forEach((r) => {
				const track = document.createElement("div");
				track.className = "log-track";
				const label = mk("log-reader-name");
				track.append(label);
				for (let o = Math.max(0, next - CAP); o < next; o++) {
					const at = r.offset === o;
					const read = r.offset > o;
					track.append(
						mk(
							`log-mark ${read ? "read" : ""} ${at ? "at" : ""}`.trim(),
							read ? "✓" : at ? "◉" : "·",
						),
					);
				}
				for (let i = next; i < CAP; i++) track.append(mk("log-mark"));
				label.textContent = `${L(r.name, r.en)} — offset ${r.offset} · lag ${next - r.offset}`;
				stage.append(track);
			});
			status.textContent = L(
				`offset máximo: ${next} — cada grupo anda no próprio ritmo`,
				`max offset: ${next} — each group advances at its own pace`,
			);
		};
		const tick = () => {
			next++;
			readers.forEach((r) => {
				if (r.offset < next && Math.random() < r.chance) r.offset++;
			});
			render();
		};
		sim.querySelector("[data-log-toggle]").addEventListener("click", (e) => {
			if (timer) {
				clearInterval(timer);
				timer = null;
				e.currentTarget.textContent = L("▶ Retomar", "▶ Resume");
			} else {
				timer = setInterval(tick, 1200);
				e.currentTarget.textContent = L("⏸ Pausar", "⏸ Pause");
			}
		});
		sim.querySelector("[data-log-reset]").addEventListener("click", () => {
			next = 0;
			readers.forEach((r) => (r.offset = 0));
			render();
		});
		timer = setInterval(tick, 1200);
		render();
	});

	// Redis memory simulator: GET/SETEX/DEL against keys with live TTLs
	document.querySelectorAll("[data-redis]").forEach((sim) => {
		const grid = sim.querySelector("[data-mem]");
		const fb = sim.querySelector("[data-redis-fb]");
		const meter = sim.querySelector("[data-redis-meter]");
		const FOCUS = "user:42";
		const keys = new Map([
			[FOCUS, 0],
			["product:7", 40],
			["cart:ana", 14],
		]);
		let hits = 0;
		let misses = 0;
		const render = () => {
			grid.replaceChildren();
			if (!keys.size) {
				const empty = document.createElement("div");
				empty.className = "mem-empty";
				empty.textContent = L(
					"memória vazia — a próxima leitura será miss (e vai buscar no banco)",
					"empty memory — the next read will miss (and hit the DB)",
				);
				grid.append(empty);
			}
			keys.forEach((ttl, name) => {
				const card = document.createElement("div");
				card.className = "mem-key";
				const b = document.createElement("b");
				b.textContent = name;
				const bar = document.createElement("div");
				bar.className = "ttl-bar";
				const fill = document.createElement("span");
				const pct = Math.max(0, Math.min(100, (ttl / 60) * 100));
				fill.style.width = `${pct}%`;
				if (pct < 25) fill.className = "low";
				bar.append(fill);
				const secs = document.createElement("span");
				secs.className = "secs";
				secs.textContent = `TTL ${ttl}s`;
				card.append(b, bar, secs);
				grid.append(card);
			});
			const total = hits + misses;
			const rate = total ? Math.round((hits / total) * 100) : 0;
			meter.textContent = L(
				`hits ${hits} · misses ${misses} · hit rate ${rate}% · latência poupada ≈ ${hits * 119} ms`,
				`hits ${hits} · misses ${misses} · hit rate ${rate}% · latency saved ≈ ${hits * 119} ms`,
			);
		};
		const setFb = (msg, ok) => {
			fb.className = `redis-fb ${ok ? "good" : "bad"}`;
			fb.textContent = msg;
		};
		const actions = {
			"[data-get]": () => {
				if ((keys.get(FOCUS) ?? 0) > 0) {
					hits++;
					setFb(
						L(
							`GET ${FOCUS} → HIT · ~1 ms · servido da RAM`,
							`GET ${FOCUS} → HIT · ~1 ms · served from RAM`,
						),
						true,
					);
				} else {
					misses++;
					keys.set(FOCUS, 60);
					setFb(
						L(
							`GET ${FOCUS} → MISS · ~120 ms no banco · cache-aside repõe com SETEX ${FOCUS} 60`,
							`GET ${FOCUS} → MISS · ~120 ms in the DB · cache-aside refills with SETEX ${FOCUS} 60`,
						),
						false,
					);
				}
			},
			"[data-setex]": () => {
				keys.set(FOCUS, 60);
				setFb(
					L(
						`SETEX ${FOCUS} 60 → gravado com TTL 60 s`,
						`SETEX ${FOCUS} 60 → stored with TTL 60 s`,
					),
					true,
				);
			},
			"[data-del]": () => {
				keys.delete(FOCUS);
				setFb(
					L(
						`DEL ${FOCUS} → chave removida da memória`,
						`DEL ${FOCUS} → key removed from memory`,
					),
					true,
				);
			},
		};
		Object.entries(actions).forEach(([sel, fn]) =>
			sim.querySelector(sel)?.addEventListener("click", () => {
				fn();
				render();
			}),
		);
		setInterval(() => {
			keys.forEach((ttl, name) => {
				if (ttl > 0) {
					if (ttl - 1 <= 0) {
						keys.delete(name);
						setFb(
							L(
								`${name} expirou — a próxima leitura será miss`,
								`${name} expired — the next read will miss`,
							),
							false,
						);
					} else keys.set(name, ttl - 1);
				}
			});
			render();
		}, 1000);
		render();
	});
})();
