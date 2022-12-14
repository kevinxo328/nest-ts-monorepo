/*
  Warnings:

  - You are about to drop the column `price_max` on the `scraper_conditions` table. All the data in the column will be lost.
  - You are about to drop the column `price_min` on the `scraper_conditions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `scraper_conditions` DROP COLUMN `price_max`,
    DROP COLUMN `price_min`,
    ADD COLUMN `priceMax` INTEGER NULL,
    ADD COLUMN `priceMin` INTEGER NULL;
