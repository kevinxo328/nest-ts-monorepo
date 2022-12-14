import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { ResponseInterceptor } from "./interceptors/response.interceptor";
import secretsConfig from "../config/jwt.config";
import { UserModule } from "../features/user";
import { AuthModule } from "../features/auth";
import { ScraperModule } from "../features/scraper/scraper.module";
import { AppController } from "./app.controller";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [secretsConfig],
    }),
    ScraperModule,
    UserModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
  ],
  controllers: [AppController],
})
export class AppModule {}
