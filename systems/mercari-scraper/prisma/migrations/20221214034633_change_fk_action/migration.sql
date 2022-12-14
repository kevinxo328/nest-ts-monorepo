-- DropForeignKey
ALTER TABLE `scraper_conditions` DROP FOREIGN KEY `scraper_conditions_userId_fkey`;

-- AddForeignKey
ALTER TABLE `scraper_conditions` ADD CONSTRAINT `scraper_conditions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
