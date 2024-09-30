import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
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

    const payload = { email: user.email, userOID: user._id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    return this.usersService.create(createUserDto);
  }
}
