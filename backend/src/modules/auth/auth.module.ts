import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller';
import { AuthService } from './services/auth/auth.service';
import { UserRepository } from './repositories/user.repositories';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/schema/user.schema';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports:[
    MongooseModule.forFeature([{name : User.name , schema : UserSchema}]),
    CacheModule.register()
  ],
  controllers: [AuthController],
  providers: [AuthService , UserRepository]
})
export class AuthModule {}
   