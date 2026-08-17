# Plano de melhorias SEO — backlog priorizado

Itens que faltam para conformidade total com as diretrizes de `01-diretrizes-do-google.md`. Origem: auditoria de 17/08/2026 (`02-diagnostico-do-site.md`). Executar em ordem de prioridade; cada item tem o "como" concreto.

---

## P0 — rápido, impacto direto (fazer na próxima sessão de manutenção)

### P0-1. Corrigir `@id` da Organization na home
- **Arquivo:** `index.html`
- **Mudança:** no JSON-LD da home, trocar `"@id": "https://schema.org/#organization"` por `"@id": "https://ensinamentosdavida.com.br/#organization"`.
- **Por quê:** `@id` deve identificar a entidade NO NOSSO domínio; do jeito atual o grafo aponta pro schema.org.
- **Verificação:** Rich Results Test na home.

### P0-2. Ajustar meta descriptions fora da faixa
- **Arquivos:** `blog/a-escolha-dura-segundos.html` (177 chars → cortar pra ≤160 sem perder o gancho), `blog/a-arte-do-comportamento-proibido.html` (161 → baixar pra ~155).
- **Por quê:** snippet truncado no meio da frase reduz CTR.
- **Regra:** 120–160 chars, únicas, com proposta de valor clara.

## P1 — importante (experiência + indexação)

### P1-1. Página 404 customizada
- **Como:** criar `404.html` na raiz (Cloudflare Pages serve automaticamente como página de erro), com a identidade visual do site, mensagem, link pra home e pro blog.html. Retornar título claro ("Página não encontrada"). Manter status 404 (o Pages já faz).
- **Opcional:** `noindex` implícito — página 404 não precisa de meta robots.
- **Por quê:** visitante que cai em link quebrado volta pro site em vez de sair; Google recomenda 404 útil.

### P1-2. Seção "Artigos relacionados" em todos os artigos
- **Como:** antes do footer de cada artigo, bloco com 2–3 cards pequenos de artigos afins (mesma categoria ou tema). Padronizar o HTML em todos os 5 (+ futuros — incluir no template do checklist).
- **Por quê:** linkagem interna profunda o rastreio, distribui autoridade, aumenta páginas/sessão. Hoje 4 de 5 artigos só linkam de volta pro blog.html.

### P1-3. Remover `assets/images/mockup.jpg` (471KB, sem referência)
- **Como:** `git rm assets/images/mockup.jpg`, commit. Já foi removido em 09/08 e voltou — se reaparecer de novo, remover de novo.
- **Por quê:** peso morto no repositório e no deploy.

## P2 — médio (E-E-A-T e polimento)

### P2-1. Autor-persona nos artigos (E-E-A-T)
- **Decisão necessária (dono):** definir o autor-persona (nome, bio curta, foto opcional).
- **Como:** byline visível em cada artigo ("Por <Nome>") + JSON-LD `author` virar `Person` com `name` e `url`. Criar página `/sobre.html` com bio (entra no sitemap + link no footer).
- **Por quê:** Helpful Content/E-E-A-T valoriza autoria real e rastreável; "Organization" genérico é o sinal mais fraco.

### P2-2. `dateModified` nos artigos
- **Como:** ao atualizar conteúdo de um artigo, adicionar `"dateModified": "AAAA-MM-DD"` no JSON-LD e atualizar `lastmod` no sitemap. Não inventar dateModified retroativo.

### P2-3. Aprofundar artigos finos
- **Alvos:** `a-arte-do-comportamento-proibido` (533 palavras) e `nao-aceite-migalhas` (629).
- **Como:** expansão editorial genuína (exemplos, passos práticos, FAQ), não enchimento. Nos próximos artigos, mirar 1000+ palavras com substância.

### P2-4. Headers de segurança via Cloudflare
- **Como:** no painel Cloudflare → Rules → Transform Rules (Response Headers): `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`.
- **Por quê:** higiene de segurança; não é fator de ranking.

## P3 — decisões e rotina

### P3-1. Decidir a política de bots de IA no robots.txt
- **Situação:** Cloudflare injeta regras gerenciadas bloqueando GPTBot, ClaudeBot, Google-Extended etc. (`search=yes, ai-train=no`). Googlebot liberado — Busca Google funciona normal.
- **Decisão:** manter (protege conteúdo de treino de IA) ou liberar parcialmente (ex.: permitir Google-Extended) — revisar no painel Cloudflare em Settings → AI Bots / Managed robots.txt.
- **Registrar a decisão aqui quando tomada.**

### P3-2. Rotina GSC mensal (requer login do dono)
1. Cobertura de indexação: novas páginas indexadas? alguma excluída com motivo?
2. Desempenho: consultas, CTR, posições médias.
3. Core Web Vitals: LCP/INP/CLS de campo.
4. Ações manuais / problemas de segurança: tem que estar zero.
5. Ao publicar artigo: Inspeção de URL → Solicitar indexação.

### P3-3. Monitorar PageSpeed Insights periodicamente
- https://pagespeed.web.dev — rodar na home e num artigo a cada mudança grande de CSS/JS.

---

## Status de execução

| Item | Status | Data |
|---|---|---|
| P0-1 @id Organization | pendente | — |
| P0-2 descriptions | pendente | — |
| P1-1 404 page | pendente | — |
| P1-2 relacionados | pendente | — |
| P1-3 mockup.jpg | pendente | — |
| P2-1 autor-persona | pendente (aguarda decisão) | — |
| P2-2 dateModified | pendente | — |
| P2-3 artigos finos | pendente | — |
| P2-4 headers | pendente | — |
| P3-1 política IA | pendente (aguarda decisão) | — |

> Ao concluir um item: marcar aqui, atualizar o diagnóstico (02) e rodar a verificação (05).
