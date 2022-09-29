import { registerAs } from "@nestjs/config";
import * as process from "process";

export default registerAs("mongo", () => {
  return { url: process.env.DB_URL, dbName: process.env.DB_NAME };
});
