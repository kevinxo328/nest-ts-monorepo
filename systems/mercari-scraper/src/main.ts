import { NestFactory } from "@nestjs/core";
import { AppModule } from "./core/app.module";
import { RequestMethod } from "@nestjs/common";

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix("api", {
    exclude: [{ path: "", method: RequestMethod.GET }],
  });
  await app.listen(8080);
};

bootstrap();
