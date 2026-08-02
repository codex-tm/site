import type { ComponentPropsWithoutRef } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/ui";
import { getPosts, getPost, formatDate } from "@/lib/posts";
import { site } from "@/lib/site";

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

/* Tipografia editorial pros artigos (Libre Bodoni nos títulos, citações em destaque) */
const mdx = {
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-16 font-display text-3xl font-semibold tracking-tight text-ink"
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
    <p className="mt-6 text-lg leading-[1.85] text-graphite" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="mt-10 border-l-2 border-action pl-6 font-display text-2xl font-medium italic leading-snug text-ink"
      {...props}
    />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="mt-6 list-disc space-y-2 pl-6 text-lg leading-[1.85] text-graphite" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="mt-6 list-decimal space-y-2 pl-6 text-lg leading-[1.85] text-graphite" {...props} />
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
    <article className="py-24 sm:py-32">
      <Container className="max-w-3xl">
        <Link
          href="/blog"
          className="text-sm font-semibold text-action hover:underline"
        >
          ← Blog
        </Link>

        <header className="mt-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-action">
            {post.category}
          </span>
          <h1 className="mt-4 font-display text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-6 text-lg leading-[1.85] text-graphite">
            {post.excerpt}
          </p>
          <p className="mt-6 text-sm text-graphite/70">
            {formatDate(post.date)} · {post.readTime}
          </p>
        </header>

        <div className="mt-12">
          <MDXRemote source={post.content} components={mdx} />
        </div>

        <footer className="mt-16 border-t border-hairline pt-8">
          <p className="font-display text-lg italic text-ink">{site.signature}</p>
        </footer>

        {relacionados.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-xl font-semibold text-ink">
              Continue lendo
            </h2>
            <div className="mt-6 flex flex-col gap-4">
              {relacionados.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group rounded-xl border border-hairline p-6 transition-colors hover:border-action/40"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-action">
                    {r.category}
                  </span>
                  <p className="mt-2 font-display text-lg font-semibold text-ink group-hover:text-action">
                    {r.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </article>
  );
}
