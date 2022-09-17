import { Module } from "@nestjs/common";
import { ScraperInfoModule } from "../scraper-info/scraper-info.module";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule, MongooseModuleOptions } from "@nestjs/mongoose";
import { DatabaseService } from "./config/database.service";
import { InfraConfigModule } from "./config/config.module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [InfraConfigModule],
      inject: [DatabaseService],
      useFactory: (service: DatabaseService) => {
        const options: MongooseModuleOptions = {
          uri: service.dbUrl,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
        return options;
      },
    }),
    ScraperInfoModule,
  ],
})
export class AppModule {}
