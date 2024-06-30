/*
  Warnings:

  - You are about to drop the column `slider_display` on the `Hotel` table. All the data in the column will be lost.
  - Added the required column `sliderDisplay` to the `Hotel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "slider_display",
ADD COLUMN     "sliderDisplay" BOOLEAN NOT NULL;
