import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../core/guards";
import { ScraperService } from "./scraper.service";
import { SearchPipe } from "../../core/pipes";
import { SearchDto } from "../../core/bases";

@UseGuards(JwtAuthGuard)
@Controller("scraper")
export class ScraperController {
  constructor(private readonly service: ScraperService) {}

  @Get()
  getResult(@Query(SearchPipe) query: SearchDto) {
    return this.service.findAll(query, "-_id");
  }
}
