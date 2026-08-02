import type { Metadata } from 'next';
import Image from 'next/image';
import { ensurePrismaConnection, prisma } from '@/lib/prisma';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp';
import { GradientBadge } from '@/components/ui/gradient-badge';
import { Linkedin, Github, Twitter } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Team',
  description: 'Meet the experts behind NexGen Solutions.',
};

export default async function TeamPage() {
  await ensurePrismaConnection();
  const members = await prisma.teamMember.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
  });

  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="section-padding bg-surface">
          <div className="container-max">
            <div className="text-center mb-16">
              <GradientBadge className="mb-4">Our Team</GradientBadge>
              <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
                The Team Behind the Magic
              </h1>
              <p className="text-ink-secondary text-lg max-w-2xl mx-auto">
                Meet the experts who bring your vision to life
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member) => (
                <div key={member.id} className="group relative rounded-2xl overflow-hidden bg-surface-card border border-surface-border hover:border-surface-borderHover transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-purple-500/20">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    {member.photo && (
                      <Image src={member.photo} alt={member.nameEn} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {member.linkedinUrl && (
                        <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-surface/80 backdrop-blur-sm flex items-center justify-center text-ink-secondary hover:text-white transition-colors">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {member.githubUrl && (
                        <a href={member.githubUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-surface/80 backdrop-blur-sm flex items-center justify-center text-ink-secondary hover:text-white transition-colors">
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {member.twitterUrl && (
                        <a href={member.twitterUrl} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-surface/80 backdrop-blur-sm flex items-center justify-center text-ink-secondary hover:text-white transition-colors">
                          <Twitter className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-semibold text-white text-lg mb-1">{member.nameEn}</h3>
                    <p className="text-brand-purple-400 text-sm mb-3">{member.role}</p>
                    <p className="text-ink-secondary text-xs leading-relaxed mb-4">{member.bio}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {member.skills.slice(0, 4).map((skill) => (
                        <span key={skill} className="px-2 py-0.5 rounded-md bg-surface-hover border border-surface-border text-xs font-mono text-ink-secondary">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
