import { registerAs } from "@nestjs/config";
import * as process from "process";

export default registerAs("mongo", () => {
  return { url: process.env.DB_URL, secret: process.env.JWT_SECRET };
});
