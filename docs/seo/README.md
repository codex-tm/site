# Documentação SEO — Ensinamentos da Vida

Documentação de referência do site https://ensinamentosdavida.com.br para tudo que envolve Google Search Console e otimização de busca. Criada em 17/08/2026 após auditoria completa do projeto.

**Para quem é:** para o agente (Hermes) e para qualquer pessoa que for mexer no site. Antes de implementar qualquer página, artigo ou mudança estrutural, leia o checklist (03) e as diretrizes (01). Depois de mudar, rode a verificação (05).

## Arquivos

| Arquivo | O que é |
|---|---|
| `01-diretrizes-do-google.md` | O que o Google espera: regras técnicas, de conteúdo e o que NÃO fazer. Baseado na documentação oficial do Google Search Central. |
| `02-diagnostico-do-site.md` | Auditoria de 17/08/2026: o que o site JÁ segue, o que NÃO segue e o que falta. Com evidências medidas. |
| `03-checklist-novas-paginas.md` | Passo a passo obrigatório ao criar novo artigo ou página, com template HTML. |
| `04-plano-de-melhorias.md` | Backlog priorizado (P0→P3) do que falta para atingir conformidade total. |
| `05-verificacao.md` | Como rodar a auditoria automatizada e verificar o site ao vivo. |

## Regras de ouro (resumo mínimo)

1. **Toda página nova precisa estar em 4 lugares:** arquivo HTML + `sitemap.xml` + `rss.xml` (se artigo) + card no `blog.html`. Artigo fora disso é página órfã invisível pro Google.
2. **Title único ≤70 caracteres** (Google corta em ~60). **Meta description única 120–160 caracteres.**
3. **Canonical absoluto** sempre apontando pra própria URL (domínio apex `https://ensinamentosdavida.com.br`).
4. **Open Graph + Twitter Card completos**, com `og:image` apontando pra imagem que EXISTE (o assassino silencioso nº 1 de SEO em site estático).
5. **JSON-LD válido** em toda página: `BlogPosting` nos artigos, `WebSite`+`Organization` na home.
6. **Nunca duplicar** entradas no sitemap/RSS/cards depois de retries de edição.
7. **Conteúdo útil e original**, escrito pra gente, não pra robô (política de Helpful Content).

## Estado atual (auditoria 17/08/2026)

- Auditoria automatizada: **ALL PASS** nos checks críticos (meta tags, schema, sitemap, RSS, cobertura, imagens).
- Verificação GSC: domínio verificado via DNS (registro TXT `google-site-verification`).
- Pendências: 12 itens mapeados em `04-plano-de-melhorias.md` (nenhum crítico de indexação).

## Acesso ao Google Search Console

O domínio é verificado via DNS (não via meta tag no HTML). Para consultar o painel do GSC (cobertura, cliques, Core Web Vitals) é preciso login na conta Google do dono — o agente não tem credenciais. Quando precisar de dados do painel, pedir ao usuário para acompanhar ou liberar acesso.
