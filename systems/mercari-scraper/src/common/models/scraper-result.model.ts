import { ModelDefinition, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ versionKey: false, collection: "scraper_results" })
export class ScraperResult {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  img: string;

  @Prop({ required: true })
  link: string;

  @Prop({ required: true })
  createdDate: string;
}

export type ScraperResultDocument = ScraperResult & Document;

export const ScraperResultModel = SchemaFactory.createForClass(ScraperResult);

export const SCRAPER_RESULT_TOKEN = ScraperResult.name;

export const ScraperResultDefinition: ModelDefinition = {
  name: SCRAPER_RESULT_TOKEN,
  schema: ScraperResultModel,
};
