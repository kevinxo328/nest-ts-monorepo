import { Module } from "@nestjs/common";
import { ScraperService } from "./scraper.service";
import { ScraperController } from "./scraper.controller";
import { ScraperResultDefinition } from "./models/scraper-result.model";
import { MongooseModule } from "@nestjs/mongoose";
import { ScraperConditionDefinition } from "./models/scraper-condition.model";
import { PrismaService } from "../../core/services/prisma.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      ScraperResultDefinition,
      ScraperConditionDefinition,
    ]),
  ],
  controllers: [ScraperController],
  providers: [ScraperService, PrismaService],
})
export class ScraperModule {}
