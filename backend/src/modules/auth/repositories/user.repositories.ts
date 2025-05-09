import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schema/user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(userData: Partial<UserDocument>) :Promise<UserDocument>{
    const createdUser = await this.userModel.create(userData)
    return createdUser.save()
  }

  async getUserByEmail(email :string) : Promise<UserDocument | null> {
    return await this.userModel.findOne({email : email})
  }
  
}
