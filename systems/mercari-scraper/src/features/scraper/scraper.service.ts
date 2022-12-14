import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  SCRAPER_RESULT_TOKEN,
  ScraperResultDocument,
} from "./models/scraper-result.model";
import { FilterQuery, Model } from "mongoose";
import { SearchDto } from "../../core/bases";
import {
  SEARCH_DEFAULT_LIMIT,
  SEARCH_DEFAULT_SKIP,
} from "../../utils/constants/search.const";
import {
  SCRAPER_CONDITION_TOKEN,
  ScraperConditionDocument,
} from "./models/scraper-condition.model";
import { CreateConditionDto } from "./dtos/create-condition.dto";
import { UpdateConditionDto } from "./dtos/update-condition.dto";

@Injectable()
export class ScraperService {
  constructor(
    @InjectModel(SCRAPER_RESULT_TOKEN)
    private readonly resultModel: Model<ScraperResultDocument>,
    @InjectModel(SCRAPER_CONDITION_TOKEN)
    private readonly conditionModel: Model<ScraperConditionDocument>
  ) {}

  async findResults(search: SearchDto, select?: any) {
    const { skip, limit } = search;
    const query = this.resultModel.find().select(select);
    const documents = await query
      .skip(skip || SEARCH_DEFAULT_SKIP)
      .limit(limit || SEARCH_DEFAULT_LIMIT)
      .exec();

    return documents.map((document) => document?.toJSON());
  }

  async findConditions(
    filter: FilterQuery<ScraperConditionDocument>,
    search: SearchDto,
    select?: any
  ) {
    const { skip, limit } = search;
    const query = this.conditionModel.find(filter).select(select);
    const documents = await query
      .skip(skip || SEARCH_DEFAULT_SKIP)
      .limit(limit || SEARCH_DEFAULT_LIMIT)
      .exec();

    return documents.map((document) => document?.toJSON());
  }

  async createCondition(dto: CreateConditionDto) {
    const doc = await this.conditionModel.create(dto);
    return doc?.toJSON();
  }

  async updateCondition(
    conditionId: string,
    dto: UpdateConditionDto,
    select?: any
  ) {
    const query = this.conditionModel
      .findByIdAndUpdate(conditionId, dto, { new: true })
      .select(select);
    const document = await query.exec();
    return document?.toJSON();
  }

  // todo 統一換成 id
  async deleteCondition(conditionId: string, userId: string) {
    const document = await this.conditionModel
      .deleteOne({ _id: conditionId, user: userId })
      .exec();

    if (!document) {
      return;
    }
    return {};
  }
  async existCondition(filter: FilterQuery<ScraperConditionDocument>) {
    return this.conditionModel.exists(filter);
  }
}
