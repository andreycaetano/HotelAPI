/*
  Warnings:

  - Added the required column `description_card` to the `Hotel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hotel" ADD COLUMN     "description_card" TEXT NOT NULL;
