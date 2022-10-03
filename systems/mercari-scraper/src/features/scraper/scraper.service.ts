import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  SCRAPER_RESULT_TOKEN,
  ScraperResultDocument,
} from "../../common/models/scraper-result.model";
import { Model } from "mongoose";
import { SearchDto } from "../../core/bases";
import {
  SEARCH_DEFAULT_LIMIT,
  SEARCH_DEFAULT_SKIP,
} from "../../common/constants/search.const";

@Injectable()
export class ScraperService {
  constructor(
    @InjectModel(SCRAPER_RESULT_TOKEN)
    private readonly resultModel: Model<ScraperResultDocument>
  ) {}

  async findAll(search: SearchDto, select?: any) {
    const { skip, limit } = search;
    const query = this.resultModel.find().select(select);
    const documents = await query
      .skip(skip || SEARCH_DEFAULT_SKIP)
      .limit(limit || SEARCH_DEFAULT_LIMIT)
      .exec();

    return documents.map((document) => document?.toJSON());
  }
}
