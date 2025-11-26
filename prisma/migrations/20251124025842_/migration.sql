/*
  Warnings:

  - You are about to drop the column `rules` on the `Venue` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Venue" DROP COLUMN "rules";

-- CreateTable
CREATE TABLE "VenueImage" (
    "id" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isPrimary" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VenueImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VenueImage_venueId_idx" ON "VenueImage"("venueId");

-- CreateIndex
CREATE INDEX "VenueImage_isPrimary_idx" ON "VenueImage"("isPrimary");

-- AddForeignKey
ALTER TABLE "VenueImage" ADD CONSTRAINT "VenueImage_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
