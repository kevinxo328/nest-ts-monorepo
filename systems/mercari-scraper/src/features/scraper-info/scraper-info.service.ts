import { Injectable } from "@nestjs/common";
import { IScraperInfo } from "./interface/scraper-info.interface";

@Injectable()
export class ScraperInfoService {
  private _scraperInfo = [
    {
      _id: "6325816bc25525127ea8dc4e",
      name: "SSZ ナイロンパンツ",
      price: 7500,
      img: "https://static.mercdn.net/c!/w=240/thumb/photos/m60447226972_1.jpg?1663256517",
      link: "https://jp.mercari.com/item/m60447226972",
    },
  ];
  getAll(): IScraperInfo[] {
    return this._scraperInfo;
  }
}
