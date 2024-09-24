import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.createdAt = new Date();
    const hashpass = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashpass;
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOne(email: string): Promise<User | null> {
    return this.userModel.findOne({ email: email }).exec();
  }
}
//$2b$10$J/2u8nztM56Y7ln/7kRX6uA8dPSONC5NbkklBVCmNsBlkp.82Jece
