-- Baseline for the production schema that existed before Prisma Migrate was
-- introduced. On the existing database this migration is marked as applied;
-- on a new empty database it creates the original schema before later additive
-- migrations run.
CREATE TYPE "AdminRole" AS ENUM ('SUPER_ADMIN', 'EDITOR');
CREATE TYPE "BlogCategory" AS ENUM ('WEB_DEV', 'MOBILE', 'AI', 'DESIGN', 'BUSINESS', 'CLOUD', 'SECURITY', 'GENERAL');
CREATE TYPE "InquiryStatus" AS ENUM ('NEW', 'READ', 'REPLIED', 'IN_PROGRESS', 'CONVERTED', 'CLOSED');
CREATE TYPE "ProjectCategory" AS ENUM ('WEB', 'MOBILE', 'ECOMMERCE', 'SAAS', 'AI', 'DESIGN', 'CLOUD', 'BLOCKCHAIN', 'SOFTWARE', 'MARKETING');

CREATE TABLE "Admin" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "role" "AdminRole" NOT NULL DEFAULT 'EDITOR',
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "loginAttempts" INTEGER NOT NULL DEFAULT 0,
  "lockedUntil" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "BlogPost" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "titleEn" TEXT NOT NULL,
  "titleAr" TEXT,
  "excerptEn" TEXT,
  "excerptAr" TEXT,
  "contentEn" TEXT,
  "contentAr" TEXT,
  "coverImage" TEXT,
  "category" "BlogCategory" NOT NULL,
  "author" TEXT NOT NULL,
  "readTime" INTEGER NOT NULL,
  "isPublished" BOOLEAN NOT NULL DEFAULT false,
  "publishedAt" TIMESTAMP(3),
  "views" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "BlogPost_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Newsletter" (
  "id" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "name" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Newsletter_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Project" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "titleEn" TEXT NOT NULL,
  "titleAr" TEXT,
  "category" "ProjectCategory" NOT NULL,
  "clientName" TEXT,
  "clientCountry" TEXT,
  "descriptionEn" TEXT,
  "descriptionAr" TEXT,
  "challenge" TEXT,
  "solution" TEXT,
  "results" TEXT,
  "techStack" TEXT[],
  "photos" TEXT[],
  "coverImage" TEXT,
  "liveUrl" TEXT,
  "githubUrl" TEXT,
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "completedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ProjectInquiry" (
  "id" TEXT NOT NULL,
  "refNumber" TEXT NOT NULL,
  "clientName" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "company" TEXT,
  "service" TEXT NOT NULL,
  "budget" TEXT,
  "timeline" TEXT,
  "description" TEXT NOT NULL,
  "status" "InquiryStatus" NOT NULL DEFAULT 'NEW',
  "adminNotes" TEXT,
  "isRead" BOOLEAN NOT NULL DEFAULT false,
  "source" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ProjectInquiry_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Service" (
  "id" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "nameEn" TEXT NOT NULL,
  "nameAr" TEXT,
  "descriptionEn" TEXT,
  "descriptionAr" TEXT,
  "icon" TEXT NOT NULL,
  "startingPrice" TEXT,
  "features" TEXT[],
  "techStack" TEXT[],
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "SiteSettings" (
  "id" TEXT NOT NULL,
  "companyNameEn" TEXT NOT NULL DEFAULT 'NexGen Solutions',
  "companyNameAr" TEXT NOT NULL DEFAULT 'نيكست جن سولوشنز',
  "taglineEn" TEXT,
  "taglineAr" TEXT,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "whatsapp" TEXT,
  "linkedinUrl" TEXT,
  "githubUrl" TEXT,
  "twitterUrl" TEXT,
  "instagramUrl" TEXT,
  "totalProjects" INTEGER NOT NULL DEFAULT 100,
  "totalClients" INTEGER NOT NULL DEFAULT 50,
  "totalCountries" INTEGER NOT NULL DEFAULT 10,
  "yearsExperience" INTEGER NOT NULL DEFAULT 5,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "TeamMember" (
  "id" TEXT NOT NULL,
  "nameEn" TEXT NOT NULL,
  "nameAr" TEXT,
  "role" TEXT NOT NULL,
  "roleAr" TEXT,
  "bio" TEXT,
  "bioAr" TEXT,
  "photo" TEXT,
  "linkedinUrl" TEXT,
  "githubUrl" TEXT,
  "twitterUrl" TEXT,
  "skills" TEXT[],
  "sortOrder" INTEGER NOT NULL DEFAULT 0,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Testimonial" (
  "id" TEXT NOT NULL,
  "projectId" TEXT,
  "clientName" TEXT NOT NULL,
  "clientRole" TEXT,
  "clientCompany" TEXT,
  "clientCountry" TEXT,
  "clientPhoto" TEXT,
  "reviewEn" TEXT NOT NULL,
  "reviewAr" TEXT,
  "rating" INTEGER NOT NULL DEFAULT 5,
  "isApproved" BOOLEAN NOT NULL DEFAULT true,
  "isFeatured" BOOLEAN NOT NULL DEFAULT false,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");
CREATE UNIQUE INDEX "Newsletter_email_key" ON "Newsletter"("email");
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
CREATE UNIQUE INDEX "ProjectInquiry_refNumber_key" ON "ProjectInquiry"("refNumber");
CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");

ALTER TABLE "Testimonial"
ADD CONSTRAINT "Testimonial_projectId_fkey"
FOREIGN KEY ("projectId") REFERENCES "Project"("id")
ON DELETE SET NULL ON UPDATE CASCADE;
