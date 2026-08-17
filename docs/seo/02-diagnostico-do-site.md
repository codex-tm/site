# Diagnóstico do site — auditoria de 17/08/2026

Auditoria completa do projeto `D:\site` (7 páginas: home, blog.html, 5 artigos) contra as diretrizes de `01-diretrizes-do-google.md`. Métodos: análise estática de todos os HTML/sitemap/RSS + verificação do site ao vivo (HTTPS, headers, redirects, compressão, DNS).

Resumo: **auditoria automatizada ALL PASS nos itens críticos. O site segue o padrão do Google no essencial.** Faltam 12 itens de refinamento (nenhum impede indexação) — backlog em `04-plano-de-melhorias.md`.

---

## ✅ O QUE O SITE TEM E SEGUE AS REGRAS

### Meta tags e on-page (todas as 7 páginas)

| Item | Estado | Evidência |
|---|---|---|
| `<title>` único | ✅ | 59–67 caracteres, todos ≤70 |
| Meta description | ✅ | presente em todas (2 fora da faixa ideal, ver pendências) |
| Canonical absoluto auto-referente | ✅ | todas apontam pra própria URL no apex https |
| `og:title/url/description/image/type` | ✅ | completas, og:image aponta pra `og-main.png` que existe em disco E no ar (200) |
| Twitter Card `summary_large_image` | ✅ | presente em todas |
| `lang="pt-BR"` | ✅ | no `<html>` |
| Viewport + charset UTF-8 | ✅ | |
| Exatamente 1 `<h1>` por página | ✅ | medido em todas as 7 |
| HTML semântico | ✅ | header/nav/main/article/footer |

### Dados estruturados (JSON-LD)

| Página | Schema | Estado |
|---|---|---|
| Artigos (5) | `BlogPosting` com headline, description, datePublished, author, publisher+logo, image, mainEntityOfPage | ✅ JSON válido em todos |
| Home | `WebSite` + `Organization` via `@graph`, com logo e sameAs (Telegram) | ✅ (com 1 defeito no @id, ver pendências) |
| blog.html | `WebPage` | ✅ |
| `article:published_time` | presente nos 5 artigos | ✅ |

### Infraestrutura de indexação

| Item | Estado | Evidência |
|---|---|---|
| sitemap.xml | ✅ | 7 URLs, sem duplicatas, XML válido, referenciado no robots.txt |
| rss.xml | ✅ | 5 itens, sem guid duplicado, XML válido |
| Cobertura (anti-órfaos) | ✅ | os 5 artigos estão em sitemap + RSS + linkados no blog.html |
| robots.txt com `Sitemap:` | ✅ | URL absoluta correta |
| HTTPS | ✅ | http→https com 301 (medido ao vivo) |
| Domínio canônico único | ✅ | apex; `www` nem resolve DNS — sem risco de duplicação |
| Soft 404 | ✅ | URL inexistente retorna status 404 correto |
| Verificação GSC | ✅ | TXT no DNS: `google-site-verification=fCo1aehOIrVOYDJv69mjAc2qzrcG8R5P0guJ65RuMBQ` (verificação por propriedade de domínio) |

### Performance e entrega

| Item | Estado | Evidência |
|---|---|---|
| Compressão | ✅ | brotli ativo no Cloudflare (home: 23KB → 6,4KB) |
| CDN | ✅ | Cloudflare Pages, `cf-cache-status: HIT` |
| Peso de página | ✅ | HTML 14–23KB, zero framework, zero dependência |
| Imagens | ✅ | todas referenciadas existem; só PNG leve (og 47KB, logo 7,6KB) |

### Conteúdo

- 5 artigos originais em pt-BR (533–1472 palavras), categorias consistentes entre cards, RSS e filtro do blog.html.
- Contador da home ("5 ARTIGOS PROFUNDOS") bate com a realidade.

---

## ⚠️ O QUE NÃO SEGUE / FALTA (12 itens, por gravidade)

### P0 — corrigir logo (rápido, impacto direto em rich results/snippets)

1. **Organization com `@id` errado na home.** Está `"@id": "https://schema.org/#organization"` — deveria ser `"https://ensinamentosdavida.com.br/#organization"`. `@id` apontando pro schema.org quebra a ligação entidade↔site no grafo do Google.
2. **Meta description de `a-escolha-dura-segundos.html` com 177 caracteres** — Google vai truncar o snippet no meio de uma frase. (A de `a-arte-do-comportamento-proibido.html` tem 161, na borda.)

### P1 — importante (experiência + força de indexação)

3. **Sem página 404 customizada.** 404 retorna corpo vazio (padrão Cloudflare). Perde visitante e link equity; Google recomenda 404 útil com navegação.
4. **Sem seção de artigos relacionados em 4 dos 5 artigos.** Só `nao-aceite-migalhas.html` tem. Linkagem interna entre artigos aumenta profundidade de rastreio, tempo de sessão e distribui autoridade. Hoje o leitor de um artigo só tem "voltar ao blog".
5. **`mockup.jpg` (471KB) morto no repositório** — nenhuma página referencia. Já foi removido uma vez (09/08) e voltou. Peso de repo e risco de ser publicado.

