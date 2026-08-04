import { Accessibility, Gauge, Languages, LifeBuoy, MessagesSquare, Network } from 'lucide-react';
import type { Locale } from '@/lib/i18n';

const strengths = [
  { icon: Languages, ar: 'تجارب رقمية ثنائية اللغة', en: 'Bilingual digital experiences' },
  { icon: Gauge, ar: 'تصميم مرتبط بأهداف العمل', en: 'Business-focused design' },
  { icon: MessagesSquare, ar: 'تواصل واضح حول المشروع', en: 'Transparent project communication' },
  { icon: Network, ar: 'بنية تقنية قابلة للتوسع', en: 'Scalable technical architecture' },
  { icon: Accessibility, ar: 'أداء وإتاحة منذ البداية', en: 'Performance and accessibility' },
  { icon: LifeBuoy, ar: 'دعم مستمر بعد الإطلاق', en: 'Continued support after launch' },
] as const;

export function WhyUs({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  return (
    <section className="section-padding bg-surface">
      <div className="container-max grid gap-12 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-8">
        <div className="max-w-xl"><p className="section-kicker">{ar ? 'لماذا نيكس جين' : 'Why NexGen'}</p><h2 className="section-title mt-4">{ar ? 'قرارات رقمية أوضح، وتنفيذ يمكن لفريقك متابعته' : 'Clearer digital decisions and delivery your team can follow'}</h2><p className="mt-6 text-base leading-8 text-ink-secondary">{ar ? 'نوازن بين تجربة المستخدم وأهداف التشغيل وجودة الهندسة. كل مرحلة لها مخرجات واضحة ونقاط مراجعة قبل الانتقال إلى التالية.' : 'We balance user experience, operational goals, and engineering quality. Every stage has clear outputs and review points before the next begins.'}</p>
          <div className="surface-panel mt-9 overflow-hidden p-5 sm:p-6" aria-label={ar ? 'مبادئ الحل التقني' : 'Technical solution principles'}><div className="flex items-center justify-between border-b border-surface-border pb-4"><p className="text-xs font-semibold uppercase tracking-[.16em] text-ink-muted">{ar ? 'بنية المنتج' : 'Product architecture'}</p><span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true"/></div><div className="mt-5 space-y-3">{(ar ? [['واجهة عربية وإنجليزية','تجربة المستخدم'],['واجهات API وصلاحيات','منطق الأعمال'],['بيانات ومراقبة وأمان','الأساس التقني']] : [['Arabic + English interface','User experience'],['APIs, workflows, and roles','Business logic'],['Data, monitoring, and security','Technical foundation']]).map(([title,label])=><div key={title} className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl border border-surface-border bg-surface px-4 py-3"><span className="text-sm font-medium text-white">{title}</span><span className="text-[10px] text-ink-muted">{label}</span></div>)}</div></div>
        </div>
        <div className="border-y border-surface-border">
          {strengths.map(({ icon: Icon, ar: arText, en }, index) => <article key={en} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-surface-border py-5 last:border-b-0 sm:py-6"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-cyan-500/[.07] text-brand-cyan-300"><Icon className="h-5 w-5" aria-hidden="true"/></span><h3 className="font-display text-base font-semibold text-white sm:text-lg">{ar ? arText : en}</h3><span className="font-mono text-xs text-ink-muted">0{index + 1}</span></article>)}
        </div>
      </div>
    </section>
  );
}
