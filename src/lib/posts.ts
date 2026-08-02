import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Camada de conteúdo do blog.
 * Posts vivem em content/posts/*.mdx com frontmatter YAML.
 * Os 2 posts fundacionais foram restaurados do backup (D:\blog-backup).
 */
export type Post = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  featured: boolean;
  status: string;
  tags: string[];
  related: string[];
  content: string;
};

const postsDir = path.join(process.cwd(), "content", "posts");

function toDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

export function getPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug: (data.slug as string) ?? file.replace(/\.mdx$/, ""),
      title: (data.title as string) ?? "",
      category: (data.category as string) ?? "",
      excerpt: (data.excerpt as string) ?? "",
      date: toDate(data.date),
      readTime: (data.readTime as string) ?? "",
      featured: Boolean(data.featured),
      status: (data.status as string) ?? "rascunho",
      tags: (data.tags as string[]) ?? [],
      related: (data.related as string[]) ?? [],
      content,
    };
  });

  return posts
    .filter((p) => p.status === "publicado")
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}

export function formatDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
