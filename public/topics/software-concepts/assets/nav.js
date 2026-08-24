(() => {
	const lessons = [
		{
			file: "0001-sql-foundations.html",
			n: "01",
			pt: "Fundamentos de SQL",
			en: "SQL foundations",
		},
		{
			file: "0002-oauth-flow.html",
			n: "02",
			pt: "Fluxo OAuth",
			en: "OAuth flow",
		},
		{
			file: "0003-sql-sandbox.html",
			n: "03",
			pt: "Sandbox SQL",
			en: "SQL sandbox",
		},
		{
			file: "0004-relational-keys.html",
			n: "04",
			pt: "Chaves PK/FK",
			en: "PK/FK keys",
		},
		{
			file: "0005-estimation.html",
			n: "05",
			pt: "Estimativa (DAU/QPS)",
			en: "Estimation (DAU/QPS)",
		},
		{
			file: "0006-cache-hit-rate.html",
			n: "06",
			pt: "Cache e taxa de hit",
			en: "Cache hit rate",
		},
		{
			file: "0007-aws-sqs.html",
			n: "07",
			pt: "AWS SQS",
			en: "AWS SQS",
			group: "aws",
		},
		{
			file: "0008-aws-s3.html",
			n: "08",
			pt: "AWS S3",
			en: "AWS S3",
			group: "aws",
		},
		{
			file: "0009-apache-kafka.html",
			n: "09",
			pt: "Apache Kafka",
			en: "Apache Kafka",
		},
		{
			file: "0010-redis.html",
			n: "10",
			pt: "Redis",
			en: "Redis",
		},
		{
			file: "0011-postgres-vs-mysql.html",
			n: "11",
			pt: "Postgres vs MySQL",
			en: "Postgres vs MySQL",
		},
		{
			file: "0012-load-balancer.html",
			n: "12",
			pt: "Load balancer",
			en: "Load balancer",
		},
		{
			file: "0013-aws-lambda.html",
			n: "13",
			pt: "AWS Lambda",
			en: "AWS Lambda",
		},
	];
	const groups = {
		aws: { pt: "AWS", en: "AWS" },
	};
	const path = location.pathname.replace(/\\/g, "/");
	const here = path.split("/").pop();
	const inReference = path.includes("/reference/");
	const language = () => window.PiI18n?.lang || "pt";
	const text = (pt, en) => (language() === "en" ? en : pt);

	const style = document.createElement("style");
	style.textContent = `
	.sc-nav{position:fixed;inset:0 auto 0 0;width:250px;z-index:200;display:flex;flex-direction:column;overflow-y:auto;background:var(--paper-2);border-right:1px solid var(--line);transform:translateX(-100%);transition:transform .2s ease}.sc-nav.open{transform:none}.sc-head{padding:22px 18px 14px;border-bottom:1px solid var(--line)}.sc-title{display:block;font:700 1.05rem "Space Grotesk";color:var(--ink)}.sc-sub,.sc-section{display:block;margin-top:5px;font:700 .62rem "Space Grotesk";letter-spacing:.12em;text-transform:uppercase;color:var(--violet)}.sc-section{padding:16px 18px 5px;color:var(--ink-soft)}.sc-link{display:flex;gap:10px;align-items:center;min-height:46px;padding:10px 18px;border-left:3px solid transparent;color:var(--ink-soft);text-decoration:none}.sc-link:hover{color:var(--ink);background:rgba(255,255,255,.04)}.sc-link.active{border-left-color:var(--violet);background:var(--violet-50);color:var(--violet);font-weight:700}.sc-num{min-width:22px;font:700 .68rem "JetBrains Mono"}.sc-group{display:block;padding:12px 18px 2px;font:700 .58rem "Space Grotesk";letter-spacing:.16em;text-transform:uppercase;color:var(--violet)}.sc-foot{margin-top:auto;padding:14px 18px;border-top:1px solid var(--line);display:grid;gap:9px}.sc-foot a{color:var(--ink-soft);text-decoration:none}.sc-toggle,.sc-close{position:fixed;z-index:202;width:44px;height:44px;border:1px solid var(--line);border-radius:11px;background:var(--paper-2);color:var(--ink);cursor:pointer;font-size:1.15rem}.sc-toggle{top:16px;left:16px}.sc-close{position:absolute;top:10px;right:10px;border:0;background:transparent}.sc-backdrop{position:fixed;inset:0;z-index:199;background:rgba(0,0,0,.55);opacity:0;pointer-events:none;transition:opacity .2s}.sc-backdrop.show{opacity:1;pointer-events:auto}@media(min-width:1024px){body.sc-has-nav{padding-left:250px}.sc-nav{transform:none}.sc-toggle,.sc-close,.sc-backdrop{display:none}}@media(max-width:1023px){body.sc-has-nav .hero .eyebrow{padding-left:52px}}`;
	document.head.append(style);

	const nav = document.createElement("nav");
	nav.className = "sc-nav";
	nav.setAttribute("aria-label", "Software concepts");
	const head = document.createElement("div");
	head.className = "sc-head";
	const title = document.createElement("strong");
	title.className = "sc-title";
	const sub = document.createElement("span");
	sub.className = "sc-sub";
	head.append(title, sub);
	nav.append(head);
	const section = document.createElement("span");
	section.className = "sc-section";
	nav.append(section);
	const labels = [];
	const groupEls = [];
	lessons.forEach((lesson, i) => {
		if (lesson.group && lessons[i - 1]?.group !== lesson.group) {
			const group = document.createElement("span");
			group.className = "sc-group";
			nav.append(group);
			groupEls.push({ el: group, id: lesson.group });
		}
		const link = document.createElement("a");
		link.className = "sc-link";
		link.href = (inReference ? "../lessons/" : "") + lesson.file;
		if (here === lesson.file) link.classList.add("active");
		const number = document.createElement("span");
		number.className = "sc-num";
		number.textContent = lesson.n;
		const label = document.createElement("span");
		link.append(number, label);
		nav.append(link);
		labels.push({ label, lesson });
	});
	const ref = document.createElement("a");
	ref.className = "sc-link";
	ref.href = inReference
		? "software-concepts-cheatsheet.html"
		: "../reference/software-concepts-cheatsheet.html";
	if (here === "software-concepts-cheatsheet.html") ref.classList.add("active");
	const refLabel = document.createElement("span");
	ref.append(refLabel);
	nav.append(ref);
	const foot = document.createElement("div");
	foot.className = "sc-foot";
	const hub = document.createElement("a");
	hub.href = "../../../index.html";
	const sql = document.createElement("a");
	sql.href = inReference
		? "../lessons/0003-sql-sandbox.html"
		: "0003-sql-sandbox.html";
	foot.append(hub, sql);
	nav.append(foot);
	const close = document.createElement("button");
	close.className = "sc-close";
	close.type = "button";
	close.textContent = "×";
	nav.append(close);
	const toggle = document.createElement("button");
	toggle.className = "sc-toggle";
	toggle.type = "button";
	toggle.textContent = "☰";
	const backdrop = document.createElement("div");
	backdrop.className = "sc-backdrop";
	document.body.append(nav, toggle, backdrop);
	document.body.classList.add("sc-has-nav");
	const setOpen = (open) => {
		nav.classList.toggle("open", open);
		backdrop.classList.toggle("show", open);
	};
	toggle.addEventListener("click", () => setOpen(true));
	close.addEventListener("click", () => setOpen(false));
	backdrop.addEventListener("click", () => setOpen(false));
	const render = () => {
		title.textContent = text("Conceitos de Software", "Software Concepts");
		sub.textContent = text("Curso", "Course");
		section.textContent = text("Lições", "Lessons");
		labels.forEach(({ label, lesson }) => {
			label.textContent = text(lesson.pt, lesson.en);
		});
		groupEls.forEach(({ el, id }) => {
			el.textContent = text(groups[id].pt, groups[id].en);
		});
		refLabel.textContent = text("📖 Folha rápida", "📖 Cheat sheet");
		hub.textContent = text("⬡ Hub · todos os tópicos", "⬡ Hub · all topics");
		sql.textContent = text("⌨ Praticar SQL", "⌨ Practice SQL");
		toggle.setAttribute("aria-label", text("Abrir lições", "Open lessons"));
		close.setAttribute("aria-label", text("Fechar lições", "Close lessons"));
	};
	render();
	window.PiI18n?.on(render);
})();
