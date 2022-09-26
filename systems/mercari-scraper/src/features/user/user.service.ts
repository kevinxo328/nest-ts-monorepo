import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  USER_MODEL_TOKEN,
  UserDocument,
} from "../../common/models/user.model";
import { Model, FilterQuery } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { CommonUtility } from "../../core/utils/common.utility";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER_MODEL_TOKEN)
    private readonly userModel: Model<UserDocument>
  ) {}

  public async createUser(user: CreateUserDto) {
    const { username, email, role } = user;
    const password = CommonUtility.encryptBySalt(user.password);
    const document = await this.userModel.create({
      username,
      password,
      email,
      role,
    });
    return document?.toJSON();
  }

  public async findUser(filter: FilterQuery<UserDocument>, select?: any) {
    const query = this.userModel.findOne(filter).select(select);
    const document = await query.exec();
    return document?.toJSON();
  }

  public async hasUser() {
    const count = await this.userModel.estimatedDocumentCount().exec();
    return count > 0;
  }
}
