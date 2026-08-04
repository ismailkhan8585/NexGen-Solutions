import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { ProjectCategory } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { cleanAdminText, requireAdmin } from '@/lib/admin-auth';
import { isSupportedImageUrl } from '@/lib/images';
import { getSafeExternalUrl } from '@/lib/projects';

export const runtime = 'nodejs';
const list = (value: unknown) => Array.isArray(value) ? value.map(item => cleanAdminText(item, 200)).filter(Boolean).slice(0, 30) : [];

export async function GET() {
  const auth = await requireAdmin(); if (auth.response) return auth.response;
  return NextResponse.json(await prisma.project.findMany({ orderBy: { createdAt: 'desc' }, select: { id:true,slug:true,titleEn:true,titleAr:true,category:true,classification:true,isVerified:true,resultsVerified:true,clientName:true,industryEn:true,industryAr:true,descriptionEn:true,descriptionAr:true,challengeEn:true,challengeAr:true,solutionEn:true,solutionAr:true,resultsEn:true,resultsAr:true,featuresEn:true,featuresAr:true,durationEn:true,durationAr:true,coverImage:true,photos:true,liveUrl:true,techStack:true,featured:true,isActive:true } }));
}

export async function POST(request: Request) {
  const auth = await requireAdmin(); if (auth.response) return auth.response;
  let body: Record<string, unknown>; try { body = await request.json(); } catch { return NextResponse.json({ error: 'invalid_request' }, { status: 400 }); }
  const slug = cleanAdminText(body.slug, 100).toLowerCase().replace(/[^a-z0-9-]/g, '');
  const titleEn = cleanAdminText(body.titleEn, 200);
  const category = Object.values(ProjectCategory).includes(body.category as ProjectCategory) ? body.category as ProjectCategory : null;
  if (!slug || titleEn.length < 2 || !category) return NextResponse.json({ error: 'validation_failed' }, { status: 400 });
  const rawCover = cleanAdminText(body.coverImage, 1000);
  const project = await prisma.project.create({ data: {
    slug, titleEn, titleAr:cleanAdminText(body.titleAr,200)||null, category,
    classification:'DEMO', isVerified:false, resultsVerified:false, clientName:null,
    industryEn:cleanAdminText(body.industryEn,200)||null, industryAr:cleanAdminText(body.industryAr,200)||null,
    descriptionEn:cleanAdminText(body.descriptionEn)||null, descriptionAr:cleanAdminText(body.descriptionAr)||null,
    challengeEn:cleanAdminText(body.challengeEn)||null, challengeAr:cleanAdminText(body.challengeAr)||null,
    solutionEn:cleanAdminText(body.solutionEn)||null, solutionAr:cleanAdminText(body.solutionAr)||null,
    resultsEn:null, resultsAr:null, featuresEn:list(body.featuresEn), featuresAr:list(body.featuresAr),
    durationEn:cleanAdminText(body.durationEn,100)||null, durationAr:cleanAdminText(body.durationAr,100)||null,
    coverImage:isSupportedImageUrl(rawCover)?rawCover:null, photos:list(body.photos).filter(isSupportedImageUrl),
    liveUrl:getSafeExternalUrl(cleanAdminText(body.liveUrl,1000)), techStack:list(body.techStack), isActive:true,
  } });
  revalidatePath('/', 'layout'); return NextResponse.json(project, { status: 201 });
}
