import { Injectable } from "@nestjs/common";
import { CreateConditionDto } from "./dtos/create-condition.dto";
import { UpdateConditionDto } from "./dtos/update-condition.dto";
import { PrismaService } from "../../core/services/prisma.service";
import { Prisma } from "../../../prisma/client";

@Injectable()
export class ScraperService {
  constructor(private readonly prisma: PrismaService) {}

  async findResults(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ScraperResultWhereUniqueInput;
    where?: Prisma.ScraperResultWhereInput;
    orderBy?: Prisma.ScraperResultOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.scraperResult.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async findConditions(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ScraperConditionWhereUniqueInput;
    where?: Prisma.ScraperConditionWhereInput;
    orderBy?: Prisma.ScraperConditionOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.scraperCondition.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createCondition(dto: CreateConditionDto) {
    return this.prisma.scraperCondition.create({
      data: dto,
    });
  }

  async updateCondition(params: {
    where: Prisma.ScraperConditionWhereUniqueInput;
    data: UpdateConditionDto | Prisma.ScraperConditionUpdateInput;
  }) {
    try {
      const { where, data } = params;
      const res = await this.prisma.scraperCondition.update({
        data,
        where,
      });
      return res;
    } catch (err) {
      console.warn(err);
      return err;
    }
  }

  async deleteCondition(where: Prisma.ScraperConditionWhereUniqueInput) {
    try {
      const user = await this.prisma.scraperCondition.delete({
        where,
      });

      return user;
    } catch (err) {
      console.warn(err);
      return err;
    }
  }
}
