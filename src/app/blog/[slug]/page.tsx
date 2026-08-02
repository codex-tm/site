import type { ComponentPropsWithoutRef } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container, DarkCta, Badge } from "@/components/ui";
import { ReadingProgress } from "@/components/ReadingProgress";
import { getPosts, getPost, formatDate } from "@/lib/posts";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", title: post.title, description: post.excerpt },
  };
}

/* Tipografia editorial: Libre Bodoni nos títulos, pull-quotes em destaque */
const mdx = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-16 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mt-12 font-display text-2xl font-semibold tracking-tight text-ink"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-6 text-lg leading-[1.9] text-graphite" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="my-12 rounded-2xl border-l-4 border-action bg-action-soft/40 p-8 font-display text-2xl font-medium italic leading-[1.4] text-ink shadow-editorial"
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="mt-6 list-disc space-y-3 pl-6 text-lg leading-[1.9] text-graphite"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="mt-6 list-decimal space-y-3 pl-6 text-lg leading-[1.9] text-graphite"
      {...props}
    />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-ink" {...props} />
  ),
  hr: () => <hr className="mt-16 border-hairline" />,
};

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const relacionados = post.related
    .map((r) => getPost(r))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <article className="py-20 sm:py-28">
        <Container className="max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-semibold text-action hover:underline"
          >
            ← Voltar ao Blog
          </Link>

          <header className="mt-8">
            <div className="flex items-center gap-3">
              <Badge variant="action">{post.category}</Badge>
              <span className="text-xs uppercase tracking-[0.18em] text-muted">
                {post.readTime} de leitura
              </span>
            </div>

            <h1 className="mt-6 font-display text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-6xl">
              {post.title}
            </h1>

            <p className="mt-6 text-xl leading-[1.7] text-graphite">
              {post.excerpt}
            </p>

            <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted">
              <span>Publicado em {formatDate(post.date)}</span>
              <span>Ensinamentos da Vida</span>
            </div>
          </header>

          <ReadingProgress />

          <div className="article-content mt-10 border-t border-hairline pt-6">
            <MDXRemote source={post.content} components={mdx} />
          </div>
        </Container>
      </article>

      {relacionados.length > 0 && (
        <section className="border-t border-hairline bg-paper-dim/60">
          <Container className="py-20 sm:py-24">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
              Artigos Relacionados
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {relacionados.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group rounded-2xl border border-hairline bg-paper p-8 shadow-editorial transition-all duration-300 hover:-translate-y-1 hover:border-action/30 hover:shadow-lift"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-action">
                    {r.category}
                  </span>
                  <p className="mt-3 font-display text-xl font-semibold leading-snug text-ink transition-colors group-hover:text-action">
                    {r.title}
                  </p>
                  <p className="mt-3 text-sm text-graphite line-clamp-2">
                    {r.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <DarkCta
        kicker="Gostou? Vai fundo"
        heading={
          <>
            Isso é só 1 ideia por semana.{" "}
            <span className="text-action-bright">Imagina em um ano.</span>
          </>
        }
        sub="Toda semana, uma ideia pra aplicar. Sem ruído. Se não mudar teu dia, você sai."
      />
    </>
  );
}
