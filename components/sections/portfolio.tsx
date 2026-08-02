'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useI18n } from '@/components/i18n-provider';
import { GradientBadge } from '@/components/ui/gradient-badge';
import { StaggerList, StaggerItem } from '@/components/animations/stagger-list';
import { TechPill } from '@/components/ui/tech-pill';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { isDemoProject } from '@/lib/projects';

export interface ProjectData {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string | null;
  category: string;
  coverImage: string | null;
  liveUrl: string | null;
  techStack: string[];
}

const categoryFilters = [
  { key: 'all', labelKey: 'work.all' },
  { key: 'WEB', labelKey: 'work.web' },
  { key: 'MOBILE', labelKey: 'work.mobile' },
  { key: 'ECOMMERCE', labelKey: 'work.ecommerce' },
  { key: 'SAAS', labelKey: 'work.saas' },
  { key: 'AI', labelKey: 'work.ai' },
  { key: 'DESIGN', labelKey: 'work.design' },
  { key: 'CLOUD', labelKey: 'work.cloud' },
  { key: 'BLOCKCHAIN', labelKey: 'work.blockchain' },
  { key: 'SOFTWARE', labelKey: 'work.software' },
  { key: 'MARKETING', labelKey: 'work.marketing' },
];

export function Portfolio({ projects }: { projects: ProjectData[] }) {
  const { t, locale } = useI18n();
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="work" className="section-padding bg-surface relative">
      <div className="container-max relative z-10">
        <div className="text-center mb-12">
          <GradientBadge className="mb-4">{t('work.badge')}</GradientBadge>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            {t('work.title')}
          </h2>
          <p className="text-ink-secondary text-lg max-w-2xl mx-auto">
            {t('work.subtitle')}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categoryFilters.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat.key
                  ? 'bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500 text-white'
                  : 'bg-surface-card border border-surface-border text-ink-secondary hover:text-white hover:border-surface-borderHover'
              }`}
            >
              {t(cat.labelKey)}
            </button>
          ))}
        </div>

        <StaggerList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-surface-border bg-surface-card/60 px-6 py-14 text-center">
              <p className="font-display font-semibold text-white">{t('work.emptyTitle')}</p>
              <p className="mt-2 text-sm text-ink-muted">{t('work.emptyText')}</p>
            </div>
          )}
          {projects.length > 0 && filtered.length === 0 && filter !== 'all' && (
            <div className="col-span-full text-center py-16 text-ink-muted text-sm">
              {t('work.filterEmpty')}
            </div>
          )}
          {filtered.map((project) => (
            <StaggerItem key={project.id}>
              <Link
                href={`/${locale}/work/${project.slug}`}
                className="group block rounded-2xl overflow-hidden bg-surface-card border border-surface-border transition-all duration-300 hover:border-surface-borderHover hover:scale-[1.02] hover:shadow-2xl hover:shadow-brand-purple-500/20"
              >
                <div className="relative aspect-video overflow-hidden">
                  {project.coverImage && (
                    <Image
                      src={project.coverImage}
                      alt={project.titleEn}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="inline-flex items-center gap-1.5 text-white text-sm font-medium">
                      {t('work.viewCase')}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <span className="inline-block px-2.5 py-1 rounded-full bg-gradient-to-r from-brand-purple-500/20 to-brand-cyan-500/20 text-brand-purple-300 text-xs font-medium mb-3">
                    {t(`work.${project.category.toLowerCase()}`) !== `work.${project.category.toLowerCase()}`
                      ? t(`work.${project.category.toLowerCase()}`)
                      : project.category}
                  </span>
                  <h3 className="font-display font-semibold text-white text-lg mb-3">
                    {locale === 'ar' ? project.titleAr ?? project.titleEn : project.titleEn}
                  </h3>
                  {isDemoProject(project.liveUrl) && <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gold-400">{t('work.demo')}</p>}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <TechPill key={tech}>{tech}</TechPill>
                    ))}
                  </div>
                  {project.liveUrl && !isDemoProject(project.liveUrl) && (
                    <span className="inline-flex items-center gap-1 text-brand-purple-400 text-sm hover:text-brand-purple-300 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                      {t('work.liveDemo')}
                    </span>
                  )}
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerList>


        <div className="text-center mt-12">
          <Link href={`/${locale}/work`}>
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500 text-white rounded-xl px-6 py-3 font-semibold hover:shadow-lg hover:shadow-brand-purple-500/30 transition-all">
              {t('work.viewAll')}
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
