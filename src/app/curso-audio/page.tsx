import type { Metadata } from "next";
import { Container, Section, Eyebrow, Button } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Curso em Áudio",
  description:
    "A Arte do Comportamento Proibido. Curso 100% em áudio, 5 módulos, 27 aulas. Em breve.",
};

const modulos = [
  {
    n: "I",
    titulo: "O Despertar",
    aulas: 5,
    tese: "Destruir a visão limitada que você tem de si mesmo.",
  },
  {
    n: "II",
    titulo: "A Reconstrução",
    aulas: 5,
    tese: "Reconstruir os pilares internos pra mudança virar identidade.",
  },
  {
    n: "III",
    titulo: "A Forja",
    aulas: 6,
    tese: "Transformar conhecimento em comportamento. Agir sem vontade.",
  },
  {
    n: "IV",
    titulo: "A Liberdade",
    aulas: 6,
    tese: "Independência emocional. Viver por princípios, não aprovação.",
  },
  {
    n: "V",
    titulo: "A Transcendência",
    aulas: 5,
    tese: "Transformar evolução em forma de viver e deixar marca.",
  },
];

export default function CursoAudioPage() {
  return (
    <>
      <Section className="border-b border-hairline">
        <Container>
          <div className="flex items-center gap-3">
            <Eyebrow>O produto</Eyebrow>
            <span className="rounded-full bg-action-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-action">
              Em breve
            </span>
          </div>
          <h1 className="mt-6 max-w-3xl font-display text-5xl font-medium leading-[1.05] tracking-tight text-ink sm:text-6xl">
            A Arte do{" "}
            <span className="italic text-action">Comportamento Proibido</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-[1.85] text-graphite">
            Curso 100% em áudio. 5 módulos, 27 aulas. Não é o que te disseram
            pra fazer. É o que funciona. Pra ouvir no trânsito, na academia, no
            trabalho — onde a tua vida realmente acontece.
          </p>
          <div className="mt-10">
            <Button href={site.telegram.url} external>
              Quero ser avisado no bot
            </Button>
          </div>
        </Container>
      </Section>

      <Section className="border-b border-hairline">
        <Container>
          <Eyebrow>Por que áudio</Eyebrow>
          <div className="mt-8 grid gap-10 sm:grid-cols-3">
            <p className="leading-[1.85] text-graphite">
              Você não tem tempo pra sentar e ver aula. O áudio entra onde a
              tua vida já acontece.
            </p>
            <p className="leading-[1.85] text-graphite">
              Consumo passivo-ativo: você ouve e aplica. Sem edição de vídeo,
              sem distração visual.
            </p>
            <p className="leading-[1.85] text-graphite">
              99% dos cursos são vídeo. Áudio é oceano azul — e combina com
              quem não para.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="border-b border-hairline">
        <Container>
          <Eyebrow>A grade</Eyebrow>
          <h2 className="mt-6 font-display text-4xl font-medium tracking-tight text-ink">
            5 módulos. 27 aulas. Uma transformação.
          </h2>
          <div className="mt-14 flex flex-col">
            {modulos.map((m) => (
              <div
                key={m.n}
                className="grid gap-2 border-t border-hairline py-8 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-8"
              >
                <span className="font-display text-sm font-semibold text-action">
                  Módulo {m.n}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold text-ink">
                    {m.titulo}
                  </h3>
                  <p className="mt-2 leading-[1.85] text-graphite">{m.tese}</p>
                </div>
                <span className="text-sm text-graphite/70">
                  {m.aulas} aulas
                </span>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="text-center">
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-medium tracking-tight text-ink">
            Ainda não abriu. Mas você pode chegar antes.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-[1.85] text-graphite">
            Quem tá no bot recebe o aviso primeiro — e o conteúdo que já tá
            pronto, de graça, toda semana.
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
