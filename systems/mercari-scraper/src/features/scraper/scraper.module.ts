import { Module } from "@nestjs/common";
import { ScraperService } from "./scraper.service";
import { ScraperController } from "./scraper.controller";
import { ScraperResultDefinition } from "../../common/models/scraper-result.model";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [MongooseModule.forFeature([ScraperResultDefinition])],
  controllers: [ScraperController],
  providers: [ScraperService],
})
export class ScraperModule {}
