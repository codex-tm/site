import type { ReactNode } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto max-w-5xl px-6", className)}>{children}</div>;
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-24 sm:py-32", className)}>
      {children}
    </section>
  );
}

/** Eyebrow premium: filete + label em caixa alta com tracking largo. */
export function Eyebrow({
  children,
  dark,
}: {
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em]">
      <span
        className={cn("h-px w-8 transition-all duration-300", dark ? "bg-action-bright/70" : "bg-action/60")}
        aria-hidden
      />
      <span className={dark ? "text-action-bright" : "text-action"}>
        {children}
      </span>
    </div>
  );
}

/** Badge pill reutilizável com microestilos */
export function Badge({
  children,
  variant = "action",
  className,
}: {
  children: ReactNode;
  variant?: "action" | "muted" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest transition-colors",
        variant === "action" && "bg-action-soft text-action border border-action/10",
        variant === "muted" && "bg-paper-dim text-muted border border-hairline",
        variant === "dark" && "bg-paper/10 text-paper border border-white/10",
        className
      )}
    >
      {children}
    </span>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "inverted";
  external?: boolean;
  className?: string;
  showArrow?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  external,
  className,
  showArrow = true,
}: ButtonProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 active:scale-[0.98]",
    variant === "primary" &&
      "bg-action text-white shadow-md shadow-action/10 hover:bg-action/90 hover:shadow-lg hover:shadow-action/20",
    variant === "outline" &&
      "border border-hairline text-ink hover:border-ink/30 hover:bg-ink/[0.03] hover:shadow-editorial",
    variant === "inverted" &&
      "bg-paper text-ink hover:bg-white hover:shadow-lift",
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {showArrow && (
        <span className="text-xs transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      )}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    );
  }
  return <Link href={href} className={classes}>{content}</Link>;
}

/** Componente de equalizador de áudio animado */
export function AudioWave({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-end gap-1 h-5", className)}>
      <span className="w-1 bg-action rounded-full animate-wave-1"></span>
      <span className="w-1 bg-action rounded-full animate-wave-2"></span>
      <span className="w-1 bg-action rounded-full animate-wave-3"></span>
      <span className="w-1 bg-action rounded-full animate-wave-4"></span>
      <span className="w-1 bg-action rounded-full animate-wave-5"></span>
    </div>
  );
}

/** Card container com estilos refinados de editorial */
export function EditorialCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-hairline bg-paper p-8 shadow-editorial transition-all duration-300 hover:-translate-y-1 hover:border-action/30 hover:shadow-lift",
        className
      )}
    >
      {children}
    </div>
  );
}

/**
 * DarkCta — a banda-assinatura da marca.
 * Full-bleed em tinta com padrão sutil de grade, citação itálica em Libre Bodoni, botão invertido.
 */
export function DarkCta({
  kicker = "O próximo passo",
  heading,
  sub,
  buttonLabel,
}: {
  kicker?: string;
  heading: ReactNode;
  sub?: string;
  buttonLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      {/* Padrão de fundo em grade de pontos sutis */}
      <div className="absolute inset-0 bg-grid-dark opacity-30 pointer-events-none" />

      <Container className="relative z-10 py-28 text-center sm:py-36">
        <p className="flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-action-bright">
          <span className="h-px w-8 bg-action-bright/50" aria-hidden />
          {kicker}
          <span className="h-px w-8 bg-action-bright/50" aria-hidden />
        </p>
        <h2 className="mx-auto mt-8 max-w-3xl font-display text-4xl font-medium italic leading-[1.18] text-paper sm:text-5xl">
          {heading}
        </h2>
        {sub && (
          <p className="mx-auto mt-6 max-w-xl text-lg leading-[1.85] text-muted">
            {sub}
          </p>
        )}
        <div className="mt-10 flex justify-center">
          <Button
            href={site.telegram.url}
            external
            variant="inverted"
            className="px-8 py-4 text-base shadow-glow hover:shadow-white/20"
          >
            {buttonLabel ?? `Entrar no ${site.telegram.handle}`}
          </Button>
        </div>
        <div className="mt-14 flex items-center justify-center gap-4 text-xs tracking-widest text-muted uppercase">
          <span className="h-px w-12 bg-white/10" />
          <span className="font-display italic">{site.signature}</span>
          <span className="h-px w-12 bg-white/10" />
        </div>
      </Container>
    </section>
  );
}
