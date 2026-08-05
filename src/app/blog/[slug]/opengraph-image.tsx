import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getPost } from "@/lib/posts";

export const alt = "Ensinamentos da Vida";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Force Node.js runtime so we can read local font files
export const runtime = "nodejs";

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  // Fallback if post not found
  const title = post?.title ?? "Ensinamentos da Vida";
  const category = post?.category ?? "Blog";
  const excerpt = post?.excerpt ?? "";

  // Load display font (Newsreader SemiBold)
  const fontData = await readFile(
    join(process.cwd(), "public/fonts/Newsreader-SemiBold.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FAF9F6", // paper color
          padding: "80px",
          fontFamily: "Newsreader",
        }}
      >
        {/* Top: category badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#B45309", // action/amber-700
            }}
          >
            {category}
          </div>
        </div>

        {/* Center: title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
          }}
        >
          <h1
            style={{
              fontSize: title.length > 60 ? 56 : 72,
              fontWeight: 600,
              lineHeight: 1.1,
              color: "#1C1917", // ink/stone-900
              margin: 0,
            }}
          >
            {title}
          </h1>
          {excerpt && (
            <p
              style={{
                fontSize: 28,
                lineHeight: 1.5,
                color: "#57534E", // graphite/stone-600
                margin: 0,
              }}
            >
              {excerpt.length > 120
                ? `${excerpt.slice(0, 120)}…`
                : excerpt}
            </p>
          )}
        </div>

        {/* Bottom: brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#78716C", // muted/stone-500
              letterSpacing: "0.05em",
            }}
          >
            ensinamentosdavida.com.br
          </div>
          <div
            style={{
              width: 48,
              height: 4,
              backgroundColor: "#B45309", // action accent bar
              borderRadius: 2,
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Newsreader",
          data: fontData,
          style: "normal",
          weight: 600,
        },
      ],
    }
  );
}
