'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowRight, Calendar, Search, SearchX } from 'lucide-react';

interface BlogSummary {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string | null;
  excerptEn: string | null;
  excerptAr: string | null;
  coverImage: string | null;
  category: string;
  author: string;
  readTime: number;
  publishedAt: string | null;
}

const categories = ['All', 'WEB_DEV', 'MOBILE', 'AI', 'DESIGN', 'BUSINESS', 'CLOUD', 'SECURITY', 'GENERAL'];

export function BlogBrowser({ posts, locale }: { posts: BlogSummary[]; locale: string }) {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const filtered = useMemo(() => {
    const term = search.trim().toLocaleLowerCase();
    return posts.filter((post) => {
      const matchesCategory = category === 'All' || post.category === category;
      const title = locale === 'ar' ? post.titleAr ?? post.titleEn : post.titleEn;
      return matchesCategory && (!term || title.toLocaleLowerCase().includes(term));
    });
  }, [category, locale, posts, search]);
  const [featured, ...rest] = filtered;

  return (
    <>
      <div className="mx-auto mb-10 max-w-5xl rounded-2xl border border-surface-border bg-surface-card/80 p-3 sm:p-4">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted rtl:left-auto rtl:right-4" />
          <span className="sr-only">Search articles</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search articles, topics, or ideas..."
            className="w-full rounded-xl border border-surface-border bg-surface py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-brand-purple-500 focus:ring-4 focus:ring-brand-purple-500/10 rtl:pl-4 rtl:pr-11"
          />
        </label>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Article categories">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-medium transition-all ${
                category === item
                  ? 'bg-brand-purple-500 text-white shadow-lg shadow-brand-purple-500/20'
                  : 'border border-surface-border bg-surface text-ink-secondary hover:text-white'
              }`}
            >
              {item.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {!featured ? (
        <div className="rounded-3xl border border-dashed border-surface-border bg-surface-card/60 px-6 py-16 text-center">
          <SearchX className="mx-auto h-10 w-10 text-brand-purple-400" />
          <h2 className="mt-4 font-display text-xl font-semibold text-white">No matching articles</h2>
          <p className="mt-2 text-sm text-ink-muted">Try a broader search or choose another category.</p>
        </div>
      ) : (
        <>
          <Link href={`/${locale}/blog/${featured.slug}`} className="group mb-8 grid overflow-hidden rounded-3xl border border-surface-border bg-surface-card transition hover:border-brand-purple-500/50 md:grid-cols-2">
            <div className="relative min-h-64 overflow-hidden bg-gradient-to-br from-brand-purple-500/15 to-brand-cyan-500/10">
              {featured.coverImage && <Image src={featured.coverImage} alt={featured.titleEn} fill priority sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />}
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
              <span className="w-fit rounded-full bg-brand-purple-500/15 px-2.5 py-1 text-xs font-medium text-brand-purple-300">{featured.category.replace('_', ' ')}</span>
              <h2 className="mt-4 font-display text-2xl font-bold text-white transition-colors group-hover:text-brand-purple-300 sm:text-3xl">
                {locale === 'ar' ? featured.titleAr ?? featured.titleEn : featured.titleEn}
              </h2>
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-secondary">
                {locale === 'ar' ? featured.excerptAr ?? featured.excerptEn : featured.excerptEn}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-ink-muted">
                <span>{featured.author}</span><span aria-hidden>•</span>
                <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{featured.readTime} min read</span>
              </div>
            </div>
          </Link>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link key={post.id} href={`/${locale}/blog/${post.slug}`} className="group overflow-hidden rounded-2xl border border-surface-border bg-surface-card transition-all hover:-translate-y-1 hover:border-brand-purple-500/50">
                <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-brand-purple-500/15 to-brand-cyan-500/10">
                  {post.coverImage && <Image src={post.coverImage} alt={post.titleEn} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />}
                </div>
                <div className="p-5 sm:p-6">
                  <span className="rounded-full bg-brand-purple-500/15 px-2.5 py-1 text-xs font-medium text-brand-purple-300">{post.category.replace('_', ' ')}</span>
                  <h2 className="mt-4 line-clamp-2 font-display text-lg font-semibold text-white group-hover:text-brand-purple-300">
                    {locale === 'ar' ? post.titleAr ?? post.titleEn : post.titleEn}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-secondary">{locale === 'ar' ? post.excerptAr ?? post.excerptEn : post.excerptEn}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-purple-400">Read article <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" /></span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}
