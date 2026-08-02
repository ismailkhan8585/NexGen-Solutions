import type { MetadataRoute } from 'next'; import { businessConfig } from '@/lib/business-config';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',allow:'/',disallow:['/admin','/api/']},sitemap:`${businessConfig.appUrl.replace(/\/$/,'')}/sitemap.xml`,host:businessConfig.appUrl}}
