import type { Metadata } from 'next';
import { ensurePrismaConnection, prisma } from '@/lib/prisma';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp';
import { GradientBadge } from '@/components/ui/gradient-badge';
import { CountUp } from '@/components/animations/count-up';
import { FadeIn } from '@/components/animations/fade-in';
import { Target, Eye, Heart, Award, Users, Globe, TrendingUp } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'The story behind NexGen Solutions — our mission, vision, and values.',
};

const timeline = [
  { year: '2020', title: 'Founded', desc: 'NexGen Solutions started with a vision to build world-class digital products.' },
  { year: '2021', title: 'First 10 Clients', desc: 'Expanded across Pakistan and the Middle East with 10 successful projects.' },
  { year: '2022', title: 'Global Expansion', desc: 'Started serving clients in UK, USA, and UAE. Team grew to 15 members.' },
  { year: '2023', title: 'Award Recognition', desc: 'Recognized for excellence in web development and mobile app design.' },
  { year: '2024', title: '100+ Projects', desc: 'Delivered over 100 projects across 10+ countries worldwide.' },
  { year: '2025', title: 'AI & Future', desc: 'Expanded into AI, automation, and blockchain development services.' },
];

const values = [
  { icon: Target, title: 'Excellence', desc: 'We strive for perfection in every line of code and every pixel.' },
  { icon: Heart, title: 'Client First', desc: 'Our clients success is our success. We go above and beyond.' },
  { icon: TrendingUp, title: 'Innovation', desc: 'We embrace new technologies to deliver cutting-edge solutions.' },
  { icon: Globe, title: 'Global Mindset', desc: 'We think globally, understanding diverse markets and cultures.' },
];

export default async function AboutPage() {
  await ensurePrismaConnection();
  const settings = await prisma.siteSettings.findFirst();

  const statsData = settings
    ? [
        { value: settings.totalProjects, suffix: '+', label: 'Projects Delivered', icon: Award },
        { value: settings.totalClients, suffix: '+', label: 'Happy Clients', icon: Users },
        { value: settings.totalCountries, suffix: '+', label: 'Countries Served', icon: Globe },
        { value: settings.yearsExperience, suffix: '+', label: 'Years Experience', icon: TrendingUp },
      ]
    : [
        { value: 100, suffix: '+', label: 'Projects Delivered', icon: Award },
        { value: 50, suffix: '+', label: 'Happy Clients', icon: Users },
        { value: 10, suffix: '+', label: 'Countries Served', icon: Globe },
        { value: 5, suffix: '+', label: 'Years Experience', icon: TrendingUp },
      ];

  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="section-padding bg-surface">
          <div className="container-max max-w-4xl">
            <div className="text-center mb-16">
              <GradientBadge className="mb-4">About Us</GradientBadge>
              <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-4">
                About NexGen Solutions
              </h1>
              <p className="text-ink-secondary text-lg max-w-2xl mx-auto">
                The story behind the code
              </p>
            </div>

            <div className="prose prose-invert max-w-none mb-16">
              <p className="text-ink-secondary text-lg leading-relaxed">
                NexGen Solutions is a digital agency and technology company that builds world-class
                websites, mobile apps, and software solutions for businesses worldwide. Founded in
                2020, we have grown from a small team of passionate developers into a global agency
                serving clients in over 10 countries.
              </p>
              <p className="text-ink-secondary text-lg leading-relaxed mt-4">
                We believe that great software is not just about code — it is about understanding
                business goals, designing beautiful experiences, and delivering measurable results.
                That is why we combine technical excellence with strategic thinking to create
                products that drive real business growth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
              <FadeIn>
                <div className="bg-surface-card border border-surface-border rounded-2xl p-8">
                  <div className="w-12 h-12 rounded-xl bg-brand-purple-500/10 flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-brand-purple-400" />
                  </div>
                  <h2 className="font-display font-semibold text-2xl text-white mb-3">Our Mission</h2>
                  <p className="text-ink-secondary leading-relaxed">
                    To empower businesses with world-class digital solutions that drive growth,
                    efficiency, and innovation. We build technology that makes a difference.
                  </p>
                </div>
              </FadeIn>
              <FadeIn delay={0.1}>
                <div className="bg-surface-card border border-surface-border rounded-2xl p-8">
                  <div className="w-12 h-12 rounded-xl bg-brand-cyan-500/10 flex items-center justify-center mb-4">
                    <Eye className="w-6 h-6 text-brand-cyan-400" />
                  </div>
                  <h2 className="font-display font-semibold text-2xl text-white mb-3">Our Vision</h2>
                  <p className="text-ink-secondary leading-relaxed">
                    To be the most trusted digital partner for businesses worldwide, recognized
                    for excellence, innovation, and the measurable impact we create.
                  </p>
                </div>
              </FadeIn>
            </div>

            <h2 className="font-display font-semibold text-3xl text-white mb-8">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
              {values.map((value) => (
                <div key={value.title} className="bg-surface-card border border-surface-border rounded-2xl p-6">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-3">
                    <value.icon className="w-5 h-5 text-brand-purple-400" />
                  </div>
                  <h3 className="font-display font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-ink-secondary text-sm leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>

            <h2 className="font-display font-semibold text-3xl text-white mb-8">Our Journey</h2>
            <div className="relative pl-8 mb-16">
              <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-brand-purple-500 to-brand-cyan-500" />
              {timeline.map((item, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="relative mb-8">
                    <div className="absolute -left-[22px] top-1 w-4 h-4 rounded-full bg-gradient-to-br from-brand-purple-500 to-brand-cyan-500 border-2 border-surface" />
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-mono font-bold text-brand-purple-400 text-lg">{item.year}</span>
                      <h3 className="font-display font-semibold text-white">{item.title}</h3>
                    </div>
                    <p className="text-ink-secondary text-sm">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-12 border-t border-surface-border">
              {statsData.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-mono font-bold text-4xl mb-2 bg-gradient-to-r from-brand-purple-400 to-brand-cyan-400 bg-clip-text text-transparent">
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-ink-secondary text-sm">{stat.label}</p>
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
