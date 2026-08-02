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

const postsDir = path.join(process.cwd(), "content", "posts");

function toDate(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? "");
}

export function getPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return [];
  const files = fs.readdirSync(postsDir).filter((f) => /\.(mdx|md)$/i.test(f));

  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug: (data.slug as string) ?? file.replace(/\.(mdx|md)$/i, ""),
      title: (data.title as string) ?? "",
      category: (data.category as string) ?? "",
      excerpt: (data.excerpt as string) ?? "",
      date: toDate(data.date),
      readTime: (data.readTime as string) ?? "",
      featured: Boolean(data.featured),
      status: (data.status as string) ?? "publicado",
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
