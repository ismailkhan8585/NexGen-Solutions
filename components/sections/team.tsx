'use client';

import { useI18n } from '@/components/i18n-provider';
import { GradientBadge } from '@/components/ui/gradient-badge';
import { StaggerList, StaggerItem } from '@/components/animations/stagger-list';
import { Linkedin } from 'lucide-react';
import Image from 'next/image';

export interface TeamData {
  id: string;
  nameEn: string;
  nameAr: string | null;
  role: string;
  roleAr: string | null;
  bio: string | null;
  bioAr: string | null;
  photo: string | null;
  linkedinUrl: string | null;
  skills: string[];
}

export function Team({ members }: { members: TeamData[] }) {
  const { t, locale } = useI18n();

  return (
    <section id="team" className="section-padding bg-surface relative">
      <div className="container-max relative z-10">
        <div className="text-center mb-16">
          <GradientBadge className="mb-4">{t('team.badge')}</GradientBadge>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            {t('team.title')}
          </h2>
          <p className="text-ink-secondary text-lg max-w-2xl mx-auto">
            {t('team.subtitle')}
          </p>
        </div>

        <StaggerList className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.length === 0 && (
            <div className="col-span-full rounded-2xl border border-dashed border-surface-border bg-surface-card/60 px-6 py-14 text-center">
              <p className="font-display font-semibold text-white">Meet the team soon</p>
              <p className="mt-2 text-sm text-ink-muted">Profiles are currently being updated.</p>
            </div>
          )}
          {members.map((member) => (
            <StaggerItem key={member.id}>
              <div className="group relative rounded-2xl overflow-hidden bg-surface-card border border-surface-border hover:border-surface-borderHover transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-purple-500/20">
                <div className="relative aspect-[4/5] overflow-hidden">
                  {member.photo && (
                    <Image
                      src={member.photo}
                      alt={member.nameEn}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 w-9 h-9 rounded-lg bg-surface/80 backdrop-blur-sm flex items-center justify-center text-ink-secondary hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-white text-lg mb-1">
                    {locale === 'ar' ? member.nameAr ?? member.nameEn : member.nameEn}
                  </h3>
                  <p className="text-brand-purple-400 text-sm mb-3">
                    {locale === 'ar' ? member.roleAr ?? member.role : member.role}
                  </p>
                  <p className="text-ink-secondary text-xs leading-relaxed mb-4">
                    {locale === 'ar' ? member.bioAr ?? member.bio : member.bio}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {member.skills.slice(0, 4).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-md bg-surface-hover border border-surface-border text-xs font-mono text-ink-secondary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerList>      </div>
    </section>
  );
}
