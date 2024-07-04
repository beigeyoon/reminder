/*
  Warnings:

  - You are about to drop the column `sectionId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the `Section` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_listId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "sectionId";

-- DropTable
DROP TABLE "Section";
