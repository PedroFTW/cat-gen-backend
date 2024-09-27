import { CatGeneratorService } from './../cat-generator/cat-generator.service';
import { UsersService } from 'src/users/users.service';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private catGeneratorService: CatGeneratorService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    if (this.usersService.findOne(createUserDto.email) !== undefined) {
      throw new ForbiddenException('Already exists');
    }
    this.usersService.create(createUserDto);
    return { success: true };
  }

  @Get('img')
  testImg() {
    this.catGeneratorService.generateCatPng();
  }
}
