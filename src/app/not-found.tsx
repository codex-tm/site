import { Container, Button } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="border-b border-hairline">
      <Container className="py-32 sm:py-40">
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-action">
          <span className="h-px w-8 bg-action/50" aria-hidden />
          Erro 404
        </p>
        <h1 className="mt-8 max-w-3xl font-display text-6xl font-medium leading-[1.02] tracking-tight text-ink sm:text-8xl">
          Essa página <span className="italic text-action">não existe.</span>
        </h1>
        <p className="mt-10 max-w-xl text-xl leading-[1.8] text-graphite">
          O caminho que você tentou não leva a lugar nenhum. Mas o topo continua
          lá. Volta pro início e segue daqui.
        </p>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row">
          <Button href="/">Voltar ao início</Button>
          <Button href="/blog" variant="outline">
            Ler o blog
          </Button>
        </div>
      </Container>
    </section>
  );
}
