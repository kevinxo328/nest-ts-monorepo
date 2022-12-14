import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { USER_MODEL_TOKEN, UserDocument } from "./models/user.model";
import { Model, FilterQuery } from "mongoose";
import { CreateUserDto } from "./dtos/create-user.dto";
import { CommonUtility } from "../../core/utils/common.utility";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { SearchDto } from "../../core/bases";
import {
  SEARCH_DEFAULT_LIMIT,
  SEARCH_DEFAULT_SKIP,
} from "../../common/constants/search.const";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_MODEL_TOKEN)
    private readonly userModel: Model<UserDocument>
  ) {}

  async createUser(user: CreateUserDto) {
    const { username, role } = user;
    const password = CommonUtility.encryptBySalt(user.password);
    const document = await this.userModel.create({
      username,
      password,
      role,
    });
    return document?.toJSON();
  }

  async findUser(filter: FilterQuery<UserDocument>, select?: any) {
    const query = this.userModel.findOne(filter).select(select);
    const document = await query.exec();
    return document?.toJSON();
  }

  async findUsers(search: SearchDto, select?: any) {
    const { skip, limit } = search;
    const query = this.userModel.find().select(select);
    const documents = await query
      .skip(skip || SEARCH_DEFAULT_SKIP)
      .limit(limit || SEARCH_DEFAULT_LIMIT)
      .exec();

    return documents.map((document) => document?.toJSON());
  }

  async deleteUser(userId: string) {
    const document = await this.userModel.findByIdAndRemove(userId).exec();
    if (!document) {
      return;
    }
    return {};
  }

  async updateUser(userId: string, data: UpdateUserDto, select?: any) {
    const obj: Record<string, any> = { ...data };
    if (obj.password) {
      obj.password = CommonUtility.encryptBySalt(obj.password);
    }
    const query = this.userModel
      .findByIdAndUpdate(userId, obj, { new: true })
      .select(select);
    const document = await query.exec();
    return document?.toJSON();
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    return this.updateUser(userId, {
      refreshToken: CommonUtility.encryptBySalt(refreshToken),
    });
  }

  existUser(filter: FilterQuery<UserDocument>) {
    return this.userModel.exists(filter);
  }
}
