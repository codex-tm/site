import Link from "next/link";
import { Container, Eyebrow, Button, DarkCta, Badge } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { TelegramPreviewWidget } from "@/components/TelegramPreviewWidget";
import { getPosts, formatDate } from "@/lib/posts";
import { site } from "@/lib/site";

export default function Home() {
  const posts = getPosts();

  return (
    <>
      <Hero />
      <ArtigosDestaque posts={posts} />
      <Problema />
      <Metodo />
      <TelegramSection />
      <Ecossistema />
      <DarkCta
        heading={
          <>
            Começa pelo bot. 1 ideia por semana.{" "}
            <span className="text-action-bright">Se não mudar teu dia, sai.</span>
          </>
        }
        sub="Sem ruído, sem dopamina barata. Só o próximo passo, toda semana, direto no teu celular."
      />
    </>
  );
}

/* 1 — HERO PRINCIPAL */
function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-paper">
      {/* Padrão sutil de grade no fundo */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none" />

      <Container className="relative z-10 pt-10 sm:pt-14">
        {/* Fólio editorial — meta superior */}
        <div className="hero-rise flex items-center justify-between border-b border-hairline pb-4 text-xs font-semibold uppercase tracking-[0.22em] text-muted">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-action animate-pulse-dot"></span>
            <span>Editorial Oficial</span>
          </div>
          <span className="hidden sm:inline">{site.domain}</span>
          <span>Nº 01</span>
        </div>

        <div className="py-20 sm:py-28">
          <div className="hero-rise" style={{ animationDelay: "60ms" }}>
            <Eyebrow>Ensinamentos da Vida</Eyebrow>
          </div>

          <h1
            className="hero-rise mt-8 max-w-4xl font-display text-5xl font-medium leading-[1.04] tracking-tight text-ink sm:text-7xl lg:text-8xl"
            style={{ animationDelay: "120ms" }}
          >
            Você não precisa de motivação.{" "}
            <span className="italic text-action">Precisa de sistema.</span>
          </h1>

          <p
            className="hero-rise mt-8 max-w-2xl text-lg leading-[1.85] text-graphite sm:text-xl"
            style={{ animationDelay: "200ms" }}
          >
            Conteúdo profundo com raciocínio lógico pra quem cansou de autoajuda
            fofa. A gente não te dá dopamina. A gente te dá a causa do problema —
            e o caminho pra resolver.
          </p>

          <div
            className="hero-rise mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            style={{ animationDelay: "280ms" }}
          >
            <Button href="/blog" className="shadow-glow">
              Explorar Artigos do Blog
            </Button>
            <Button href={site.telegram.url} external variant="outline">
              Entrar no Bot Telegram
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* 2 — ARTIGOS EM DESTAQUE NA HOME (PROMINENTES LOGO APÓS O HERO) */
function ArtigosDestaque({ posts }: { posts: ReturnType<typeof getPosts> }) {
  if (posts.length === 0) return null;

  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const otherPosts = posts.filter((p) => p.slug !== featuredPost.slug);

  return (
    <section className="border-b border-hairline bg-paper-dim/50 py-24 sm:py-32">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <Reveal>
            <Eyebrow>Blog em Destaque</Eyebrow>
            <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Leituras Fundacionais
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <Link
              href="/blog"
              className="text-sm font-semibold text-action hover:underline flex items-center gap-1.5"
            >
              <span>Ver todos os artigos</span>
              <span>→</span>
            </Link>
          </Reveal>
        </div>

        {/* Grade de Destaques */}
        <div className="mt-14 grid gap-8 lg:grid-cols-12">
          {/* Post Principal em Destaque (Ocupa 7 colunas) */}
          <Reveal className="lg:col-span-7 h-full">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group flex h-full flex-col justify-between rounded-3xl border border-hairline bg-paper p-8 sm:p-12 shadow-editorial transition-all duration-300 hover:-translate-y-1 hover:border-action/40 hover:shadow-lift"
            >
              <div>
                <div className="flex items-center gap-3">
                  <Badge variant="action">{featuredPost.category}</Badge>
                  <span className="rounded-full bg-action/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-action">
                    Artigo Principal
                  </span>
                </div>

                <h3 className="mt-6 font-display text-3xl font-semibold leading-snug text-ink transition-colors group-hover:text-action sm:text-4xl">
                  {featuredPost.title}
                </h3>

                <p className="mt-6 text-lg leading-[1.85] text-graphite">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="mt-10 flex items-center justify-between pt-6 border-t border-hairline text-xs uppercase tracking-wider text-muted">
                <span>{formatDate(featuredPost.date)}</span>
                <span className="font-semibold text-action group-hover:underline">
                  {featuredPost.readTime} de leitura · Ler Artigo Completo →
                </span>
              </div>
            </Link>
          </Reveal>

          {/* Posts Secundários (Ocupa 5 colunas) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {otherPosts.map((post, idx) => (
              <Reveal key={post.slug} delay={(idx + 1) * 90} className="h-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col justify-between rounded-3xl border border-hairline bg-paper p-8 shadow-editorial transition-all duration-300 hover:-translate-y-1 hover:border-action/40 hover:shadow-lift"
                >
                  <div>
                    <Badge variant="action">{post.category}</Badge>

                    <h4 className="mt-4 font-display text-2xl font-semibold leading-snug text-ink transition-colors group-hover:text-action">
                      {post.title}
                    </h4>

                    <p className="mt-3 text-sm leading-relaxed text-graphite line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between pt-4 border-t border-hairline text-xs uppercase tracking-wider text-muted">
                    <span>{formatDate(post.date)}</span>
                    <span className="font-semibold text-action group-hover:underline">
                      {post.readTime} · Ler →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* 3 — O PROBLEMA */
function Problema() {
  return (
    <section className="border-b border-hairline py-24 sm:py-32">
      <Container>
        <Reveal>
          <Eyebrow>O problema</Eyebrow>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-8 max-w-4xl font-display text-3xl font-medium leading-[1.18] text-ink sm:text-5xl">
            Você já leu 47 livros de autoajuda. Já salvou 200 posts. Já começou
            vários métodos e nada mudou.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_360px] lg:items-center">
          <Reveal delay={160}>
            <div className="space-y-6 text-lg leading-[1.85] text-graphite">
              <p>
                Sabe por quê? Porque ninguém te deu um sistema.{" "}
                <span className="font-semibold italic text-ink">
                  Te deram dopamina.
                </span>{" "}
                A indústria da autoajuda vende alívio temporário, não mudança estrutural. E alívio vicia — não transforma.
              </p>
              <p>
                Enquanto você buscar a &ldquo;faísca de motivação&rdquo; para começar a agir, você continuará escravo do seu humor matinal. Quem depende de motivação só constrói quando o vento favorece.
              </p>
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="rounded-2xl border border-hairline bg-paper p-8 shadow-editorial">
              <span className="text-xs font-bold uppercase tracking-widest text-action">
                A Verdade Editorial
              </span>
              <blockquote className="mt-4 font-display text-xl italic leading-snug text-ink">
                &ldquo;A motivação é a desculpa que os fracos usam para não criar disciplina.&rdquo;
              </blockquote>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted">
                — Manifesto Ensinamentos da Vida
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* 4 — O MÉTODO: 3 pilares */
const pilares = [
  {
    num: "01",
    titulo: "Sistema > Motivação",
    corpo:
      "Motivação é clima: muda todo dia. Sistema é arquitetura: sustenta. Você não falha por falta de vontade — falha por falta de estrutura. A gente constrói a estrutura.",
  },
  {
    num: "02",
    titulo: "1% todo dia",
    corpo:
      "Nada de virada de vida da noite pro dia. 1% melhor a cada dia. Composto, isso te torna irreconhecível em um ano. O segredo é o óbvio executado sem parar.",
  },
  {
    num: "03",
    titulo: "Autorresponsabilidade",
    corpo:
      "Ninguém vem te salvar. O mundo não te dá o que você quer — te dá o que você é. Assuma o controle e a tua postura muda. Quando a postura muda, o ambiente se curva.",
  },
];

function Metodo() {
  return (
    <section className="border-b border-hairline bg-paper-dim/50 py-24 sm:py-32">
      <Container>
        <Reveal>
          <Eyebrow>O método</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-8 max-w-2xl font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
            Três pilares. <span className="italic text-action">Zero mágica.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {pilares.map((p, i) => (
            <Reveal key={p.titulo} delay={i * 90} className="h-full">
              <div className="group flex h-full flex-col rounded-2xl border border-hairline bg-paper p-8 shadow-editorial transition-all duration-300 hover:-translate-y-1 hover:border-action/30 hover:shadow-lift">
                <span className="font-display text-3xl font-bold text-action/30 transition-colors group-hover:text-action">
                  {p.num}
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold leading-snug text-ink">
                  {p.titulo}
                </h3>
                <p className="mt-4 flex-1 leading-[1.85] text-graphite">
                  {p.corpo}
                </p>
                <div className="mt-6 pt-4 border-t border-hairline/60">
                  <span className="text-xs font-semibold text-action opacity-0 transition-opacity group-hover:opacity-100 flex items-center gap-1">
                    Ver pilar no método →
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-14 flex items-center justify-center">
            <Button href="/metodo" variant="outline">
              Ver o método completo detalhado
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* 5 — SEÇÃO TELEGRAM INTERATIVA */
function TelegramSection() {
  return (
    <section className="border-b border-hairline py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div>
              <Eyebrow>Nossa Newsletter Gratuita</Eyebrow>
              <h2 className="mt-6 font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
                O que você recebe no bot todo domingo.
              </h2>
              <p className="mt-6 text-lg leading-[1.85] text-graphite">
                Uma vez por semana, entregamos um raciocínio denso e acionável direto no seu aplicativo. Sem spam, sem enrolação e sem tentativa de venda.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "1 ideia acionável para implementar na sua semana",
                  "Áudio narrado em alta definição para ouvir em movimento",
                  "Conteúdo 100% gratuito e sem ruído",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm font-medium text-ink">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-action text-[10px] text-white">
                      ✓
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Button href={site.telegram.url} external className="shadow-glow">
                  Entrar no {site.telegram.handle}
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <TelegramPreviewWidget />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* 6 — ECOSSISTEMA */
const canais = [
  {
    tag: "Fundação",
    titulo: "Blog Editorial",
    corpo: "Valor gratuito e profundo. A causa real do problema, sem listicles banais.",
    link: "/blog",
  },
  {
    tag: "Frequência",
    titulo: "Bot Telegram (Newsletter)",
    corpo: "1 ideia por semana, direto no teu celular. Notificações + áudio exclusivo.",
    link: site.telegram.url,
    external: true,
  },
  {
    tag: "Filosofia",
    titulo: "O Manifesto",
    corpo: "Por que existimos e por que a autoajuda tradicional te vende alívio em vez de mudança.",
    link: "/manifesto",
  },
];

function Ecossistema() {
  return (
    <section className="border-b border-hairline bg-paper-dim/50 py-24 sm:py-32">
      <Container>
        <Reveal>
          <Eyebrow>Ecossistema</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="mt-8 max-w-2xl font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
            Um caminho, não conteúdo solto.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {canais.map((c, i) => (
            <Reveal key={c.titulo} delay={i * 90} className="h-full">
              <div className="group flex h-full flex-col justify-between rounded-2xl border border-hairline bg-paper p-8 shadow-editorial transition-all duration-300 hover:-translate-y-1 hover:border-action/30 hover:shadow-lift">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                    {c.tag}
                  </span>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-ink">
                    {c.titulo}
                  </h3>
                  <p className="mt-4 leading-[1.85] text-graphite">{c.corpo}</p>
                </div>
                <div className="mt-8 pt-4 border-t border-hairline/60">
                  {c.external ? (
                    <a
                      href={c.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-action hover:underline flex items-center gap-1"
                    >
                      Acessar canal →
                    </a>
                  ) : (
                    <Link
                      href={c.link}
                      className="text-xs font-semibold text-action hover:underline flex items-center gap-1"
                    >
                      Saber mais →
                    </Link>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
