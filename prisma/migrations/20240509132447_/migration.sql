/*
  Warnings:

  - You are about to drop the column `checkedTime` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `checkedTime` on the `SubItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Item` DROP COLUMN `checkedTime`;

-- AlterTable
ALTER TABLE `SubItem` DROP COLUMN `checkedTime`;
