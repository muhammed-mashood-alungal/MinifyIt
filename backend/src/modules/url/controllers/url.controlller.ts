import { Body, Controller, Get, HttpStatus, Param, Post, Res } from '@nestjs/common';
import { CreateUrlDto } from '../dto/createUrl.dto';
import { UrlServices } from '../services/url.services';
import { Response } from 'express';
import { successResponse } from 'src/common/utils/reponse.util';
import { HttpResponse } from 'src/common/constants/responseMessage.constants';

@Controller('url')
export class UrlController {

  constructor(private readonly urlServices : UrlServices) {}

  @Post('/create')
  async createNewUrl(@Body() data: CreateUrlDto , @Res() res : Response) {
    const shortedUrl = await this.urlServices.createNewUrl(data)
    successResponse(res , HttpStatus.CREATED , HttpResponse.OK , {shortedUrl})
  }

  @Get(':shortCode')
  async getOrginalUrl(@Param() shortCode: string , @Res() res : Response) {
    const orginalUrl =await this.urlServices.getOrginalUrl(shortCode)
    successResponse(res , HttpStatus.OK , HttpResponse.OK , {orginalUrl})
    
  }
}
