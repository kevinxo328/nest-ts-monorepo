import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DatabaseService {
  private _dbUrl!: string;

  get dbUrl(): string {
    return this._dbUrl;
  }
  constructor(private readonly _service: ConfigService) {
    this._dbUrl = this._getDbUrl();
  }
  private _getDbUrl(): string {
    const url = this._service.get<string>("DB_URL");
    if (!url) {
      throw new Error(
        "No connection string has been provided in the .env file."
      );
    }

    return url;
  }
}
