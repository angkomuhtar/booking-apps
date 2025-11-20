/*
  Warnings:

  - You are about to drop the column `facilities` on the `Venue` table. All the data in the column will be lost.
  - You are about to drop the `facilitieys` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Venue" DROP COLUMN "facilities";

-- DropTable
DROP TABLE "public"."facilitieys";

-- CreateTable
CREATE TABLE "venueFacility" (
    "id" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "facilityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "venueFacility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facility" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT DEFAULT 'material-symbols:add-row-above-rounded',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "facility_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "venueFacility_venueId_idx" ON "venueFacility"("venueId");

-- CreateIndex
CREATE INDEX "venueFacility_facilityId_idx" ON "venueFacility"("facilityId");

-- CreateIndex
CREATE UNIQUE INDEX "venueFacility_venueId_facilityId_key" ON "venueFacility"("venueId", "facilityId");

-- AddForeignKey
ALTER TABLE "venueFacility" ADD CONSTRAINT "venueFacility_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "venueFacility" ADD CONSTRAINT "venueFacility_facilityId_fkey" FOREIGN KEY ("facilityId") REFERENCES "facility"("id") ON DELETE CASCADE ON UPDATE CASCADE;
