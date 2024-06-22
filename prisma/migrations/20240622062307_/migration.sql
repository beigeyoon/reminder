-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,

    UNIQUE INDEX `User_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `List` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `orderBy` ENUM('NEWEST', 'OLDEST', 'PRIORITY') NOT NULL DEFAULT 'NEWEST',
    `icon` ENUM('LIST', 'BOOK', 'FILE', 'MONEY', 'COMPUTER', 'LEAF', 'PERSON', 'SHOPPING', 'TRIP', 'CALENDAR', 'IDEA', 'HOUSE', 'MUSIC', 'SUN', 'MOON', 'HEART', 'STAR') NOT NULL,
    `color` ENUM('RED', 'ORANGE', 'YELLOW', 'GREEN', 'LIGHTBLUE', 'BLUE', 'DEEPBLUE', 'PINK', 'PURPLE', 'BROWN', 'GRAY', 'PINKBEIGE') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Section` (
    `id` VARCHAR(191) NOT NULL,
    `listId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `id` VARCHAR(191) NOT NULL,
    `createdTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedTime` DATETIME(3) NOT NULL,
    `checked` BOOLEAN NOT NULL DEFAULT false,
    `title` VARCHAR(191) NOT NULL,
    `memo` VARCHAR(191) NULL,
    `url` VARCHAR(191) NULL,
    `dateTime` DATETIME(3) NULL,
    `hasTime` BOOLEAN NOT NULL DEFAULT false,
    `priority` INTEGER NULL,
    `flagged` BOOLEAN NOT NULL DEFAULT false,
    `listId` VARCHAR(191) NOT NULL,
    `sectionId` VARCHAR(191) NULL,
    `image_url` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubItem` (
    `id` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `createdTime` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedTime` DATETIME(3) NOT NULL,
    `checked` BOOLEAN NOT NULL DEFAULT false,
    `title` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tag` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ItemToTag` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_ItemToTag_AB_unique`(`A`, `B`),
    INDEX `_ItemToTag_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `List` ADD CONSTRAINT `List_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Section` ADD CONSTRAINT `Section_listId_fkey` FOREIGN KEY (`listId`) REFERENCES `List`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_listId_fkey` FOREIGN KEY (`listId`) REFERENCES `List`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_sectionId_fkey` FOREIGN KEY (`sectionId`) REFERENCES `Section`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubItem` ADD CONSTRAINT `SubItem_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tag` ADD CONSTRAINT `Tag_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ItemToTag` ADD CONSTRAINT `_ItemToTag_A_fkey` FOREIGN KEY (`A`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ItemToTag` ADD CONSTRAINT `_ItemToTag_B_fkey` FOREIGN KEY (`B`) REFERENCES `Tag`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
