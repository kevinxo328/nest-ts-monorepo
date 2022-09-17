import { Module } from "@nestjs/common";
import { ScraperInfoController } from "./scraper-info.controller";
import { ScraperInfoService } from "./scraper-info.service";

@Module({
  controllers: [ScraperInfoController],
  providers: [ScraperInfoService],
})
export class ScraperInfoModule {}
