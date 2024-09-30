import { CatGeneratorService } from './../cat-generator/cat-generator.service';
import { UsersService } from 'src/users/users.service';
import { Body, Controller, ForbiddenException, Post } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private catGeneratorService: CatGeneratorService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<any> {
    await this.usersService.findOne(createUserDto.email).then((user) => {
      console.log(user);
      if (user !== null) {
        throw new ForbiddenException('Already exists');
      }
      this.usersService.create(createUserDto);

      return { success: true };
    });
  }
}
