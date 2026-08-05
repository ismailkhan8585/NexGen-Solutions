import Link from 'next/link';
import { ArrowRight, FolderOpen } from 'lucide-react';
import { ProjectImage } from '@/components/media/project-image';
import { GradientBadge } from '@/components/ui/gradient-badge';
import { TechPill } from '@/components/ui/tech-pill';
import type { Locale } from '@/lib/i18n';
import { isDemoProject } from '@/lib/projects';
import { serverTranslate } from '@/lib/server-translations';

export interface ProjectData {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string | null;
  category: string;
  classification: 'CLIENT' | 'DEMO';
  challengeEn: string | null;
  challengeAr: string | null;
  solutionEn: string | null;
  solutionAr: string | null;
  featuresEn: string[];
  featuresAr: string[];
  coverImage: string | null;
  liveUrl: string | null;
  techStack: string[];
}

export function Portfolio({ projects, locale }: { projects: ProjectData[]; locale: Locale }) {
  const t = (key: string) => serverTranslate(locale, key);

  return (
    <section id="work" className="section-padding bg-surface">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl">
          <GradientBadge className="mb-4">{t('work.badge')}</GradientBadge>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{t('work.title')}</h2>
          <p className="mt-4 text-base leading-7 text-ink-secondary sm:text-lg">{t('work.subtitle')}</p>
        </header>

        {projects.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-surface-border bg-surface-card/60 px-6 py-14 text-center">
            <FolderOpen className="mx-auto h-9 w-9 text-ink-muted" />
            <h3 className="mt-4 font-display text-xl font-semibold text-white">{t('work.emptyTitle')}</h3>
            <p className="mt-2 text-sm text-ink-muted">{t('work.emptyText')}</p>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {projects.slice(0, 2).map((project, index) => {
              const title = locale === 'ar' ? project.titleAr! : project.titleEn;
              const summary = locale === 'ar'
                ? project.solutionAr ?? project.challengeAr
                : project.solutionEn ?? project.challengeEn;
              const features = locale === 'ar' ? project.featuresAr : project.featuresEn;
              const demo = project.classification === 'DEMO' || isDemoProject(project.liveUrl);

              return (
                <Link
                  key={project.id}
                  href={`/${locale}/work/${project.slug}`}
                  className={`group overflow-hidden rounded-3xl border border-surface-border bg-surface-card transition hover:-translate-y-1 hover:border-brand-cyan-500/30 focus-visible:ring-2 focus-visible:ring-brand-cyan-400 ${index === 0 ? 'lg:row-span-2' : ''}`}
                >
                  <div className={`relative overflow-hidden bg-surface-hover ${index === 0 ? 'aspect-[4/3] lg:h-full lg:min-h-[560px]' : 'aspect-[16/8]'}`}>
                    <ProjectImage
                      src={project.coverImage}
                      alt={title}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="transition-transform duration-500 group-hover:scale-[1.025]"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-surface via-surface/90 to-transparent p-6 pt-20">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white">{t(`work.${project.category.toLowerCase()}`)}</span>
                        {demo && <span className="rounded-full bg-gold-500/15 px-3 py-1 text-xs font-semibold text-gold-300">{t('work.demo')}</span>}
                      </div>
                      <h3 className="mt-3 font-display text-2xl font-semibold text-white">{title}</h3>
                      {summary && <p className="mt-2 line-clamp-2 text-sm leading-6 text-ink-secondary">{summary}</p>}
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {features.slice(0, 1).map((feature) => <TechPill key={feature}>{feature}</TechPill>)}
                        {project.techStack.slice(0, 2).map((tech) => <TechPill key={tech}>{tech}</TechPill>)}
                      </div>
                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-cyan-300">
                        {t('work.viewCase')}<ArrowRight className="h-4 w-4 rtl:rotate-180" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <div className="mt-9">
          <Link href={`/${locale}/work`} className="inline-flex min-h-[48px] items-center gap-2 rounded-xl border border-surface-border px-5 font-semibold text-white hover:border-brand-cyan-500/30">
            {t('work.viewAll')}<ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </section>
  );
}
