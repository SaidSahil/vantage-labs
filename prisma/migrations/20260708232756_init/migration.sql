-- CreateTable
CREATE TABLE "Visit" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "referrer" TEXT,
    "country" TEXT,
    "region" TEXT,
    "city" TEXT,
    "userAgent" TEXT,
    "sessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Visit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionEngagement" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "viewMs" INTEGER NOT NULL DEFAULT 0,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "sessionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SectionEngagement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Visit_createdAt_idx" ON "Visit"("createdAt");

-- CreateIndex
CREATE INDEX "Visit_path_idx" ON "Visit"("path");

-- CreateIndex
CREATE INDEX "Visit_sessionId_idx" ON "Visit"("sessionId");

-- CreateIndex
CREATE INDEX "SectionEngagement_path_section_idx" ON "SectionEngagement"("path", "section");

-- CreateIndex
CREATE INDEX "SectionEngagement_createdAt_idx" ON "SectionEngagement"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "SectionEngagement_sessionId_path_section_key" ON "SectionEngagement"("sessionId", "path", "section");
