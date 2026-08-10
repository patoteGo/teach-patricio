# Regras para o Pi da Ellen (Zapt)

Arquivos que viram o **Pi** num **tutor ativo** — ela aprende construindo, não
delegando. E que mandam o próprio Pi **gerar HTMLs diagramados** quando um
conceito valer a pena.

> O Pi carrega **`AGENTS.md`** na inicialização: o global em `~/.pi/agent/AGENTS.md`
>
> + um na raiz de cada projeto. Tudo vira system prompt. (O Pi também lê
> `CLAUDE.md`, mas `AGENTS.md` é o padrão.)

## Os arquivos

| Arquivo | O que é | Onde colocar no Pi |
|---|---|---|
| **`AGENTS.md`** | **Tudo num arquivo** (regras de tutor + regra de gerar HTML + contexto do Zapt). | **Raiz de cada repo do Zapt** → `./AGENTS.md`. O Pi carrega sozinho. |
| `AGENTS-GLOBAL.md` | Só as regras de tutor (+ regra de gerar HTML), sem nada do Zapt. | **`~/.pi/agent/AGENTS.md`** → vale pra **todos** os projetos dela. |
| `CONTEXTO-ZAPT.md` | Só o contexto do Zapt + a trilha de domínio ativo. | Raiz do projeto Zapt → `./AGENTS.md` (se usar o global acima). |

> **Recomendado pra Ellen (mais simples):** baixe só o **`AGENTS.md`** e coloque
> na raiz dos repos `GerenciadorTasks` e `frontend-gerenciadorTasks`. Pronto.
> Se quiser modo tutor em **todos** os projetos dela (não só Zapt), use também o
> `AGENTS-GLOBAL.md` no global.

## Como baixar

Repo no GitHub: **github.com/patoteGo/teach-patricio**, pasta
`topics/software-company/llm-rules/` (branch `main`).

**Opção 1 — pelo navegador:** abra
<https://github.com/patoteGo/teach-patricio/tree/main/topics/software-company/llm-rules>
→ clique num arquivo → botão **Raw** / **Download raw**.

**Opção 2 — pelo terminal** (já no lugar certo, com o nome certo):

```bash
# 1) No projeto Zapt (repita nos dois repos) — o arquivo único:
cd GerenciadorTasks
curl -o AGENTS.md \
  https://raw.githubusercontent.com/patoteGo/teach-patricio/main/topics/software-company/llm-rules/AGENTS.md

# 2) (Opcional) modo tutor em TODOS os projetos da Ellen:
mkdir -p ~/.pi/agent
curl -o ~/.pi/agent/AGENTS.md \
  https://raw.githubusercontent.com/patoteGo/teach-patricio/main/topics/software-company/llm-rules/AGENTS-GLOBAL.md
```

> Se o branch padrão não for `main`, troque `main` nas URLs.

## Depois de colocar

No Pi, rode **`/reload`** (recarrega context files) ou **reinicie o Pi**. Daí é só
ela começar — ex.: *"quero entender como uma requisição chega no banco"* — e o Pi
vira tutor (predict → ela mexe → roda → observa) e, quando um conceito valer,
**gera um HTML diagramado em `referencias/`** sozinho.
