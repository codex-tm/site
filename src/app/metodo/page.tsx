import type { Metadata } from "next";
import { Container, Eyebrow, DarkCta } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { MethodInteractive } from "@/components/MethodInteractive";

export const metadata: Metadata = {
  title: "Método",
  description:
    "Três pilares, um sistema. Sistema > Motivação, 1% todo dia e Autorresponsabilidade.",
};

export default function MetodoPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-hairline bg-paper">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <Container className="relative z-10 py-24 sm:py-32">
          <div className="hero-rise">
            <Eyebrow>O método fundacional</Eyebrow>
          </div>
          <h1
            className="hero-rise mt-8 max-w-4xl font-display text-5xl font-medium leading-[1.04] tracking-tight text-ink sm:text-7xl"
            style={{ animationDelay: "80ms" }}
          >
            Três pilares. Um sistema.{" "}
            <span className="italic text-action">Zero mágica.</span>
          </h1>
          <p
            className="hero-rise mt-8 max-w-2xl text-lg leading-[1.85] text-graphite sm:text-xl"
            style={{ animationDelay: "160ms" }}
          >
            Isso não é um conjunto de dicas soltas. É um sistema de comportamento. Cada
            pilar sustenta o outro. Tirou um, a estrutura cai.
          </p>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Reveal>
            <MethodInteractive />
          </Reveal>
        </Container>
      </section>

      <DarkCta
        kicker="Sistema se constrói acompanhado"
        heading={
          <>
            O próximo passo não é motivação.{" "}
            <span className="text-action-bright">É estrutura.</span>
          </>
        }
        sub="1 ideia por semana no bot. Sem ruído, sem dopamina barata. Só o próximo passo."
      />
    </>
  );
}
