import { Module, ValidationPipe } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";
import { ResponseInterceptor } from "./interceptors/response.interceptor";
import mongoConfig from "../config/mongo.config";
import secretsConfig from "../config/secrets.config";
import { UserModule } from "../features/user";
import { AuthModule } from "../features/auth";
import { ScraperModule } from "../features/scraper/scraper.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mongoConfig, secretsConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>("mongo.url"),
        dbName: config.get<string>("mongo.dbName"),
      }),
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
})
export class AppModule {}
