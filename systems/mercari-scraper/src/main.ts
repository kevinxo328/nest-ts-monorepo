import { NestFactory } from "@nestjs/core";
import { AppModule } from "./core/app.module";

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  await app.listen(8080);
};

bootstrap();
