import { CacheModuleAsyncOptions } from "@nestjs/cache-manager";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { redisStore } from "cache-manager-redis-store";
import { env } from "src/modules/configs/env.config";

export const RedisOptions: CacheModuleAsyncOptions = {
  isGlobal: true,
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const store = await redisStore({
      url: env.REDIS_URL, 
    });

    return {
      store: () => store,
    };
  },
  inject: [ConfigService],
};
