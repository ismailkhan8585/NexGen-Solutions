import type { Metadata } from 'next';
import { ensurePrismaConnection, prisma } from '@/lib/prisma';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp';
import { GradientBadge } from '@/components/ui/gradient-badge';
import { BlogBrowser } from '@/components/blog/blog-browser';
import { blogDraftIdeas } from '@/lib/blog-ideas';
import { localizedMetadata } from '@/lib/seo';

export const revalidate = 300;

export async function generateMetadata(props: { params: Promise<{ locale: 'ar' | 'en' }> }): Promise<Metadata> {
  const params = await props.params;
  const meta = params.locale === 'ar' ? { title: 'المقالات', description: 'مقالات منشورة حول المنتجات الرقمية والتصميم والتطوير.' } : { title: 'Insights', description: 'Published articles about digital products, design, and engineering.' };
  return localizedMetadata(params.locale, 'blog', meta.title, meta.description);
}

export default async function BlogPage(props: { params: Promise<{ locale: 'ar' | 'en' }> }) {
  const params = await props.params;
  let posts: Array<{ id: string; slug: string; titleEn: string; titleAr: string | null; excerptEn: string | null; excerptAr: string | null; coverImage: string | null; category: string; author: string; readTime: number; publishedAt: Date | null }> = [];
  let unavailable = false;
  try {
    await ensurePrismaConnection();
    posts = await prisma.blogPost.findMany({
    where: { isPublished: true, ...(params.locale === 'ar' ? { titleAr: { not: null } } : {}) },
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
  } catch { unavailable = true; }

  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="section-padding bg-surface">
          <div className="container-max">
            <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
              <GradientBadge className="mb-4">{params.locale === 'ar' ? 'مقالات نيكس جين' : 'NexGen Insights'}</GradientBadge>
              <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {params.locale === 'ar' ? 'أفكار عملية لبناء منتجات رقمية أفضل' : 'Practical ideas for better digital products'}
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-secondary sm:text-lg">
                {params.locale === 'ar' ? 'محتوى منشور حول التصميم والتطوير والذكاء الاصطناعي وتشغيل المنتجات.' : 'Published thinking about design, engineering, AI, and product operations.'}
              </p>
            </div>
            <BlogBrowser
              locale={params.locale}
              posts={posts.map((post) => ({
                ...post,
                publishedAt: post.publishedAt?.toISOString() ?? null,
              }))}
            />
            {unavailable && <p role="status" className="mt-8 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 text-center text-sm text-amber-100">{params.locale === 'ar' ? 'تعذر تحميل المقالات المنشورة مؤقتاً. حاول مرة أخرى لاحقاً.' : 'Published articles are temporarily unavailable. Please try again later.'}</p>}
            <section className="mt-16 border-t border-surface-border pt-12" aria-labelledby="editorial-roadmap"><div className="mx-auto max-w-3xl text-center"><p className="text-xs font-semibold uppercase tracking-wider text-brand-cyan-300">{params.locale === 'ar' ? 'مسودة خطة تحريرية' : 'Draft editorial roadmap'}</p><h2 id="editorial-roadmap" className="mt-3 font-display text-3xl font-semibold text-white">{params.locale === 'ar' ? 'أفكار قيد البحث وليست مقالات منشورة' : 'Research ideas—not published articles'}</h2><p className="mt-3 text-sm leading-6 text-ink-muted">{params.locale === 'ar' ? 'لن تُنشر هذه الموضوعات قبل البحث والتحرير والمراجعة المهنية المناسبة.' : 'These topics will not be published until they are researched, edited, and appropriately reviewed.'}</p></div><ul className="mx-auto mt-7 grid max-w-5xl gap-3 md:grid-cols-2">{blogDraftIdeas.map((idea) => <li key={idea.en} className="rounded-xl border border-dashed border-surface-border bg-surface-card/50 p-4 text-sm text-ink-secondary"><span className="me-2 rounded bg-surface px-2 py-1 text-[10px] font-semibold uppercase text-ink-muted">{params.locale === 'ar' ? 'مسودة' : 'Draft'}</span>{idea[params.locale]}</li>)}</ul></section>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
