import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { USER_MODEL_TOKEN, UserDocument } from "./models/user.model";
import { Model } from "mongoose";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { PrismaService } from "../../core/services/prisma.service";
import { Prisma } from "../../../prisma/client";
import Utils from "../../utils/utils";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_MODEL_TOKEN)
    private readonly userModel: Model<UserDocument>,
    private readonly prisma: PrismaService
  ) {}

  async createUser(dto: CreateUserDto) {
    const { username, password, role } = dto;
    const { hash, salt } = Utils.encryptBySalt(password);

    return this.prisma.user.create({
      data: {
        username,
        hash,
        salt,
        role,
      },
    });
  }

  async findUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async findUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput) {
    try {
      const user = await this.prisma.user.delete({
        where,
      });

      return user;
    } catch (err) {
      console.warn(err);
      return err;
    }
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: UpdateUserDto | Prisma.UserUpdateInput; // TODO: 待思考 dto 與 schema 的關係
  }) {
    try {
      const { where, data } = params;
      const user = await this.prisma.user.update({
        data,
        where,
      });
      return user;
    } catch (err) {
      console.warn(err);
      return err;
    }
  }

  async updateRefreshToken(userId: string, refreshToken: string | null) {
    let rtHash = null;
    let rtSalt = null;
    if (refreshToken) {
      const { hash, salt } = Utils.encryptBySalt(refreshToken);
      rtHash = hash;
      rtSalt = salt;
    }
    return this.updateUser({ where: { id: userId }, data: { rtHash, rtSalt } });
  }
}
