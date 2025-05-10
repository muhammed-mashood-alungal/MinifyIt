import { Injectable } from '@nestjs/common';
import { UrlRepository } from '../repositories/url.repositories';
import { CreateUrlDto } from '../dto/createUrl.dto';
import { v4 as uuid } from 'uuid';
import { env } from 'src/modules/configs/env.config';
import { UrlDocument } from 'src/schema/url.schema';
import { Types } from 'mongoose';

@Injectable()
export class UrlServices {
  constructor(private readonly urlRepository: UrlRepository) {}

  async createNewUrl(data: CreateUrlDto): Promise<string | null> {
    const existingUrlData = await this.urlRepository.getShortUrlByOriginalUrl(
      data.originalUrl,
    );

    if (existingUrlData) {
      return existingUrlData.shortUrl;
    }
    let shortCode =  uuid().split('-')[0];
    let isCodeExist = await this.urlRepository.getShortUrlByCode(shortCode);
    while(isCodeExist){
     shortCode = uuid().split('-')[0];
     isCodeExist = await this.urlRepository.getShortUrlByCode(shortCode);
    }
    const shortUrl = `${env.CLIENT_URL}/${shortCode}`;

    const newUrlData = await this.urlRepository.createUrl({
      ...data,
      shortCode: shortCode,
      shortUrl: shortUrl,
    });
    return newUrlData.shortUrl;
  }

  
  async getOrginalUrl(shortCode: string): Promise<string | undefined> {
    const urlData = await this.urlRepository.getShortUrlByCode(shortCode);
    return urlData?.originalUrl;
  }


  async getUserUrls(userId : unknown ) : Promise<UrlDocument[]>{
    return await this.urlRepository.getUserUrls(userId as Types.ObjectId)
  }
}
