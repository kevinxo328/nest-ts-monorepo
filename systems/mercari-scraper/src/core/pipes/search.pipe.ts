import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import {
  SEARCH_DEFAULT_LIMIT,
  SEARCH_DEFAULT_SKIP,
  SEARCH_MAX_LIMIT,
} from "../../utils/constants/search.const";

@Injectable()
export class SearchPipe implements PipeTransform<Record<string, any>> {
  private readonly DEFAULT_LIMIT = SEARCH_DEFAULT_LIMIT;
  private readonly MAX_LIMIT = SEARCH_MAX_LIMIT;
  private readonly DEFAULT_SKIP = SEARCH_DEFAULT_SKIP;

  transform(value: Record<string, any>, metadata: ArgumentMetadata) {
    const { limit, skip } = value;
    value.limit = this.setLimit(parseInt(limit));
    value.skip = this.setSkip(parseInt(skip));
    return value;
  }

  private setLimit(limit: number): number {
    if (!limit) {
      return this.DEFAULT_LIMIT;
    }
    if (limit > this.MAX_LIMIT) {
      return this.MAX_LIMIT;
    }
    return limit;
  }

  private setSkip(skip: number): number {
    if (!skip) {
      return this.DEFAULT_SKIP;
    }
    return skip;
  }
}
