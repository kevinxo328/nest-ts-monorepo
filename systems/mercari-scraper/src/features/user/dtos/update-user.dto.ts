import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "../../../common/dtos";

export class UpdateUserDto extends PartialType(CreateUserDto) {}
