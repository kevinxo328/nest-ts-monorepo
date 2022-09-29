import {
  Body,
  ConflictException,
  Controller,
  ForbiddenException,
  Post,
  UseGuards,
} from "@nestjs/common";
import { LocalAuthGuard } from "../../core/guards";
import { CreateUserDto, UserService } from "../user";
import { AuthService } from "./auth.service";

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
      throw new ConflictException("username or email is already exist.");
    }

    const user = await this.userService.createUser(dto);
    const { password, ...result } = user;
    return result;
  }

  @UseGuards(LocalAuthGuard)
  @Post("/login")
  async login(@Body() dto: CreateUserDto) {
    const user = await this.authService.validateUser(
      dto.username,
      dto.password
    );

    if (!user) {
      throw new ForbiddenException();
    }

    const { id, username, role } = user;

    return this.authService.generateJwt({ id, username, role });
  }
}
