import { NextResponse } from 'next/server'; import { prisma } from '@/lib/prisma'; import { cleanAdminText,requireAdmin } from '@/lib/admin-auth';
export const runtime='nodejs';
export async function PATCH(request:Request, props:{params: Promise<{id:string}>}) {
  const params = await props.params;
  const auth=await requireAdmin();if(auth.response)return auth.response;let b:Record<string,unknown>;try{b=await request.json()}catch{return NextResponse.json({error:'invalid_request'},{status:400})}const nameEn=cleanAdminText(b.nameEn,200);if(nameEn.length<2)return NextResponse.json({error:'validation_failed'},{status:400});return NextResponse.json(await prisma.service.update({where:{id:params.id},data:{nameEn,nameAr:cleanAdminText(b.nameAr,200)||null,descriptionEn:cleanAdminText(b.descriptionEn)||null,descriptionAr:cleanAdminText(b.descriptionAr)||null,sortOrder:Math.max(0,Number(b.sortOrder)||0),isActive:b.isActive!==false}}))
}
export async function DELETE(_:Request, props:{params: Promise<{id:string}>}) {
  const params = await props.params;
  const auth=await requireAdmin(true);if(auth.response)return auth.response;await prisma.service.delete({where:{id:params.id}});return NextResponse.json({success:true})
}
