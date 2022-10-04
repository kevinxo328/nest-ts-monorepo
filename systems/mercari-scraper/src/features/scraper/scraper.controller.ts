import {
  Body,
  ConflictException,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../../core/guards";
import { ScraperService } from "./scraper.service";
import { SearchPipe } from "../../core/pipes";
import { SearchDto } from "../../core/bases";
import { User, UserPayload } from "../auth";
import { CreateConditionPayload } from "./interfaces/payload.interface";

@UseGuards(JwtAuthGuard)
@Controller("scraper")
export class ScraperController {
  constructor(private readonly service: ScraperService) {}

  @Get()
  async getResult(@Query(SearchPipe) query: SearchDto) {
    return await this.service.findResults(query, "-_id");
  }

  @Post("/condition")
  async createCondition(
    @Body() payload: CreateConditionPayload,
    @User() user: UserPayload
  ) {
    const exist = await this.service.existCondition({
      user: user.id,
      keyword: payload.keyword,
    });

    if (exist) {
      throw new ConflictException("keyword 已存在");
    }

    return await this.service.createCondition({ ...payload, user: user.id });
  }

  @Get("conditions")
  async findConditions(
    @User() user: UserPayload,
    @Query(SearchPipe) query: SearchDto
  ) {
    return await this.service.findConditions({ user: user.id }, query);
  }

  @Patch("/condition/:id")
  async updateCondition(
    @Body() payload: CreateConditionPayload,
    @User() user: UserPayload
  ) {
    return await this.service.createCondition({ ...payload, user: user.id });
  }

  @Delete("/condition/:id")
  async deleteCondition(@Param("id") id: string, @User() user: UserPayload) {
    const condition = await this.service.deleteCondition(id, user.id);
    if (!condition) {
      throw new ForbiddenException();
    }
    return condition;
  }
}
