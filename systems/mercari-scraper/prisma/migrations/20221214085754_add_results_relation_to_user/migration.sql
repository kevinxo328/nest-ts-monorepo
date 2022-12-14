/*
  Warnings:

  - Added the required column `userId` to the `scraper_results` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `scraper_results` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `scraper_results` ADD CONSTRAINT `scraper_results_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
