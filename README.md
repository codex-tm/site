# Ensinamentos da Vida — Site & Blog Oficial

Site e Blog desenvolvidos em **HTML5, CSS3 e JavaScript Puro** (Zero dependências, zero frameworks pesados, ultra rápido e 100% otimizado para o Google Search Console).

## 📁 Estrutura do Projeto

- `index.html` — Página Principal (Home, Manifesto, Prova de Valor, Destaques, Telegram, DarkCTA)
- `blog.html` — Explorador de Artigos com Busca em Tempo Real e Filtro de Categorias
- `metodo.html` — Os 3 Pilares do Método
- `manifesto.html` — Manifesto Oficial da Marca
- `sitemap.xml` — Sitemap XML para indexação no Google Search Console
- `robots.txt` — Regras de rastreamento para buscadores
- `rss.xml` — Feed RSS 2.0
- `blog/` — Pasta com os artigos individuais
  - `a-escolha-dura-segundos.html`
  - `falsos-conselhos-e-cortina-de-fumaca.html`
  - `mascaras-e-autenticidade.html`
  - `nao-aceite-migalhas.html`
  - `a-arte-do-comportamento-proibido.html`
- `assets/`
  - `css/` (`variables.css`, `base.css`, `layout.css`, `components.css`, `styles.css`)
  - `js/` (`theme.js`, `search.js`, `reading-progress.js`, `main.js`)

## 🚀 Como Executar Localmente

Basta dar um duplo clique em `index.html` para abrir diretamente em qualquer navegador, ou rodar um servidor HTTP simples:

```bash
npx serve .
```

## 🌐 Como Fazer Deploy

Como o projeto é em HTML/CSS estático puro:
1. **Cloudflare Pages:** Crie um novo projeto, aponte a pasta `site` e publique instantaneamente (sem comando de build).
2. **GitHub Pages / Netlify / Vercel:** Basta enviar a pasta `site` para o repositório.
