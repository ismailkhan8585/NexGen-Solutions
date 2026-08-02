import type { PublicLocale } from './business-config';

type Localized = Readonly<Record<PublicLocale, string>>;

export type ServiceCatalogItem = {
  slug: string;
  aliases?: readonly string[];
  name: Localized;
  summary: Localized;
  value: Localized;
  problems: Readonly<Record<PublicLocale, readonly string[]>>;
  features: Readonly<Record<PublicLocale, readonly string[]>>;
  useCases: Readonly<Record<PublicLocale, readonly string[]>>;
  technologies: readonly string[];
};

export const serviceCatalog: readonly ServiceCatalogItem[] = [
  {
    slug: 'business-websites', aliases: ['web'],
    name: { ar: 'تطوير مواقع الأعمال', en: 'Business Website Development' },
    summary: { ar: 'مواقع عربية سريعة وواضحة تعرّف بخدماتك وتحول الزيارات إلى فرص تواصل.', en: 'Fast, clear Arabic-first websites that explain your offer and turn visits into qualified enquiries.' },
    value: { ar: 'نبني حضوراً رقمياً يسهل إدارته وتطويره ويعمل بكفاءة على الجوال ومحركات البحث.', en: 'Build a maintainable digital presence that performs well on mobile, search, and every key customer journey.' },
    problems: { ar: ['موقع قديم أو بطيء', 'محتوى عربي ضعيف أو اتجاه RTL غير متقن', 'صعوبة تحديث الصفحات وقياس الطلبات'], en: ['An outdated or slow website', 'Weak Arabic content or incomplete RTL behavior', 'Difficult content updates and enquiry tracking'] },
    features: { ar: ['تصميم متجاوب', 'إدارة محتوى قابلة للتوسع', 'تهيئة تقنية لمحركات البحث', 'نماذج تواصل وتحليلات'], en: ['Responsive design', 'Scalable content management', 'Technical SEO foundations', 'Enquiry forms and analytics readiness'] },
    useCases: { ar: ['الشركات المهنية', 'المقاولات والعقار', 'الضيافة والخدمات'], en: ['Professional services', 'Construction and real estate', 'Hospitality and service businesses'] },
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    slug: 'ecommerce',
    name: { ar: 'تطوير التجارة الإلكترونية', en: 'E-commerce Development' },
    summary: { ar: 'متاجر ثنائية اللغة مصممة لرحلة الشراء في السوق السعودي.', en: 'Bilingual storefronts designed around Saudi customer journeys.' },
    value: { ar: 'نربط تجربة المنتج والسلة والدفع والتوصيل ضمن منصة سريعة وقابلة للإدارة.', en: 'Connect product discovery, cart, payment, and delivery in one fast, manageable platform.' },
    problems: { ar: ['تجربة شراء غير مناسبة للجوال', 'تعقيد إدارة المنتجات والطلبات', 'ضعف التكامل بين الدفع والتوصيل'], en: ['Poor mobile checkout', 'Complex product and order operations', 'Disconnected payment and delivery workflows'] },
    features: { ar: ['كتالوج وبحث وفلاتر', 'سلة وطلب ثنائي اللغة', 'إدارة مخزون وطلبات', 'جاهزية تكامل الدفع والتوصيل'], en: ['Catalog, search, and filters', 'Bilingual cart and checkout', 'Inventory and order management', 'Payment and delivery integration readiness'] },
    useCases: { ar: ['العلامات المحلية', 'التجزئة المتخصصة', 'المنتجات الرقمية والاشتراكات'], en: ['Local brands', 'Specialty retail', 'Digital products and subscriptions'] },
    technologies: ['Next.js', 'Shopify', 'WooCommerce', 'Mada / Apple Pay capability'],
  },
  {
    slug: 'mobile-apps', aliases: ['app'],
    name: { ar: 'تطوير تطبيقات الجوال', en: 'Mobile App Development' },
    summary: { ar: 'تطبيقات عملية لنظامي iOS وAndroid مرتبطة بأنظمة أعمالك.', en: 'Practical iOS and Android applications connected to your business systems.' },
    value: { ar: 'نحوّل الخدمة أو العملية المتكررة إلى تجربة جوال واضحة وآمنة وقابلة للتوسع.', en: 'Turn a service or repeated workflow into a clear, secure, scalable mobile experience.' },
    problems: { ar: ['رحلات مستخدم معقدة', 'انفصال التطبيق عن الأنظمة الداخلية', 'صعوبة الصيانة بين المنصات'], en: ['Complex user journeys', 'Disconnected internal systems', 'High cross-platform maintenance cost'] },
    features: { ar: ['تصميم iOS وAndroid', 'إشعارات وتسجيل دخول آمن', 'تكامل API', 'تحليلات وأداء'], en: ['iOS and Android delivery', 'Notifications and secure authentication', 'API integration', 'Analytics and performance'] },
    useCases: { ar: ['الحجوزات والخدمات', 'فرق الميدان', 'برامج الولاء'], en: ['Bookings and services', 'Field teams', 'Loyalty programs'] },
    technologies: ['React Native', 'Flutter', 'Expo', 'REST / GraphQL'],
  },
  {
    slug: 'custom-software', aliases: ['software', 'saas'],
    name: { ar: 'البرمجيات المخصصة ومنصات SaaS', en: 'Custom Software and SaaS' },
    summary: { ar: 'أنظمة مخصصة عندما لا تلائم الأدوات الجاهزة طريقة عملك.', en: 'Purpose-built systems when off-the-shelf tools do not fit your operation.' },
    value: { ar: 'نحوّل العمليات والبيانات والصلاحيات إلى منتج واضح يمكن تطويره مع نمو الأعمال.', en: 'Turn workflows, data, and permissions into a product that can evolve with the business.' },
    problems: { ar: ['عمليات يدوية متكررة', 'بيانات موزعة بين أدوات متعددة', 'حاجة منتج باشتراكات وصلاحيات'], en: ['Repeated manual processes', 'Data fragmented across tools', 'A product requiring subscriptions and roles'] },
    features: { ar: ['لوحات تحكم وصلاحيات', 'تدفقات عمل وتقارير', 'واجهات API وتكاملات', 'بنية متعددة المستأجرين عند الحاجة'], en: ['Dashboards and roles', 'Workflows and reporting', 'APIs and integrations', 'Multi-tenant architecture when required'] },
    useCases: { ar: ['منصات B2B', 'بوابات العملاء', 'أدوات التشغيل الداخلية'], en: ['B2B platforms', 'Customer portals', 'Internal operations tools'] },
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'Prisma'],
  },
  {
    slug: 'pos-systems',
    name: { ar: 'أنظمة نقاط البيع وإدارة الأعمال', en: 'POS and Business Management Systems' },
    summary: { ar: 'أدوات تشغيل تربط المبيعات والمخزون والفروع والتقارير.', en: 'Operational tools connecting sales, inventory, locations, and reporting.' },
    value: { ar: 'نوحد البيانات اليومية في واجهة عملية تناسب الموظفين والإدارة.', en: 'Unify daily operational data in interfaces designed for staff and management.' },
    problems: { ar: ['تكرار إدخال البيانات', 'غياب رؤية المخزون والمبيعات', 'أنظمة قديمة لا تتكامل'], en: ['Duplicate data entry', 'Limited sales and inventory visibility', 'Legacy systems that do not integrate'] },
    features: { ar: ['مبيعات ومخزون', 'فروع وصلاحيات', 'تقارير تشغيلية', 'تكامل أجهزة وواجهات API حسب النطاق'], en: ['Sales and inventory', 'Locations and permissions', 'Operational reporting', 'Hardware and API integration by scope'] },
    useCases: { ar: ['المطاعم والمقاهي', 'متاجر التجزئة', 'مقدمو الخدمات'], en: ['Restaurants and cafés', 'Retail stores', 'Service providers'] },
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Offline-first capability'],
  },
  {
    slug: 'ai-automation', aliases: ['ai'],
    name: { ar: 'وكلاء الذكاء الاصطناعي وأتمتة الأعمال', en: 'AI Agents and Business Automation' },
    summary: { ar: 'أتمتة مدروسة للمهام المتكررة مع ضوابط ومراجعة بشرية.', en: 'Considered automation for repetitive work with controls and human review.' },
    value: { ar: 'نبدأ من عملية واضحة وبيانات مناسبة قبل اختيار نموذج الذكاء الاصطناعي أو أداة الأتمتة.', en: 'Start with a defined workflow and suitable data before selecting an AI model or automation tool.' },
    problems: { ar: ['فرز ومعالجة يدوية متكررة', 'معرفة موزعة يصعب الوصول إليها', 'تأخر نقل البيانات بين الأنظمة'], en: ['Repeated manual classification and processing', 'Hard-to-access distributed knowledge', 'Slow handoffs between systems'] },
    features: { ar: ['مساعدات معرفة داخلية', 'تصنيف واستخراج بيانات', 'تدفقات موافقة ومراجعة', 'مراقبة وتسجيل الاستخدام'], en: ['Internal knowledge assistants', 'Classification and extraction', 'Approval and review workflows', 'Usage monitoring and logs'] },
    useCases: { ar: ['دعم الموظفين', 'معالجة المستندات', 'تأهيل الطلبات والعملاء المحتملين'], en: ['Employee support', 'Document processing', 'Request and lead qualification'] },
    technologies: ['OpenAI capability', 'Python', 'n8n', 'Secure API integration'],
  },
  {
    slug: 'arabic-websites',
    name: { ar: 'تطوير المواقع العربية', en: 'Arabic Website Development' },
    summary: { ar: 'تجربة عربية أصلية وليست ترجمة موضوعة داخل قالب إنجليزي.', en: 'A native Arabic experience—not translated text placed into an English layout.' },
    value: { ar: 'نضبط المحتوى والخطوط والاتجاه والتنقل والنماذج والبيانات الوصفية لتعمل بالعربية بثقة.', en: 'Align content, typography, direction, navigation, forms, and metadata for a confident Arabic experience.' },
    problems: { ar: ['أخطاء RTL ومحاذاة', 'ترجمة حرفية غير طبيعية', 'اختلاف تجربة العربية عن الإنجليزية'], en: ['RTL and alignment defects', 'Unnatural literal translation', 'Unequal Arabic and English journeys'] },
    features: { ar: ['RTL كامل', 'خطوط ومسافات مناسبة', 'SEO وبيانات وصفية عربية', 'اختبار واجهات ونماذج ثنائية اللغة'], en: ['Complete RTL behavior', 'Arabic-aware type and spacing', 'Arabic SEO and metadata', 'Bilingual interface and form testing'] },
    useCases: { ar: ['مواقع الشركات', 'البوابات الحكومية والخدمية', 'المتاجر والمنصات'], en: ['Corporate websites', 'Government and service portals', 'Stores and platforms'] },
    technologies: ['HTML semantics', 'CSS logical properties', 'Next.js i18n', 'Arabic typography'],
  },
  {
    slug: 'ui-ux', aliases: ['design'],
    name: { ar: 'تصميم واجهات وتجربة المستخدم', en: 'UI/UX Design' },
    summary: { ar: 'واجهات واضحة مبنية على مهام المستخدم وسياق العمل.', en: 'Clear interfaces grounded in user tasks and business context.' },
    value: { ar: 'نقلل التعقيد قبل التطوير عبر تدفقات ونماذج أولية ونظام تصميم قابل لإعادة الاستخدام.', en: 'Reduce complexity before development through flows, prototypes, and a reusable design system.' },
    problems: { ar: ['رحلات مربكة', 'واجهات غير متسقة', 'قرارات تصميم بلا اختبار'], en: ['Confusing journeys', 'Inconsistent interfaces', 'Untested design decisions'] },
    features: { ar: ['بحث وتحديد المتطلبات', 'تدفقات ونماذج أولية', 'تصميم متجاوب', 'نظام تصميم وإرشادات'], en: ['Discovery and requirements', 'Flows and prototypes', 'Responsive UI', 'Design system and guidance'] },
    useCases: { ar: ['منتجات جديدة', 'إعادة تصميم منصة قائمة', 'لوحات التحكم والتطبيقات الداخلية'], en: ['New products', 'Existing product redesigns', 'Dashboards and internal tools'] },
    technologies: ['Figma', 'Prototyping', 'Design systems', 'WCAG guidance'],
  },
  {
    slug: 'maintenance-support',
    name: { ar: 'الصيانة والدعم التقني', en: 'Maintenance and Technical Support' },
    summary: { ar: 'متابعة تقنية تحافظ على أمان المنتج وأدائه وقابليته للتطوير.', en: 'Technical care that protects product security, performance, and maintainability.' },
    value: { ar: 'نحدد نطاقاً واضحاً للصيانة والمراقبة والتحسين حسب أهمية النظام واحتياج الفريق.', en: 'Define a clear maintenance, monitoring, and improvement scope around system criticality and team needs.' },
    problems: { ar: ['تحديثات متأخرة', 'أعطال بلا مراقبة', 'تراكم ديون تقنية'], en: ['Delayed updates', 'Unmonitored failures', 'Growing technical debt'] },
    features: { ar: ['تحديثات واعتماديات', 'مراقبة وأخطاء', 'تحسين أداء وإتاحة', 'تقارير وخطة تحسين'], en: ['Dependency updates', 'Monitoring and errors', 'Performance and accessibility improvements', 'Reporting and improvement plan'] },
    useCases: { ar: ['مواقع الشركات', 'المتاجر', 'المنصات والأنظمة الداخلية'], en: ['Company websites', 'Online stores', 'Platforms and internal systems'] },
    technologies: ['Monitoring', 'Backups', 'CI/CD', 'Performance audits'],
  },
] as const;

