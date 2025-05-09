// src/config/config.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { env } from './env.config';


@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [() => env],
      isGlobal: true,
    }),
  ],
})
export class AppConfigModule {} 
 