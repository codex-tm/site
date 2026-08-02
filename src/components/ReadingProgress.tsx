"use client";

import { useState, useEffect } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      {/* Barra de progresso fixa no topo da página */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-transparent pointer-events-none">
        <div
          className="h-full bg-action transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Botões de Ação de Leitura e Compartilhamento */}
      <div className="flex items-center justify-between border-y border-hairline py-4 my-8 text-xs font-semibold uppercase tracking-wider text-muted">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-action"></span>
          <span>Modo de Leitura Profunda</span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="group relative flex items-center gap-2 rounded-full border border-hairline px-4 py-2 text-ink transition-all hover:bg-paper-dim hover:border-action/30"
        >
          <span>{copied ? "✓ Link Copiado!" : "Compartilhar Artigo"}</span>
          <svg className="h-3.5 w-3.5 text-action transition-transform group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      </div>
    </>
  );
}
