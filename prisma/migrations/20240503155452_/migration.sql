/*
  Warnings:

  - You are about to drop the column `date` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Item` DROP COLUMN `date`,
    DROP COLUMN `time`,
    ADD COLUMN `dateTime` DATETIME(3) NULL;
