import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";

import { ExtractJwt, Strategy } from "passport-jwt";

import { UserPayload } from "../interfaces/payload.interface";
import { Request } from "express";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  "jwt-refresh"
) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("jwt.refreshTokenSecret"),
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: UserPayload) {
    const refreshToken = req.get("Authorization")?.replace("Bearer", "").trim();
    return { ...payload, refreshToken };
  }
}
