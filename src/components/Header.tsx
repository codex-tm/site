"use client";

import { useState, useEffect, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [drawerTop, setDrawerTop] = useState(0);
  const headerRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  // Fechar menu ao mudar de rota — setState dentro de callback do effect (não sincronamente)
  useEffect(() => {
    // O efeito roda DEPOIS do render; usar um microtask garante que não é síncrono no corpo do effect
    const id = requestAnimationFrame(() => setMobileMenuOpen(false));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  // Travar scroll do body quando menu mobile está aberto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Medir a altura real do header pra posicionar o drawer logo abaixo dele.
  // Header tem altura variável (masthead pode quebrar linha), então nada de offset hardcoded.
  useLayoutEffect(() => {
    if (!mobileMenuOpen) return;
    const update = () => {
      if (headerRef.current) setDrawerTop(headerRef.current.offsetHeight);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [mobileMenuOpen]);

  return (
    <>
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-hairline bg-paper/85 backdrop-blur-xl transition-all duration-300"
    >
      {/* Masthead — barra de utilidade editorial */}
      <div className="border-b border-hairline/70 bg-paper-dim/40">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
          <div className="flex min-w-0 items-center gap-2">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-action opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-action"></span>
            </span>
            <span className="hidden truncate sm:inline">{site.domain}</span>
          </div>
          <a
            href={site.telegram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex min-w-0 items-center gap-1.5 transition-colors hover:text-ink"
          >
            <span className="truncate">{site.telegram.handle}</span>
            <span className="text-action transition-transform duration-200 group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </div>
      </div>

      {/* Barra principal */}
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3.5">
        <Link
          href="/"
          className="group flex items-center gap-1 font-display text-xl font-semibold tracking-tight text-ink"
        >
          <span>Ensinamentos</span>
          <span className="text-action transition-transform duration-300 group-hover:scale-125">
            .
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-sm font-medium text-graphite md:flex">
          {site.nav.map((item) => {
            const href = item.href as string;
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-1.5 text-sm transition-colors duration-200 ${
                  isActive ? "font-semibold text-ink" : "hover:text-ink"
                }`}
              >
                {item.label}
                {isActive ? (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-action" />
                ) : (
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-action transition-all duration-300 group-hover:w-full" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          <a
            href={site.telegram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-action px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all duration-300 hover:bg-action/90 hover:shadow-glow active:scale-95 sm:inline-flex"
          >
            Entrar no bot
          </a>

          {/* Botão de Menu Mobile Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-hairline text-ink transition-colors hover:bg-paper-dim md:hidden"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </header>

    {/* Menu Mobile Drawer — FORA do <header> de propósito: o backdrop-blur do
        header cria containing block pra position:fixed e quebraria o inset.
        Top medido dinamicamente a partir da altura real do header. */}
    {mobileMenuOpen && (
      <div
        className="fixed inset-x-0 bottom-0 z-50 flex flex-col bg-paper/98 px-6 py-8 backdrop-blur-2xl md:hidden"
        style={{ top: `${drawerTop}px` }}
      >
        <nav className="flex flex-col gap-6 text-lg font-medium text-ink">
          {site.nav.map((item) => {
            const href = item.href as string;
            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between border-b border-hairline pb-4 transition-colors ${
                  isActive ? "font-semibold text-action" : "text-ink hover:text-action"
                }`}
              >
                <span>{item.label}</span>
                <span className="text-sm font-normal text-muted">→</span>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-4 pt-6">
          <a
            href={site.telegram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center rounded-full bg-action py-4 text-center text-sm font-semibold text-white shadow-md transition-all active:scale-[0.98]"
          >
            Entrar no bot no Telegram
          </a>
          <p className="text-center font-display text-xs italic text-muted">
            {site.signature}
          </p>
        </div>
      </div>
    )}
    </>
  );
}
