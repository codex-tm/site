import type { Metadata } from "next";
import { Container, Eyebrow } from "@/components/ui";
import { BlogExplorer } from "@/components/BlogExplorer";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Conteúdo profundo com raciocínio lógico. A causa do problema, não listicle banal.",
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <>
      <section className="relative overflow-hidden border-b border-hairline bg-paper">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <Container className="relative z-10 py-24 sm:py-32">
          <div className="hero-rise">
            <Eyebrow>Blog Editorial</Eyebrow>
          </div>
          <h1
            className="hero-rise mt-8 max-w-3xl font-display text-5xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl"
            style={{ animationDelay: "80ms" }}
          >
            Valor gratuito.{" "}
            <span className="italic text-action">Profundidade real.</span>
          </h1>
          <p
            className="hero-rise mt-8 max-w-2xl text-lg leading-[1.85] text-graphite sm:text-xl"
            style={{ animationDelay: "160ms" }}
          >
            Nada de &ldquo;top 5 dicas&rdquo;. Aqui a gente desmonta o problema
            pela raiz e te dá o raciocínio pra resolver de vez.
          </p>
        </Container>
      </section>

      <section className="py-16 sm:py-24">
        <Container>
          <BlogExplorer posts={posts} />
        </Container>
      </section>
    </>
  );
}
