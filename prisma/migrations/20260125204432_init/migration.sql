/*
  Warnings:

  - You are about to drop the `UtilityPole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "UtilityPole";

-- CreateTable
CREATE TABLE "UtilityPoles" (
    "id" INTEGER NOT NULL,
    "streetNum" INTEGER NOT NULL,
    "streetName" TEXT NOT NULL,
    "latitude" INTEGER NOT NULL,
    "longitude" INTEGER NOT NULL,

    CONSTRAINT "UtilityPoles_pkey" PRIMARY KEY ("id")
);
