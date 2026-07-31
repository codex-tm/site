# Ensinamentos da Vida

Site editorial estático feito com Astro, Tailwind CSS v4 e Markdown.

## Comandos

```bash
npm run dev       # ambiente de desenvolvimento
npm run build     # build estático para produção
npm run preview   # preview do build
```

## Estrutura principal

```text
src/
  components/     # Header, Footer, PostCard
  content/posts/  # artigos em Markdown
  data/           # site, categorias, curso, FAQ, trilhas
  layouts/        # Base.astro
  pages/          # rotas do site
  styles/         # tema global
public/           # robots.txt e favicon
```

## Rotas geradas

- `/`
- `/blog`
- `/blog/[categoria]`
- `/blog/[slug]`
- `/metodo`
- `/curso`
- `/bot`
- `/comece-aqui`
- `/sobre`
- `/contato`
- `/rss.xml`
- `/sitemap-index.xml`

## Conteúdo

Os artigos ficam em `src/content/posts/*.md` com frontmatter:

```md
---
title: 'Título do artigo'
slug: 'slug-do-artigo'
category: 'autenticidade'
excerpt: 'Resumo do artigo.'
date: 2026-07-31
readTime: '6 min'
featured: true
status: publicado
tags: ['autenticidade']
related: ['outro-artigo']
---
```

## Backup do site antigo

O projeto React/Vite anterior foi preservado em `_legacy/`.
Os `node_modules` antigos foram renomeados para `_legacy_node_modules/` e podem ser deletados depois para liberar espaço.
