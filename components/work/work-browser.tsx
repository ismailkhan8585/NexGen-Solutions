'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowRight, ExternalLink, FolderOpen } from 'lucide-react';
import { TechPill } from '@/components/ui/tech-pill';

interface ProjectSummary {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string | null;
  category: string;
  coverImage: string | null;
  liveUrl: string | null;
  techStack: string[];
}

const filters = ['all', 'WEB', 'MOBILE', 'ECOMMERCE', 'SAAS', 'AI', 'DESIGN', 'CLOUD', 'BLOCKCHAIN', 'SOFTWARE', 'MARKETING'];

export function WorkBrowser({ projects, locale }: { projects: ProjectSummary[]; locale: string }) {
  const [filter, setFilter] = useState('all');
  const filtered = useMemo(
    () => filter === 'all' ? projects : projects.filter((project) => project.category === filter),
    [filter, projects]
  );

  return (
    <>
      <div className="mb-10 flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center" aria-label="Project categories">
        {filters.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            aria-pressed={filter === category}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              filter === category
                ? 'bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500 text-white shadow-lg shadow-brand-purple-500/20'
                : 'border border-surface-border bg-surface-card text-ink-secondary hover:border-surface-borderHover hover:text-white'
            }`}
          >
            {category === 'all' ? 'All work' : category.replace('_', ' ')}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-surface-border bg-surface-card/60 px-6 py-16 text-center">
          <FolderOpen className="mx-auto h-10 w-10 text-brand-purple-400" />
          <h2 className="mt-4 font-display text-xl font-semibold text-white">No projects in this category yet</h2>
          <p className="mt-2 text-sm text-ink-muted">Choose another category or contact us for relevant private work.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <Link
              key={project.id}
              href={`/${locale}/work/${project.slug}`}
              className="group overflow-hidden rounded-2xl border border-surface-border bg-surface-card transition-all duration-300 hover:-translate-y-1 hover:border-brand-purple-500/50 hover:shadow-2xl hover:shadow-brand-purple-500/10"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-brand-purple-500/15 to-brand-cyan-500/10">
                {project.coverImage && (
                  <Image
                    src={project.coverImage}
                    alt={project.titleEn}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-transparent to-transparent" />
              </div>
              <div className="p-5 sm:p-6">
                <span className="rounded-full bg-brand-purple-500/15 px-2.5 py-1 text-xs font-medium text-brand-purple-300">
                  {project.category}
                </span>
                <h2 className="mt-4 font-display text-xl font-semibold text-white transition-colors group-hover:text-brand-purple-300">
                  {locale === 'ar' ? project.titleAr ?? project.titleEn : project.titleEn}
                </h2>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((tech) => <TechPill key={tech}>{tech}</TechPill>)}
                </div>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-1.5 font-medium text-brand-purple-400">
                    View case study <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                  </span>
                  {project.liveUrl && <ExternalLink className="h-4 w-4 text-ink-muted" aria-label="Live project available" />}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
