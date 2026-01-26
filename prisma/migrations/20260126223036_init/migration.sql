/*
  Warnings:

  - You are about to drop the column `streetName` on the `UtilityPole` table. All the data in the column will be lost.
  - You are about to drop the column `streetNum` on the `UtilityPole` table. All the data in the column will be lost.
  - Added the required column `address` to the `UtilityPole` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UtilityPole" DROP COLUMN "streetName",
DROP COLUMN "streetNum",
ADD COLUMN     "address" TEXT NOT NULL;
