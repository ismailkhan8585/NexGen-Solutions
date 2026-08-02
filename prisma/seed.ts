import { PrismaClient, AdminRole, ProjectCategory, BlogCategory, InquiryStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const passwordHash = await bcrypt.hash('Admin@123456', 12);

  await prisma.admin.upsert({
    where: { email: 'admin@nexgensolutions.agency' },
    update: {},
    create: {
      name: 'Super Admin',
      email: 'admin@nexgensolutions.agency',
      password: passwordHash,
      role: AdminRole.SUPER_ADMIN,
    },
  });

  const services = [
    { slug: 'web', nameEn: 'Web Development', nameAr: 'تطوير المواقع', icon: 'Globe', startingPrice: 'From $500', sortOrder: 1, techStack: ['Next.js', 'React', 'TypeScript', 'Node.js'], features: ['Custom design', 'SEO optimized', 'Blazing fast', 'Responsive'] },
    { slug: 'app', nameEn: 'Mobile App Development', nameAr: 'تطوير التطبيقات', icon: 'Smartphone', startingPrice: 'From $1,500', sortOrder: 2, techStack: ['React Native', 'Flutter', 'Swift', 'Kotlin'], features: ['iOS & Android', 'Native performance', 'App Store deploy', 'Push notifications'] },
    { slug: 'design', nameEn: 'UI/UX Design', nameAr: 'تصميم UI/UX', icon: 'Palette', startingPrice: 'From $300', sortOrder: 3, techStack: ['Figma', 'Adobe XD', 'Prototyping'], features: ['User research', 'Wireframes', 'Hi-fi mockups', 'Design system'] },
    { slug: 'ecommerce', nameEn: 'E-Commerce Solutions', nameAr: 'حلول التجارة الإلكترونية', icon: 'ShoppingCart', startingPrice: 'From $800', sortOrder: 4, techStack: ['Next.js', 'Stripe', 'Shopify', 'WooCommerce'], features: ['Payment integration', 'Inventory management', 'Order tracking', 'Admin dashboard'] },
    { slug: 'software', nameEn: 'Custom Software', nameAr: 'برمجيات مخصصة', icon: 'Settings', startingPrice: 'From $2,000', sortOrder: 5, techStack: ['Node.js', 'Python', 'PostgreSQL', 'AWS'], features: ['Tailor-made', 'Scalable', 'API integration', 'Cloud ready'] },
    { slug: 'ai', nameEn: 'AI & Automation', nameAr: 'الذكاء الاصطناعي والأتمتة', icon: 'BrainCircuit', startingPrice: 'From $1,000', sortOrder: 6, techStack: ['OpenAI', 'LangChain', 'Python', 'n8n'], features: ['Chatbots', 'Workflow automation', 'AI models', 'Data pipelines'] },
    { slug: 'marketing', nameEn: 'Digital Marketing & SEO', nameAr: 'التسويق الرقمي وSEO', icon: 'TrendingUp', startingPrice: 'From $400/month', sortOrder: 7, techStack: ['SEO', 'Google Ads', 'Meta Ads', 'Analytics'], features: ['SEO audit', 'Ad campaigns', 'Analytics', 'Content strategy'] },
    { slug: 'cloud', nameEn: 'Cloud & DevOps', nameAr: 'الحوسبة السحابية وDevOps', icon: 'Cloud', startingPrice: 'From $500', sortOrder: 8, techStack: ['AWS', 'Docker', 'Kubernetes', 'Terraform'], features: ['CI/CD pipelines', 'Containerization', 'Auto-scaling', 'Monitoring'] },
    { slug: 'security', nameEn: 'Cybersecurity', nameAr: 'الأمن السيبراني', icon: 'ShieldCheck', startingPrice: 'Custom Quote', sortOrder: 9, techStack: ['Pentesting', 'OWASP', 'SSL', 'Firewalls'], features: ['Security audit', 'Pen testing', 'Vulnerability scan', 'Compliance'] },
    { slug: 'consulting', nameEn: 'IT Consulting', nameAr: 'الاستشارات التقنية', icon: 'Lightbulb', startingPrice: '$100/hour', sortOrder: 10, techStack: ['Architecture', 'Strategy', 'CTO-as-a-Service'], features: ['Tech strategy', 'Architecture review', 'Team training', 'Digital transformation'] },
    { slug: 'saas', nameEn: 'SaaS Development', nameAr: 'تطوير منتجات SaaS', icon: 'Rocket', startingPrice: 'From $3,000', sortOrder: 11, techStack: ['Next.js', 'Stripe', 'Auth', 'Multi-tenant'], features: ['MVP to scale', 'Multi-tenant', 'Billing', 'Admin panel'] },
    { slug: 'blockchain', nameEn: 'Blockchain', nameAr: 'تطوير البلوك تشين', icon: 'Link2', startingPrice: 'Custom Quote', sortOrder: 12, techStack: ['Ethereum', 'Solidity', 'Web3.js', 'Hardhat'], features: ['Smart contracts', 'NFT platforms', 'DeFi', 'Web3 integration'] },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: {},
      create: {
        slug: service.slug,
        nameEn: service.nameEn,
        nameAr: service.nameAr,
        icon: service.icon,
        startingPrice: service.startingPrice,
        techStack: service.techStack,
        features: service.features,
        sortOrder: service.sortOrder,
        descriptionEn: `Professional ${service.nameEn} services tailored to your business needs.`,
        descriptionAr: `خدمات ${service.nameAr} احترافية مصممة لاحتياجات عملك.`,
        isActive: true,
      },
    });
  }

  const projects = [
    { slug: 'ecommerce-fashion-store', titleEn: 'Luxury Fashion E-Store', titleAr: 'متجر أزياء فاخر', category: ProjectCategory.ECOMMERCE, clientName: 'Vogue Arabia', clientCountry: 'UAE', techStack: ['Next.js', 'Stripe', 'PostgreSQL', 'Tailwind'], coverImage: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg', liveUrl: 'https://example.com', featured: true, descriptionEn: 'A full-featured online fashion store with payment integration and inventory management.', challenge: 'The client needed a high-performance e-commerce platform that could handle thousands of products and concurrent users.', solution: 'We built a Next.js application with Stripe integration, optimized image loading, and a custom admin dashboard.', results: '300% increase in online sales within 3 months. Page load time reduced from 4s to 0.8s.' },
    { slug: 'mobile-banking-app', titleEn: 'NextBank Mobile App', titleAr: 'تطبيق نكست بانك', category: ProjectCategory.MOBILE, clientName: 'NextBank', clientCountry: 'Saudi Arabia', techStack: ['React Native', 'Node.js', 'PostgreSQL', 'AWS'], coverImage: 'https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg', liveUrl: 'https://example.com', featured: true, descriptionEn: 'A secure mobile banking application with biometric authentication and real-time transactions.', challenge: 'Building a banking app that meets strict security standards while providing a smooth UX.', solution: 'We used React Native with biometric auth, end-to-end encryption, and real-time transaction processing.', results: '100K+ downloads in first month. 4.8 star rating on App Store.' },
    { slug: 'saas-dashboard-analytics', titleEn: 'DataFlow SaaS Dashboard', titleAr: 'لوحة تحكم DataFlow', category: ProjectCategory.SAAS, clientName: 'DataFlow Inc', clientCountry: 'USA', techStack: ['Next.js', 'TypeScript', 'Prisma', 'Recharts'], coverImage: 'https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg', liveUrl: 'https://example.com', featured: true, descriptionEn: 'A multi-tenant SaaS analytics platform with real-time data visualization.', challenge: 'Creating a scalable multi-tenant architecture with real-time analytics.', solution: 'We built a Next.js SaaS with multi-tenant data isolation, real-time WebSocket updates, and customizable dashboards.', results: 'Onboarded 500+ companies in 6 months. 99.9% uptime.' },
    { slug: 'ai-customer-support-chatbot', titleEn: 'AI Support Assistant', titleAr: 'مساعد الدعم الذكي', category: ProjectCategory.AI, clientName: 'TechSupport Co', clientCountry: 'UK', techStack: ['OpenAI', 'LangChain', 'Python', 'Next.js'], coverImage: 'https://images.pexels.com/photos/8849295/pexels-photo-8849295.jpeg', liveUrl: 'https://example.com', featured: false, descriptionEn: 'An AI-powered customer support chatbot that handles 80% of queries automatically.', challenge: 'Reducing customer support costs while maintaining quality.', solution: 'We built an AI chatbot using GPT-4 and LangChain with custom knowledge base integration.', results: '80% query auto-resolution. 60% reduction in support costs.' },
    { slug: 'real-estate-platform', titleEn: 'EstateHub Property Platform', titleAr: 'منصة EstateHub العقارية', category: ProjectCategory.WEB, clientName: 'EstateHub', clientCountry: 'Pakistan', techStack: ['Next.js', 'PostgreSQL', 'Mapbox', 'Tailwind'], coverImage: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg', liveUrl: 'https://example.com', featured: false, descriptionEn: 'A comprehensive real estate platform with property listings, search, and virtual tours.', challenge: 'Building a fast search experience across thousands of properties.', solution: 'We created a Next.js platform with advanced filtering, map integration, and virtual tour support.', results: '50K+ monthly active users. 40% increase in property inquiries.' },
    { slug: 'healthcare-appointment-app', titleEn: 'MediCare Health App', titleAr: 'تطبيق ميديكير الصحي', category: ProjectCategory.MOBILE, clientName: 'MediCare', clientCountry: 'UAE', techStack: ['Flutter', 'Firebase', 'Stripe', 'Twilio'], coverImage: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg', liveUrl: 'https://example.com', featured: false, descriptionEn: 'A healthcare app for booking appointments, telemedicine, and prescription tracking.', challenge: 'HIPAA-compliant healthcare app with telemedicine features.', solution: 'We built a Flutter app with secure video calls, appointment scheduling, and prescription management.', results: '25K+ patients onboarded. 4.7 star rating.' },
    { slug: 'restaurant-pos-system', titleEn: 'QuickServe POS System', titleAr: 'نظام كويك سيرف', category: ProjectCategory.SOFTWARE, clientName: 'QuickServe', clientCountry: 'Saudi Arabia', techStack: ['React', 'Node.js', 'PostgreSQL', 'Redis'], coverImage: 'https://images.pexels.com/photos/4252136/pexels-photo-4252136.jpeg', liveUrl: 'https://example.com', featured: false, descriptionEn: 'A complete restaurant POS system with order management and analytics.', challenge: 'Replacing legacy POS systems with a modern, cloud-based solution.', solution: 'We built a React-based POS with offline support, real-time sync, and comprehensive analytics.', results: '200+ restaurants onboarded. 35% increase in operational efficiency.' },
    { slug: 'crypto-trading-platform', titleEn: 'CryptoFlow Trading Platform', titleAr: 'منصة كريبتو فلو', category: ProjectCategory.BLOCKCHAIN, clientName: 'CryptoFlow', clientCountry: 'USA', techStack: ['Ethereum', 'Solidity', 'Web3.js', 'Next.js'], coverImage: 'https://images.pexels.com/photos/844720/pexels-photo-844720.jpeg', liveUrl: 'https://example.com', featured: false, descriptionEn: 'A crypto trading platform with smart contract integration and DeFi features.', challenge: 'Building a secure DeFi platform with real-time trading.', solution: 'We created a Web3-enabled platform with smart contracts, wallet integration, and real-time price feeds.', results: '$10M+ in transaction volume. 5K+ active traders.' },
    { slug: 'edtech-learning-platform', titleEn: 'LearnHub Education Platform', titleAr: 'منصة ليرن هاب التعليمية', category: ProjectCategory.WEB, clientName: 'LearnHub', clientCountry: 'Pakistan', techStack: ['Next.js', 'Prisma', 'Stripe', 'AWS'], coverImage: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg', liveUrl: 'https://example.com', featured: false, descriptionEn: 'An online learning platform with courses, quizzes, and progress tracking.', challenge: 'Creating an engaging learning experience with video streaming.', solution: 'We built a Next.js platform with course management, video streaming, and progress tracking.', results: '10K+ students enrolled. 4.9 star rating.' },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: {
        slug: project.slug,
        titleEn: project.titleEn,
        titleAr: project.titleAr,
        category: project.category,
        clientName: project.clientName,
        clientCountry: project.clientCountry,
        descriptionEn: project.descriptionEn,
        challenge: project.challenge,
        solution: project.solution,
        results: project.results,
        techStack: project.techStack,
        photos: [project.coverImage],
        coverImage: project.coverImage,
        liveUrl: project.liveUrl,
        featured: project.featured,
        isActive: true,
        completedAt: new Date(),
      },
    });
  }

  const teamMembers = [
    { nameEn: 'Ahmed Hassan', nameAr: 'أحمد حسن', role: 'Founder & CEO', roleAr: 'المؤسس والرئيس التنفيذي', bio: '15+ years in software engineering and tech leadership', bioAr: 'أكثر من 15 عاماً في هندسة البرمجيات والقيادة التقنية', skills: ['Architecture', 'Strategy', 'Next.js', 'AWS'], sortOrder: 1, photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg' },
    { nameEn: 'Sarah Khan', nameAr: 'سارة خان', role: 'Lead Developer', roleAr: 'المطورة الرئيسية', bio: 'Full-stack expert specializing in React and Node.js', bioAr: 'خبيرة تطوير متكامل متخصصة في React وNode.js', skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'], sortOrder: 2, photo: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg' },
    { nameEn: 'Omar Al-Rashid', nameAr: 'عمر الراشد', role: 'UI/UX Designer', roleAr: 'مصمم واجهات', bio: 'Award-winning designer with a passion for user-centered design', bioAr: 'مصمم حائز على جوائز شغوف بالتصميم المتمحور حول المستخدم', skills: ['Figma', 'Adobe XD', 'Prototyping', 'Design Systems'], sortOrder: 3, photo: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg' },
    { nameEn: 'Fatima Zahra', nameAr: 'فاطمة الزهراء', role: 'Full-Stack Developer', roleAr: 'مطورة متكاملة', bio: 'Building scalable web apps with modern frameworks', bioAr: 'تبني تطبيقات ويب قابلة للتوسع بأطر حديثة', skills: ['Next.js', 'Prisma', 'Tailwind', 'GraphQL'], sortOrder: 4, photo: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' },
    { nameEn: 'Bilal Ahmed', nameAr: 'بلال أحمد', role: 'Mobile Developer', roleAr: 'مطور تطبيقات الجوال', bio: 'Cross-platform mobile expert in React Native and Flutter', bioAr: 'خبير تطبيقات الجوال متعددة المنصات', skills: ['React Native', 'Flutter', 'Swift', 'Kotlin'], sortOrder: 5, photo: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg' },
    { nameEn: 'Aisha Mohammed', nameAr: 'عائشة محمد', role: 'AI Engineer', roleAr: 'مهندسة الذكاء الاصطناعي', bio: 'ML engineer specializing in NLP and AI automation', bioAr: 'مهندسة تعلم آلي متخصصة في NLP والأتمتة الذكية', skills: ['Python', 'TensorFlow', 'OpenAI', 'LangChain'], sortOrder: 6, photo: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg' },
  ];

  for (const member of teamMembers) {
    await prisma.teamMember.upsert({
      where: { id: `seed-${member.nameEn}` },
      update: {},
      create: {
        id: `seed-${member.nameEn}`,
        nameEn: member.nameEn,
        nameAr: member.nameAr,
        role: member.role,
        roleAr: member.roleAr,
        bio: member.bio,
        bioAr: member.bioAr,
        skills: member.skills,
        sortOrder: member.sortOrder,
        photo: member.photo,
        isActive: true,
      },
    });
  }

  const blogPosts = [
    { slug: 'why-nextjs-2025', titleEn: 'Why Next.js is the Best Framework in 2025', titleAr: 'لماذا Next.js هو أفضل إطار في 2025', category: BlogCategory.WEB_DEV, author: 'Sarah Khan', readTime: 5, coverImage: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg', excerptEn: 'Discover why Next.js has become the go-to framework for modern web development.', excerptAr: 'اكتشف لماذا أصبح Next.js الإطار المفضل لتطوير الويب الحديث.' },
    { slug: 'mobile-app-trends-2025', titleEn: 'Mobile App Development Trends to Watch', titleAr: 'اتجاهات تطوير تطبيقات الجوال', category: BlogCategory.MOBILE, author: 'Bilal Ahmed', readTime: 7, coverImage: 'https://images.pexels.com/photos/607829/pexels-photo-607829.jpeg', excerptEn: 'From React Native to Flutter — the latest trends in mobile development.', excerptAr: 'من React Native إلى Flutter — أحدث اتجاهات تطوير الجوال.' },
    { slug: 'ai-transforming-business', titleEn: 'How AI is Transforming Business Operations', titleAr: 'كيف يحول الذكاء الاصطناعي عمليات الأعمال', category: BlogCategory.AI, author: 'Aisha Mohammed', readTime: 6, coverImage: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg', excerptEn: 'AI and automation are reshaping how businesses operate in 2025.', excerptAr: 'الذكاء الاصطناعي والأتمتة يعيدان تشكيل طريقة عمل الشركات في 2025.' },
    { slug: 'uiux-design-principles', titleEn: '10 UI/UX Design Principles Every Developer Should Know', titleAr: '10 مبادئ تصميم UI/UX يجب أن يعرفها كل مطور', category: BlogCategory.DESIGN, author: 'Omar Al-Rashid', readTime: 8, coverImage: 'https://images.pexels.com/photos/1966452/pexels-photo-1966452.jpeg', excerptEn: 'Essential design principles that bridge the gap between good and great interfaces.', excerptAr: 'مبادئ تصميم أساسية ترد الفجوة بين الواجهات الجيدة والممتازة.' },
    { slug: 'saas-scaling-strategies', titleEn: 'Scaling Your SaaS: From MVP to Enterprise', titleAr: 'توسيع منتج SaaS: من MVP إلى المؤسسة', category: BlogCategory.BUSINESS, author: 'Ahmed Hassan', readTime: 10, coverImage: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg', excerptEn: 'Practical strategies for scaling your SaaS product without breaking things.', excerptAr: 'استراتيجيات عملية لتوسيع منتج SaaS دون كسر الأشياء.' },
    { slug: 'cloud-devops-best-practices', titleEn: 'Cloud & DevOps Best Practices for 2025', titleAr: 'أفضل ممارسات Cloud وDevOps لعام 2025', category: BlogCategory.CLOUD, author: 'Sarah Khan', readTime: 9, coverImage: 'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg', excerptEn: 'Modern DevOps practices that improve deployment speed and reliability.', excerptAr: 'ممارسات DevOps الحديثة التي تحسن سرعة وموثوقية النشر.' },
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        slug: post.slug,
        titleEn: post.titleEn,
        titleAr: post.titleAr,
        category: post.category,
        author: post.author,
        readTime: post.readTime,
        coverImage: post.coverImage,
        excerptEn: post.excerptEn,
        excerptAr: post.excerptAr,
        contentEn: `# ${post.titleEn}\n\nThis is a comprehensive article about ${post.titleEn}. Full content coming soon.`,
        contentAr: `# ${post.titleAr}\n\nهذا مقال شامل عن ${post.titleAr}. المحتوى الكامل قريباً.`,
        isPublished: true,
        publishedAt: new Date(),
      },
    });
  }

  const testimonials = [
    { clientName: 'Khalid Al-Saud', clientRole: 'CEO', clientCompany: 'Vogue Arabia', clientCountry: 'UAE', reviewEn: 'NexGen Solutions transformed our online presence. Our e-commerce sales tripled within 3 months!', rating: 5, isFeatured: true },
    { clientName: 'Ayesha Khan', clientRole: 'CTO', clientCompany: 'NextBank', clientCountry: 'Saudi Arabia', reviewEn: 'The mobile banking app they built exceeded all expectations. Professional, secure, and beautiful.', rating: 5, isFeatured: true },
    { clientName: 'John Smith', clientRole: 'Founder', clientCompany: 'DataFlow Inc', clientCountry: 'USA', reviewEn: 'Best development team we have worked with. They delivered our SaaS platform ahead of schedule.', rating: 5, isFeatured: true },
    { clientName: 'Emma Wilson', clientRole: 'Product Manager', clientCompany: 'TechSupport Co', clientCountry: 'UK', reviewEn: 'The AI chatbot they built handles 80% of our customer queries automatically. Incredible work.', rating: 5, isFeatured: false },
    { clientName: 'Ali Raza', clientRole: 'Director', clientCompany: 'EstateHub', clientCountry: 'Pakistan', reviewEn: 'Our real estate platform is fast, beautiful, and easy to use. Highly recommend NexGen Solutions.', rating: 5, isFeatured: false },
    { clientName: 'Mohammed Al-Maktoum', clientRole: 'CEO', clientCompany: 'MediCare', clientCountry: 'UAE', reviewEn: 'They built our healthcare app with HIPAA compliance and an amazing user experience.', rating: 5, isFeatured: false },
    { clientName: 'David Brown', clientRole: 'Owner', clientCompany: 'QuickServe', clientCountry: 'Saudi Arabia', reviewEn: 'The POS system revolutionized our restaurant operations. 35% more efficient!', rating: 5, isFeatured: false },
    { clientName: 'Lisa Chen', clientRole: 'CEO', clientCompany: 'CryptoFlow', clientCountry: 'USA', reviewEn: 'Their blockchain expertise is top-notch. Our trading platform is secure and fast.', rating: 5, isFeatured: false },
  ];

  for (const t of testimonials) {
    await prisma.testimonial.create({
      data: {
        clientName: t.clientName,
        clientRole: t.clientRole,
        clientCompany: t.clientCompany,
        clientCountry: t.clientCountry,
        reviewEn: t.reviewEn,
        rating: t.rating,
        isFeatured: t.isFeatured,
        isApproved: true,
      },
    });
  }

  const inquiries = [
    { refNumber: 'INQ-2025-00001', clientName: 'Sara Ahmed', email: 'sara@techstart.com', phone: '+971501234567', company: 'TechStart', service: 'web', budget: '$1,500–$5,000', timeline: '1-3 months', description: 'We need a modern company website with a blog and contact form.', status: InquiryStatus.NEW },
    { refNumber: 'INQ-2025-00002', clientName: 'Mohammed Ali', email: 'm.ali@foodapp.com', phone: '+966501234567', company: 'FoodApp', service: 'app', budget: '$5,000–$20,000', timeline: '3-6 months', description: 'Looking for a food delivery mobile app for iOS and Android.', status: InquiryStatus.READ },
    { refNumber: 'INQ-2025-00003', clientName: 'James Taylor', email: 'james@datacorp.com', phone: '+1234567890', company: 'DataCorp', service: 'saas', budget: '$20,000+', timeline: 'Flexible', description: 'We need a multi-tenant SaaS platform with analytics and billing.', status: InquiryStatus.REPLIED },
  ];

  for (const inq of inquiries) {
    await prisma.projectInquiry.upsert({
      where: { refNumber: inq.refNumber },
      update: {},
      create: inq,
    });
  }

  await prisma.siteSettings.upsert({
    where: { id: 'seed-settings' },
    update: {},
    create: {
      id: 'seed-settings',
      companyNameEn: 'NexGen Solutions',
      companyNameAr: 'نيكست جن سولوشنز',
      taglineEn: "Building Tomorrow's Digital World. Today.",
      taglineAr: 'نبني عالمك الرقمي. اليوم.',
      email: 'hello@nexgensolutions.agency',
      phone: '+923000000000',
      whatsapp: '923000000000',
      linkedinUrl: 'https://linkedin.com/company/nexgensolutions',
      githubUrl: 'https://github.com/nexgensolutions',
      twitterUrl: 'https://twitter.com/nexgensolutions',
      instagramUrl: 'https://instagram.com/nexgensolutions',
      totalProjects: 100,
      totalClients: 50,
      totalCountries: 10,
      yearsExperience: 5,
    },
  });

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
