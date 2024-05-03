/*
  Warnings:

  - You are about to alter the column `priority` on the `Item` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `Int`.

*/
-- AlterTable
ALTER TABLE `Item` MODIFY `priority` INTEGER NULL;
