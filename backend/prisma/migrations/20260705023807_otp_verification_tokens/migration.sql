/*
  Warnings:

  - A unique constraint covering the columns `[userId,type]` on the table `VerificationToken` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "VerificationToken_userId_type_idx";

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_userId_type_key" ON "VerificationToken"("userId", "type");
