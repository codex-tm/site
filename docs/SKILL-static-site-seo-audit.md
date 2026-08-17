---
name: static-site-seo-audit
description: "Use when auditing or fixing SEO on a static HTML site."
version: 1.0.0
author: Hermes Agent
license: MIT
metadata:
  hermes:
    tags: [seo, html, static-site, sitemap, rss, structured-data, audit]
    related_skills: [dogfood, web-layout-qa]
---

# Static Site SEO Audit

## When to Use

Use when: user asks to audit, analyze, or improve SEO on a static HTML site (no CMS, no build step). Also load when adding new pages/articles to an existing static site and you need to keep sitemap, RSS, and internal links consistent.

## Audit Checklist (run in this order)

### 1. Inventory
- List every `.html` file recursively.
- List every file in `assets/images/`.
- Note file sizes (flag anything >100KB).

### 2. Per-page HTML checks (every .html file)
For each page, verify:
- **title**: present, ≤70 chars (Google truncates beyond ~60)
- **meta description**: present, 120–160 chars
- **canonical**: `<link rel="canonical">` present, absolute URL, matches the page
- **og:image**: present AND the referenced file **actually exists on disk**
- **og:title, og:description, og:url, og:type**: present
- **twitter:card**: `summary_large_image` present (many sites miss this)
- **twitter:title, twitter:description, twitter:image**: present
- **favicon**: `<link rel="icon">` present; prefer PNG over SVG data-URI for compatibility
- **H1**: exactly one per page
- **JSON-LD structured data**: present and valid
  - Articles: `BlogPosting` with `headline`, `datePublished`, `author`, `publisher` (with `logo`), `image`, `mainEntityOfPage`
  - Home: `WebSite` + `Organization`
  - Listing pages: `WebPage` or `CollectionPage`
- **article:published_time** meta property on article pages

### 3. Cross-reference validation
Every article/page must be reachable from ALL of:
- `sitemap.xml` (exactly once, no duplicates)
- `rss.xml` (exactly once, no duplicate `<guid>`)
- At least one internal link (blog listing page, index, or related-articles section)

Check the reverse too: every URL in sitemap.xml and rss.xml must correspond to a file that exists.

### 4. Orphan detection
Any `.html` file in the content directory (e.g. `blog/`) that is NOT in the sitemap AND NOT linked from any listing page is an **orphan** — invisible to search engines. Flag it.

### 5. Image audit
- Every `og:image`, `twitter:image`, `logo` reference → file must exist on disk
- Find images on disk with ZERO references from any HTML/CSS/JS → candidates for removal (especially large ones)
- Flag images >100KB that are actually used → suggest optimization

### 6. Sitemap & RSS integrity
- `sitemap.xml`: well-formed XML, no duplicate `<loc>`, every `<loc>` is an absolute URL
- `rss.xml`: well-formed, no duplicate `<guid>`, `<description>` not truncated/corrupted, `<pubDate>` in RFC 822 format
- `robots.txt`: has `Sitemap:` directive pointing to the sitemap URL

### 7. Content consistency
- Page counters (e.g. "4 ARTIGOS") match actual article count
- Category filters match actual `data-category` values used in cards
- Each article is linked **exactly once** per listing page (blog.html / index.html) — duplicate cards sneak in after `patch` retries and silently inflate card counts

## Fix Order (priority)

1. **Critical**: broken/missing og:image (404), orphaned pages, missing canonical
2. **High**: title >70 chars, missing twitter:card, incomplete JSON-LD
3. **Medium**: duplicate sitemap/RSS entries, missing favicon, inconsistent counters
4. **Low**: unused large images, minor description tweaks

## Verification

After all fixes, run an ad-hoc verification script (temp file, `hermes-verify-` prefix, cleaned up after) that:
1. Parses every HTML file and asserts all checklist items
2. Validates sitemap.xml and rss.xml are well-formed (xml.etree)
3. Cross-checks coverage: every article in sitemap AND rss AND linked internally
4. Confirms no duplicate URLs/guids
5. Confirms all referenced images exist
6. Prints PASS/FAIL per check with a final RESULT line

Run with the system python (no venv needed for stdlib-only checks).

## Pitfalls

- **og:image pointing to a file that doesn't exist** is the #1 silent SEO killer on static sites — shares show no image, Google gets nothing. Always verify file existence, not just the meta tag.
- **Orphaned articles**: file exists in `blog/` but was never added to sitemap/rss/listing. Happens when articles are created but the "wiring" step is skipped.
- **Duplicate entries**: when adding a new article to sitemap/rss, check you're not duplicating an existing entry (especially after partial edits or retries).
- **Duplicate HTML cards from patch retries**: a retried `patch` call whose fuzzy match lands twice can insert the same article card into a listing page twice (happened on D:/site — blog.html ended with 6 cards for 5 articles). After any batch of HTML edits, re-run the count-based checks (cards per listing page == article count, no href appearing twice on one page) before declaring done.
- **Title length**: count characters including the site name suffix. "Article Title — Site Name" can easily exceed 70.
- **SVG data-URI favicons**: work in modern browsers but some crawlers/older browsers ignore them. Provide PNG fallback.
- **`<meta name="title">`**: not standard HTML but harmless; the real title is `<title>`. Don't rely on it.
- **RSS description typos**: watch for truncated UTF-8 or copy-paste artifacts in `<description>`.
- **Cloudflare Pages injects managed robots.txt**: the LIVE robots.txt is not the repo's file — Cloudflare prepends managed rules (Content-Signal + Disallow for AI bots: GPTBot, ClaudeBot, Google-Extended, CCBot, etc.) before your content. Always `curl` the live robots.txt during audits. Googlebot stays allowed, but the final file ends with two `User-agent: *` groups; verify the `Sitemap:` line survives. (ensinamentosdavida.com.br, 17/08/2026.)
- **Organization JSON-LD `@id` must point to your own domain** (e.g. `https://example.com/#organization`), never `https://schema.org/#organization` — check `@graph` blocks, not just top-level types.
- **Meta description length**: audit the actual char count; 120–160 is the range, >160 gets truncated mid-sentence in the SERP snippet.

## References

- See `scripts/seo_audit.py` for a reusable audit script covering steps 2-6.
