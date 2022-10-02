import { Injectable } from "@nestjs/common";
import { UserPayload } from "./interfaces/payload.interface";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user";
import { CommonUtility } from "../../core/utils/common.utility";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  public async validateUser(username: string, password: string) {
    const user = await this.userService.findUser({ username });
    const { hash } = CommonUtility.encryptBySalt(
      password,
      user?.password?.salt
    );

    if (!user || hash !== user?.password?.hash) {
      return null;
    }

    const result: UserPayload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };

    return result;
  }

  public generateJwt(payload: UserPayload) {
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
