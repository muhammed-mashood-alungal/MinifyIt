import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from 'src/schema/url.schema';
import { UrlController } from './controllers/url.controlller';
import { UrlServices } from './services/url.services';
import { UrlRepository } from './repositories/url.repositories';
import { UserRepository } from '../auth/repositories/user.repositories';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }]),
      ],
      controllers: [UrlController],
      providers: [UrlServices, UrlRepository],
      exports: [UrlServices, UrlRepository],
})
export class UrlModule {}
