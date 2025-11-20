/*
  Warnings:

  - You are about to drop the column `city` on the `Venue` table. All the data in the column will be lost.
  - You are about to drop the column `province` on the `Venue` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `facility` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Venue" DROP COLUMN "city",
DROP COLUMN "province",
ADD COLUMN     "cityId" TEXT NOT NULL DEFAULT '6472',
ADD COLUMN     "provinceId" TEXT NOT NULL DEFAULT '64';

-- CreateIndex
CREATE UNIQUE INDEX "facility_name_key" ON "facility"("name");

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_provinceId_fkey" FOREIGN KEY ("provinceId") REFERENCES "province"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE CASCADE ON UPDATE CASCADE;
