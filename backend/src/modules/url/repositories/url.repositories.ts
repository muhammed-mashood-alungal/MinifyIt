import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Url, UrlDocument } from 'src/schema/url.schema';

@Injectable()
export class UrlRepository {
  constructor(@InjectModel(Url.name) private urlModel: Model<Url>) {}

  async createUrl(data: Partial<UrlDocument>) {
   return await this.urlModel.create(data)
  }

  async getShortUrlByCode(code :string) : Promise<UrlDocument | null> {
    return await this.urlModel.findOne({shortCode : code})
  }

  async getShortUrlByOriginalUrl(orginalUrl : string) : Promise<UrlDocument | null>{
    return await this.urlModel.findOne({originalUrl : orginalUrl})
  }
  async getUserUrls(userId : Types.ObjectId) : Promise<UrlDocument[]>{
    return await this.urlModel.find({userId})
  }
}
