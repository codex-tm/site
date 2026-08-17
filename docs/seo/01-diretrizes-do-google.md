# Diretrizes do Google — o que o site precisa seguir

Resumo operacional da documentação oficial do Google Search Central, organizado por área. Referências oficiais no fim. Atualizado em 17/08/2026.

---

## 1. Rastreabilidade e indexação (o básico que precisa funcionar)

- **robots.txt** na raiz, permitindo o Googlebot e declarando `Sitemap:` com URL absoluta.
- **sitemap.xml** válido: URLs absolutas, sem duplicatas, `<lastmod>` em formato W3C. Sitemap não garante ranking — garante que o Google DESCUBRA as páginas.
- **Toda página precisa ser alcançável por link interno** (sitemap sozinho não resolve página órfã na prática).
- **HTTPS obrigatório** (fator de ranking desde 2014 e requisito de confiança).
- **Redirecionamentos 301 limpos:** uma única versão canônica do domínio (http→https, www→apex ou o contrário). Cadeia de redirects e conteúdo duplicado entre versões dividem autoridade.
- **Código de status correto:** 200 pra conteúdo, 404/410 pra página morta. Página inexistente que retorna 200 (soft 404) confunde o indexador.
- **Canonical (`rel="canonical"`)** em toda página, com URL absoluta, auto-referente (aponta pra si mesma), pra evitar conteúdo duplicado.

## 2. Sinais por página (on-page)

- **`<title>` único e descritivo** por página. Google mostra ~50–60 caracteres no resultado; cortar em ≤70 com o nome do site no fim. Título genérico ou duplicado = desperdício.
- **`<meta name="description">` única, 120–160 caracteres.** Não é fator de ranking direto, mas é o texto do snippet — afeta o CTR.
- **Hierarquia de headings:** exatamente UM `<h1>` por página; h2/h3 organizam seções. Headings não são fator de ranking forte, mas estruturam o conteúdo pro Google entender a página.
- **`lang` no `<html>`** (aqui: `pt-BR`) e `hreflang` só se houver mais de um idioma (não é o nosso caso).
- **Texto de âncora descritivo** nos links internos ("leia sobre disciplina" > "clique aqui").
- **Imagens com `alt` descritivo**, nomes de arquivo descritivos. Texto dentro de imagem é invisível pro Google.
- **HTML semântico** (`header`, `nav`, `main`, `article`, `footer`) e conteúdo visível sem depender de JS pra renderizar (o Google renderiza JS, mas conteúdo em HTML puro é indexado mais rápido e sem risco).
- **Mobile-first:** o Google indexa a versão mobile. Layout precisa funcionar em tela pequena, sem conteúdo escondido atrás de interação que o bot não executa.

## 3. Dados estruturados (Schema.org / JSON-LD)

Formato recomendado: **JSON-LD** no `<head>`. Tipos usados neste site:

- **Artigos → `BlogPosting`** com: `headline`, `description`, `datePublished` (ISO 8601), `author`, `publisher` (com `logo`), `image`, `mainEntityOfPage`. Recomenda-se também `dateModified` quando o artigo for atualizado.
- **Home → `WebSite` + `Organization`** (aqui via `@graph`). Organization com `url`, `logo` e `sameAs` pros perfis sociais.
- **Listagem → `WebPage` ou `CollectionPage`.**
- Regras duras: JSON precisa PARSEAR (vírgula sobrando quebra tudo), URLs absolutas, imagens referenciadas precisam existir. Validar sempre no Rich Results Test.
- Dados estruturados não melhoram ranking diretamente; habilitam rich results e ajudam o Google a entender o conteúdo.

## 4. Qualidade de conteúdo (onde o ranking realmente se decide)

- **Helpful Content System:** conteúdo feito pra ajudar gente, não pra manipular ranking. Sinais que o Google avalia:
  - Experiência real com o assunto (E-E-A-T: Experience, Expertise, Authoritativeness, Trust).
  - Conteúdo original, não reescrito de outras fontes.
  - Página responde de verdade a pergunta do leitor.
  - Site tem propósito claro e foco.
- **Autor visível importa:** artigos com autor nomeado, bio e credibilidade performam melhor em E-E-A-T que autor genérico "Equipe".
- **Profundidade:** não existe mínimo oficial de palavras, mas conteúdo raso (~500 palavras) raramente ranqueia para temas competitivos. Melhor 1 artigo profundo que 3 rasos.
- **Frescor:** atualizar artigos e refletir em `dateModified` + `lastmod` do sitemap ajuda em temas sensíveis a tempo.

## 5. Performance (Core Web Vitals)

Medidos no CrUX / PageSpeed Insights, fatores de experiência de página:

| Métrica | Bom | O que é |
|---|---|---|
| LCP | ≤ 2,5s | Tempo até o maior elemento visível renderizar |
| INP | ≤ 200ms | Responsividade a interações |
| CLS | ≤ 0,1 | Estabilidade visual (elementos não podem "pular") |

Este site é HTML/CSS/JS puro e leve (~23KB de HTML, compressão brotli ativa no Cloudflare) — estrutura favorável. Vigilar: imagens grandes sem dimensão definida (CLS), JS bloqueante, fontes sem `font-display: swap`.

## 6. O que NÃO fazer (políticas de spam — risco de penalidade manual)

Da documentação de spam do Google:

- **Keyword stuffing** (repetir palavra-chave à força).
- **Texto/link oculto** (texto branco em fundo branco, `display:none` com links).
- **Cloaking** (mostrar conteúdo diferente pro Google e pro usuário).
- **Doorway pages** (páginas feitas só pra ranquear e redirecionar).
- **Redirects enganosos.**
- **Conteúdo raspado/gerado em massa sem valor** (inclui spam gerado por IA sem revisão).
- **Link schemes** (compra/troca de links pra manipular PageRank).
- **Thin affiliation pages** (páginas só com link de afiliado sem conteúdo próprio).

## 7. Google Search Console — rotina esperada

O que fazer no painel (requer login do dono):

1. Submeter o `sitemap.xml` (já verificado via DNS, propriedade do domínio).
2. Acompanhar relatório de **Cobertura/Indexação**: páginas excluídas e o motivo (duplicada, crawled-not-indexed, 404).
3. **Inspeção de URL** ao publicar artigo novo → "Solicitar indexação".
4. Monitorar **Core Web Vitals** (dados de campo do Chrome).
5. Olhar **Links** (quem aponta pro site) e **CTR médio** nas consultas.
6. Verificar **Problemas de segurança e ações manuais** (zero = saudável).

---

## Referências oficiais

- SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/get-started
- Google Search Essentials: https://developers.google.com/search/docs/essentials
- Visão geral de rastreio/indexação: https://developers.google.com/search/docs/crawling-indexing
- robots.txt: https://developers.google.com/search/docs/crawling-indexing/robots/intro
- Sitemaps: https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
- Dados estruturados: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- BlogPosting: https://developers.google.com/search/docs/appearance/structured-data/article
- Helpful Content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Políticas de spam: https://developers.google.com/search/docs/essentials/spam-policies
- Core Web Vitals: https://web.dev/articles/vitals
- Rich Results Test: https://search.google.com/test/rich-results
- PageSpeed Insights: https://pagespeed.web.dev
