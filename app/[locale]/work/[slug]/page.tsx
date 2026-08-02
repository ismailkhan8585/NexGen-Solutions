import type { Metadata } from 'next';
import Image from 'next/image';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import { ensurePrismaConnection, prisma } from '@/lib/prisma';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp';
import { GradientBadge } from '@/components/ui/gradient-badge';
import { GradientButton } from '@/components/ui/gradient-button';
import { TechPill } from '@/components/ui/tech-pill';
import { ArrowLeft, ExternalLink, Github, Target, Lightbulb, TrendingUp, Quote } from 'lucide-react';

export const dynamic = 'force-dynamic';

const getProject = cache(async (slug: string) => {
  await ensurePrismaConnection();
  return prisma.project.findUnique({
    where: { slug },
    include: { testimonials: { where: { isApproved: true } } },
  });
});

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProject(params.slug);
  if (!project) return {};
  return { title: project.titleEn, description: project.descriptionEn ?? undefined };
}

export default async function CaseStudyPage({ params }: { params: { slug: string; locale: string } }) {
  const project = await getProject(params.slug);

  if (!project || !project.isActive) notFound();

  const allProjects = await prisma.project.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
    select: { slug: true },
  });
  const currentIdx = allProjects.findIndex((p) => p.slug === params.slug);
  const prevProject = currentIdx > 0 ? allProjects[currentIdx - 1] : null;
  const nextProject = currentIdx < allProjects.length - 1 ? allProjects[currentIdx + 1] : null;

  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="section-padding bg-surface">
          <div className="container-max max-w-4xl">
            <a href={`/${params.locale}/work`} className="inline-flex items-center gap-2 text-ink-secondary hover:text-white text-sm mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" /> All Projects
            </a>

            <GradientBadge className="mb-4">{project.category}</GradientBadge>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
              {params.locale === 'ar' ? project.titleAr ?? project.titleEn : project.titleEn}
            </h1>
            {project.clientName && (
              <p className="text-ink-secondary text-lg mb-8">
                {project.clientName}{project.clientCountry ? ` · ${project.clientCountry}` : ''}
              </p>
            )}

            {project.coverImage && (
              <div className="relative rounded-2xl overflow-hidden mb-12 aspect-video">
                <Image src={project.coverImage} alt={project.titleEn} fill priority sizes="(max-width: 896px) 100vw, 896px" className="object-cover" />
              </div>
            )}

            <p className="text-ink-secondary text-lg leading-relaxed mb-12">
              {params.locale === 'ar' ? project.descriptionAr ?? project.descriptionEn : project.descriptionEn}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {project.challenge && (
                <div className="bg-surface-card border border-surface-border rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-5 h-5 text-rose-400" />
                    <h2 className="font-display font-semibold text-white">Challenge</h2>
                  </div>
                  <p className="text-ink-secondary text-sm leading-relaxed">{project.challenge}</p>
                </div>
              )}
              {project.solution && (
                <div className="bg-surface-card border border-surface-border rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="w-5 h-5 text-brand-purple-400" />
                    <h2 className="font-display font-semibold text-white">Solution</h2>
                  </div>
                  <p className="text-ink-secondary text-sm leading-relaxed">{project.solution}</p>
                </div>
              )}
              {project.results && (
                <div className="bg-surface-card border border-surface-border rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                    <h2 className="font-display font-semibold text-white">Results</h2>
                  </div>
                  <p className="text-ink-secondary text-sm leading-relaxed">{project.results}</p>
                </div>
              )}
            </div>

            <h2 className="font-display font-semibold text-2xl text-white mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2 mb-12">
              {project.techStack.map((tech) => (
                <TechPill key={tech}>{tech}</TechPill>
              ))}
            </div>

            {project.photos.length > 1 && (
              <>
                <h2 className="font-display font-semibold text-2xl text-white mb-4">Gallery</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                  {project.photos.slice(1).map((photo, i) => (
                    <div key={photo} className="relative rounded-2xl overflow-hidden aspect-video">
                      <Image src={photo} alt={`${project.titleEn} ${i + 2}`} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover" />
                    </div>
                  ))}
                </div>
              </>
            )}

            {project.testimonials.length > 0 && (
              <div className="bg-surface-card border border-surface-border rounded-2xl p-8 mb-12 relative">
                <Quote className="absolute top-4 right-4 w-10 h-10 text-brand-purple-500/20" fill="currentColor" />
                <p className="text-ink-secondary text-lg leading-relaxed mb-4">
                  &ldquo;{project.testimonials[0].reviewEn}&rdquo;
                </p>
                <p className="text-white font-medium">
                  {project.testimonials[0].clientName}
                  {project.testimonials[0].clientCompany ? ` · ${project.testimonials[0].clientCompany}` : ''}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <GradientButton className="px-6 py-3">
                    <span className="inline-flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" /> Live Demo
                    </span>
                  </GradientButton>
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-surface-border bg-surface-card px-6 py-3 font-semibold text-ink-primary hover:bg-surface-hover transition-all">
                  <Github className="w-4 h-4" /> Code
                </a>
              )}
              <a href={`/${params.locale}/contact`}>
                <GradientButton className="px-6 py-3">Start Similar Project</GradientButton>
              </a>
            </div>

            <div className="flex justify-between pt-8 border-t border-surface-border">
              {prevProject ? (
                <a href={`/${params.locale}/work/${prevProject.slug}`} className="inline-flex items-center gap-2 text-ink-secondary hover:text-white text-sm transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Previous
                </a>
              ) : <span />}
              {nextProject ? (
                <a href={`/${params.locale}/work/${nextProject.slug}`} className="inline-flex items-center gap-2 text-ink-secondary hover:text-white text-sm transition-colors">
                  Next <ArrowLeft className="w-4 h-4 rotate-180" />
                </a>
              ) : <span />}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
