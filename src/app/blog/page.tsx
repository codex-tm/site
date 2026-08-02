import type { Metadata } from "next";
import Link from "next/link";
import { Container, Section, Eyebrow } from "@/components/ui";
import { getPosts, formatDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Conteúdo profundo com raciocínio lógico. A causa do problema, não listicle banal.",
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <Section>
      <Container>
        <Eyebrow>Blog</Eyebrow>
        <h1 className="mt-6 font-display text-5xl font-medium tracking-tight text-ink">
          Valor gratuito. Profundidade real.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-[1.85] text-graphite">
          Nada de &ldquo;top 5 dicas&rdquo;. Aqui a gente desmonta o problema
          pela raiz e te dá o raciocínio pra resolver de vez.
        </p>

        {posts.length === 0 ? (
          <p className="mt-16 border-t border-hairline pt-8 text-graphite">
            Os artigos de base estão sendo escritos. Volta em breve.
          </p>
        ) : (
          <div className="mt-16 flex flex-col">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group grid gap-2 border-t border-hairline py-8 transition-colors hover:bg-ink/[0.015] sm:grid-cols-[1fr_auto] sm:gap-8"
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-action">
                    {post.category}
                  </span>
                  <h2 className="mt-3 font-display text-2xl font-semibold leading-snug text-ink group-hover:text-action sm:text-3xl">
                    {post.title}
                  </h2>
                  <p className="mt-3 max-w-2xl leading-[1.85] text-graphite">
                    {post.excerpt}
                  </p>
                </div>
                <span className="shrink-0 text-sm text-graphite/70 sm:text-right">
                  {formatDate(post.date)}
                  <br />
                  {post.readTime}
                </span>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
