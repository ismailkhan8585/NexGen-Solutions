'use client';

import { motion } from 'framer-motion';
import { useI18n } from '@/components/i18n-provider';
import { GradientText } from '@/components/ui/gradient-text';
import { GradientButton } from '@/components/ui/gradient-button';
import { GridPattern } from '@/components/animations/grid-pattern';
import { WhatsAppButton } from '@/components/layout/whatsapp-button';
import { CountUp } from '@/components/animations/count-up';
import {
  Globe,
  Smartphone,
  BrainCircuit,
  Cloud,
  Database,
  Boxes,
} from 'lucide-react';

const techIcons = [
  { icon: Globe, name: 'Next.js', angle: 0 },
  { icon: Smartphone, name: 'React', angle: 60 },
  { icon: BrainCircuit, name: 'TypeScript', angle: 120 },
  { icon: Cloud, name: 'Node.js', angle: 180 },
  { icon: Database, name: 'PostgreSQL', angle: 240 },
  { icon: Boxes, name: 'AWS', angle: 300 },
];

export interface SiteStats {
  totalProjects: number;
  totalClients: number;
  totalCountries: number;
  yearsExperience: number;
}

export function Hero({ stats: siteStats }: { stats: SiteStats }) {
  const { t } = useI18n();
  const stats = [
    { value: siteStats.totalProjects, suffix: '+', label: t('hero.stat_projects') },
    { value: siteStats.totalClients, suffix: '+', label: t('hero.stat_clients') },
    { value: siteStats.totalCountries, suffix: '+', label: t('hero.stat_countries') },
    { value: siteStats.yearsExperience, suffix: '+', label: t('hero.stat_years') },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-[72px]">
      <div className="absolute inset-0 bg-surface" />

      <GridPattern className="opacity-30" />

      <div className="absolute inset-0 bg-gradient-radial from-brand-purple-500/10 via-transparent to-transparent" style={{ borderRadius: '50%' }} />

      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-20 left-10 w-96 h-96 rounded-full bg-brand-purple-500/20 blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-brand-cyan-500/15 blur-3xl pointer-events-none"
      />

      <div className="container-max px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-card border border-brand-purple-500/30 mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500 animate-pulse" />
              <span className="text-sm font-medium text-ink-secondary">
                {t('hero.badge')}
              </span>
            </motion.div>

            <h1 className="font-display font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] mb-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="block text-white"
              >
                {t('hero.title_1')}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="block"
              >
                <GradientText>{t('hero.title_2')}</GradientText>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="block text-ink-secondary"
              >
                {t('hero.title_3')}
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-ink-secondary text-lg max-w-2xl mb-8 leading-relaxed"
            >
              {t('hero.desc')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-wrap items-center gap-3 mb-12"
            >
              <a href="#contact">
                <GradientButton className="px-7 py-3.5 text-base shadow-lg shadow-brand-purple-500/30">
                  {t('hero.cta_project')}
                </GradientButton>
              </a>
              <a
                href="#work"
                className="inline-flex items-center justify-center rounded-xl border border-surface-border bg-surface-card px-7 py-3.5 font-semibold text-ink-primary hover:border-surface-borderHover hover:bg-surface-hover transition-all active:scale-95"
              >
                {t('hero.cta_work')}
              </a>
              <WhatsAppButton label={t('hero.cta_whatsapp')} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex flex-wrap items-center gap-6"
            >
              {stats.map((stat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="font-mono font-bold text-2xl text-white">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </span>
                  <span className="text-ink-muted text-sm">{stat.label}</span>
                  {i < stats.length - 1 && (
                    <span className="ml-4 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-brand-purple-500 to-brand-cyan-500" />
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          <div className="hidden lg:flex items-center justify-center relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              className="relative w-[400px] h-[400px]"
            >
              {techIcons.map((tech, i) => {
                const radius = 160;
                const radian = (tech.angle * Math.PI) / 180;
                const x = Math.cos(radian) * radius;
                const y = Math.sin(radian) * radius;
                return (
                  <motion.div
                    key={tech.name}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="absolute top-1/2 left-1/2"
                    style={{ x, y }}
                  >
                    <div className="flex flex-col items-center gap-2 -translate-x-1/2 -translate-y-1/2">
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 0.3,
                        }}
                        className="w-16 h-16 rounded-2xl bg-surface-card border border-surface-border flex items-center justify-center shadow-lg shadow-brand-purple-500/10"
                      >
                        <tech.icon className="w-7 h-7 text-brand-purple-400" />
                      </motion.div>
                      <span className="text-xs font-mono text-ink-secondary">
                        {tech.name}
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-brand-purple-500/20 to-brand-cyan-500/20 blur-2xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-brand-purple-500 to-brand-cyan-500 flex items-center justify-center shadow-2xl shadow-brand-purple-500/40">
                <span className="font-display font-bold text-white text-2xl">NG</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
