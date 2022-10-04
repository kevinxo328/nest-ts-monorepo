import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

@Schema({ versionKey: false, collection: "scraper_conditions" })
export class ScraperCondition {
  @Prop({ required: true })
  keyword: string;

  @Prop()
  price_min?: number;

  @Prop()
  price_max?: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, owner: "User" })
  user: string;
}

export type ScraperConditionDocument = ScraperCondition & Document;

export const ScraperConditionModel =
  SchemaFactory.createForClass(ScraperCondition);

ScraperConditionModel.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
  },
});

export const SCRAPER_CONDITION_TOKEN = ScraperCondition.name;

export const ScraperConditionDefinition = {
  name: SCRAPER_CONDITION_TOKEN,
  schema: ScraperConditionModel,
};
