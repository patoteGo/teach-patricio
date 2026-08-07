# NOTES — Software Company track

Scratchpad of preferences and working notes. Update freely.

## Learner profile (Ellen) — recalibrado LR-0003

- **Júnior praticada**, não básica. C#/.NET + ~1y7m fintech (EF, SQL Server,
  REST, MVC/DDD, Azure DevOps, Scrum, Kendo UI).
- **Já publica**: portfolio próprio **Angular 18** (ellenribeiro.dev.br,
  responsivo) + **3 projetos React/TS/Vite/Supabase** (vaquinha com PIX em
  tempo real, plataforma de sorteio, site de casamento). Stack da empresa
  (TS/React/Node/Supabase) = família que ela já domina.
- Gaps reais (vistos no site): **SEO/metadata** (`lang=en` errado, sem
  description, sem Open Graph) e **posicionamento** (site é CV de quem busca
  emprego, não vitrina de negócio).
- **Não re-ensinar:** deploy, git básico, HTML/CSS/JS, "como a web funciona".

## Pace & energy

- **~3 hrs/dia**, com presença do Patricio (pair/mentoria). Rampa para ~5
  hrs/dia depois — **mas só quando o momentum estiver sólido**.
- Regra de ouro do Patricio: **não sobrecarregar**, preservar ritmo. Lições
  curtas + vitórias concretas > maratonas.
- Patricio **concilia com emprego** → sessões curtas, alto valor por minuto.

## Language

- **Português = primário.** Todo conteúdo com **toggle PT/EN** (engine `PiI18n`
  já copiado para `assets/`). Igual aos outros tópicos.

## Day-1 priority (recalibrado LR-0003)

- Ela **já publica**. A Lição 1 não é "primeiro deploy" — é uma **melhoria
  real num asset real** (o site dela / o site da EP) com um **takeaway
  durável**. Candidato forte: arrumar metadata/SEO (lang, title, description,
  Open Graph) → takeaway "o `<head>` é o cartão de visitas do seu site para as
  máquinas (Google, WhatsApp, redes)".

## Decisions (locked)

- **Stack = TS + Next.js + Tailwind + Supabase + Vercel** (App Router, Node API
  routes). Alinhado ao stack que o Patricio mentora (TS/React/Node/Supabase).
  Princípio: **ensinar o stack mais comum; pivotar só por necessidade ou
  requisito de cliente** (e "aprender ferramenta nova rápido p/ cliente" é uma
  skill nomeada, não desvio).
- **Mercado = Brasil** (confirmado). Plataformas: 99Freelas, Workana. Pagamento:
  Pix (Stripe ou Mercado Pago); internacional via Stripe.
- **Comunidade:** **global freelance pulada por enquanto**. Superficiar
  opções Brazil-local (meetups / comunidades dev BR) depois, se relevante.
- **IA:** ela já estuda LLMs / skills / MCP / prompting. O gap é **aplicar IA
  dentro do fluxo de dev** (Cursor/Copilot no código), não chat-only.
- **Empresa:** **EP Software**.

## Curriculum arc (3 trilhas convergindo no 1º cliente)

1. **Construir** — profundidade profissional (SEO, performance, a11y, testes,
   arquitetura) sobre o que ela já sabe; o site da **EP Software** (Next.js/TS)
   como espinha dorsal do track.
2. **Vender** — portfólio, oferta + precificação, encontrar/abordar o 1º
   cliente, a conversa de venda, receber pagamento.
3. **Trabalhar com IA** — usar IA no dev com eficácia + segurança (multiplicador
   de força para uma júnior).

## House style (não esquecer)

- Reutilizar `assets/` (style.css, dark.css, i18n.css, i18n.js, nav.js).
- Lição = HTML gráfico, self-citing (citar RESOURCES.md), uma vitória objetiva.
- Registrar o tópico em `assets/nav.js` (MANIFEST + OTHER) ao criar lições.
- Adicionar card no `index.html` só quando a lição 1 existir (evita link
  quebrado).
