import type { Metadata } from "next";
import { Container, Section, Eyebrow, Button } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Manifesto",
  description: "Por que existimos. A autoajuda te vendeu alívio. Nós entregamos sistema.",
};

export default function ManifestoPage() {
  return (
    <Section>
      <Container className="max-w-3xl">
        <Eyebrow>Manifesto</Eyebrow>
        <h1 className="mt-6 font-display text-5xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl">
          Por que existimos.
        </h1>

        <div className="mt-12 space-y-8 text-lg leading-[1.85] text-graphite">
          <p>
            A autoajuda te vendeu alívio. Frase bonita, print salvo, pico de
            dopamina — e amanhã você acorda exatamente igual. Isso não é
            desenvolvimento. É vício com estética de virtude.
          </p>
          <p>
            Nós existimos porque alguém precisava dizer o óbvio:{" "}
            <span className="font-semibold text-ink">
              motivação não muda ninguém.
            </span>{" "}
            O que muda é sistema, repetição e a decisão inegociável de assumir a
            responsabilidade pela própria vida.
          </p>
          <p>
            Aqui não tem &ldquo;top 5 dicas&rdquo;. Não tem milagre. Não tem o
            guru que já chegou lá te olhando de cima. Tem raciocínio, causa e
            efeito, e o trabalho sujo de construir quem você decide ser.
          </p>
          <p className="font-display text-2xl font-medium italic text-ink">
            A gente não quer te inspirar. A gente quer te tornar perigoso —
            dono da tua postura, do teu tempo e do teu valor.
          </p>
          <p>
            Se você quer se sentir bem por cinco minutos, fecha essa aba. Se
            quer mudar de verdade, fica. O caminho da verdade é solitário. Mas é
            o único que leva ao topo.
          </p>
        </div>

        <div className="mt-16 border-t border-hairline pt-8">
          <p className="font-display text-lg italic text-ink">
            {site.signature}
          </p>
          <div className="mt-8">
            <Button href={site.telegram.url} external>
              Começar pelo bot
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
