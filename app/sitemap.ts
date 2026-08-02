import type { MetadataRoute } from 'next';
import { businessConfig } from '@/lib/business-config';
import { seoLandings } from '@/lib/seo-landings';
import { serviceCatalog } from '@/lib/service-catalog';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
const staticPaths=['','about','services','work','blog','team','pricing','contact','privacy-policy','terms-and-conditions','cookie-policy','refund-cancellation-policy'];
export default async function sitemap():Promise<MetadataRoute.Sitemap>{
  const base=businessConfig.appUrl.replace(/\/$/,''); const now=new Date();
  const paths=[...staticPaths,...serviceCatalog.map(s=>`services/${s.slug}`),...seoLandings.map(s=>`solutions/${s.slug}`)];
  const entries:MetadataRoute.Sitemap=paths.flatMap(path=>(['ar','en'] as const).map(locale=>({url:`${base}/${locale}${path?`/${path}`:''}`,lastModified:now,changeFrequency:path?'monthly':'weekly',priority:path?0.7:1,alternates:{languages:{ar:`${base}/ar${path?`/${path}`:''}`,en:`${base}/en${path?`/${path}`:''}`}}})));
  try {const [posts,projects]=await Promise.all([prisma.blogPost.findMany({where:{isPublished:true},select:{slug:true,updatedAt:true,titleAr:true}}),prisma.project.findMany({where:{isActive:true},select:{slug:true,updatedAt:true,titleAr:true}})]);for(const item of posts)for(const locale of (item.titleAr?['ar','en']:['en']) as Array<'ar'|'en'>)entries.push({url:`${base}/${locale}/blog/${item.slug}`,lastModified:item.updatedAt});for(const item of projects)for(const locale of (item.titleAr?['ar','en']:['en']) as Array<'ar'|'en'>)entries.push({url:`${base}/${locale}/work/${item.slug}`,lastModified:item.updatedAt});}catch{/* Static sitemap remains available while the database is temporarily unreachable. */}
  return entries;
}
