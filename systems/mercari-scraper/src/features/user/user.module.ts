import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserDefinition } from "./models/user.model";
import { UserController } from "./user.controller";
import { PrismaService } from "../../core/services/prisma.service";

@Module({
  imports: [MongooseModule.forFeature([UserDefinition])],
  providers: [UserService, PrismaService],
  exports: [UserService, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
