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
import { AccessTokenGuard } from "../../core/guards";
import { ScraperService } from "./scraper.service";
import { SearchPipe } from "../../core/pipes";
import { SearchDto } from "../../core/bases";
import { User, UserPayload } from "../auth";
import { CreateConditionPayload } from "./interfaces/payload.interface";
import Utils from "../../utils/utils";

@UseGuards(AccessTokenGuard)
@Controller("scraper")
export class ScraperController {
  constructor(private readonly service: ScraperService) {}

  @Get()
  async getResult(@Query(SearchPipe) query: SearchDto) {
    return await this.service.findResults({});
  }

  @Post("/condition")
  async createCondition(
    @Body() payload: CreateConditionPayload,
    @User() user: UserPayload
  ) {
    const exist = await this.service.findConditions({
      where: {
        userId: user.id,
        keyword: payload.keyword,
      },
    });

    if (exist.length > 0) {
      throw new ConflictException("keyword 已存在");
    }

    return this.service.createCondition({ ...payload, userId: user.id });
  }

  @Get("conditions")
  async findConditions(
    @User() user: UserPayload,
    @Query(SearchPipe) query: SearchDto
  ) {
    return await this.service.findConditions({ where: { userId: user.id } });
  }

  @Patch("/condition/:id")
  async updateCondition(
    @Body() payload: CreateConditionPayload,
    @User() user: UserPayload
  ) {
    return await this.service.createCondition({ ...payload, userId: user.id });
  }

  @Delete("/condition/:id")
  async deleteCondition(@Param("id") id: string, @User() user: UserPayload) {
    // TODO: 希望刪除時可以加入 userId
    const res = await this.service.deleteCondition({ id });
    console.log(id);

    if (Utils.isPrismaError(user)) {
      throw new ForbiddenException();
    }

    return res;
  }
}
