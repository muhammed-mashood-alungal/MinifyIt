import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UrlModule } from './modules/url/url.module';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from './modules/configs/env.config';

@Module({
  imports: [AuthModule, UrlModule , MongooseModule.forRoot(env.DATABASE_URL)],
  controllers: [],
  providers: [],
})
export class AppModule {}
