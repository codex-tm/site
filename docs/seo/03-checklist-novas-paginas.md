# Checklist — publicar novo artigo ou página

Uso obrigatório sempre que algo novo entrar no site. Pular passo aqui é como nascem páginas órfãs, duplicatas e rich results quebrados (os bugs mais comuns deste projeto, todos já ocorridos antes).

---

## Para NOVO ARTIGO (`blog/<slug>.html`)

### Passo 1 — criar o HTML com o esqueleto completo

Todo artigo precisa ter, no `<head>`:

```html
<title>Título do Artigo — Ensinamentos da Vida</title>            <!-- ≤70 chars COM o sufixo -->
<meta name="description" content="...">                          <!-- única, 120–160 chars -->
<link rel="canonical" href="https://ensinamentosdavida.com.br/blog/<slug>.html">
<meta property="og:type" content="article">
<meta property="og:url" content="https://ensinamentosdavida.com.br/blog/<slug>.html">
<meta property="og:title" content="...">
<meta property="og:description" content="...">
<meta property="og:image" content="https://ensinamentosdavida.com.br/assets/images/og-main.png">
<meta property="article:published_time" content="AAAA-MM-DD">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="https://ensinamentosdavida.com.br/assets/images/og-main.png">
```

Mais o JSON-LD (colar do artigo mais recente e atualizar os campos):

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Título do Artigo",
  "description": "...",
  "datePublished": "AAAA-MM-DD",
  "author": { "@type": "Organization", "name": "Ensinamentos da Vida" },
  "publisher": {
    "@type": "Organization",
    "name": "Ensinamentos da Vida",
    "logo": { "@type": "ImageObject", "url": "https://ensinamentosdavida.com.br/assets/images/logo.png" }
  },
  "image": "https://ensinamentosdavida.com.br/assets/images/og-main.png",
  "mainEntityOfPage": "https://ensinamentosdavida.com.br/blog/<slug>.html"
}
</script>
```

> Se o P2-6 do plano de melhorias já tiver sido feito, usar `Person` no author com o nome do autor-persona.
> Se o artigo for atualização de conteúdo existente, adicionar `"dateModified": "AAAA-MM-DD"`.

Corpo: exatamente 1 `<h1>` (o título), seções em h2/h3, links internos descritivos e — quando a seção de relacionados existir — link para 2–3 artigos afins.

### Passo 2 — ligar o artigo nos 3 lugares (sem isso ele é órfão)

1. **`blog.html`**: adicionar card `<article class="card-article" data-category="...">` no grid (copiar estrutura de card existente; categoria tem que bater com os filtros).
2. **`sitemap.xml`**: adicionar `<url>` com `<loc>` absoluto, `<lastmod>`, `changefreq=weekly`, `priority=0.85`. Colocar junto dos outros artigos.
3. **`rss.xml`**: adicionar `<item>` no TOPO do channel (mais recente primeiro), com title/link/guid(isPermaLink)/pubDate (RFC 822: `Thu, 06 Aug 2026 10:00:00 -0300`)/description/category.

### Passo 3 — atualizar contadores

- `index.html`: "N ARTIGOS PROFUNDOS" (se a home exibe o contador).
- Qualquer texto de destaque da home que cite quantidade.

### Passo 4 — verificar ANTES do commit

```bash
python "C:/Users/ferna/AppData/Local/hermes/skills/software-development/static-site-seo-audit/scripts/seo_audit.py" D:/site
```

Tem que dar `RESULT: ALL PASS`. Checar manualmente também:

- [ ] Title ≤70 chars (contar COM o "— Ensinamentos da Vida")
- [ ] Description 120–160 chars
- [ ] Card novo aparece UMA única vez no blog.html (retry de patch já duplicou card antes)
- [ ] URL nova aparece UMA única vez no sitemap e UMA no RSS
- [ ] Categoria do card existe nos filtros do blog.html

### Passo 5 — publicar e pedir indexação

1. `git add -A && git commit -m "feat: artigo <slug>" && git push` — Cloudflare Pages publica sozinho no push.
2. Conferir a URL ao vivo (200 + HTML novo no ar).
3. No GSC (requer login do dono): Inspeção de URL → colar a URL → "Solicitar indexação".

---

## Para NOVA PÁGINA estrutural (não-artigo)

Mesmo Passo 1 (sem `article:published_time`, JSON-LD tipo `WebPage`), e:

- Entrar no `sitemap.xml` (não entra no RSS).
- Receber link de navegação visível (header, home ou footer) — página sem link interno é órfã.
- Se for página utilitária sem valor de busca (ex.: política interna), considerar `<meta name="robots" content="noindex">` em vez de esconder do sitemap.
- Nunca linkar para página que não existe (o site já teve links mortos no nav para `metodo.html`/`manifesto.html` — foram removidos em 17/08/2026; se essas páginas forem criadas um dia, aí sim os links voltam).

## Nota sobre a página 404

Existe `404.html` na raiz (criada 17/08/2026). O Cloudflare Pages a serve automaticamente para qualquer URL inexistente. Se mudar a identidade do site (header/footer), atualizar a 404 junto.

---

## Para QUALQUER mudança em página existente

- Mudou conteúdo do artigo? Atualizar `dateModified` (JSON-LD) e `lastmod` (sitemap).
- Mudou título/description? Conferir limites de chars e consistência og:*/twitter:*.
- Renomeou/moveu arquivo? Atualizar canonical, og:url, sitemap, RSS e TODOS os links internos apontando pro arquivo antigo, e fazer 301.
- Depois de lote de edições em HTML: re-rodar a contagem de cards por listagem (cards == nº de artigos; nenhum href duplicado na mesma página).

## Erros já ocorridos neste projeto (não repetir)

1. Artigo criado sem entrar no sitemap/RSS/listagem → página órfã.
2. `og:image` apontando pra arquivo inexistente → compartilhamento sem imagem.
3. Retry de patch duplicou card no blog.html (6 cards pra 5 artigos).
4. Sitemap/RSS com entradas duplicadas após edição parcial.
5. Favicon SVG emoji inline ignorado por crawlers antigos (hoje: PNG, correto).
6. `mockup.jpg` morto voltando pro repo (deletar de novo se reaparecer).
