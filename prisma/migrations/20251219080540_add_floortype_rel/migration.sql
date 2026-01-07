/*
  Warnings:

  - You are about to drop the column `floorType` on the `Court` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Court" DROP COLUMN "floorType",
ADD COLUMN     "floor" TEXT;

-- AddForeignKey
ALTER TABLE "Court" ADD CONSTRAINT "Court_floor_fkey" FOREIGN KEY ("floor") REFERENCES "FloorType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
