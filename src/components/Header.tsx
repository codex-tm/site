import Link from "next/link";
import { site } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-ink"
        >
          Ensinamentos<span className="text-action">.</span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-graphite md:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <a
          href={site.telegram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-action px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-action/90"
        >
          Entrar no bot
        </a>
      </div>
    </header>
  );
}
