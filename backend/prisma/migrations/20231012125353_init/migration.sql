/*
  Warnings:

  - Added the required column `email` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" ADD COLUMN     "email" TEXT NOT NULL;
