import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

const site = { name: 'Ensinamentos da Vida', description: 'Conteúdo prático sobre hábitos, foco e disciplina. Sem motivação barata. Só sistema e resultado.' };

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts', ({ data }) => data.status === 'publicado')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  return rss({ title: site.name, description: site.description, site: context.site ?? 'https://ensinamentosdavida.com.br', items: posts.map((post) => ({ title: post.data.title, pubDate: post.data.date, description: post.data.excerpt, link: `/blog/${post.data.slug}` })) });
}
