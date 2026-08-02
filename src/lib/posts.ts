import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { formatDate } from "@/lib/formatters";

export { formatDate };

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

/** Correção de mojibake (caracteres acentuados corrompidos em UTF-8/Latin1) */
function fixMojibake(str: string): string {
  if (!str) return "";
  try {
    if (/[ÃÂâ]/.test(str)) {
      return Buffer.from(str, "latin1").toString("utf-8");
    }
  } catch {
    // fallback
  }
  return str;
}

function toDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "number") return new Date(value).toISOString().slice(0, 10);
  const str = String(value ?? "").trim();
  if (str) return str;
  return new Date().toISOString().slice(0, 10);
}

/** Varredura recursiva de arquivos em um diretório */
function scanDirectory(dir: string, categoryDefault?: string): Array<{ filePath: string; defaultCategory: string }> {
  if (!fs.existsSync(dir)) return [];
  const results: Array<{ filePath: string; defaultCategory: string }> = [];

  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    // Ignorar pastas ocultas ou node_modules / .next
    if (item.name.startsWith(".") || item.name === "node_modules" || item.name === "public") {
      continue;
    }

    if (item.isDirectory()) {
      const cat = categoryDefault || item.name;
      results.push(...scanDirectory(fullPath, cat));
    } else if (item.isFile() && /\.(mdx|md|txt)$/i.test(item.name)) {
      results.push({
        filePath: fullPath,
        defaultCategory: categoryDefault || "geral",
      });
    }
  }

  return results;
}

export function getPosts(): Post[] {
  const rootDir = process.cwd();
  const postsDir = path.join(rootDir, "content", "posts");
  const autenticidadeDir = path.join(rootDir, "autenticidade");
  const autoestimaDir = path.join(rootDir, "autoestima");

  const targets = [
    ...scanDirectory(postsDir),
    ...scanDirectory(autenticidadeDir, "autenticidade"),
    ...scanDirectory(autoestimaDir, "autoestima"),
  ];

  const seenSlugs = new Set<string>();
  const posts: Post[] = [];

  for (const { filePath, defaultCategory } of targets) {
    try {
      let raw = fs.readFileSync(filePath, "utf-8");
      raw = fixMojibake(raw);

      const parsed = matter(raw);
      const data = parsed.data;

      const fileName = path.basename(filePath);
      const rawSlug = (data.slug as string) || fileName.replace(/\.(mdx|md|txt)$/i, "");
      const slug = rawSlug.trim();

      // Evitar duplicatas pelo slug
      if (seenSlugs.has(slug)) continue;
      seenSlugs.add(slug);

      const title = fixMojibake((data.title as string) || slug);
      const category = fixMojibake((data.category as string) || defaultCategory);
      const excerpt = fixMojibake((data.excerpt as string) || "");
      const status = (data.status as string) || "publicado";

      posts.push({
        slug,
        title,
        category,
        excerpt,
        date: toDate(data.date),
        readTime: (data.readTime as string) || "5 min",
        featured: Boolean(data.featured),
        status,
        tags: (data.tags as string[]) || [category],
        related: (data.related as string[]) || [],
        content: fixMojibake(parsed.content),
      });
    } catch (err) {
      console.error(`Erro ao ler post em ${filePath}:`, err);
    }
  }

  return posts
    .filter((p) => p.status === "publicado")
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}
