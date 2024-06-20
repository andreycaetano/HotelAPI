/*
  Warnings:

  - Added the required column `travelTimeId` to the `Hotel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hotel" ADD COLUMN     "travelTimeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_travelTimeId_fkey" FOREIGN KEY ("travelTimeId") REFERENCES "TravelTime"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
