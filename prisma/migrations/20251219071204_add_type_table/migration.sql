/*
  Warnings:

  - The `type` column on the `Court` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Court" DROP COLUMN "type",
ADD COLUMN     "type" TEXT;

-- DropEnum
DROP TYPE "CourtType";

-- CreateTable
CREATE TABLE "CourtType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourtType_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CourtType_name_key" ON "CourtType"("name");

-- AddForeignKey
ALTER TABLE "Court" ADD CONSTRAINT "Court_type_fkey" FOREIGN KEY ("type") REFERENCES "CourtType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