### P2 — médio (E-E-A-T e polimento)

6. **Autor dos artigos é `Organization` ("Ensinamentos da Vida"), sem pessoa visível.** Pras políticas de E-E-A-T/Helpful Content, autor nomeado com bio é sinal mais forte. Definir: autor-persona fixa com byline no artigo + schema `Person`.
7. **Sem `dateModified` no JSON-LD.** Recomendado quando artigo for atualizado; sem isso o Google não tem sinal de frescor além do lastmod do sitemap.
8. **2 artigos finos** (`a-arte-do-comportamento-proibido` 533 palavras, `nao-aceite-migalhas` 629). Não viola regra, mas limita potencial de ranking; priorizar profundidade nos próximos.
9. **Headers de segurança ausentes** (HSTS, X-Content-Type-Options, Referrer-Policy). Não é fator de ranking, é higiene; configurável via Cloudflare.

### P3 — atenção/decisão (não é defeito, precisa estar documentado)

10. **robots.txt ao vivo ≠ robots.txt do repositório.** O Cloudflare injeta regras gerenciadas ANTES do nosso arquivo: `Content-Signal: search=yes, ai-train=no, use=reference` e bloqueio de bots de IA (GPTBot, ClaudeBot, Google-Extended, CCBot, Bytespider, meta-externalagent, Amazonbot, Applebot-Extended). **Googlebot NÃO é bloqueado — indexação normal.** Efeito real: o site aparece na Busca Google mas o conteúdo é negado pra TREINO de IA. Decidir se é isso que queremos (hoje a decisão é do Cloudflare, não nossa). Há ainda dois grupos `User-agent: *` no arquivo final — ambos permitem, sem risco prático.
11. **Sem `hreflang`** — correto: site monolíngue pt-BR. Só adicionar se houver versão em outro idioma.
12. **Sem meta `google-site-verification` no HTML** — correto: a verificação é via DNS (mais robusta). Não "corrigir" adicionando meta tag.

---

## Medições ao vivo (17/08/2026)

```
200 /                                      23067B  br→6388B
200 /blog.html                             18703B
200 /blog/*.html (5 artigos)               14109–20553B
200 /sitemap.xml  /rss.xml  /robots.txt
200 /assets/images/og-main.png logo.png favicon-32.png
404 /pagina-inexistente-teste-404.html     (status correto, corpo vazio)
301 http://ensinamentosdavida.com.br/ → https://...
www.ensinamentosdavida.com.br → não resolve DNS (apex-only, intencional)
server: cloudflare | cf-cache-status: HIT
```

## O que NÃO foi possível verificar (precisa de login)

- Painel GSC: cobertura real de indexação, consultas, CTR, Core Web Vitals de campo. Requer conta Google do dono — agente não tem acesso. Ver rotina em `01-diretrizes-do-google.md` §7.
- Rich Results Test / PageSpeed Insights públicos: podem ser rodados sem login quando quiser (ferramentas web abertas).

---

## Atualização — 17/08/2026 (segunda passada, execução do plano)

Correções e achados desta rodada:

1. **Correção do diagnóstico anterior:** a seção de artigos relacionados JÁ existia nos 5 artigos (com títulos variados: "Outros Artigos", "Outros Artigos do Blog", "Artigos Relacionados") — o grep da primeira auditoria não capturou todas as variantes. Os títulos foram padronizados para "Artigos Relacionados".
2. **Bug novo encontrado e corrigido:** 3 artigos tinham links no header para `metodo.html` e `manifesto.html`, páginas que NÃO EXISTEM (links quebrados = sinal ruim pro Google e péssimo pro leitor). Links removidos.
3. **Executado:** @id da Organization corrigido na home; descriptions de `a-escolha` (177→158ch) e `a-arte` (161→139ch) ajustadas; `404.html` customizada criada; `mockup.jpg` removido do git; `dateModified` adicionado aos 5 artigos; artigos finos expandidos dentro da voz do blog (`a-arte` 533→1050 palavras, `nao-aceite-migalhas` 629→1037); tempos de leitura recalculados e sincronizados entre artigos e cards do blog.html; headers de segurança via `_headers` (HSTS, nosniff, referrer-policy, permissions-policy); `lastmod` do sitemap atualizado.
4. **Pendências restantes:** P2-1 (autor-persona — decisão do dono), P3-1 (política de bots de IA — decisão), P3-2/P3-3 (rotinas que requerem login/ferramentas externas).
5. **Ressalva sobre a 404:** o arquivo `404.html` está publicado (200 em `/404.html`), mas o Cloudflare Pages DESTE projeto está retornando corpo vazio para URLs inexistentes (testado na raiz e em subdiretório, com e sem headers de browser). A documentação oficial diz que o `404.html` deveria ser servido automaticamente — investigar no painel (configuração do projeto/zona). Importante: o status 404 correto JÁ é retornado (é o que importa pro Google); a página custom é ganho de UX.
6. **Description do blog.html** também estava fora da faixa (164ch) — corrigida para 153ch na varredura final.
