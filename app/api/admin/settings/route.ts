import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { cleanAdminText, requireAdmin } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';

export const runtime = 'nodejs';
export async function GET(){const auth=await requireAdmin(true);if(auth.response)return auth.response;return NextResponse.json(await prisma.siteSettings.findFirst())}
export async function PATCH(request:Request){const auth=await requireAdmin(true);if(auth.response)return auth.response;let body:Record<string,unknown>;try{body=await request.json()}catch{return NextResponse.json({error:'invalid_request'},{status:400})}const data={companyNameEn:cleanAdminText(body.companyNameEn,160),companyNameAr:cleanAdminText(body.companyNameAr,160),taglineEn:cleanAdminText(body.taglineEn,300)||null,taglineAr:cleanAdminText(body.taglineAr,300)||null,email:cleanAdminText(body.email,254),phone:cleanAdminText(body.phone,30)||null,whatsapp:cleanAdminText(body.whatsapp,30)||null,linkedinUrl:cleanAdminText(body.linkedinUrl,500)||null,githubUrl:cleanAdminText(body.githubUrl,500)||null,twitterUrl:cleanAdminText(body.twitterUrl,500)||null,instagramUrl:cleanAdminText(body.instagramUrl,500)||null};if(!data.companyNameEn||!data.email||!data.email.includes('@'))return NextResponse.json({error:'validation_failed'},{status:400});const existing=await prisma.siteSettings.findFirst();const result=existing?await prisma.siteSettings.update({where:{id:existing.id},data}):await prisma.siteSettings.create({data});revalidatePath('/','layout');return NextResponse.json(result)}
