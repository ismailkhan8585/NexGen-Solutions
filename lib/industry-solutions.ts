import type { PublicLocale } from '@/lib/business-config';

type Pair = Record<PublicLocale, string>;
type Faq = { question: Pair; answer: Pair };

export type IndustrySolution = {
  slug: string;
  title: Pair;
  description: Pair;
  eyebrow: Pair;
  challenges: readonly Pair[];
  solution: Pair;
  features: readonly Pair[];
  integrations: readonly Pair[];
  technologies: readonly string[];
  faq: readonly Faq[];
  projectCategory: 'WEB' | 'ECOMMERCE' | 'SOFTWARE' | 'MOBILE';
  industryKeyword: string;
};

const pair = (ar: string, en: string): Pair => ({ ar, en });
const commonFaq = (nounAr: string, nounEn: string): readonly Faq[] => [
  { question: pair(`هل يمكن تنفيذ ${nounAr} بالعربية والإنجليزية؟`, `Can ${nounEn} be delivered in Arabic and English?`), answer: pair('نعم عند إدراج ذلك في النطاق، مع تصميم RTL ومراجعة مستقلة للمحتوى والنماذج ومسارات الاستخدام في كل لغة.', 'Yes, when included in scope, with RTL design and independent review of content, forms, and user journeys in each language.') },
  { question: pair('هل التكاملات المذكورة جاهزة مسبقاً؟', 'Are the listed integrations already implemented?'), answer: pair('هي قدرات ممكنة وليست ادعاءً بوجود تكامل جاهز. يتم التحقق من واجهات المزود والتكلفة والأمان والمتطلبات النظامية قبل الالتزام بالتنفيذ.', 'They are available capabilities, not claims of prebuilt integrations. Provider APIs, cost, security, and regulatory requirements are validated before implementation is committed.') },
  { question: pair('كيف يبدأ المشروع؟', 'How does a project begin?'), answer: pair('يبدأ باكتشاف المتطلبات والمستخدمين والعمليات الحالية، ثم توثيق النطاق والمخاطر والمراحل ومعايير القبول قبل التطوير.', 'It starts with discovery of requirements, users, and current operations, followed by documented scope, risks, milestones, and acceptance criteria before development.') },
];

