-- CreateTable
CREATE TABLE `scraper_results` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `img` VARCHAR(191) NOT NULL,
    `link` VARCHAR(191) NOT NULL,
    `createdDate` DATETIME(3) NOT NULL,
    `conditionId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `scraper_results` ADD CONSTRAINT `scraper_results_conditionId_fkey` FOREIGN KEY (`conditionId`) REFERENCES `scraper_conditions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
