import {
  Body,
  ConflictException,
  Controller,
  Post,
  UseGuards,
} from "@nestjs/common";
import { CreateUserDto, UserService } from "../user";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "../../core/guards";
import { User } from "./decorators/payload.decorator";
import { UserPayload } from "./interfaces/payload.interface";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post("/signup")
  async signup(@Body() dto: CreateUserDto) {
    const { username } = dto;
    const exist = await this.userService.existUser({
      $or: [{ username }],
    });

    if (exist) {
      throw new ConflictException("帳號已存在");
    }

    const user = await this.userService.createUser(dto);
    const { password, ...result } = user;
    return result;
  }

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@User() user: UserPayload) {
    return this.authService.generateJwt(user);
  }
}
