"use client";

import { useState } from "react";
import { Reveal } from "@/components/Reveal";

const pilaresData = [
  {
    num: "01",
    titulo: "Sistema > Motivação",
    tese: "Motivação é clima: muda todo dia. Sistema é arquitetura: sustenta.",
    sub: "Você não falha por falta de vontade — falha por falta de estrutura. Quem depende de estar motivado pra agir, age quando dá. Quem tem sistema, age independente de como acorda.",
    acao: "Escolha UMA área da tua vida. Desenhe um processo de 3 passos que você vai repetir todo dia. Execute por 14 dias seguidos antes de julgar se funciona.",
    passos: [
      "Defina o gatilho inicial (ex: assim que acordar)",
      "Reduza o atrito de início (ex: deixe o livro já aberto)",
      "Nunca pule dois dias seguidos sob nenhuma hipótese"
    ]
  },
  {
    num: "02",
    titulo: "1% todo dia",
    tese: "O segredo é o óbvio executado sem parar.",
    sub: "Nada de virada de vida da noite pro dia. Isso é venda de palco, não mudança real. 1% melhor a cada dia parece pouco — até compostar. Em um ano, você fica irreconhecível.",
    acao: "Defina o mínimo ridículo: 1 página, 1 repetição, 1 minuto. Faça todo dia, sem exceção. A meta não é o volume — é não quebrar a corrente.",
    passos: [
      "Escolha uma meta diária pequena demais para falhar",
      "Registre diariamente no seu Telegram ou bloco de notas",
      "Foque na frequência antes da intensidade"
    ]
  },
  {
    num: "03",
    titulo: "Autorresponsabilidade",
    tese: "O mundo te dá o que você é, não o que você quer.",
    sub: "Ninguém vem te salvar. Enquanto você culpar o chefe, o governo ou a família, o teu poder fica do lado de fora. Assuma o controle e a tua postura muda imediatamente.",
    acao: "Liste 3 resultados ruins que você atribui aos outros. Reescreva cada um: o que EU fiz (ou deixei de fazer) pra isso acontecer? Isso devolve o poder pra tua mão.",
    passos: [
      "Elimine a postura de vítima das suas conversas",
      "Assuma a responsabilidade pelas consequências",
      "Mude a ação imediata em vez de reclamar"
    ]
  }
];

export function MethodInteractive() {
  const [selectedPillar, setSelectedPillar] = useState(0);
  const pilar = pilaresData[selectedPillar];

  return (
    <div className="space-y-12">
      {/* Abas dos Pilares */}
      <div className="grid gap-4 sm:grid-cols-3">
        {pilaresData.map((p, idx) => {
          const isSelected = idx === selectedPillar;
          return (
            <button
              key={p.num}
              type="button"
              onClick={() => setSelectedPillar(idx)}
              className={`flex flex-col items-start rounded-2xl border p-6 text-left transition-all duration-300 ${
                isSelected
                  ? "border-action bg-paper shadow-lift"
                  : "border-hairline bg-paper-dim/60 hover:bg-paper hover:border-action/30"
              }`}
            >
              <span className={`text-xs font-bold uppercase tracking-widest ${isSelected ? "text-action" : "text-muted"}`}>
                Pilar {p.num}
              </span>
              <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                {p.titulo}
              </h3>
              <span className="mt-4 text-xs font-semibold text-action">
                {isSelected ? "Visualizando pilar ↓" : "Explorar pilar →"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detalhe do Pilar Selecionado */}
      <Reveal key={pilar.num}>
        <div className="rounded-3xl border border-hairline bg-paper p-8 shadow-editorial sm:p-12">
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-action/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-action">
              Pilar {pilar.num}
            </span>
            <span className="text-xs uppercase tracking-widest text-muted">
              Estrutura Fundacional
            </span>
          </div>

          <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            {pilar.titulo}
          </h2>

          <p className="mt-4 font-display text-xl font-medium italic text-action sm:text-2xl">
            {pilar.tese}
          </p>

          <p className="mt-6 text-lg leading-[1.85] text-graphite">
            {pilar.sub}
          </p>

          {/* Card de Ação Prática */}
          <div className="mt-10 rounded-2xl border border-hairline bg-paper-dim p-8">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-action"></span>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-action">
                Ação Prática Imediata
              </h4>
            </div>
            <p className="mt-3 text-base font-medium leading-relaxed text-ink">
              {pilar.acao}
            </p>

            {/* Checklist do pilar */}
            <div className="mt-6 pt-6 border-t border-hairline/80 space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                Checklist de Implementação:
              </p>
              {pilar.passos.map((passo, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-graphite">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-action/10 text-[10px] font-bold text-action">
                    ✓
                  </span>
                  <span>{passo}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
