import { UserTokenService } from './user-token.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from './constants';
import { User } from 'src/users/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private userTokenService: UserTokenService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (user === null) {
      throw new UnauthorizedException('User not found!');
    }

    if (user.password !== undefined) {
      const check = await bcrypt.compare(pass, user?.password);
      if (check !== true) {
        throw new UnauthorizedException();
      }
    }

    this.usersService.updateLastLoggedInAt(user);

    return await this.generateTokens(user);
  }

  async refreshTokens(refreshToken: string) {
    const user: User = await this.userTokenService.getUserByToken(refreshToken);
    this.userTokenService.deleteByToken(refreshToken);

    return await this.generateTokens(user);
  }

  async generateTokens(user: User) {
    return {
      access_token: await this.generateJwt(user),
      refresh_token: await this.generateRefreshToken(user),
    };
  }

  async generateJwt(user: User) {
    const payload = { email: user.email, userOID: user._id };
    return await this.jwtService.signAsync(payload, {
      expiresIn: '60s',
    });
  }

  async generateRefreshToken(user: User): Promise<string> {
    const refreshToken = await this.jwtService.signAsync(
      { email: user.email },
      {
        secret: jwtConstants.refresh_secret,
        expiresIn: '15m',
      },
    );

    await this.userTokenService.registerUserToken(user._id, refreshToken);

    return refreshToken;
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    return this.usersService.create(createUserDto);
  }
}
