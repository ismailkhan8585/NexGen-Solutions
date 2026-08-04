-- Trust gate and bilingual case-study fields. This migration is additive and
-- preserves every existing record. Existing records remain private until a
-- super administrator reviews and explicitly verifies them.
CREATE TYPE "ProjectClassification" AS ENUM ('DEMO', 'CLIENT');

ALTER TABLE "Project"
ADD COLUMN "classification" "ProjectClassification" NOT NULL DEFAULT 'DEMO',
ADD COLUMN "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "resultsVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "industryEn" TEXT,
ADD COLUMN "industryAr" TEXT,
ADD COLUMN "challengeEn" TEXT,
ADD COLUMN "challengeAr" TEXT,
ADD COLUMN "solutionEn" TEXT,
ADD COLUMN "solutionAr" TEXT,
ADD COLUMN "resultsEn" TEXT,
ADD COLUMN "resultsAr" TEXT,
ADD COLUMN "featuresEn" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN "featuresAr" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN "durationEn" TEXT,
ADD COLUMN "durationAr" TEXT;

ALTER TABLE "TeamMember" ADD COLUMN "isVerified" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "Testimonial" ADD COLUMN "isVerified" BOOLEAN NOT NULL DEFAULT false;

CREATE INDEX "Project_public_content_idx" ON "Project" ("isActive", "isVerified", "featured");
CREATE INDEX "TeamMember_public_content_idx" ON "TeamMember" ("isActive", "isVerified", "sortOrder");
CREATE INDEX "Testimonial_public_content_idx" ON "Testimonial" ("isApproved", "isVerified", "isFeatured");
