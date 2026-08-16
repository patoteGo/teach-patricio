# Contexto do projeto — Zapt (Missão Recompensa)

> **No Pi:** se usar as regras de tutor globais (`~/.pi/agent/AGENTS.md`), ponha
> este conteúdo num **`AGENTS.md` na raiz do projeto Zapt** — assim o Pi junta
> as regras globais + o contexto do projeto. (Ou use o `AGENTS.md` combinado, que
> já tem os dois.) Assim o tutor guia no meu **projeto real**, não em exemplos
> genéricos.

## O que é

**Zapt**: app de **tarefas infantis com gamificação** — crianças cumprem
missões, ganham pontos e resgatam recompensas; o responsável gerencia crianças,
missões, recompensas e notificações.

## Stack (meus repositórios)

- **Backend** — `github.com/ellenri/GerenciadorTasks`:
  .NET 10, ASP.NET Core, **Clean Architecture / DDD**
  (`Core → Application → Infrastructure → GerenciadorTasksApi`).
  EF Core + **SQLite** (`Data Source=gerenciador.db`). Cookie auth HttpOnly +
  `SameSite=Lax` + BCrypt. ProblemDetails (RFC 7807) via `IExceptionHandler`.
  Unit of Work. 46 testes xUnit.
- **Frontend** — `github.com/ellenri/frontend-gerenciadorTasks`:
  Astro 5 **SSR** (`@astrojs/node` standalone) + React 19 + Tailwind.
  Cliente de API SSR-aware que **repassa o cookie** manualmente. Vitest +
  Playwright.
- **Estado:** roda local (proxy Vite `/api` → backend); **ainda não deployado**.

## Minha trilha de domínio ativo

Cada item é um **exercício ativo**: ler meu código real → prever → mudar uma
linha → rodar → observar. (Nunca me dê a resposta; me guie.)

1. **Direção de dependência / Clean Arch** — trocar `EfTaskRepository` pelo
   `InMemoryTaskRepository` (já existe no repo); o app continua rodando. *Sentir*
   a abstração.
2. **Injeção de dependência** — comentar um
   `AddScoped<ITaskRepository, EfTaskRepository>()` no `Program.cs`; ver o erro
   de DI no startup; entender a injeção.
3. **Ordem do pipeline de middleware importa** — reordenar
   `UseAuthentication` / `UseCors` / `MapControllers`; prever o que quebra;
   observar.
4. **Migrations do EF = versionamento do schema** — ler as 6 migrations em
   ordem (a história do schema); depois **eu** escrevo uma nova (adicionar uma
   coluna `DueDate` em tasks).
5. **Cookie auth: a API devolve 401, não redirect** — por quê
   (`OnRedirectToLogin` retorna 401)? O que o frontend faz no 401
   (`api.ts` redireciona no cliente)? Duas camadas, um conceito.
6. **SSR repassando cookie** — remover o header `Cookie:` manual no `api.ts`;
   auth quebra no SSR mas funciona no cliente. *Por quê?* (fetch do servidor ≠
   browser).
7. **Unit of Work = atomicidade** — recriar um bug de escrita parcial (crédito
   de pontos sem concluir a missão); entender transações.
8. **Domain exception → ProblemDetails** — lançar uma `DomainException`; ver o
   400 limpo com `detail`; contar os controllers (N try/catch evitados).

## Próxima meta prática

**Containerizar o Zapt no Docker local.** Eu escrevo e entendo: um `Dockerfile`
para o backend (.NET), um para o frontend (Astro SSR/Node), e um
`docker-compose.yml` com os dois serviços **same-origin** (pra o cookie
`SameSite=Lax` continuar funcionando). Momento visceral: `docker compose down &&
up` → o **SQLite some** (filesystem efêmero) → eu adiciono um **volume** pra
persistir. Aí o DB-tradeoff fica sentido, não só explicado.