export function findService(slug: string): ServiceCatalogItem | undefined {
  return serviceCatalog.find((service) => service.slug === slug || service.aliases?.includes(slug));
}

export const deliveryProcess: Readonly<Record<PublicLocale, readonly string[]>> = {
  ar: ['فهم الأهداف والعمليات', 'تحديد النطاق والأولويات', 'تصميم التجربة والبنية', 'التطوير والمراجعة', 'الاختبار والإطلاق', 'التحسين والدعم حسب الاتفاق'],
  en: ['Understand goals and operations', 'Define scope and priorities', 'Design experience and architecture', 'Build and review', 'Test and launch', 'Improve and support as agreed'],
};

export const serviceFaqs = {
  ar: [
    { question: 'كيف يتم تحديد مدة وتكلفة المشروع؟', answer: 'بعد فهم النطاق والتكاملات والمحتوى ومتطلبات التشغيل، نقدم مراحل وتقديراً بالريال السعودي.' },
    { question: 'هل يمكن ربط الحل بأنظمتنا الحالية؟', answer: 'نراجع واجهات API والأمان وجودة البيانات أولاً، ثم نحدد التكاملات الممكنة ضمن نطاق واضح.' },
    { question: 'هل تشمل الخدمة العربية والإنجليزية؟', answer: 'يمكن تنفيذ تجربة عربية RTL وإنجليزية LTR متكاملة عند تضمين اللغتين في نطاق المشروع.' },
  ],
  en: [
    { question: 'How are timeline and cost determined?', answer: 'After reviewing scope, integrations, content, and operational needs, we provide milestones and an estimate in SAR.' },
    { question: 'Can the solution connect to our existing systems?', answer: 'We first review APIs, security, and data quality, then define feasible integrations in a clear scope.' },
    { question: 'Can the service include Arabic and English?', answer: 'A complete Arabic RTL and English LTR experience can be delivered when both languages are included in scope.' },
  ],
} as const;
