import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UrlModule } from './modules/url/url.module';
import { MongooseModule } from '@nestjs/mongoose';
import { env } from './modules/configs/env.config';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { redisStore } from 'cache-manager-redis-store';


@Module({
  imports: [
    AuthModule,
    UrlModule,
    MongooseModule.forRoot(env.DATABASE_URL),
   CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => ({
        store: redisStore,
        host: 'localhost',
        port: 6379,
        ttl: 600, // Default TTL of 10 minutes
         password: '123', // Uncomment if needed
        // db: 0, // Redis database index
      }),
    }),
  ],
  controllers: [], // Remove AuthController from here
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ], // Remove AuthService from here
})
export class AppModule {}
