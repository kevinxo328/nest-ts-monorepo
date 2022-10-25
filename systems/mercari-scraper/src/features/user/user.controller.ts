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

@UseGuards(AccessTokenGuard)
@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(@Query(SearchPipe) query: SearchDto) {
    return this.userService.findUsers(query, "-password");
  }

  // TODO：和 auth/signup 邏輯共用，看要如何整理
  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    const { username } = dto;
    const exist = await this.userService.existUser({
      $or: [{ username }],
    });

    if (exist) {
      throw new ConflictException("username or email is already exist.");
    }

    const user = await this.userService.createUser(dto);
    const { password, ...result } = user;
    return result;
  }

  @Delete(":id")
  async deleteUser(@Param("id") id: string) {
    const response = await this.userService.deleteUser(id);
    if (!response) {
      throw new ForbiddenException();
    }
    return response;
  }

  @Patch(":id")
  async updateUser(@Param("id") id: string, @Body() dto: UpdateUserDto) {
    const user = await this.userService.updateUser(id, dto, "-password");
    if (!user) {
      throw new ForbiddenException();
    }
    return user;
  }
}
