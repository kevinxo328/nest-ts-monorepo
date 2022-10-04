import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateConditionDto {
  @IsString()
  public readonly keyword: string;

  @IsOptional()
  @IsInt()
  public readonly price_min?: number;

  @IsOptional()
  @IsInt()
  public readonly price_max?: number;

  @IsString()
  public readonly user: string;
}