export const industrySolutions = [
  {
    slug: 'restaurant-pos', title: pair('حلول المطاعم ونقاط البيع', 'Restaurant and POS Solutions'), description: pair('منصات طلب وتشغيل وتقارير للمطاعم، مصممة حول سير العمل الفعلي والتكاملات القابلة للتحقق.', 'Ordering, operations, and reporting platforms for restaurants, designed around real workflows and verifiable integrations.'), eyebrow: pair('تشغيل أسرع ورؤية أوضح', 'Clearer operations and faster service'),
    challenges: [pair('تشتت الطلبات بين قنوات متعددة', 'Orders fragmented across multiple channels'), pair('صعوبة متابعة المخزون والأصناف والفروع', 'Limited visibility across inventory, menu items, and branches'), pair('تقارير يدوية لا تدعم القرار السريع', 'Manual reporting that slows operational decisions')],
    solution: pair('منصة موحدة تربط تجربة الطلب بعمليات المطبخ والفروع والتقارير، مع أدوار واضحة ومزامنة مدروسة للبيانات.', 'A unified platform connecting ordering experiences with kitchen, branch, and reporting workflows, using clear roles and considered data synchronization.'),
    features: [pair('إدارة القوائم والأصناف والفروع', 'Menu, item, and branch management'), pair('طلبات الصالة والاستلام والتوصيل', 'Dine-in, pickup, and delivery ordering'), pair('لوحات تشغيل وتقارير قابلة للتصدير', 'Operational dashboards and exportable reports'), pair('صلاحيات الموظفين وسجل الإجراءات', 'Staff permissions and activity history')],
    integrations: [pair('بوابات الدفع ومزودو نقاط البيع بعد التحقق', 'Payment gateways and POS providers after validation'), pair('منصات التوصيل والمحاسبة عند توفر واجهات مناسبة', 'Delivery and accounting platforms where suitable APIs exist')], technologies: ['Next.js', 'PostgreSQL', 'React Native', 'REST APIs'], faq: commonFaq('حل المطعم', 'the restaurant solution'), projectCategory: 'SOFTWARE', industryKeyword: 'restaurant',
  },
  {
    slug: 'real-estate', title: pair('منصات العقارات', 'Real-estate Platforms'), description: pair('مواقع ومنصات عقارية تساعد الزائر على اكتشاف الوحدات وتساعد الفريق على إدارة المحتوى والعملاء المحتملين.', 'Property websites and platforms that support property discovery and structured lead and content management.'), eyebrow: pair('اكتشاف عقاري منظم', 'Structured property discovery'),
    challenges: [pair('بيانات وحدات غير موحدة أو قديمة', 'Inconsistent or outdated property data'), pair('بحث ضعيف على الجوال', 'Weak mobile property search'), pair('فقدان سياق العميل المحتمل بين القنوات', 'Lead context lost across channels')],
    solution: pair('منصة سريعة ثنائية اللغة بفلاتر واضحة وصفحات وحدات قابلة للإدارة وربط منضبط لطلبات العملاء.', 'A fast bilingual platform with clear filters, manageable property pages, and disciplined lead capture.'),
    features: [pair('بحث وفلاتر وخرائط عند توفر بيانات مناسبة', 'Search, filters, and maps when suitable data is available'), pair('إدارة المشاريع والوحدات والوسائط', 'Project, unit, and media management'), pair('نماذج اهتمام مرتبطة بالوحدة', 'Property-context enquiry forms'), pair('صفحات هبوط للحملات', 'Campaign landing pages')],
    integrations: [pair('أنظمة CRM العقارية كقدرة تكامل', 'Real-estate CRM systems as an integration capability'), pair('الخرائط والتحليلات بعد مراجعة الخصوصية والموافقة', 'Maps and analytics after privacy and consent review')], technologies: ['Next.js', 'PostgreSQL', 'Map APIs', 'Headless CMS'], faq: commonFaq('المنصة العقارية', 'the real-estate platform'), projectCategory: 'WEB', industryKeyword: 'real estate',
  },
  {
    slug: 'retail-ecommerce', title: pair('التجزئة والتجارة الإلكترونية', 'Retail and E-commerce'), description: pair('تجارب شراء عربية وإنجليزية تربط الكتالوج والطلب وخدمة العميل مع عمليات قابلة للتوسع.', 'Arabic and English commerce experiences connecting catalog, checkout, and customer service with scalable operations.'), eyebrow: pair('تجارة رقمية واضحة', 'Clear digital commerce'),
    challenges: [pair('تجربة شراء غير ملائمة للعربية والجوال', 'Purchase journeys that underperform in Arabic and on mobile'), pair('تكرار تحديث المخزون والطلبات', 'Duplicated inventory and order updates'), pair('ضعف وضوح حالة الطلب للعميل', 'Poor order-status visibility for customers')],
    solution: pair('واجهة تجارة سريعة مع إدارة كتالوج وطلب منضبطة، وتكاملات يتم اختيارها وفق العمليات الفعلية.', 'A fast storefront with disciplined catalog and order management, plus integrations selected for actual operations.'),
    features: [pair('كتالوج ومتغيرات وعروض', 'Catalog, variants, and promotions'), pair('سلة ودفع وحساب عميل', 'Cart, checkout, and customer account'), pair('إدارة الطلبات وحالاتها', 'Order and status management'), pair('محتوى وتسويق ثنائي اللغة', 'Bilingual content and merchandising')],
    integrations: [pair('الدفع والشحن والفوترة عند اعتماد المزود', 'Payment, shipping, and invoicing after provider approval'), pair('ERP وCRM كتكاملات حسب النطاق', 'ERP and CRM integrations according to scope')], technologies: ['Next.js', 'Commerce APIs', 'PostgreSQL', 'Cloudinary'], faq: commonFaq('المتجر', 'the store'), projectCategory: 'ECOMMERCE', industryKeyword: 'retail',
  },
  {
    slug: 'healthcare', title: pair('برمجيات الرعاية الصحية', 'Healthcare Software'), description: pair('واجهات وأنظمة تشغيلية للرعاية الصحية مع اكتشاف دقيق للخصوصية والصلاحيات والمتطلبات النظامية.', 'Healthcare-facing and operational software with careful discovery of privacy, authorization, and regulatory requirements.'), eyebrow: pair('تجربة مسؤولة وحذرة', 'Responsible, considered delivery'),
    challenges: [pair('حساسية البيانات وتعدد الصلاحيات', 'Sensitive data and complex access roles'), pair('تجارب حجز ومتابعة مشتتة', 'Fragmented booking and follow-up journeys'), pair('تكاملات متعددة تحتاج تحققاً دقيقاً', 'Multiple integrations requiring careful validation')],
    solution: pair('نطاق تقني يبدأ بتصنيف البيانات والأدوار والمخاطر قبل تصميم الواجهات والتكاملات. لا يُفترض الامتثال لأي نظام قبل مراجعة متخصصة.', 'A technical scope beginning with data classification, roles, and risks before interface and integration design. Regulatory compliance is never assumed without specialist review.'),
    features: [pair('حجز ومواعيد وإشعارات حسب النطاق', 'Booking, scheduling, and notifications according to scope'), pair('بوابات مستخدمين بصلاحيات', 'Role-based user portals'), pair('نماذج آمنة وتقليل جمع البيانات', 'Secure forms and data minimization'), pair('سجلات تدقيق عند الحاجة', 'Audit trails where required')],
    integrations: [pair('أنظمة السجلات أو المختبرات كقدرة تخضع للتحقق', 'Record or laboratory systems as a capability subject to validation'), pair('الرسائل والدفع بعد مراجعة البيانات والمزود', 'Messaging and payment after data and provider review')], technologies: ['Next.js', 'PostgreSQL', 'Role-based Access', 'Encrypted APIs'], faq: commonFaq('النظام الصحي', 'the healthcare system'), projectCategory: 'SOFTWARE', industryKeyword: 'health',
  },
  {
    slug: 'logistics-delivery', title: pair('اللوجستيات والتوصيل', 'Logistics and Delivery'), description: pair('منصات لإدارة الطلبات والتوزيع والتتبع والتواصل بين العمليات والسائق والعميل.', 'Platforms for order, dispatch, tracking, and communication across operations, drivers, and customers.'), eyebrow: pair('رؤية تشغيلية من الطلب إلى التسليم', 'Visibility from order to delivery'),
    challenges: [pair('توزيع يدوي وصعوبة متابعة الحالة', 'Manual dispatch and limited status visibility'), pair('تواصل متكرر لمعرفة موقع الطلب', 'Repeated communication to locate deliveries'), pair('تقارير أداء موزعة', 'Fragmented performance reporting')],
    solution: pair('منصة أدوار متعددة لإدارة الطلبات والتوزيع والأحداث، مع تجربة جوال مناسبة للسائق والعميل.', 'A multi-role platform for orders, dispatch, and events, with mobile-friendly driver and customer experiences.'),
    features: [pair('إدارة الطلبات ومراحل التنفيذ', 'Order and fulfilment stages'), pair('توزيع ومهام للسائقين', 'Driver dispatch and tasks'), pair('تتبع وإشعارات حسب توفر المزود', 'Tracking and notifications where providers support them'), pair('تقارير زمن التسليم والاستثناءات', 'Delivery-time and exception reporting')],
    integrations: [pair('الخرائط وتحديد المسارات كقدرة تكامل', 'Maps and routing as an integration capability'), pair('المتاجر والمخازن والرسائل حسب واجهاتها', 'Store, warehouse, and messaging systems according to their APIs')], technologies: ['React Native', 'Next.js', 'PostgreSQL', 'Map APIs'], faq: commonFaq('منصة التوصيل', 'the delivery platform'), projectCategory: 'MOBILE', industryKeyword: 'logistics',
  },
  {
    slug: 'construction-contracting', title: pair('الإنشاءات والمقاولات', 'Construction and Contracting'), description: pair('أدوات رقمية لمتابعة المشاريع والمستندات والاعتمادات والتواصل بين المكتب والموقع.', 'Digital tools for project, document, approval, and field-to-office coordination.'), eyebrow: pair('تنسيق أوضح للمشروع', 'Clearer project coordination'),
    challenges: [pair('مستندات واعتمادات موزعة', 'Distributed documents and approvals'), pair('تأخر تحديث تقدم الموقع', 'Delayed field-progress updates'), pair('صعوبة تتبع التغييرات والمسؤوليات', 'Limited traceability of changes and ownership')],
    solution: pair('مساحة عمل مركزية للمشاريع والمستندات والمهام والتقارير، مصممة للأدوار وسياق العمل الميداني.', 'A central workspace for projects, documents, tasks, and reporting, designed for roles and field context.'),
    features: [pair('ملفات مشاريع وصلاحيات فرق', 'Project workspaces and team permissions'), pair('مستندات وإصدارات واعتمادات', 'Documents, revisions, and approvals'), pair('تقارير تقدم وملاحظات ميدانية', 'Progress reports and field notes'), pair('مهام وتنبيهات قابلة للتتبع', 'Traceable tasks and notifications')],
    integrations: [pair('التخزين والمحاسبة وERP حسب النطاق', 'Storage, accounting, and ERP according to scope'), pair('التوقيع الإلكتروني عند اعتماد مزود مناسب', 'Electronic signature after a suitable provider is approved')], technologies: ['Next.js', 'PostgreSQL', 'Object Storage', 'Mobile Web'], faq: commonFaq('منصة المقاولات', 'the contracting platform'), projectCategory: 'SOFTWARE', industryKeyword: 'construction',
  },
  {
    slug: 'professional-services', title: pair('حلول شركات الخدمات المهنية', 'Professional-service Business Solutions'), description: pair('مواقع وبوابات وأتمتة لشركات الاستشارات والمحاسبة والقانون والخدمات المتخصصة دون ادعاء خبرة تنظيمية غير موثقة.', 'Websites, portals, and workflow automation for consulting, accounting, legal, and specialist firms without unsupported regulatory claims.'), eyebrow: pair('من العرض إلى تقديم الخدمة', 'From proposition to service delivery'),
    challenges: [pair('صعوبة شرح الخدمات والخبرة بوضوح', 'Difficulty communicating services and expertise clearly'), pair('استقبال الطلبات دون معلومات كافية', 'Enquiries arriving without enough context'), pair('متابعة يدوية للوثائق والموافقات', 'Manual document and approval follow-up')],
    solution: pair('حضور رقمي موثوق مع استقبال منظم للطلبات وبوابات أو أتمتة داخلية يتم تحديدها حسب سير العمل.', 'A credible digital presence with structured enquiry capture and portals or internal automation scoped to actual workflows.'),
    features: [pair('محتوى خدمات وقطاعات ثنائي اللغة', 'Bilingual service and sector content'), pair('نماذج تأهيل وطلب استشارة', 'Qualification and consultation forms'), pair('بوابات عملاء ومستندات حسب الحاجة', 'Client portals and documents where needed'), pair('مسارات موافقة وتذكير', 'Approval and reminder workflows')],
    integrations: [pair('CRM والبريد والتقويم كقدرات تكامل', 'CRM, email, and calendar as integration capabilities'), pair('الفوترة والتوقيع بعد التحقق من المزود', 'Invoicing and signing after provider validation')], technologies: ['Next.js', 'PostgreSQL', 'CRM APIs', 'Document Storage'], faq: commonFaq('الحل المهني', 'the professional-services solution'), projectCategory: 'WEB', industryKeyword: 'professional',
  },
] as const satisfies readonly IndustrySolution[];

export function getIndustrySolution(slug: string) { return industrySolutions.find((item) => item.slug === slug); }
