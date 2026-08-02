import Link from "next/link";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <p className="font-display text-2xl font-medium italic leading-snug text-ink">
          {site.signature}
        </p>

        <div className="mt-10 flex flex-col justify-between gap-8 sm:flex-row">
          <div>
            <p className="font-display text-base font-semibold text-ink">
              {site.name}
            </p>
            <p className="mt-1 text-sm text-graphite">{site.domain}</p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-graphite">
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-ink">
                {item.label}
              </Link>
            ))}
            <a
              href={site.telegram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink"
            >
              Telegram
            </a>
          </nav>
        </div>

        <p className="mt-10 text-xs text-graphite/70">
          © {new Date().getFullYear()} {site.name}. Todos os direitos
          reservados.
        </p>
      </div>
    </footer>
  );
}
