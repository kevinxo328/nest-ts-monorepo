import {
  ModelDefinition,
  Prop,
  raw,
  Schema,
  SchemaFactory,
} from "@nestjs/mongoose";
import { Document } from "mongoose";

import { Role } from "../../../common/enums/role.enum";

@Schema({ versionKey: false })
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  username: string;

  @Prop({
    required: true,
    type: raw({
      hash: String,
      salt: String,
      _id: false,
    }),
  })
  password: { hash: string; salt: string };

  @Prop({
    required: true,
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Prop({
    type: raw({
      hash: String,
      salt: String,
      _id: false,
    }),
  })
  refreshToken?: { hash: string; salt: string };
}

export type UserDocument = User & Document;

export const UserModel = SchemaFactory.createForClass(User);

UserModel.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
  },
});

export const USER_MODEL_TOKEN = User.name;

export const UserDefinition: ModelDefinition = {
  name: USER_MODEL_TOKEN,
  schema: UserModel,
};
