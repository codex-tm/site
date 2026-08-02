"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/formatters";

export function BlogExplorer({ posts }: { posts: Post[] }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");

  // Categorias únicas extraídas dos posts
  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => {
      if (p.category) set.add(p.category.toLowerCase());
    });
    return ["todos", ...Array.from(set)];
  }, [posts]);

  // Filtragem combinada
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCat =
        selectedCategory === "todos" ||
        post.category.toLowerCase() === selectedCategory;
      const matchSearch =
        !search ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [posts, selectedCategory, search]);

  return (
    <div className="space-y-12">
      {/* Controles de Busca e Filtro */}
      <div className="flex flex-col gap-6 border-b border-hairline pb-8 sm:flex-row sm:items-center sm:justify-between">
        {/* Filtro por Categoria */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                selectedCategory === cat
                  ? "bg-action text-white shadow-sm"
                  : "bg-paper-dim text-graphite hover:bg-hairline hover:text-ink"
              }`}
            >
              {cat === "todos" ? "Todos os artigos" : cat}
            </button>
          ))}
        </div>

        {/* Input de Pesquisa */}
        <div className="relative min-w-[260px]">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar artigos..."
            className="w-full rounded-full border border-hairline bg-paper px-4 py-2.5 pl-10 text-sm text-ink outline-none transition-all placeholder:text-muted focus:border-action focus:ring-1 focus:ring-action"
          />
          <svg
            className="absolute left-3.5 top-3 h-4 w-4 text-muted"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-3.5 top-2.5 text-xs text-muted hover:text-ink"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Lista de Artigos (Visíveis imediatamente) */}
      {filteredPosts.length === 0 ? (
        <div className="rounded-2xl border border-hairline bg-paper-dim p-12 text-center">
          <p className="text-lg font-medium text-ink">Nenhum artigo encontrado</p>
          <p className="mt-2 text-sm text-muted">
            Tente buscar com outros termos ou selecione outra categoria.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setSelectedCategory("todos");
            }}
            className="mt-6 text-xs font-semibold uppercase tracking-wider text-action hover:underline"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group grid gap-4 rounded-2xl border border-hairline bg-paper p-8 shadow-editorial transition-all duration-300 hover:-translate-y-1 hover:border-action/40 hover:shadow-lift sm:grid-cols-[1fr_auto] sm:gap-10"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-action">
                    {post.category}
                  </span>
                  {post.featured && (
                    <span className="rounded-full bg-action-soft px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-action">
                      Destaque
                    </span>
                  )}
                </div>
                <h2 className="mt-3 font-display text-2xl font-semibold leading-snug text-ink transition-colors group-hover:text-action sm:text-3xl">
                  {post.title}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-[1.85] text-graphite">
                  {post.excerpt}
                </p>
              </div>
              <div className="flex flex-row sm:flex-col justify-between sm:items-end shrink-0 text-xs uppercase tracking-[0.15em] text-muted">
                <span>{formatDate(post.date)}</span>
                <span className="font-semibold text-action group-hover:underline">
                  {post.readTime} · Ler artigo →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
