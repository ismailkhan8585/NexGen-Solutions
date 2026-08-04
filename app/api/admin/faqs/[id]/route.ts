import { NextResponse } from 'next/server'; import { prisma } from '@/lib/prisma'; import { cleanAdminText,requireAdmin } from '@/lib/admin-auth';
export const runtime='nodejs';
export async function PATCH(request:Request, props:{params: Promise<{id:string}>}) {
  const params = await props.params;
  const auth=await requireAdmin();if(auth.response)return auth.response;let b:Record<string,unknown>;try{b=await request.json()}catch{return NextResponse.json({error:'invalid_request'},{status:400})}const q=cleanAdminText(b.questionEn,300),qa=cleanAdminText(b.questionAr,300)||null,a=cleanAdminText(b.answerEn),aa=cleanAdminText(b.answerAr)||null,sort=Math.max(0,Number(b.sortOrder)||0),active=b.isActive!==false;if(q.length<3||a.length<10)return NextResponse.json({error:'validation_failed'},{status:400});const changed=await prisma.$executeRaw`UPDATE "FAQ" SET "questionEn"=${q},"questionAr"=${qa},"answerEn"=${a},"answerAr"=${aa},"sortOrder"=${sort},"isActive"=${active},"updatedAt"=CURRENT_TIMESTAMP WHERE "id"=${params.id}`;if(!changed)return NextResponse.json({error:'not_found'},{status:404});return NextResponse.json({id:params.id,questionEn:q,questionAr:qa,answerEn:a,answerAr:aa,sortOrder:sort,isActive:active})
}
export async function DELETE(_:Request, props:{params: Promise<{id:string}>}) {
  const params = await props.params;
  const auth=await requireAdmin(true);if(auth.response)return auth.response;await prisma.$executeRaw`DELETE FROM "FAQ" WHERE "id"=${params.id}`;return NextResponse.json({success:true})
}
