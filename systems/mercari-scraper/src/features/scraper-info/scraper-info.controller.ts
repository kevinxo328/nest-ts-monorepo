import { Controller, Get, UseGuards } from "@nestjs/common";
import { ScraperInfoService } from "./scraper-info.service";
import { IScraperInfo } from "./interface/scraper-info.interface";
import { JwtAuthGuard } from "../../core/guards";

@UseGuards(JwtAuthGuard)
@Controller("scraper-info")
export class ScraperInfoController {
  constructor(private service: ScraperInfoService) {}

  @Get()
  getAll(): IScraperInfo[] {
    return this.service.getAll();
  }
}
