import { registerAs } from "@nestjs/config";
import * as process from "process";

export default registerAs("jwt", () => {
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
  const accessTokenLife = process.env.ACCESS_TOKEN_LIFE;
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
  const refreshTokenLife = process.env.REFRESH_TOKEN_LIFE;
  return {
    accessTokenSecret,
    accessTokenLife,
    refreshTokenLife,
    refreshTokenSecret,
  };
});
