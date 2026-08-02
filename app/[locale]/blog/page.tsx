import type { Metadata } from 'next';
import { ensurePrismaConnection, prisma } from '@/lib/prisma';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp';
import { GradientBadge } from '@/components/ui/gradient-badge';
import { BlogBrowser } from '@/components/blog/blog-browser';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Practical articles about product engineering, design, AI, cloud, and digital growth.',
};

export default async function BlogPage({ params }: { params: { locale: string } }) {
  await ensurePrismaConnection();
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    orderBy: { publishedAt: 'desc' },
    select: {
      id: true,
      slug: true,
      titleEn: true,
      titleAr: true,
      excerptEn: true,
      excerptAr: true,
      coverImage: true,
      category: true,
      author: true,
      readTime: true,
      publishedAt: true,
    },
  });

  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="section-padding bg-surface">
          <div className="container-max">
            <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
              <GradientBadge className="mb-4">NexGen Insights</GradientBadge>
              <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Ideas for building better digital products
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-secondary sm:text-lg">
                Clear, practical thinking from our engineering, design, AI, and growth teams.
              </p>
            </div>
            <BlogBrowser
              locale={params.locale}
              posts={posts.map((post) => ({
                ...post,
                publishedAt: post.publishedAt?.toISOString() ?? null,
              }))}
            />
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
