import { IsOptional } from "class-validator";

export class SearchDto {
  @IsOptional()
  skip?: number;

  @IsOptional()
  take?: number;
}
