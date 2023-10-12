/*
  Warnings:

  - You are about to drop the `Accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Accounts";

-- DropTable
DROP TABLE "Profiles";

-- CreateTable
CREATE TABLE "bids" (
    "bidId" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "profileId" INTEGER NOT NULL,

    CONSTRAINT "bids_pkey" PRIMARY KEY ("bidId")
);

-- CreateTable
CREATE TABLE "accounts" (
    "accountId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dob" DATE NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("accountId")
);

-- CreateTable
CREATE TABLE "profiles" (
    "profileId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("profileId")
);

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("accountId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("profileId") ON DELETE RESTRICT ON UPDATE CASCADE;
