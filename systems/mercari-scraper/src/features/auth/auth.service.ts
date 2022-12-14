import { Injectable } from "@nestjs/common";
import { UserPayload } from "./interfaces/payload.interface";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user";
import { ConfigService } from "@nestjs/config";
import Utils from "../../utils/utils";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findUser({ username });
    const { hash } = Utils.encryptBySalt(password, user?.salt);

    if (!user || hash !== user?.hash) {
      return null;
    }

    const result: UserPayload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    return result;
  }

  async generateJwt(payload: UserPayload) {
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get("jwt.accessTokenSecret"),
        expiresIn: this.configService.get("jwt.accessTokenLife"),
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get("jwt.refreshTokenSecret"),
        expiresIn: this.configService.get("jwt.refreshTokenLife"),
      }),
      expires_in: this.configService.get("jwt.accessTokenLife"),
    };
  }

  decodeJwt(token: string, options: any) {
    return this.jwtService.decode(token, options);
  }
}
