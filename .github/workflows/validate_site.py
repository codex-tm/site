"""Validação do site estático — roda no CI, sem dependências.

Checa:
1. Toda URL do sitemap existe como arquivo no repo
2. Todo artigo tem o mínimo de SEO (canonical, OG, JSON-LD, published_time)
3. Cards do blog.html apontam para artigos existentes
4. Todo artigo no disco tem card no blog.html
5. Links de relacionados dentro dos artigos existem
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
DOMINIO = "https://ensinamentosdavida.com.br/"
errors = []

# 1. sitemap -> arquivos
sitemap = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
urls = re.findall(r"<loc>(" + re.escape(DOMINIO) + r"[^<]+)</loc>", sitemap)
if not urls:
    errors.append("sitemap.xml sem URLs")
for u in urls:
    rel = u.split(DOMINIO, 1)[1]
    # Clean URLs: o sitemap pode ter /blog/memento-mori (sem .html)
    if not (ROOT / rel).exists() and not (ROOT / (rel + '.html')).exists():
        errors.append("sitemap aponta para arquivo inexistente: " + rel)

blog_dir = ROOT / "blog"
artigos = sorted(blog_dir.glob("*.html"))
blog_index = (ROOT / "blog.html").read_text(encoding="utf-8")

for f in artigos:
    t = f.read_text(encoding="utf-8", errors="replace")
    # 2. SEO mínimo por artigo
    for needle, label in [
        ('<link rel="canonical"', "canonical"),
        ('property="og:title"', "og:title"),
        ("application/ld+json", "JSON-LD"),
        ("article:published_time", "article:published_time"),
    ]:
        if needle not in t:
            errors.append("blog/" + f.name + ": falta " + label)
    # 5. relacionados existentes (aceita com e sem .html — clean URLs)
    for href in set(re.findall(r'href="([a-z0-9-]+\.html)"', t)) | set(re.findall(r'href="([a-z0-9-]+)"', t)):
        if href.endswith('.html'):
            if not (blog_dir / href).exists():
                errors.append("blog/" + f.name + ": relacionado inexistente: " + href)
        else:
            if not (blog_dir / (href + '.html')).exists():
                errors.append("blog/" + f.name + ": relacionado inexistente: " + href)
    # 4. artigo tem card no blog.html? (aceita clean URL ou com .html)
    card_ok = ("blog/" + f.name in blog_index) or ("blog/" + f.name.replace('.html', '') in blog_index)
    if not card_ok:
        errors.append("artigo sem card no blog.html: blog/" + f.name)

# 3. cards do blog.html -> artigos existentes (aceita com e sem .html)
for href in set(re.findall(r'href="(blog/[a-z0-9-]+\.html)"', blog_index)) | set(re.findall(r'href="(blog/[a-z0-9-]+)"', blog_index)):
    target = ROOT / href if href.endswith('.html') else ROOT / (href + '.html')
    if not target.exists():
        errors.append("blog.html aponta para artigo inexistente: " + href)

if errors:
    print("ERROS DE VALIDACAO:")
    for e in errors:
        print(" -", e)
    sys.exit(1)

print("Site validado: " + str(len(urls)) + " URLs no sitemap, "
      + str(len(artigos)) + " artigos OK, blog.html consistente.")
