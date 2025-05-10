// import { CacheModuleAsyncOptions } from "@nestjs/cache-manager";
// import { ConfigModule, ConfigService } from "@nestjs/config";
// import { redisStore } from "cache-manager-redis-store";

// export const RedisOptions: CacheModuleAsyncOptions = {
//   isGlobal: true,
//   imports: [ConfigModule],
//   useFactory: async (configService: ConfigService) => {
//     const store = await redisStore({
//       socket: {
//         host: configService.get<string>('REDIS_HOST'),
//         port: parseInt(configService.get<string>('REDIS_PORT')!),
//       },
//     });
//     return {
//       store: () => store,
//     };
//   },
//   inject: [ConfigService],
// };
import { CacheModuleAsyncOptions } from "@nestjs/cache-manager";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-store";

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const store = await redisStore({
      url: 'redis://default:onoO6UKNtEoiDIH7O7J6jkUstx2nCxSC@redis-12801.crce179.ap-south-1-1.ec2.redns.redis-cloud.com:12801', // e.g., redis://user:password@host:port
    });

    return {
      store: () => store,
    };
  },
  inject: [ConfigService],
};
