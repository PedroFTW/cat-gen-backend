import { UsersService } from 'src/users/users.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserToken } from './user-token.schema';
import { User } from 'src/users/user.schema';

@Injectable()
export class UserTokenService {
  constructor(
    @InjectModel(UserToken.name) private userTokenModel: Model<UserToken>,
    private usersService: UsersService,
  ) {}

  async registerUserToken(userOID: ObjectId, refreshToken: string) {
    console.log('registerUserToken');
    const user = await this.usersService.findOneById(userOID);
    const userToken = new this.userTokenModel({
      user: user,
      refresh_token: refreshToken,
    });

    userToken.save();
  }

  async findOneByToken(refreshToken: string): Promise<UserToken | null> {
    const userToken = await this.userTokenModel.findOne({
      refresh_token: refreshToken,
    });

    return userToken;
  }

  async deleteByToken(refreshToken: string) {
    await this.userTokenModel.findOneAndDelete({ refresh_token: refreshToken });
  }

  async deleteByUser(user: User) {
    console.log('deleteByUser', user);
    await this.userTokenModel.findOneAndDelete({ user: user });
  }

  async getUserByToken(refreshToken: string): Promise<User> {
    const token = await this.userTokenModel
      .findOne({ refresh_token: refreshToken })
      .exec();

    if (!token) {
      throw new NotFoundException('Token not found');
    }

    return token.user;
  }
}
