import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateConditionDto {
  @IsString()
  public readonly keyword: string;

  @IsOptional()
  @IsInt()
  public readonly priceMin?: number;

  @IsOptional()
  @IsInt()
  public readonly priceMax?: number;

  @IsString()
  public readonly userId: string;
}
