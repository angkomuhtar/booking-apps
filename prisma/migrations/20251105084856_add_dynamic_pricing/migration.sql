-- CreateEnum
CREATE TYPE "DayType" AS ENUM ('WEEKDAY', 'WEEKEND', 'HOLIDAY');

-- AlterEnum
ALTER TYPE "CourtType" ADD VALUE 'MINISOCCER';

-- AlterTable
ALTER TABLE "Court" ADD COLUMN     "floorType" TEXT,
ADD COLUMN     "sessionDuration" INTEGER NOT NULL DEFAULT 60;

-- AlterTable
ALTER TABLE "Venue" ADD COLUMN     "location" TEXT,
ADD COLUMN     "province" TEXT,
ADD COLUMN     "rules" TEXT;

-- CreateTable
CREATE TABLE "CourtPricing" (
    "id" TEXT NOT NULL,
    "courtId" TEXT NOT NULL,
    "dayType" "DayType" NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourtPricing_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CourtPricing_courtId_idx" ON "CourtPricing"("courtId");

-- CreateIndex
CREATE INDEX "CourtPricing_dayType_idx" ON "CourtPricing"("dayType");

-- AddForeignKey
ALTER TABLE "CourtPricing" ADD CONSTRAINT "CourtPricing_courtId_fkey" FOREIGN KEY ("courtId") REFERENCES "Court"("id") ON DELETE CASCADE ON UPDATE CASCADE;
