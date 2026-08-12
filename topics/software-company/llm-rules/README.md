# Regras para o Pi da Ellen (Zapt)

Arquivos que viram o **Pi** num **tutor ativo** — ela aprende construindo, não
delegando. E que mandam o próprio Pi **gerar HTMLs diagramados** quando um
conceito valer a pena.

> O Pi carrega **`AGENTS.md`** na inicialização: o global em
> `~/.pi/agent/AGENTS.md` + um na raiz de cada projeto. Tudo vira system prompt.
> (O Pi também lê `CLAUDE.md`, mas `AGENTS.md` é o padrão.)

## Os arquivos

| Arquivo | O que é | Onde colocar no Pi |
|---|---|---|
| ⭐ **`AGENTS-BACKEND.md`** | Tutor + contexto rico do **backend .NET** (comandos, Clean Arch, EF/SQLite, padrões, data model, gotchas). | Raiz do repo `GerenciadorTasks` → salve como `./AGENTS.md`. |
| ⭐ **`AGENTS-FRONTEND.md`** | Tutor + contexto rico do **frontend Astro** (SSR, cookie, guards, design tokens, tipos). | Raiz do repo `frontend-gerenciadorTasks` → salve como `./AGENTS.md`. |
| `AGENTS.md` | **Um arquivo p/ os dois** (tutor + contexto geral do Zapt, sem o detalhe por repo). | Alternativa simples — um só nos dois repos. |
| `AGENTS-GLOBAL.md` | Só as regras de tutor (+ gerar HTML), sem nada do Zapt. | `~/.pi/agent/AGENTS.md` → vale pra **todos** os projetos dela. |
| `CONTEXTO-ZAPT.md` | Só o contexto do Zapt + a trilha de domínio ativo. | Raiz do projeto → `./AGENTS.md` (com o global acima). |

> **Recomendado:** os dois variants por repo — **`AGENTS-BACKEND.md`** no
> `GerenciadorTasks` e **`AGENTS-FRONTEND.md`** no `frontend-gerenciadorTasks`
> (cada um salvo como `AGENTS.md`). Assim o Pi tem contexto **rico e específico**
> de cada lado, além das regras de tutor. (Simplicidade? O `AGENTS.md` único
> serve pros dois.)

## Como baixar

Repo no GitHub: **github.com/patoteGo/teach-patricio**, pasta
`topics/software-company/llm-rules/` (branch `main`).

**Opção 1 — pelo navegador:** abra
<https://github.com/patoteGo/teach-patricio/tree/main/topics/software-company/llm-rules>
→ clique no arquivo → botão **Raw** / **Download raw**.

**Opção 2 — pelo terminal** (cada um no repo certo, salvo como `AGENTS.md`):

```bash
# Backend (.NET):
cd GerenciadorTasks
curl -o AGENTS.md https://raw.githubusercontent.com/patoteGo/teach-patricio/main/topics/software-company/llm-rules/AGENTS-BACKEND.md

# Frontend (Astro):
cd ../frontend-gerenciadorTasks
curl -o AGENTS.md https://raw.githubusercontent.com/patoteGo/teach-patricio/main/topics/software-company/llm-rules/AGENTS-FRONTEND.md

# (Opcional) modo tutor em TODOS os projetos da Ellen:
mkdir -p ~/.pi/agent
curl -o ~/.pi/agent/AGENTS.md https://raw.githubusercontent.com/patoteGo/teach-patricio/main/topics/software-company/llm-rules/AGENTS-GLOBAL.md
```

> Se o branch padrão não for `main`, troque `main` nas URLs.

## Depois de colocar

No Pi, rode **`/reload`** (recarrega context files) ou **reinicie o Pi**. Daí é
só ela começar — ex.: *"quero entender como uma requisição chega no banco"* — e
o Pi vira tutor (predict → ela mexe → roda → observa) e, quando um conceito
valer, **gera um HTML diagramado em `referencias/`** sozinho.
