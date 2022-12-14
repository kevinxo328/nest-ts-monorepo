import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import {
  SEARCH_DEFAULT_TAKE,
  SEARCH_DEFAULT_SKIP,
  SEARCH_MAX_TAKE,
} from "../../utils/constants/search.const";

@Injectable()
export class SearchPipe implements PipeTransform<Record<string, any>> {
  private readonly DEFAULT_LIMIT = SEARCH_DEFAULT_TAKE;
  private readonly MAX_LIMIT = SEARCH_MAX_TAKE;
  private readonly DEFAULT_SKIP = SEARCH_DEFAULT_SKIP;

  transform(value: Record<string, any>, metadata: ArgumentMetadata) {
    const { take, skip } = value;
    value.take = this.setTake(parseInt(take));
    value.skip = this.setSkip(parseInt(skip));
    return value;
  }

  private setTake(take: number): number {
    if (!take) {
      return this.DEFAULT_LIMIT;
    }
    if (take > this.MAX_LIMIT) {
      return this.MAX_LIMIT;
    }
    return take;
  }

  private setSkip(skip: number): number {
    if (!skip) {
      return this.DEFAULT_SKIP;
    }
    return skip;
  }
}
