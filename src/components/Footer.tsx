"use client";

import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-ink text-paper border-t border-hairline-dark">
      {/* Padrão sutil de grade no rodapé */}
      <div className="absolute inset-0 bg-grid-dark opacity-20 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 border-b border-hairline-dark pb-14">
          <p className="max-w-2xl font-display text-3xl font-medium italic leading-snug text-paper sm:text-4xl">
            {site.signature}
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="group flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-paper/80 transition-all hover:border-white hover:bg-white/10 hover:text-white"
            aria-label="Voltar ao topo"
          >
            <span className="text-lg transition-transform duration-300 group-hover:-translate-y-1">
              ↑
            </span>
          </button>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-10 sm:flex-row">
          <div>
            <Link
              href="/"
              className="font-display text-xl font-semibold tracking-tight text-paper hover:text-action-bright transition-colors"
            >
              Ensinamentos<span className="text-action-bright">.</span>
            </Link>
            <p className="mt-2 text-xs uppercase tracking-widest text-muted">{site.domain}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Conteúdo pra quem cansou de autoajuda fofa. Sistema, não dopamina.
            </p>

            <div className="mt-6 flex items-center gap-2 text-xs text-muted">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              <span>Bot Telegram Ativo e Operacional</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-12 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-action-bright mb-4">
                Navegação
              </p>
              <nav className="flex flex-col gap-3">
                {site.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-muted transition-colors hover:text-paper"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-action-bright mb-4">
                Comunidade
              </p>
              <nav className="flex flex-col gap-3">
                <a
                  href={site.telegram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 text-muted transition-colors hover:text-paper"
                >
                  <span>Telegram Bot</span>
                  <span className="text-xs transition-transform group-hover:translate-x-0.5">
                    →
                  </span>
                </a>
                <span className="text-muted/60 text-xs">
                  {site.telegram.handle}
                </span>
              </nav>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-hairline-dark/60 pt-8 text-xs text-muted/70">
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {site.name}. Todos os direitos reservados.
          </p>
          <p className="font-display italic text-muted/50">
            Qualidade & Sistema Editorial · Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
