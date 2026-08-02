/**
 * Config central da marca.
 * Fonte de verdade: vault ensinamentosdavida → 01-PROJETO/Visão Geral.
 * Fase atual: TRAÇÃO — zero venda. CTA principal é o bot do Telegram (nossa newsletter).
 */
export const site = {
  name: "Ensinamentos da Vida",
  domain: "ensinamentosdavida.com.br",
  url: "https://ensinamentosdavida.com.br",
  description:
    "Você não precisa de motivação. Precisa de sistema. Conteúdo profundo com raciocínio lógico pra quem cansou de autoajuda fofa.",
  signature: "Este é o Ensinamentos da Vida. Nós nos vemos no topo.",
  telegram: {
    handle: "@Ensinamentos_da_vida_bot",
    url: "https://t.me/Ensinamentos_da_vida_bot",
  },
  nav: [
    { label: "Blog", href: "/blog" },
    { label: "Método", href: "/metodo" },
    { label: "Manifesto", href: "/manifesto" },
  ],
} as const;

export type Site = typeof site;
