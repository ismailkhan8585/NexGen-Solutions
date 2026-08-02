'use client';

import { useI18n } from '@/components/i18n-provider';
import { GradientBadge } from '@/components/ui/gradient-badge';
import { StaggerList, StaggerItem } from '@/components/animations/stagger-list';
import { Monitor, Server, Smartphone, Database, Cloud, BrainCircuit } from 'lucide-react';

const categories = [
  {
    icon: Monitor,
    key: 'frontend',
    techs: ['React', 'Next.js', 'Vue', 'TypeScript', 'Tailwind', 'Framer Motion'],
  },
  {
    icon: Server,
    key: 'backend',
    techs: ['Node.js', 'Python', 'Express', 'FastAPI', 'GraphQL', 'tRPC'],
  },
  {
    icon: Smartphone,
    key: 'mobile',
    techs: ['React Native', 'Flutter', 'Expo', 'Swift', 'Kotlin'],
  },
  {
    icon: Database,
    key: 'database',
    techs: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Prisma', 'Supabase'],
  },
  {
    icon: Cloud,
    key: 'cloud',
    techs: ['AWS', 'Google Cloud', 'Docker', 'Kubernetes', 'GitHub Actions', 'Vercel'],
  },
  {
    icon: BrainCircuit,
    key: 'ai',
    techs: ['OpenAI', 'LangChain', 'TensorFlow', 'n8n', 'Stripe', 'Twilio'],
  },
];

export function TechStack() {
  const { t } = useI18n();

  return (
    <section className="section-padding bg-surface relative">
      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <GradientBadge className="mb-4">{t('techstack.badge')}</GradientBadge>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            {t('techstack.title')}
          </h2>
          <p className="text-ink-secondary text-lg max-w-2xl mx-auto">
            {t('techstack.subtitle')}
          </p>
        </div>

        <StaggerList className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <StaggerItem key={cat.key}>
              <div className="bg-surface-card border border-surface-border rounded-2xl p-6 hover:border-surface-borderHover transition-all">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-brand-purple-500/10 flex items-center justify-center">
                    <cat.icon className="w-5 h-5 text-brand-purple-400" />
                  </div>
                  <h3 className="font-display font-semibold text-white text-lg">
                    {t(`techstack.${cat.key}`)}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.techs.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-md bg-surface-hover border border-surface-border text-xs font-mono text-ink-secondary hover:text-white hover:border-surface-borderHover transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}
