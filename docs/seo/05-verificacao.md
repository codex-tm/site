# Verificação — como auditar o site

Dois níveis: auditoria estática local (rápida, roda sempre) e verificação ao vivo (depois de deploy).

---

## 1. Auditoria estática local (rodar SEMPRE antes de commit)

O projeto tem validação automática no CI (`.github/workflows/validate.yml` + `validate_site.py`), mas rode local antes de pushar:

```bash
# Auditoria completa do skill static-site-seo-audit:
# título ≤70, description, canonical, og:image, twitter:card, JSON-LD válido,
# cobertura sitemap+rss+links, duplicatas, imagens referenciadas existem
python "C:/Users/ferna/AppData/Local/hermes/skills/software-development/static-site-seo-audit/scripts/seo_audit.py" D:/site
```

Esperado: `RESULT: ALL PASS` (exit code 0). Qualquer FAIL = não commitar.

O CI roda uma validação equivalente no push (sitemap, SEO dos artigos, links do blog.html).

## 2. Verificação ao vivo (depois do deploy via Cloudflare Pages)

```bash
# Todas as URLs do sitemap têm que dar 200
for u in $(grep -oP '(?<=<loc>).*?(?=</loc>)' D:/site/sitemap.xml); do
  echo "$(curl -s -o /dev/null -w '%{http_code}' "$u") $u"
done

# robots.txt efetivo (atenção: Cloudflare injeta regras gerenciadas ANTES do nosso arquivo)
curl -s https://ensinamentosdavida.com.br/robots.txt

# compressão e headers
curl -sI -H 'Accept-Encoding: gzip, br' https://ensinamentosdavida.com.br/ | grep -iE 'content-encoding|cache-control|server'
```

## 3. Ferramentas externas (sem login)

- **Rich Results Test** — valida JSON-LD página por página: https://search.google.com/test/rich-results
- **PageSpeed Insights** — Core Web Vitals de laboratório + campo: https://pagespeed.web.dev
- **Teste de mobile-friendly:** dentro do PageSpeed / Search Console.

## 4. Painel GSC (requer conta do dono)

O agente não tem credenciais da conta Google. Para inspecionar: pedir ao usuário para abrir ou acompanhar. Itens do painel em `01-diretrizes-do-google.md` §7.

## 5. Checklist mínimo pós-deploy

- [ ] `seo_audit.py` → ALL PASS local
- [ ] URLs do sitemap → 200 ao vivo
- [ ] HTML novo visível no ar (não é cache velho: checar `cf-cache-status` ou esperar)
- [ ] robots.txt ao vivo ainda contém a linha `Sitemap: https://ensinamentosdavida.com.br/sitemap.xml`
- [ ] (artigo novo) Inspeção de URL no GSC → Solicitar indexação
