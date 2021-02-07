import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly users: Model<User>) {}

  async register(user: User) {
    const createdUser = new this.users(user);
    return await createdUser.save();
  }

  async getByEmail(email: string): Promise<User> {
    return await this.users.findOne({ email }).exec();
  }
}
