import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model, ObjectId } from 'mongoose';
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

  async updateLastLoggedInAt(user: User): Promise<User> {
    user.lastLoggedInAt = new Date();
    const updatedUser = new this.userModel(user);
    return updatedUser.save();
  }

  async findOne(email: string): Promise<User | null> {
    return this.userModel.findOne({ email: email }).exec();
  }

  async findOneById(OID: ObjectId): Promise<User> {
    const user = await this.userModel.findOne({ _id: OID });
    if (user === null) {
      throw new NotFoundException();
    }
    return user;
  }
}
