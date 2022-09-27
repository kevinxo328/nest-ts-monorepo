import { registerAs } from "@nestjs/config";
import * as process from "process";

export default registerAs("secrets", () => {
  const jwt = process.env.JWT_SECRET;
  return { jwt };
});
