/*
  Warnings:

  - You are about to drop the column `HSR` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `wuwa` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "user" DROP COLUMN "HSR",
DROP COLUMN "wuwa";

-- CreateTable
CREATE TABLE "hsr_data" (
    "id" TEXT NOT NULL,
    "data" TEXT[],
    "options" JSONB NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "hsr_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wuwa_data" (
    "id" TEXT NOT NULL,
    "data" TEXT[],
    "options" JSONB NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "wuwa_data_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "hsr_data_userId_key" ON "hsr_data"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "wuwa_data_userId_key" ON "wuwa_data"("userId");

-- AddForeignKey
ALTER TABLE "hsr_data" ADD CONSTRAINT "hsr_data_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wuwa_data" ADD CONSTRAINT "wuwa_data_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
