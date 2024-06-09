/*
  Warnings:

  - You are about to drop the column `type` on the `List` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `List` DROP COLUMN `type`,
    ADD COLUMN `orderBy` ENUM('NEWEST', 'OLDEST', 'PRIORITY') NOT NULL DEFAULT 'NEWEST';
