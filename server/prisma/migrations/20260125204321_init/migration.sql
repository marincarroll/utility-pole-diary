-- CreateTable
CREATE TABLE "UtilityPole" (
    "id" INTEGER NOT NULL,
    "streetNum" INTEGER NOT NULL,
    "streetName" TEXT NOT NULL,
    "latitude" INTEGER NOT NULL,
    "longitude" INTEGER NOT NULL,

    CONSTRAINT "UtilityPole_pkey" PRIMARY KEY ("id")
);
