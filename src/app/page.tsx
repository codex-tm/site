import Link from "next/link";
import { Container, Section, Eyebrow, Button } from "@/components/ui";
import { getPosts, formatDate } from "@/lib/posts";
import { site } from "@/lib/site";

export default function Home() {
  const posts = getPosts();

  return (
    <>
      <Hero />
      <Problema />
      <Metodo />
      <Prova posts={posts} />
      <Ecossistema />
      <CtaFinal />
    </>
  );
}

/* 1 — HERO: tese + 2 CTAs. "O que é isso?" */
function Hero() {
  return (
    <Section className="border-b border-hairline">
      <Container>
        <Eyebrow>Ensinamentos da Vida</Eyebrow>
        <h1 className="mt-6 max-w-3xl font-display text-5xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl">
          Você não precisa de motivação.{" "}
          <span className="italic text-action">Precisa de sistema.</span>
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-[1.85] text-graphite">
          Conteúdo profundo com raciocínio lógico pra quem cansou de autoajuda
          fofa. A gente não te dá dopamina. A gente te dá a causa do problema —
          e o caminho pra resolver.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href={site.telegram.url} external>
            Começar pelo bot
          </Button>
          <Button href="/metodo" variant="outline">
            Conhecer o método
          </Button>
        </div>
      </Container>
    </Section>
  );
}

/* 2 — O PROBLEMA: nomeia o inimigo. "Por que nada funcionou até agora?" */
function Problema() {
  return (
    <Section className="border-b border-hairline">
      <Container>
        <Eyebrow>O problema</Eyebrow>
        <p className="mt-6 max-w-3xl font-display text-3xl font-medium leading-[1.3] text-ink sm:text-4xl">
          Você já leu 47 livros de autoajuda. Já salvou 200 posts no Instagram.
          Já começou 12 cursos que nunca terminou. E nada mudou.
        </p>
        <p className="mt-8 max-w-2xl text-lg leading-[1.85] text-graphite">
          Sabe por quê? Porque ninguém te deu um sistema.{" "}
          <span className="font-semibold text-ink">Te deram dopamina.</span> A
          indústria da autoajuda vende alívio, não mudança. E alívio vicia —
          não transforma.
        </p>
      </Container>
    </Section>
  );
}

/* 3 — O MÉTODO: 3 pilares. "Por que vocês são diferentes?" */
const pilares = [
  {
    n: "01",
    titulo: "Sistema > Motivação",
    corpo:
      "Motivação é clima: muda todo dia. Sistema é arquitetura: sustenta. Você não falha por falta de vontade — falha por falta de estrutura. A gente constrói a estrutura.",
  },
  {
    n: "02",
    titulo: "1% todo dia",
    corpo:
      "Nada de virada de vida da noite pro dia. 1% melhor a cada dia. Composto, isso te torna irreconhecível em um ano. O segredo é o óbvio executado sem parar.",
  },
  {
    n: "03",
    titulo: "Autorresponsabilidade",
    corpo:
      "Ninguém vem te salvar. O mundo não te dá o que você quer — te dá o que você é. Assuma o controle e a tua postura muda. Quando a postura muda, o ambiente se curva.",
  },
];

function Metodo() {
  return (
    <Section className="border-b border-hairline">
      <Container>
        <Eyebrow>O método</Eyebrow>
        <h2 className="mt-6 max-w-2xl font-display text-4xl font-medium tracking-tight text-ink">
          Três pilares. Zero mágica.
        </h2>
        <div className="mt-14 grid gap-10 sm:grid-cols-3">
          {pilares.map((p) => (
            <div key={p.n}>
              <span className="font-display text-sm font-semibold text-action">
                {p.n}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                {p.titulo}
              </h3>
              <p className="mt-3 leading-[1.85] text-graphite">{p.corpo}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <Button href="/metodo" variant="outline">
            Ver o método completo
          </Button>
        </div>
      </Container>
    </Section>
  );
}

/* 4 — PROVA: posts com ação concreta. "Isso entrega de verdade?" */
function Prova({ posts }: { posts: ReturnType<typeof getPosts> }) {
  return (
    <Section className="border-b border-hairline">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <div>
            <Eyebrow>Prova</Eyebrow>
            <h2 className="mt-6 font-display text-4xl font-medium tracking-tight text-ink">
              Leia antes de acreditar.
            </h2>
          </div>
          <Link
            href="/blog"
            className="hidden shrink-0 text-sm font-semibold text-action hover:underline sm:block"
          >
            Ver todos →
          </Link>
        </div>

        {posts.length === 0 ? (
          <p className="mt-14 text-graphite">
            Os artigos de base estão sendo escritos. Volta em breve.
          </p>
        ) : (
          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            {posts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-xl border border-hairline bg-white p-8 shadow-editorial transition-colors hover:border-action/40"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-action">
                  {post.category}
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-snug text-ink group-hover:text-action">
                  {post.title}
                </h3>
                <p className="mt-4 flex-1 leading-[1.85] text-graphite">
                  {post.excerpt}
                </p>
                <span className="mt-6 text-xs text-graphite/70">
                  {formatDate(post.date)} · {post.readTime}
                </span>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}

/* 5 — ECOSSISTEMA: Blog → Bot → Curso. "Onde isso me leva?" */
const canais = [
  {
    titulo: "Blog",
    corpo: "Valor gratuito e profundo. A causa do problema, não listicle banal.",
    tag: "Captura",
  },
  {
    titulo: "Bot Telegram",
    corpo: "1 ideia por semana, direto no teu celular. Newsletter + áudio.",
    tag: "Retenção",
  },
  {
    titulo: "Curso em Áudio",
    corpo: "A Arte do Comportamento Proibido. 5 módulos pra ouvir em qualquer lugar. Em breve.",
    tag: "Aprofundamento",
  },
];

function Ecossistema() {
  return (
    <Section className="border-b border-hairline">
      <Container>
        <Eyebrow>Ecossistema</Eyebrow>
        <h2 className="mt-6 max-w-2xl font-display text-4xl font-medium tracking-tight text-ink">
          Um caminho, não um bando de conteúdo solto.
        </h2>
        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {canais.map((c, i) => (
            <div key={c.titulo} className="relative">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-graphite/60">
                {c.tag}
              </span>
              <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                {i + 1}. {c.titulo}
              </h3>
              <p className="mt-3 leading-[1.85] text-graphite">{c.corpo}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/* 6 — CTA FINAL: bot, tom de desafio. "O que eu faço agora?" */
function CtaFinal() {
  return (
    <Section>
      <Container className="text-center">
        <h2 className="mx-auto max-w-3xl font-display text-4xl font-medium leading-tight tracking-tight text-ink sm:text-5xl">
          Começa pelo bot. 1 ideia por semana.{" "}
          <span className="italic text-action">Se não mudar teu dia, sai.</span>
        </h2>
        <div className="mt-10 flex justify-center">
          <Button href={site.telegram.url} external className="px-8 py-4 text-base">
            Entrar no {site.telegram.handle}
          </Button>
        </div>
        <p className="mt-8 font-display text-sm italic text-graphite">
          {site.signature}
        </p>
      </Container>
    </Section>
  );
}
