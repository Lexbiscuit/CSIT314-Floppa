-- CreateTable
CREATE TABLE "Bids" (
    "bidId" SERIAL NOT NULL,
    "accountId" INTEGER NOT NULL,
    "profileId" INTEGER NOT NULL,

    CONSTRAINT "Bids_pkey" PRIMARY KEY ("bidId")
);

-- CreateTable
CREATE TABLE "Accounts" (
    "accountId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dob" DATE NOT NULL,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("accountId")
);

-- CreateTable
CREATE TABLE "Profiles" (
    "profileId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("profileId")
);

-- CreateTable
CREATE TABLE "Workslots" (
    "workslotId" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "baristas_required" INTEGER NOT NULL,
    "cashiers_required" INTEGER NOT NULL,
    "chefs_required" INTEGER NOT NULL,
    "waiters_required" INTEGER NOT NULL,

    CONSTRAINT "Workslots_pkey" PRIMARY KEY ("workslotId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_email_key" ON "Accounts"("email");

-- AddForeignKey
ALTER TABLE "Bids" ADD CONSTRAINT "Bids_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Accounts"("accountId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bids" ADD CONSTRAINT "Bids_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profiles"("profileId") ON DELETE RESTRICT ON UPDATE CASCADE;
