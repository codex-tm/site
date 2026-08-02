"use client";

import { useState, useRef } from "react";
import { site } from "@/lib/site";

export function TelegramPreviewWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(25);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative mx-auto max-w-xl overflow-hidden rounded-2xl border border-hairline bg-paper p-6 shadow-lift sm:p-8">
      {/* Cabeçalho do post no Telegram */}
      <div className="flex items-center justify-between border-b border-hairline pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-action/10 font-display text-sm font-bold text-action">
            EV
          </div>
          <div>
            <h4 className="text-sm font-bold text-ink">Ensinamentos da Vida</h4>
            <p className="text-xs text-muted">@Ensinamentos_da_vida_bot · Bot Oficial</p>
          </div>
        </div>
        <span className="rounded-full bg-action-soft px-2.5 py-1 text-[10px] font-semibold tracking-wider text-action uppercase">
          1 Ideia/Semana
        </span>
      </div>

      {/* Conteúdo da mensagem */}
      <div className="mt-5 space-y-3 text-sm leading-relaxed text-graphite">
        <p className="font-semibold text-ink">
          📌 Edição #042 — O Preço da Consistência
        </p>
        <p>
          Você não falha por falta de vontade. Você falha porque tenta mudar tudo de uma vez. A consistência não é um evento épico — é o trabalho silencioso que ninguém curte no Instagram.
        </p>

        {/* Player de áudio simulado do Telegram */}
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-hairline bg-paper-dim p-3.5 transition-colors hover:border-action/20">
          <button
            type="button"
            onClick={togglePlay}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-action text-white transition-transform hover:scale-105 active:scale-95 shadow-sm"
            aria-label={isPlaying ? "Pausar áudio" : "Tocar áudio"}
          >
            {isPlaying ? (
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg className="h-4 w-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between text-xs text-muted mb-1.5">
              <span className="font-medium text-ink">Áudio exclusivo #042</span>
              <span>{isPlaying ? "01:14 / 04:30" : "04:30"}</span>
            </div>

            {/* Onda de áudio interativa / barra de progresso */}
            <div
              className="relative h-2 w-full cursor-pointer rounded-full bg-hairline overflow-hidden"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newPercent = (clickX / rect.width) * 100;
                setProgress(Math.max(0, Math.min(100, newPercent)));
              }}
            >
              <div
                className="h-full bg-action transition-all duration-150"
                style={{ width: `${isPlaying ? (progress + 15) % 100 : progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer da mensagem */}
      <div className="mt-5 flex items-center justify-between pt-3 border-t border-hairline/60 text-xs text-muted">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
          Direto no seu Telegram
        </span>
        <a
          href={site.telegram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-action hover:underline flex items-center gap-1"
        >
          Receber no Telegram →
        </a>
      </div>
    </div>
  );
}
