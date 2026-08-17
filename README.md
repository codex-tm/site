# Ensinamentos da Vida — Site & Blog Oficial

Site e Blog em **HTML5, CSS3 e JavaScript Puro** (zero dependências, zero frameworks, ultra rápido e 100% otimizado para o Google Search Console).

## Documentação SEO

**Antes de mexer no site, leia [`docs/seo/`](docs/seo/README.md)** — diretrizes do Google, diagnóstico do site, checklist obrigatório para novas páginas e plano de melhorias. Qualquer página/artigo novo segue o checklist em `docs/seo/03-checklist-novas-paginas.md`.

## Estrutura do Projeto

- `index.html` — Página Principal (Home, Manifesto, Prova de Valor, Destaques, Telegram, DarkCTA)
- `blog.html` — Explorador de Artigos com Busca em Tempo Real e Filtro de Categorias
- `sitemap.xml` — Sitemap XML para indexação no Google Search Console
- `robots.txt` — Regras de rastreamento para buscadores
- `rss.xml` — Feed RSS 2.0 (5 artigos mais recentes)
- `blog/` — Pasta com os artigos individuais
  - `a-escolha-dura-segundos.html`
  - `falsos-conselhos-e-cortina-de-fumaca.html`
  - `a-arte-do-comportamento-proibido.html`
  - `mascaras-e-autenticidade.html`
  - `nao-aceite-migalhas.html`
- `assets/`
  - `css/` (`variables.css`, `base.css`, `layout.css`, `components.css`, `styles.css`)
  - `js/` (`theme.js`, `search.js`, `reading-progress.js`, `main.js`)
  - `images/` (`og-main.png`, `logo.png`, `favicon-32.png`, `favicon-16.png`)

## SEO — Estado Atual (auditoria completa)

Todas as páginas passam na auditoria técnica:

- **Meta tags completas** em todas as 7 páginas (title, description, canonical, robots)
- **Open Graph** (`og:type/url/title/description/image`) em todas as páginas
- **Twitter Card** (`summary_large_image`) em todas as páginas
- **Schema.org JSON-LD**: `WebSite` + `Organization` (home), `WebPage` (blog), `BlogPosting` com `datePublished`, `image` e `publisher.logo` (artigos)
- **`article:published_time`** em todos os artigos
- **Sitemap XML** com as 7 URLs, sem duplicatas
- **RSS 2.0** com os 5 artigos, sem duplicatas
- **Favicon PNG** 32x32 e 16x16 (substituiu o SVG emoji inline)
- **Títulos** otimizados para o corte do Google (~60-70 chars)
- **`og-main.png`** (1200x630) e **`logo.png`** (512x512) gerados e referenciados
- **HTML semântico** (header, nav, main, article, footer)

## Checklist de Publicação de Novo Artigo

1. Criar `blog/<slug>.html` com meta tags completas (title ≤70ch, description, canonical, og:*, twitter:*)
2. Adicionar JSON-LD `BlogPosting` com `datePublished`, `image` (og-main.png) e `publisher.logo`
3. Adicionar `<meta property="article:published_time" content="YYYY-MM-DD">`
4. Incluir o card do artigo em `blog.html` (grid de artigos)
5. Adicionar a URL no `sitemap.xml`
6. Adicionar o item no `rss.xml` (mais recente primeiro)
7. Atualizar o contador "N ARTIGOS PROFUNDOS" no `index.html`, se quiser destacar na home

## Como Executar Localmente

Duplo clique em `index.html`, ou:

```bash
npx serve .
```

## Como Fazer Deploy

O deploy é automático via **Cloudflare Pages** conectado ao repositório
(github.com/codex-tm/site): todo push na branch `main` publica o site em
ensinamentosdavida.com.br (sem build — HTML puro).

O workflow `.github/workflows/validate.yml` roda apenas validações estáticas
(sitemap, SEO dos artigos, links do blog.html) — ele NÃO faz o deploy.

Após o deploy, confira o `sitemap.xml` no Google Search Console.
