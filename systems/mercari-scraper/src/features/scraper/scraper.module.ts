import { Module } from "@nestjs/common";
import { ScraperService } from "./scraper.service";
import { ScraperController } from "./scraper.controller";
import { ScraperResultDefinition } from "../../common/models/scraper-result.model";
import { MongooseModule } from "@nestjs/mongoose";
import { ScraperConditionDefinition } from "../../common/models/scraper-condition";

@Module({
  imports: [
    MongooseModule.forFeature([
      ScraperResultDefinition,
      ScraperConditionDefinition,
    ]),
  ],
  controllers: [ScraperController],
  providers: [ScraperService],
})
export class ScraperModule {}
