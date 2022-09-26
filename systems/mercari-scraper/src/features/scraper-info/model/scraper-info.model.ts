import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class ScraperInfo {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  img: string;

  @Prop({ required: true })
  link: string;
}

export type ScraperInfoDocument = ScraperInfo & Document;

export const ScraperInfoSchema = SchemaFactory.createForClass(ScraperInfo);
