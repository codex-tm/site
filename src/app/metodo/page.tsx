import type { Metadata } from "next";
import { Container, Section, Eyebrow, Button } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Método",
  description:
    "Três pilares, um sistema. Sistema > Motivação, 1% todo dia e Autorresponsabilidade.",
};

const pilares = [
  {
    n: "01",
    titulo: "Sistema > Motivação",
    tese: "Motivação é clima. Sistema é arquitetura.",
    corpo:
      "Você não falha por falta de vontade — falha por falta de estrutura. Quem depende de estar motivado pra agir, age quando dá. Quem tem sistema, age independente de como acorda. A gente não trabalha o teu ânimo. A gente monta a tua estrutura.",
    acao:
      "Escolha UMA área da tua vida. Desenhe um processo de 3 passos que você vai repetir todo dia. Execute por 14 dias seguidos antes de julgar se funciona.",
  },
  {
    n: "02",
    titulo: "1% todo dia",
    tese: "O segredo é o óbvio executado sem parar.",
    corpo:
      "Nada de virada de vida da noite pro dia. Isso é venda, não mudança. 1% melhor a cada dia parece pouco — até compostar. Em um ano, você fica irreconhecível. O erro é subestimar o pequeno e superestimar o evento.",
    acao:
      "Defina o mínimo ridículo: 1 página, 1 repetição, 1 minuto. Faça todo dia, sem exceção. A meta não é o volume — é não quebrar a corrente.",
  },
  {
    n: "03",
    titulo: "Autorresponsabilidade",
    tese: "O mundo te dá o que você é, não o que você quer.",
    corpo:
      "Ninguém vem te salvar. Enquanto você culpar o chefe, o governo, a família, o teu poder fica do lado de fora. Assuma o controle e a tua postura muda. Quando a postura muda, a forma de falar muda — e o ambiente se curva.",
    acao:
      "Liste 3 resultados ruins que você atribui aos outros. Reescreva cada um: o que EU fiz (ou deixei de fazer) pra isso acontecer? Isso devolve o poder pra tua mão.",
  },
];

export default function MetodoPage() {
  return (
    <>
      <Section className="border-b border-hairline">
        <Container>
          <Eyebrow>O método</Eyebrow>
          <h1 className="mt-6 max-w-3xl font-display text-5xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl">
            Três pilares. Um sistema.{" "}
            <span className="italic text-action">Zero mágica.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-[1.85] text-graphite">
            Isso não é um conjunto de dicas. É um sistema de comportamento. Cada
            pilar sustenta o outro. Tirou um, a estrutura cai.
          </p>
        </Container>
      </Section>

      {pilares.map((p) => (
        <Section key={p.n} className="border-b border-hairline">
          <Container>
            <span className="font-display text-sm font-semibold text-action">
              Pilar {p.n}
            </span>
            <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-ink">
              {p.titulo}
            </h2>
            <p className="mt-6 font-display text-2xl font-medium italic text-ink">
              {p.tese}
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-[1.85] text-graphite">
              {p.corpo}
            </p>
            <div className="mt-8 max-w-2xl rounded-xl border border-hairline bg-white p-6 shadow-editorial">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-action">
                Ação prática
              </p>
              <p className="mt-3 leading-[1.85] text-graphite">{p.acao}</p>
            </div>
          </Container>
        </Section>
      ))}

      <Section>
        <Container className="text-center">
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-medium tracking-tight text-ink">
            Sistema se constrói acompanhado.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-[1.85] text-graphite">
            1 ideia por semana no bot. Sem ruído, sem dopamina barata. Só o
            próximo passo.
          </p>
          <div className="mt-10 flex justify-center">
            <Button href={site.telegram.url} external className="px-8 py-4 text-base">
              Entrar no {site.telegram.handle}
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
