-- AlterTable
ALTER TABLE `Item` MODIFY `checkedTime` DATETIME(3) NULL,
    MODIFY `priority` ENUM('NO_PRIORITY', 'LOWER', 'MIDDLE', 'UPPER') NULL;
