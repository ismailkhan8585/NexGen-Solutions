'use client';

import { useI18n } from '@/components/i18n-provider';
import { GradientBadge } from '@/components/ui/gradient-badge';
import { StaggerList, StaggerItem } from '@/components/animations/stagger-list';
import { ArrowRight, Calendar } from 'lucide-react';
import Image from 'next/image';

export interface BlogData {
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

const categoryColors: Record<string, string> = {
  WEB_DEV: 'bg-brand-purple-500/20 text-brand-purple-300',
  MOBILE: 'bg-brand-cyan-500/20 text-brand-cyan-300',
  AI: 'bg-emerald-500/20 text-emerald-300',
  DESIGN: 'bg-gold-500/20 text-gold-300',
  BUSINESS: 'bg-rose-500/20 text-rose-300',
  CLOUD: 'bg-brand-purple-500/20 text-brand-purple-300',
  SECURITY: 'bg-rose-500/20 text-rose-300',
  GENERAL: 'bg-surface-hover text-ink-secondary',
};

export function Blog({ posts }: { posts: BlogData[] }) {
  const { t, locale } = useI18n();

  return (
    <section id="blog" className="section-padding bg-surface-hover/50 relative">
      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <GradientBadge className="mb-4">{t('blog.badge')}</GradientBadge>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            {t('blog.title')}
          </h2>
          <p className="text-ink-secondary text-lg max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>

        <StaggerList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-surface-border bg-surface-card/60 px-6 py-14 text-center">
              <p className="font-display font-semibold text-white">Insights are being prepared</p>
              <p className="mt-2 text-sm text-ink-muted">Our next engineering article will appear here shortly.</p>
            </div>
          )}
          {posts.map((post) => (
            <StaggerItem key={post.id}>
              <a
                href={`/${locale}/blog/${post.slug}`}
                className="group block rounded-2xl overflow-hidden bg-surface-card border border-surface-border hover:border-surface-borderHover transition-all"
              >
                {post.coverImage && (
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.titleEn}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${categoryColors[post.category] ?? categoryColors.GENERAL}`}>
                      {post.category.replace('_', ' ')}
                    </span>
                    <span className="flex items-center gap-1 text-ink-muted text-xs">
                      <Calendar className="w-3 h-3" />
                      {post.readTime} min
                    </span>
                  </div>
                  <h3 className="font-display font-semibold text-white text-lg mb-2 group-hover:text-brand-purple-300 transition-colors">
                    {locale === 'ar' ? post.titleAr ?? post.titleEn : post.titleEn}
                  </h3>
                  <p className="text-ink-secondary text-sm leading-relaxed mb-4 line-clamp-2">
                    {locale === 'ar' ? post.excerptAr ?? post.excerptEn : post.excerptEn}
                  </p>
                  <span className="inline-flex items-center gap-1 text-brand-purple-400 text-sm group-hover:text-brand-purple-300 transition-colors">
                    {t('blog.readMore')}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerList>        <div className="text-center mt-12">
          <a href={`/${locale}/blog`}>
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500 text-white rounded-xl px-6 py-3 font-semibold hover:shadow-lg hover:shadow-brand-purple-500/30 transition-all">
              {t('blog.viewAll')}
              <ArrowRight className="w-4 h-4" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
