/*
  Warnings:

  - The values [ADMIN] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('USER', 'VENUE_ADMIN', 'SUPER_ADMIN');
ALTER TABLE "public"."User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "Role_new" USING ("role"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- CreateTable
CREATE TABLE "VenueAdmin" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VenueAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VenueAdmin_userId_idx" ON "VenueAdmin"("userId");

-- CreateIndex
CREATE INDEX "VenueAdmin_venueId_idx" ON "VenueAdmin"("venueId");

-- CreateIndex
CREATE UNIQUE INDEX "VenueAdmin_userId_venueId_key" ON "VenueAdmin"("userId", "venueId");

-- AddForeignKey
ALTER TABLE "VenueAdmin" ADD CONSTRAINT "VenueAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VenueAdmin" ADD CONSTRAINT "VenueAdmin_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
