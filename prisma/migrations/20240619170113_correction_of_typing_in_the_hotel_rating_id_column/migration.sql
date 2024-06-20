/*
  Warnings:

  - You are about to drop the column `ratingid` on the `Hotel` table. All the data in the column will be lost.
  - Added the required column `ratingId` to the `Hotel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Hotel" DROP CONSTRAINT "Hotel_ratingid_fkey";

-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "ratingid",
ADD COLUMN     "ratingId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_ratingId_fkey" FOREIGN KEY ("ratingId") REFERENCES "Ratings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
