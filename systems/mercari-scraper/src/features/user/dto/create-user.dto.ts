import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

import {
  USER_PASSWORD_MAX_LEN,
  USER_PASSWORD_MIN_LEN,
} from "../../../common/constants/user.const";
import { Role } from "../../../common/enums/role.enum";

export class CreateUserDto {
  @IsString()
  public readonly username: string;

  @IsString()
  @MinLength(USER_PASSWORD_MIN_LEN)
  @MaxLength(USER_PASSWORD_MAX_LEN)
  public readonly password: string;

  @IsOptional()
  @IsEnum(Role)
  public readonly role?: Role;
}
