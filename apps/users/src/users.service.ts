import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor (
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  create(createUserDto): Promise<User> {
    const createUser = new this.userModel(createUserDto);
    return createUser.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(username): Promise<User> {
    return await this.userModel.findOne({
      name: username,
    }).exec();
  }
}
