import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  UseGuards,
} from "@nestjs/common";
import { LocalAuthGuard } from "../../core/guards";
import { CreateUserDto, UserService } from "../user";
import { AuthService } from "./auth.service";
import { CommonUtility } from "../../core/utils/common.utility";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post("/signup")
  async signup(@Body() dto: CreateUserDto) {
    const hasUser = await this.userService.hasUser();
    if (hasUser) {
      throw new ForbiddenException();
    }
    const user = await this.userService.createUser(dto);
    const { _id: id, username, role } = user;
    return this.authService.generateJwt({ id, username, role });
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
