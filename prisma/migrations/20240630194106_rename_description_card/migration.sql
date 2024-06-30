/*
  Warnings:

  - You are about to drop the column `description_card` on the `Hotel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Hotel" DROP COLUMN "description_card",
ADD COLUMN     "descriptionCard" TEXT NOT NULL DEFAULT '';
