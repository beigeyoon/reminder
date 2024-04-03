/*
  Warnings:

  - You are about to alter the column `icon` on the `List` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.
  - You are about to alter the column `color` on the `List` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `List` MODIFY `icon` ENUM('LIST', 'BOOK', 'FILE', 'MONEY', 'COMPUTER', 'LEAF', 'PERSON', 'SHOPPING', 'TRIP', 'CALENDAR', 'IDEA', 'HOUSE', 'MUSIC', 'SUN', 'MOON', 'HEART', 'STAR') NOT NULL,
    MODIFY `color` ENUM('RED', 'ORANGE', 'YELLOW', 'GREEN', 'LIGHTBLUE', 'BLUE', 'DEEPBLUE', 'PINK', 'PURPLE', 'BROWN', 'GRAY', 'PINKBEIGE') NOT NULL;
