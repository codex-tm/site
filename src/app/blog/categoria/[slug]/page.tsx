import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Eyebrow, Badge } from "@/components/ui";
import { getPosts } from "@/lib/posts";
import { site } from "@/lib/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const posts = getPosts();
  const categories = [...new Set(posts.map((p) => p.category))].filter(Boolean);
  return categories.map((cat) => ({ slug: encodeURIComponent(cat) }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const category = decodeURIComponent(slug);
  const posts = getPosts().filter((p) => p.category === category);
  if (posts.length === 0) return {};

  const title = `Artigos sobre ${category}`;
  const description = `Todos os artigos da categoria ${category} no ${site.name}. Conteúdo profundo com raciocínio lógico.`;

  return {
    title,
    description,
    openGraph: {
      type: "website",
      title,
      description,
      url: `${site.url}/blog/categoria/${slug}`,
      images: [{ url: `${site.url}/og-image.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${site.url}/og-image.png`],
    },
    alternates: {
      canonical: `${site.url}/blog/categoria/${slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Params) {
  const { slug } = await params;
  const category = decodeURIComponent(slug);
  const allPosts = getPosts();
  const posts = allPosts.filter((p) => p.category === category);

  if (posts.length === 0) notFound();

  return (
    <>
      <section className="relative overflow-hidden border-b border-hairline bg-paper">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <Container className="relative z-10 py-24 sm:py-32">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-semibold text-action hover:underline"
          >
            ← Voltar ao Blog
          </Link>
          <div className="mt-8 flex items-center gap-3">
            <Eyebrow>Categoria</Eyebrow>
            <Badge variant="action">{category}</Badge>
          </div>
          <h1 className="mt-6 max-w-3xl font-display text-5xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Artigos sobre{" "}
            <span className="italic text-action">{category}</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-[1.85] text-graphite">
            {posts.length} {posts.length === 1 ? "artigo" : "artigos"} nesta categoria.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-hairline bg-paper p-8 shadow-editorial transition-all duration-300 hover:-translate-y-1 hover:border-action/30 hover:shadow-lift"
              >
                <div>
                  <Badge variant="action">{post.category}</Badge>
                  <h2 className="mt-4 font-display text-xl font-semibold leading-snug text-ink transition-colors group-hover:text-action">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-graphite line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-hairline pt-4 text-xs uppercase tracking-wider text-muted">
                  <time dateTime={post.date}>{post.date}</time>
                  <span className="font-semibold text-action group-hover:underline">
                    {post.readTime} · Ler →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
