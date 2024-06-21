/*
  Warnings:

  - You are about to drop the column `travelTimeId` on the `Hotel` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Hotel" DROP CONSTRAINT "Hotel_travelTimeId_fkey";

-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "travelTimeId";

-- CreateTable
CREATE TABLE "_HotelToTravelTime" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HotelToTravelTime_AB_unique" ON "_HotelToTravelTime"("A", "B");

-- CreateIndex
CREATE INDEX "_HotelToTravelTime_B_index" ON "_HotelToTravelTime"("B");

-- AddForeignKey
ALTER TABLE "_HotelToTravelTime" ADD CONSTRAINT "_HotelToTravelTime_A_fkey" FOREIGN KEY ("A") REFERENCES "Hotel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HotelToTravelTime" ADD CONSTRAINT "_HotelToTravelTime_B_fkey" FOREIGN KEY ("B") REFERENCES "TravelTime"("id") ON DELETE CASCADE ON UPDATE CASCADE;
