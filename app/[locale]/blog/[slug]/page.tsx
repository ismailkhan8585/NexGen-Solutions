import type { Metadata } from 'next';
import Image from 'next/image';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import { ensurePrismaConnection, prisma } from '@/lib/prisma';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { FloatingWhatsApp } from '@/components/layout/floating-whatsapp';
import { GradientBadge } from '@/components/ui/gradient-badge';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { businessConfig } from '@/lib/business-config';
import { JsonLd, localizedMetadata } from '@/lib/seo';
import { ShareArticle } from '@/components/blog/share-article';

export const revalidate = 300;

const getPost = cache(async (slug: string) => {
  await ensurePrismaConnection();
  return prisma.blogPost.findUnique({ where: { slug } });
});

export async function generateMetadata(props: { params: Promise<{ slug: string; locale: 'ar' | 'en' }> }): Promise<Metadata> {
  const params = await props.params;
  const post = await getPost(params.slug);
  if (!post) return {};
  const title = params.locale === 'ar' ? post.titleAr ?? post.titleEn : post.titleEn;
  const description = params.locale === 'ar' ? post.excerptAr ?? '' : post.excerptEn ?? '';
  return localizedMetadata(params.locale, `blog/${post.slug}`, title, description);
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string; locale: 'ar' | 'en' }> }) {
  const params = await props.params;
  const post = await getPost(params.slug);
  if (!post || !post.isPublished || (params.locale === 'ar' && (!post.titleAr || !post.contentAr))) notFound();
  const ar = params.locale === 'ar';
  const title = ar ? post.titleAr! : post.titleEn;
  const url = `${businessConfig.appUrl}/${params.locale}/blog/${post.slug}`;

  const related = await prisma.blogPost.findMany({
    where: { isPublished: true, category: post.category, slug: { not: post.slug }, ...(ar ? { titleAr: { not: null } } : {}) },
    take: 3,
    select: { id: true, slug: true, titleEn: true, titleAr: true, coverImage: true },
  });

  return (
    <>
      <JsonLd data={{'@context':'https://schema.org','@graph':[
        {'@type':'Article',headline:title,description:(ar?post.excerptAr:post.excerptEn)||undefined,datePublished:post.publishedAt?.toISOString(),dateModified:post.updatedAt.toISOString(),author:{'@type':'Person',name:post.author},publisher:{'@type':'Organization',name:businessConfig.companyName[params.locale],url:businessConfig.appUrl},mainEntityOfPage:url,...(post.coverImage?{image:post.coverImage}:{})},
        {'@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:ar?'الرئيسية':'Home',item:`${businessConfig.appUrl}/${params.locale}`},{'@type':'ListItem',position:2,name:ar?'المقالات':'Insights',item:`${businessConfig.appUrl}/${params.locale}/blog`},{'@type':'ListItem',position:3,name:title,item:url}]}
      ]}} />
      <Navbar />
      <main className="pt-[72px]">
        <article className="section-padding bg-surface">
          <div className="container-max max-w-3xl">
            <a href={`/${params.locale}/blog`} className="inline-flex items-center gap-2 text-ink-secondary hover:text-white text-sm mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" /> {ar ? 'كل المقالات' : 'All Articles'}
            </a>

            <GradientBadge className="mb-4">{post.category.replace('_', ' ')}</GradientBadge>
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
              {params.locale === 'ar' ? post.titleAr ?? post.titleEn : post.titleEn}
            </h1>

            <div className="flex items-center gap-4 text-ink-muted text-sm mb-8">
              <span>{post.author}</span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {post.publishedAt ? new Intl.DateTimeFormat(ar ? 'ar-SA' : 'en-SA', { dateStyle: 'medium', timeZone: 'Asia/Riyadh' }).format(post.publishedAt) : ''}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> {post.readTime} {ar ? 'دقائق قراءة' : 'min read'}
              </span>
            </div>

            {post.coverImage && (
              <div className="relative rounded-2xl overflow-hidden mb-8 aspect-video">
                <Image src={post.coverImage} alt={title} fill priority sizes="(max-width: 768px) 100vw, 768px" className="object-cover" />
              </div>
            )}

            <div className="prose prose-invert max-w-none">
              {(ar ? post.contentAr : post.contentEn)?.split('\n').map((line, i) => {
                if (line.startsWith('# ')) return <h1 key={i} className="font-display font-bold text-2xl text-white mt-6 mb-3">{line.slice(2)}</h1>;
                if (line.startsWith('## ')) return <h2 key={i} className="font-display font-semibold text-xl text-white mt-6 mb-3">{line.slice(3)}</h2>;
                if (line.startsWith('- ')) return <li key={i} className="text-ink-secondary ml-4">{line.slice(2)}</li>;
                if (line.trim()) return <p key={i} className="text-ink-secondary leading-relaxed mb-4">{line}</p>;
                return null;
              })}
            </div>

            <div className="mt-12 border-t border-surface-border pt-8"><ShareArticle title={title} url={url} locale={params.locale}/></div>

            {related.length > 0 && (
              <div className="mt-16">
                <h2 className="font-display font-semibold text-2xl text-white mb-6">{ar ? 'مقالات ذات صلة' : 'Related Articles'}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map((rel) => (
                    <a key={rel.id} href={`/${params.locale}/blog/${rel.slug}`} className="group rounded-2xl overflow-hidden bg-surface-card border border-surface-border hover:border-surface-borderHover transition-all">
                      {rel.coverImage && (
                        <div className="relative aspect-video overflow-hidden">
                          <Image src={rel.coverImage} alt={params.locale === 'ar' ? rel.titleAr ?? rel.titleEn : rel.titleEn} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-display font-medium text-white text-sm group-hover:text-brand-purple-300 transition-colors line-clamp-2">
                          {params.locale === 'ar' ? rel.titleAr ?? rel.titleEn : rel.titleEn}
                        </h3>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
