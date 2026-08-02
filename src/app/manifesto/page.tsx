import type { Metadata } from "next";
import { Container, Eyebrow, DarkCta, Badge } from "@/components/ui";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Manifesto",
  description:
    "Por que existimos. A autoajuda te vendeu alívio. Nós entregamos sistema.",
};

export default function ManifestoPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-hairline bg-paper">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <Container className="relative z-10 max-w-4xl py-24 sm:py-32">
          <div className="hero-rise flex items-center gap-3">
            <Eyebrow>O Documento de Origem</Eyebrow>
            <Badge variant="action">Manifesto Nº 01</Badge>
          </div>

          <h1
            className="hero-rise mt-8 font-display text-5xl font-medium leading-[1.04] tracking-tight text-ink sm:text-7xl lg:text-8xl"
            style={{ animationDelay: "80ms" }}
          >
            Por que existimos.
          </h1>

          <div className="hero-rise mt-16 space-y-10 text-xl leading-[1.85] text-graphite" style={{ animationDelay: "160ms" }}>
            <p className="first-letter:font-display first-letter:text-6xl first-letter:font-semibold first-letter:text-ink first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none">
              A autoajuda te vendeu alívio. Frase bonita, print salvo, pico de
              dopamina — e amanhã você acorda exatamente igual. Isso não é
              desenvolvimento pessoal. É vício com estética de virtude.
            </p>

            <p>
              Nós existimos porque alguém precisava dizer o óbvio:{" "}
              <span className="font-semibold text-ink">
                motivação não muda ninguém.
              </span>{" "}
              O que muda é sistema, repetição diária e a decisão inegociável de assumir
              a responsabilidade total pela própria vida.
            </p>

            {/* Blockquote de destaque do Manifesto */}
            <div className="my-12 rounded-2xl border border-hairline bg-paper-dim/80 p-8 sm:p-12 shadow-editorial">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-action">
                Declaração de Princípios
              </span>
              <p className="mt-4 font-display text-2xl font-medium italic leading-[1.3] text-ink sm:text-3xl">
                &ldquo;A gente não quer te inspirar por cinco minutos. A gente quer te tornar perigoso — dono da tua postura, do teu tempo e do teu valor.&rdquo;
              </p>
            </div>

            <p>
              Aqui não tem &ldquo;top 5 dicas para ser feliz&rdquo;. Não tem milagre. Não tem o
              guru que já chegou lá te olhando de cima. Tem raciocínio, causa e
              efeito, e o trabalho silencioso de construir quem você decide ser.
            </p>

            <p>
              Se você quer se sentir bem por cinco minutos, fecha essa aba. Se
              quer mudar de verdade, fica. O caminho da verdade é solitário. Mas
              é o único que leva ao topo.
            </p>
          </div>
        </Container>
      </section>

      {/* Grade de 4 Leis do Manifesto */}
      <section className="border-b border-hairline bg-paper-dim/40 py-20 sm:py-28">
        <Container className="max-w-4xl">
          <Reveal>
            <Eyebrow>O Código</Eyebrow>
            <h2 className="mt-6 font-display text-3xl font-semibold text-ink sm:text-4xl">
              As 4 Leis Inegociáveis
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {[
              {
                n: "I",
                titulo: "Zero Ilusão",
                desc: "Encare a realidade exatamente como ela é, sem atalhos ou desculpas de conforto.",
              },
              {
                n: "II",
                titulo: "Execução Fria",
                desc: "Ação que independe do estado emocional. Faça o que precisa ser feito.",
              },
              {
                n: "III",
                titulo: "Foco Composto",
                desc: "Construção silenciosa de longo prazo em vez da busca por aplausos imediatos.",
              },
              {
                n: "IV",
                titulo: "Postura Inabalável",
                desc: "Respeito próprio acima de qualquer aprovação ou julgamento alheio.",
              },
            ].map((lei, idx) => (
              <Reveal key={lei.n} delay={idx * 70}>
                <div className="rounded-2xl border border-hairline bg-paper p-8 shadow-editorial transition-all hover:border-action/30">
                  <span className="font-display text-xl font-bold text-action">
                    {lei.n}
                  </span>
                  <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                    {lei.titulo}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-graphite">
                    {lei.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <DarkCta
        kicker="Se você chegou até aqui"
        heading={
          <>
            Você não chegou por acaso.{" "}
            <span className="text-action-bright">Começa agora.</span>
          </>
        }
        sub="1 ideia por semana. Se não mudar teu dia, você sai. Simples assim."
      />
    </>
  );
}
