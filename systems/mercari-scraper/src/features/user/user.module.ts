import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { PrismaService } from "../../core/services/prisma.service";

@Module({
  providers: [UserService, PrismaService],
  exports: [UserService, PrismaService],
  controllers: [UserController],
})
export class UserModule {}
