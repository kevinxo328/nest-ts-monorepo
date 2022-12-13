import {
  Body,
  ConflictException,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";

import { SearchPipe } from "../../core/pipes";
import { AccessTokenGuard } from "../../core/guards";
import { SearchDto } from "../../core/bases";

import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";

import { UserService } from "./user.service";
import isPrismaError from "../../utils/IsPrismaError";

@UseGuards(AccessTokenGuard)
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Query(SearchPipe) query: SearchDto) {
    const users = await this.userService.findUsers({});

    return users.map(({ hash, salt, rtHash, rtSalt, ...result }) => result);
  }

  // TODO：和 auth/signup 邏輯共用，看要如何整理
  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    const { username } = dto;
    const exist = await this.userService.findUser({ username });

    if (exist) {
      throw new ConflictException("username or email is already exist.");
    }

    const user = await this.userService.createUser(dto);
    const { hash, salt, rtHash, rtSalt, ...result } = user;
    return result;
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: string) {
    const user = await this.userService.deleteUser({ id });

    if (isPrismaError(user)) {
      throw new ForbiddenException();
    }

    const { hash, salt, rtHash, rtSalt, ...result } = user;

    return result;
  }

  @Patch(":id")
  async updateUser(@Param("id") id: string, @Body() dto: UpdateUserDto) {
    const user = await this.userService.updateUser({
      data: dto,
      where: { id },
    });

    if (isPrismaError(user)) {
      throw new ForbiddenException();
    }

    const { hash, salt, rtHash, rtSalt, ...result } = user;

    return result;
  }
}
