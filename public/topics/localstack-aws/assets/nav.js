(() => {
	const pages = [
		{
			file: "0001-localstack-up.html",
			n: "01",
			pt: "LocalStack no Docker — o primeiro comando",
			en: "LocalStack in Docker — the first command",
		},
		{
			file: "0002-s3-cli.html",
			n: "02",
			pt: "S3 pelo CLI — buckets, objetos e site",
			en: "S3 via CLI — buckets, objects and a site",
		},
		{
			file: "0003-lambda-python.html",
			n: "03",
			pt: "Lambda em Python — zip, invoke e logs",
			en: "Lambda in Python — zip, invoke and logs",
		},
		{
			file: "0004-lambda-typescript.html",
			n: "04",
			pt: "Lambda em TypeScript — o mesmo pelo Node",
			en: "Lambda in TypeScript — same, via Node",
		},
		{
			file: "0005-event-driven.html",
			n: "05",
			pt: "Eventos — SNS, SQS e gatilhos de S3",
			en: "Events — SNS, SQS and S3 triggers",
		},
		{
			file: "0006-terraform-first.html",
			n: "06",
			pt: "Terraform I — tflocal e S3 como código",
			en: "Terraform I — tflocal and S3 as code",
		},
		{
			file: "0007-terraform-stack.html",
			n: "07",
			pt: "Terraform II — Lambda, API GW e DynamoDB",
			en: "Terraform II — Lambda, API GW and DynamoDB",
		},
	];
	const path = location.pathname.replace(/\\/g, "/");
	const here = path.split("/").pop();
	const inReference = path.includes("/reference/");
	const text = (pt, en) => (window.PiI18n?.lang === "en" ? en : pt);

	const style = document.createElement("style");
	style.textContent = `
	.tool-nav{position:fixed;inset:0 auto 0 0;width:250px;z-index:200;display:flex;flex-direction:column;overflow-y:auto;background:var(--paper-2);border-right:1px solid var(--line);transform:translateX(-100%);transition:transform .2s ease}.tool-nav.open{transform:none}.tool-head{padding:22px 18px 14px;border-bottom:1px solid var(--line)}.tool-title{display:block;font:700 1.05rem "Space Grotesk";color:var(--ink)}.tool-sub,.tool-section{display:block;margin-top:5px;font:700 .62rem "Space Grotesk";letter-spacing:.12em;text-transform:uppercase;color:var(--violet)}.tool-section{padding:16px 18px 5px;color:var(--ink-soft)}.tool-link{display:flex;gap:10px;align-items:center;min-height:46px;padding:10px 18px;border-left:3px solid transparent;color:var(--ink-soft);text-decoration:none}.tool-link:hover{color:var(--ink);background:rgba(255,255,255,.04)}.tool-link.active{border-left-color:var(--violet);background:var(--violet-50);color:var(--violet);font-weight:700}.tool-num{min-width:22px;font:700 .68rem "JetBrains Mono"}.tool-foot{margin-top:auto;padding:14px 18px;border-top:1px solid var(--line)}.tool-foot a{color:var(--ink-soft);text-decoration:none}.tool-toggle,.tool-close{position:fixed;z-index:202;width:44px;height:44px;border:1px solid var(--line);border-radius:11px;background:var(--paper-2);color:var(--ink);cursor:pointer;font-size:1.15rem}.tool-toggle{top:16px;left:16px}.tool-close{position:absolute;top:10px;right:10px;border:0;background:transparent}.tool-backdrop{position:fixed;inset:0;z-index:199;background:rgba(0,0,0,.55);opacity:0;pointer-events:none;transition:opacity .2s}.tool-backdrop.show{opacity:1;pointer-events:auto}@media(min-width:1024px){body.tool-has-nav{padding-left:250px}.tool-nav{transform:none}.tool-toggle,.tool-close,.tool-backdrop{display:none}}@media(max-width:1023px){body.tool-has-nav .hero .eyebrow{padding-left:52px}}`;
	document.head.append(style);

	const nav = document.createElement("nav");
	nav.className = "tool-nav";
	nav.setAttribute("aria-label", "LocalStack");
	const head = document.createElement("div");
	head.className = "tool-head";
	const title = document.createElement("strong");
	title.className = "tool-title";
	const sub = document.createElement("span");
	sub.className = "tool-sub";
	head.append(title, sub);
	nav.append(head);
	const section = document.createElement("span");
	section.className = "tool-section";
	nav.append(section);

	const labels = [];
	pages.forEach((page) => {
		const link = document.createElement("a");
		link.className = "tool-link";
		link.href = (inReference ? "../lessons/" : "") + page.file;
		if (here === page.file) link.classList.add("active");
		const number = document.createElement("span");
		number.className = "tool-num";
		number.textContent = page.n;
		const label = document.createElement("span");
		link.append(number, label);
		nav.append(link);
		labels.push({ label, page });
	});

	const reference = document.createElement("a");
	reference.className = "tool-link";
	reference.href = inReference
		? "cli-cookbook.html"
		: "../reference/cli-cookbook.html";
	if (here === "cli-cookbook.html") reference.classList.add("active");
	const referenceLabel = document.createElement("span");
	reference.append(referenceLabel);
	nav.append(reference);

	const foot = document.createElement("div");
	foot.className = "tool-foot";
	const hub = document.createElement("a");
	hub.href = "../../../index.html";
	foot.append(hub);
	nav.append(foot);

	const close = document.createElement("button");
	close.className = "tool-close";
	close.type = "button";
	close.textContent = "×";
	nav.append(close);
	const toggle = document.createElement("button");
	toggle.className = "tool-toggle";
	toggle.type = "button";
	toggle.textContent = "☰";
	const backdrop = document.createElement("div");
	backdrop.className = "tool-backdrop";
	document.body.append(nav, toggle, backdrop);
	document.body.classList.add("tool-has-nav");

	const setOpen = (open) => {
		nav.classList.toggle("open", open);
		backdrop.classList.toggle("show", open);
	};
	toggle.addEventListener("click", () => setOpen(true));
	close.addEventListener("click", () => setOpen(false));
	backdrop.addEventListener("click", () => setOpen(false));

	const render = () => {
		title.textContent = "LocalStack";
		sub.textContent = text("Curso", "Course");
		section.textContent = text("Lições", "Lessons");
		labels.forEach(({ label, page }) => {
			label.textContent = text(page.pt, page.en);
		});
		referenceLabel.textContent = text(
			"⬡ Cookbook CLI + Terraform",
			"⬡ CLI + Terraform cookbook",
		);
		hub.textContent = text("⬡ Início · todos os tópicos", "⬡ Home · all topics");
		toggle.setAttribute("aria-label", text("Abrir lições", "Open lessons"));
		close.setAttribute("aria-label", text("Fechar lições", "Close lessons"));
	};
	render();
	window.PiI18n?.on(render);
})();
