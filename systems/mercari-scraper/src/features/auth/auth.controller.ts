// import {
//   Body,
//   ConflictException,
//   Controller,
//   ForbiddenException,
//   Post,
//   Req,
//   UseGuards,
// } from "@nestjs/common";
// import { CreateUserDto, UserService } from "../user";
// import { AuthService } from "./auth.service";
// import {
//   AccessTokenGuard,
//   LocalAuthGuard,
//   RefreshTokenGuard,
// } from "../../core/guards";
// import { User } from "./decorators/payload.decorator";
// import { UserPayload } from "./interfaces/payload.interface";
// import { Request } from "express";
// import { ConfigService } from "@nestjs/config";
// import { CommonUtility } from "../../core/utils/common.utility";
//
// @Controller("auth")
// export class AuthController {
//   constructor(
//     private readonly authService: AuthService,
//     private readonly userService: UserService,
//     private readonly configService: ConfigService
//   ) {}
//
//   @Post("/signup")
//   async signup(@Body() dto: CreateUserDto) {
//     const { username } = dto;
//     const exist = await this.userService.existUser({
//       $or: [{ username }],
//     });
//
//     if (exist) {
//       throw new ConflictException("帳號已存在");
//     }
//
//     await this.userService.createUser(dto);
//     return "註冊成功";
//   }
//
//   @UseGuards(LocalAuthGuard)
//   @Post("/login")
//   async login(@User() user: UserPayload) {
//     const tokens = await this.authService.generateJwt(user);
//     await this.userService.updateRefreshToken(user.id, tokens.refresh_token);
//     return tokens;
//   }
//
//   @UseGuards(AccessTokenGuard)
//   @Post("/logout")
//   async logout(@Req() req: Request) {
//     const accessToken = req
//       .get("Authorization")
//       ?.replace("Bearer", "")
//       .trim() as string;
//
//     const user = this.authService.decodeJwt(accessToken, {
//       secret: this.configService.get("jwt.accessTokenSecret"),
//     }) as UserPayload;
//
//     await this.userService.updateRefreshToken(user.id, "");
//
//     return "登出成功";
//   }
//
//   @UseGuards(RefreshTokenGuard)
//   @Post("/refresh")
//   async refreshToken(@Req() req: Request) {
//     const { id, username, role, refreshToken } = req.user as UserPayload & {
//       refreshToken: string;
//     };
//
//     const user = await this.userService.findUser({ id });
//     const refreshTokenMatched =
//       CommonUtility.encryptBySalt(refreshToken, user?.refreshToken?.salt)
//         .hash === user?.refreshToken?.hash;
//
//     if (!user || !refreshTokenMatched) {
//       throw new ForbiddenException();
//     }
//
//     const payload = { id, username, role };
//     const tokens = await this.authService.generateJwt(payload);
//     await this.userService.updateRefreshToken(payload.id, tokens.refresh_token);
//     return tokens;
//   }
// }
